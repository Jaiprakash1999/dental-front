import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useTranslation } from "react-i18next";

const SearchInput = ({
  inputValue = "",
  placeholder = "Search",
  onChange = () => {},
  icon = faMagnifyingGlass,
  required = false,
  name = "",
  autoFocus = false,
  onKeyDown = () => {},
  className = "focus:outline-none text-[#2D2E33] rounded-lg ps-10 pe-2 border placeholder:text-[#A2A3A7] border-[#D1D5DB] text-sm py-2 w-full focus:border-[#2D2E33]",
}) => {
  const { t } = useTranslation();
  return (
    <div className="flex items-center relative">
      <div className="absolute left-4">
        <FontAwesomeIcon icon={icon} color="#6B7280" />
      </div>
      <input
        value={inputValue}
        autoFocus={autoFocus}
        type="search"
        placeholder={t(placeholder)}
        onChange={onChange}
        required={required}
        name={name}
        onKeyDown={onKeyDown}
        className={className}
      />
    </div>
  );
};

export default SearchInput;
