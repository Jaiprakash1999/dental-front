import React, { useState } from "react";

const Toggle = ({ onChange, name, value }) => {
  const [isChecked, setIsChecked] = useState(value);

  const handleToggle = () => {
    const newState = !isChecked;
    setIsChecked(newState);
    onChange(name, newState);
  };

  return (
    <div className="flex items-center">
      <label className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          checked={isChecked}
          onChange={handleToggle}
          className="sr-only peer"
        />
        <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-blue-600">
          <div
            className={`w-5 h-5 bg-white translate-y-0.5 rounded-full shadow-md transform transition-transform duration-300 ease-in-out ${
              isChecked ? "translate-x-5" : "translate-x-0.5"
            }`}
          ></div>
        </div>
      </label>
    </div>
  );
};

export default Toggle;
