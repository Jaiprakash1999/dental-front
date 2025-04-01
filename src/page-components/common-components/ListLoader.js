import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ListLoader = () => {
  return (
    <>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((_, index) => (
        <div
          key={index}
          className="flex gap-5 cursor-pointer w-full py-3 px-3 border-b text-sm text-gray-700"
        >
          <div className="w-[16%]">
            <Skeleton />
          </div>
          <div className="w-[16%]">
            <Skeleton />
          </div>
          <div className="w-[16%]">
            <Skeleton />
          </div>
          <div className="w-[16%]">
            <Skeleton />
          </div>
          <div className="w-[16%]">
            <Skeleton />
          </div>
          <div className="w-[16%]">
            <Skeleton />
          </div>
          <div className="w-[4%]">
            <Skeleton />
          </div>
        </div>
      ))}
    </>
  );
};

export default ListLoader;
