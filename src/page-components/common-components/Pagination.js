import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { memo } from "react";
import { useTranslation } from "react-i18next";

const Pagination = ({
  currentPage = 1,
  setCurrentPage = () => {},
  totalRecords = 0,
  countsPerPage = 10,
}) => {
  const { t } = useTranslation();
  const totalPages = Math.ceil(totalRecords / countsPerPage);

  const startItem = (currentPage - 1) * 10 + 1;
  let endItem = startItem - 1 + countsPerPage;
  if (endItem > totalRecords) {
    endItem = totalRecords;
  }

  const handlePrev = () => {
    setCurrentPage((prev) => prev - 1);
  };

  const handleNext = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const handlePageClick = (page) => {
    if (typeof page === "number") {
      setCurrentPage(page);
    }
  };

  const generatePageNumbers = () => {
    const pages = [];

    if (totalPages <= 5) {
      // If total pages are 5 or less, display all pages
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        // If current page is near the beginning
        for (let i = 1; i <= 3; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        // If current page is near the end
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - 2; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        // If current page is somewhere in the middle
        pages.push(1);
        if (currentPage >= 4) {
          pages.push("...");
        }
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        if (totalPages - currentPage > 2) {
          pages.push("...");
        }
        pages.push(totalPages);
      }
    }
    return pages;
  };

  return (
    <div className="flex justify-between">
      <div className=" gap-1 text-sm text-[#111928 items-center flex">
        <span className="text-[#6B7280]"> {t("Showing")}</span>
        <span className="font-semibold">{startItem}</span>-
        <span className="font-semibold"> {endItem}</span>
        <span className="text-[#6B7280]"> {t("of")}</span>
        <span className="font-semibold"> {totalRecords}</span>
      </div>
      <div className="border rounded">
        <button
          className="border-r px-4 py-2 disabled:bg-[#E5E7EB]"
          disabled={currentPage === 1}
          onClick={handlePrev}
        >
          <FontAwesomeIcon icon={faAngleLeft} />
        </button>

        {generatePageNumbers().map((page, index) => (
          <button
            key={index}
            className={`border-r px-4 py-2 ${
              currentPage === page &&
              "font-semibold bg-[#E1EFFE] text-[#1C64F2]"
            }`}
            onClick={() => handlePageClick(page)}
          >
            {page}
          </button>
        ))}

        <button
          className="px-4 py-2 disabled:bg-[#E5E7EB]"
          disabled={totalPages === currentPage}
          onClick={handleNext}
        >
          <FontAwesomeIcon icon={faAngleRight} />
        </button>
      </div>
    </div>
  );
};

export default memo(Pagination);
