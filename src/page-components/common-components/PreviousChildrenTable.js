import React, { useState } from "react";

const PreviousChildrenTable = ({ examinations, handleExamChange, existingExamsCount = 0 }) => {
  const addRow = () => {
    handleExamChange(examinations.length, 'new', {
      name:"",
    });
  };
  return (
    <div className="py-4">
      <table className="min-w-[40%] border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 px-2 py-2 bg-[#F9FAFB]">Name</th>
          </tr>
        </thead>
        <tbody>
          {examinations.map((exam, index) => (
            <tr key={index}>
           
              <td className="border border-gray-300 px-2 py-2">
                <input
                  type="text"
                  value={exam.name}
                  onChange={(e) => handleExamChange(index, 'name', e.target.value)}
                  className="w-full border-none focus:outline-none"
                  readOnly={index < existingExamsCount}
                />
              </td>
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
export default PreviousChildrenTable;
