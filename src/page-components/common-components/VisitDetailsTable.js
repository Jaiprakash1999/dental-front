import React, { useState } from "react";
import { ANS_VISIT_DETAILS_KEYS } from "../constants/Constant";

const VisitDetailsTable = ({ examinations, handleExamChange, existingExamsCount = 0 }) => {
  const addRow = () => {
    handleExamChange(examinations.length, 'new', {
        visitDate: "",
        ancCheckup: "",
        monthsOfPregnancy: "",
        complaints: "",
        weight: "",
        pallor: "",
        urinaryParams: "",
        temprature: "",
        pr: "",
        bp: "",
        sfhAgInCm: "",
        fhr: "",
        hb: "",
        scanEddReport: "",
        diagnosis: "",
        ironTablet: "",
        calciumTablet: "",
        neurocanForteTablet: "",
        ironSucroseDetails: "",
        referral: "",
    });
  };
  return (
    <div className="py-4">
      <h2 className="text-lg font-semibold mb-4">Visit Details & Follow-Up</h2>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 px-2 py-2 bg-[#F9FAFB]">Date</th>
            <th className="border border-gray-300 px-2 py-2 bg-[#F9FAFB]">ANC Checkup Done by MMU/IDO</th>
            <th className="border border-gray-300 px-2 py-2 bg-[#F9FAFB]">Months of Pregnancy</th>
            <th className="border border-gray-300 px-2 py-2 bg-[#F9FAFB]">Complaints</th>
            <th className="border border-gray-300 px-2 py-2 bg-[#F9FAFB]">Weight</th>
            <th className="border border-gray-300 px-2 py-2 bg-[#F9FAFB]">Pallor</th>
            <th className="border border-gray-300 px-2 py-2 bg-[#F9FAFB]">Pedal Ederma/ Urine/ Albumin/ Sugar</th>
            <th className="border border-gray-300 px-2 py-2 bg-[#F9FAFB]">Temperature</th>
            <th className="border border-gray-300 px-2 py-2 bg-[#F9FAFB]">PR</th>
            <th className="border border-gray-300 px-2 py-2 bg-[#F9FAFB]">BP</th>
            <th className="border border-gray-300 px-2 py-2 bg-[#F9FAFB]">SFH/AG in cm</th>
            <th className="border border-gray-300 px-2 py-2 bg-[#F9FAFB]">FHR</th>
            <th className="border border-gray-300 px-2 py-2 bg-[#F9FAFB]">HB</th>
            <th className="border border-gray-300 px-2 py-2 bg-[#F9FAFB]">Scan EOD & Report</th>
            <th className="border border-gray-300 px-2 py-2 bg-[#F9FAFB]">Diagnosis</th>
            <th className="border border-gray-300 px-2 py-2 bg-[#F9FAFB]">Iron Tablets</th>
            <th className="border border-gray-300 px-2 py-2 bg-[#F9FAFB]">Calcium Tablets</th>
            <th className="border border-gray-300 px-2 py-2 bg-[#F9FAFB]">Neurocan Forte Tablet</th>
            <th className="border border-gray-300 px-2 py-2 bg-[#F9FAFB]">Iron Surcose/ Date/ Place</th>
            <th className="border border-gray-300 px-2 py-2 bg-[#F9FAFB]">Referral</th>
          </tr>
        </thead>
        <tbody>
          {examinations.map((exam, index) => (
            <tr key={index}>
              {Object.keys(ANS_VISIT_DETAILS_KEYS).map((key) => (
                <td key={key} className="border border-gray-300 px-2 py-2">
                  <input
                    type={key.includes("Date") ? "date" : "text"}
                    value={exam[key] || ""}
                    onChange={(e) => handleExamChange(index, key, e.target.value)}
                    className="w-full border-none focus:outline-none"
                    readOnly={index < existingExamsCount}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <button
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        onClick={addRow}
      >
        Add Row
      </button>
    </div>
  );
};
export default VisitDetailsTable;
