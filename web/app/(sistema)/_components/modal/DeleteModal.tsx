// src/components/DeleteConfirmationModal.tsx

import { config } from "@/assets/config/config";
import { useAuth } from "@/assets/context/AuthContext";
import axios from "axios";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";
import { Pagination } from "../interfaces/Pagination";

export interface DeleteOptionTypes {
  apiEndpoint: string;
  pagination: Pagination;
  totalItems: number;
}

interface DeleteConfirmationModalProps {
  description?: string;
  recordId: string;
  apiEndpoint: string;
  pagination: Pagination;
  totalItems: number;
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
  description,
  recordId,
  apiEndpoint,
  pagination,
  totalItems,
}) => {
  const { closeModal } = useAuth();

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const page = parseInt(searchParams.get("page") ?? "1") || 1;

  const [loading, setLoading] = useState<boolean>(false);

  const handleConfirmDelete = async () => {
    try {
      setLoading(true);
      const response = await axios.delete(
        `${config.API_URL}${apiEndpoint}/${recordId}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        toast.success(response.data.mensaje);
        const newTotalItems = totalItems - 1;
        const totalPagesAfterDelete = Math.ceil(
          newTotalItems / pagination.limit
        );

        if (page > totalPagesAfterDelete) {
          router.push(`${pathname}?page=${totalPagesAfterDelete}`);
        } else {
          const currentPath = `${pathname}?${searchParams.toString()}`;
          router.push(currentPath);
        }
        closeModal();
      }
    } catch (error) {
      setLoading(false);
      console.error("Error al eliminar:", error);
    }
  };

  return (
    <div className="z-50 flex items-center justify-center ">
      <div className="relative w-full max-w-md0">
        <div className="text-center">
          <svg
            className="mx-auto mb-4 text-red-500 w-14 h-14"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
          <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
            ¿Seguro que deseas eliminar este registro?
          </h3>
          <p className="mb-6 text-sm text-gray-500 dark:text-gray-300">
            {description ?? "No se podrá revertir esta acción"}
          </p>
          <div className="flex justify-center space-x-4">
            <button
              type="button"
              onClick={closeModal}
              className="px-5 py-2 text-sm font-medium text-gray-700 bg-white-main border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-600 dark:focus:ring-gray-600"
            >
              Cancelar
            </button>
            <button
              onClick={handleConfirmDelete}
              type="button"
              disabled={loading}
              className="px-5 py-2 text-sm font-medium text-white-main bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900"
            >
              {loading ? "Eliminando..." : "Sí, eliminar"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
