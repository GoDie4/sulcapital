"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { GoChevronLeft, GoChevronRight } from "react-icons/go";

export const Paginacion = ({ url }: { url?: string }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const currentPage = Number(searchParams.get("page") || "1");

  const getPageUrl = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage.toString());
    return `${pathname}?${params.toString()}`;
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      router.push(`${getPageUrl(currentPage - 1)}`);
    }
  };

  const goToNextPage = () => {
    router.push(`${url ?? ""}${getPageUrl(currentPage + 1)}`);
  };

  return (
    <div className="flex items-center justify-center space-x-2 mt-8">
      <button
        type="button"
        onClick={goToPreviousPage}
        disabled={currentPage === 1}
        className="px-3 py-1 rounded-full border flex items-center gap-2 border-gray-300 text-gray-600 hover:bg-gray-100 disabled:opacity-50"
      >
        <GoChevronLeft />
        Anterior
      </button>

      <button
        type="button"
        onClick={goToNextPage}
        className="px-3 py-1 rounded-full border flex items-center gap-2 border-gray-300 hover:bg-secondary-main text-gray-600 transition-all duration-200 hover:text-white-main"
      >
        Siguiente
        <GoChevronRight />
      </button>
    </div>
  );
};
