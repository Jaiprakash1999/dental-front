import axios from "axios";
import html2pdf from "html2pdf.js";
import { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const onSaveMedication = async (
  item,
  chiefComplaint,
  chiefComplaintData,
  contentRef
) => {
  const token = localStorage.getItem("authToken");
  const res = await axios.post(
    `/v2/fhir/medicationRequest`,
    {
      medicationRequestStatus: "ACTIVE",
      medicationRequestIntent: "ORDER",
      medicationSnomedCt: "1145423002",
      medicationDisplay: item.drugName,
      patient: {
        id: "107",
        type: "Patient",
        display: "John Doe",
      },
      authoredOn: new Date(),
      requester: {
        id: "119",
        type: "Practitioner",
        display: "Dr. Smith",
      },
      reasonSnomedCode: "789012",
      reasonDisplay: "Type 2 Diabetes",
      reasonReference: {
        id: chiefComplaintData.id,
        type: "Condition",
        display: chiefComplaint,
      },
      dosageInstruction: [
        {
          text: item.notes,
          additionalInstruction: [
            {
              text: item.timing,
              coding: [
                {
                  code: "234567",
                  display: "With Food",
                  system: "http://snomed.info/sct",
                },
              ],
            },
          ],
          route: {
            text: "Oral route",
            coding: [
              {
                code: "26643006",
                display: "Oral administration",
                system: "http://snomed.info/sct",
              },
            ],
          },
          method: {
            text: "By mouth",
            coding: [
              {
                code: "123456",
                display: "By mouth",
                system: "http://snomed.info/sct",
              },
            ],
          },
        },
      ],
    },
    {
      headers: {
        Authorization: token,
        "ngrok-skip-browser-warning": "hgs",
      },
    }
  );

  const finalRes = await axios.post(
    `/v2/fhir/composition`,
    {
      compositionStatus: "PRELIMINARY",
      hiType: "DOCUMENT_REFERENCE",
      patient: {
        id: "107",
        type: "Patient", // Make sure this matches the enum value exactly
        display: "John Doe",
      },
      date: "2024-09-10T10:00:00Z",
      authors: [
        {
          id: "119",
          type: "Practitioner", // Again, ensure this matches the enum value
          display: "Dr. Smith",
        },
      ],
      sections: [
        {
          entries: [
            {
              id: chiefComplaintData.id,
              type: "Condition", // Enum match
              display: chiefComplaint,
            },
          ],
          title: "Chief Complaint",
          profile: "CHIEF_COMPLAINT",
        },
        {
          entries: [
            {
              id: res.data.id,
              type: "MedicationRequest", // Enum match
              display: item.drugName,
            },
          ],
          title: "Medications",
          profile: "MEDICATIONS",
        },
      ],
    },
    {
      headers: {
        Authorization: token,
        "ngrok-skip-browser-warning": "hgs",
      },
    }
  );
  console.log(finalRes, "finalRes");
  toast.success("Presciption Saved Successfully !");
  const element = contentRef.current;
  const opt = {
    margin: 6,
    filename: "prescription.pdf",
    image: { type: "jpeg", quality: 1 },
    html2canvas: { scale: 2, useCORS: true },
    jsPDF: {
      orientation: "p",
      unit: "mm",
      format: "a4",
      putOnlyUsedFonts: true,
      floatPrecision: 16, // or "smart", default is 16
    },
  };

  html2pdf().set(opt).from(element).save();
};

const useSaveFhir = (contentRef) => {
  const [isSaving, setIsSaving] = useState(false);
  const prescriptionData = useSelector((state) => state.prescriptionData);
  const {
    chiefComplaint = "",
    // complaints = [],
    // templateName = "",
    diagnosis = [],
    rxList = [
      {
        companyLingo: "",
        drugName: "",
        dose: "",
        measurement: "",
        timing: "",
        frequency: "",
        duration: "",
        notes: "",
      },
    ],
    // labInvestigations = [],
    // instructions = [],
    // lifeStyleRecommendations = [],
    // followUp = "",
    // followUpDate = "1945-07-02",
  } = prescriptionData;

  const token = localStorage.getItem("authToken");

  console.log(new Date(), "jp ka time aayega");

  const onSaveIntoFHIR = async () => {
    setIsSaving(true);
    try {
      // saving chief complaint

      const res1 = await axios.post(
        `/v2/fhir/condition`,
        {
          snomedCt: "44054006",
          display: chiefComplaint,
          patient: {
            id: "107",
            type: "Patient",
            display: "John Doe",
          },
          practitioner: {
            id: "119",
            type: "Practitioner",
            display: "Dr. Smith",
          },
        },
        {
          headers: {
            Authorization: token,
            "ngrok-skip-browser-warning": "hgs",
          },
        }
      );
      const chiefComplaintData = res1.data;

      // saving diagnosis

      const res2 = await axios.post(
        `/v2/fhir/encounter`,
        {
          status: "INPROGRESS",
          encounterClass: "AMBULATORY",
          patient: {
            id: "107",
            type: "Patient",
            display: "John Doe",
          },
          start: new Date(),
          end: new Date(),
          encounterDiagnoses: [
            {
              condition: {
                id: chiefComplaintData.id,
                type: "Condition", // Enum match
                display: diagnosis,
              },
              encounterDiagnosisUse: {
                text: "Diagnosis",
                encounterDiagnosisUseCodings: ["PRELIMINARY_DIAGNOSIS"],
              },
            },
          ],
        },
        {
          headers: {
            Authorization: token,
            "ngrok-skip-browser-warning": "hgs",
          },
        }
      );
      const diagnosisData = res2.data;

      // adding medication and

      rxList.forEach(async (item) => {
        await onSaveMedication(
          item,
          chiefComplaint,
          chiefComplaintData,
          contentRef
        );
      });
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
    setIsSaving(false);
  };

  return {
    onSaveIntoFHIR,
    isSaving,
  };
};

export default useSaveFhir;
