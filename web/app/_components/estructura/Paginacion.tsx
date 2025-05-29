import React from "react";
import { GoChevronLeft } from "react-icons/go";
import { GoChevronRight } from "react-icons/go";
export const Paginacion = () => {
  return (
    <div className="flex items-center justify-center space-x-2 mt-8">
      <button
        type="button"
        className="px-3 py-1 rounded-full border border-gray-300 text-gray-600 hover:bg-gray-100"
      >
        <GoChevronLeft />
      </button>

      <button
        type="button"
        className="px-3 py-1 rounded-full border border-gray-300 text-gray-600 hover:bg-gray-100"
      >
        1
      </button>
      <button
        type="button"
        className="px-3 py-1 rounded-full border border-gray-300 text-gray-600 hover:bg-gray-100"
      >
        2
      </button>
      <button
        type="button"
        className="px-3 py-1 rounded-full border border-gray-300 text-gray-600 hover:bg-gray-100"
      >
        3
      </button>

      <span className="px-2 text-gray-400">...</span>

      <button
        type="button"
        className="px-3 py-1 rounded-full border border-gray-300 text-gray-600 hover:bg-gray-100"
      >
        8
      </button>
      <button
        type="button"
        className="px-3 py-1 rounded-full border border-gray-300 text-gray-600 hover:bg-gray-100"
      >
        9
      </button>
      <button
        type="button"
        className="px-3 py-1 rounded-full border border-gray-300 text-white-main bg-secondary-main"
      >
        10
      </button>

      <button
        type="button"
        className="px-3 py-1 rounded-full border border-gray-300 text-gray-600 hover:bg-gray-100"
      >
        <GoChevronRight />
      </button>
    </div>
  );
};
