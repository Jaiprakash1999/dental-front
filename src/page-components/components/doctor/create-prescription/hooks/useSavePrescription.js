import axios from "axios";
import { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import html2pdf from "html2pdf.js";
import { PDFDocument } from "pdf-lib";
import { useNavigate } from "react-router-dom";

const { REACT_APP_API_KEY } = process.env || {};

const useSavePrescription = ({ method = "post", contentRef }) => {
  const navigate = useNavigate();

  const [isPrescriptionSaving, setIsPrescriptionSaving] = useState(false);
  const prescriptionData = useSelector((state) => state.prescriptionData);
  const [pastPrescription, setPastPrescription] = useState([]);
  const userDetails = JSON.parse(sessionStorage.getItem("userDetails"));

  const { signature, stamp } = userDetails || {};

  const patientData = useSelector((state) => state.patientDetails);
  const { name } = patientData || {};

  const {
    chiefComplaint = [],
    diagnosis = [],
    rxList = [],
    labInvestigations = [],
    medicalHandoubts = [],
    instructions,
    lifeStyleRecommendations,
    followUpDate,
    // followUp,
  } = prescriptionData || {};

  const getAllHandoubts = useCallback(async () => {
    try {
      const token = localStorage.getItem("authToken");
      // const res = await axios.get(
      //   `${REACT_APP_API_KEY}/api/v1/mmu/cortex/handout`,

      //   {
      //     params: { id: medicalHandoubts[0]?.id },
      //     headers: {
      //       Authorization: `Bearer ${token}`,
      //       "ngrok-skip-browser-warning": "hgs",
      //     },
      //     responseType: "blob",
      //   }
      // );
      // const pdfUrl = URL.createObjectURL(res.data);
      const pdfUrls = await Promise.all(
        medicalHandoubts.map(async (handout) => {
          const res = await axios.get(
            `${REACT_APP_API_KEY}/api/v1/mmu/cortex/handout`,

            {
              params: { id: handout?.id },
              headers: {
                Authorization: `Bearer ${token}`,
                "ngrok-skip-browser-warning": "hgs",
              },
              responseType: "blob",
            }
          );
          return URL.createObjectURL(res.data);
        })
      );
      return pdfUrls;
    } catch (error) {
      console.error(error, "error");
      const errorMessage = error.response?.data?.message;
      if (!error.response) {
        toast.error("Oops, something went wrong");
      } else {
        const messageContent = Array.isArray(errorMessage) ? (
          <ul className="ms-2 list-disc">
            {errorMessage.map((msg, index) => (
              <li key={index}>{msg}</li>
            ))}
          </ul>
        ) : (
          errorMessage || "An unknown error occurred"
        );
        toast.error(messageContent);
        if (error.response?.data?.statusCode === 401) {
          localStorage.removeItem("authToken");
          setTimeout(() => {
            navigate("/");
          }, 1000);
        }
      }
    }
  }, [medicalHandoubts, navigate]);

  const onSavePrescription = useCallback(
    async (id) => {
      setIsPrescriptionSaving(true);
      const token = localStorage.getItem("authToken");
      try {
        const res = await axios[method](
          `${REACT_APP_API_KEY}/api/v1/mmu/records/prescription`,
          method === "post"
            ? {
                chiefComplaint: chiefComplaint,
                followUp: followUpDate,
                lifeStyleRecommendations: lifeStyleRecommendations,
                instructions: instructions,
                diagnosis: diagnosis,
                labInvestigations: labInvestigations,
                rxList: rxList[0]?.drugName === "" ? [] : rxList,
                visitId: id,
                signature: signature,
                stamp: stamp,
              }
            : {
                params: {
                  patientId: id,
                },
                headers: {
                  Authorization: `Bearer ${token}`,
                  "ngrok-skip-browser-warning": "hgs",
                },
              },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "ngrok-skip-browser-warning": "hgs",
            },
          }
        );

        if (method === "post") {
          toast.success("Prescription Generated Successfully!", {
            className: "w-max",
            position: "top-center",
          });

          // Generate PDF from HTML
          const element = contentRef.current;
          const opt = {
            margin: 6,
            filename: `${name}_prescription.pdf`,
            image: { type: "jpeg", quality: 1 },
            html2canvas: { scale: 2, useCORS: true },
            jsPDF: {
              orientation: "p",
              unit: "mm",
              format: "a4",
              putOnlyUsedFonts: true,
              floatPrecision: 16,
            },
          };
          if (medicalHandoubts.length === 0) {
            html2pdf().set(opt).from(element).save();
          } else {
            const pdfUrls = await getAllHandoubts(); // This now returns an array of URLs

            // Generate the new PDF
            const pdfBlob = await html2pdf()
              .set(opt)
              .from(element)
              .outputPdf("blob");
            const newPdfDoc = await PDFDocument.load(
              await pdfBlob.arrayBuffer()
            );

            // Create a new PDFDocument for merging
            const mergedPdfDoc = await PDFDocument.create();

            // Add the generated PDF first
            const copiedNewPages = await mergedPdfDoc.copyPages(
              newPdfDoc,
              newPdfDoc.getPageIndices()
            );
            copiedNewPages.forEach((page) => mergedPdfDoc.addPage(page));

            // Load and merge all existing PDFs
            const pdfDocs = await Promise.all(
              pdfUrls.map(async (url) => {
                const existingPdfBytes = await fetch(url).then((res) =>
                  res.arrayBuffer()
                );
                return PDFDocument.load(existingPdfBytes);
              })
            );

            // Copy and add pages from each existing PDF
            for (const pdfDoc of pdfDocs) {
              const copiedPages = await mergedPdfDoc.copyPages(
                pdfDoc,
                pdfDoc.getPageIndices()
              );
              copiedPages.forEach((page) => mergedPdfDoc.addPage(page));
            }

            // Save and download the merged PDF
            const mergedPdfBytes = await mergedPdfDoc.save();
            const mergedPdfBlob = new Blob([mergedPdfBytes], {
              type: "application/pdf",
            });

            const url = URL.createObjectURL(mergedPdfBlob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `${name}_prescription.pdf`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);

            setPastPrescription(res.data);
          }
        }
      } catch (error) {
        console.error(error, "error");
        const errorMessage = error.response?.data?.message;
        if (!error.response) {
          toast.error("Oops, something went wrong");
        } else {
          const messageContent = Array.isArray(errorMessage) ? (
            <ul className="ms-2 list-disc">
              {errorMessage.map((msg, index) => (
                <li key={index}>{msg}</li>
              ))}
            </ul>
          ) : (
            errorMessage || "An unknown error occurred"
          );
          toast.error(messageContent);
          if (error.response?.data?.statusCode === 401) {
            localStorage.removeItem("authToken");
            setTimeout(() => {
              navigate("/");
            }, 1000);
          }
        }
      } finally {
        setIsPrescriptionSaving(false);
      }
    },
    // eslint-disable-next-line
    [method, navigate] // Add allHandoubts to dependencies
  );

  return { onSavePrescription, isPrescriptionSaving, pastPrescription };
};

export default useSavePrescription;
