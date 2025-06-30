"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { config } from "@/assets/config/config";
import { useAuth } from "@/assets/context/AuthContext";
import { ButtonCancelar } from "@/components/form/ButtonCancelar";
import { ButtonSubmit } from "@/components/form/ButtonSubmit";
import { Errors } from "@/components/form/Errors";
import { InputForm } from "@/components/form/InputForm";
import axios from "axios";
import { useFormik } from "formik";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { Pagination } from "../../../../_components/interfaces/Pagination";
import UploadImages from "@/components/form/UploadImages";
import { AddBanner } from "../interfaces/BannerInterface";
import { addBannerSchema } from "../schemas/BannerSchemas";

export const AgregarBanner = ({
  pagination,
  totalItems,
}: {
  pagination: Pagination;
  totalItems: number;
}) => {
  const [files, setFiles] = useState<(File | string)[]>([]);

  const { closeModal } = useAuth();
  const [loading, setLoading] = useState<boolean>(false);

  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get("page") ?? "1") || 1;

  const router = useRouter();
  const pathname = usePathname();

  const AgregarBanner = async (values: AddBanner): Promise<void> => {
    setLoading(true);
    if (files.length === 0) {
      toast.error("Debes agregar una imagen para el banner");
      setLoading(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append("titulo", values.titulo);
      formData.append("descripcion", values.descripcion);
      formData.append("posicion", values.posicion);

      if (files.length > 0) {
        formData.append("imagen", files[0]);
      }

      const response = await axios.post(
        `${config.API_URL}/banners/agregar`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );
      if (response.status === 201) {
        const newTotalItems = totalItems + 1;
        const totalPagesAfterAdd = Math.ceil(newTotalItems / pagination.limit);

        if (page === pagination.totalPages && totalPagesAfterAdd > page) {
          router.push(`${pathname}?page=${page + 1}`);
        } else {
          const currentPath = `${pathname}?${searchParams.toString()}`;
          router.push(currentPath);
        }
        closeModal();
        toast.success(response.data.mensaje);
      }
    } catch (error: any) {
      console.log(error);
      console.log(error.message);

      toast.error(error.response ? error.response.data.message : error.message);
    } finally {
      setLoading(false);
    }
  };

  const {
    handleSubmit,
    handleChange,
    errors,
    values,
    touched,
    handleBlur,
    isSubmitting,
  } = useFormik({
    initialValues: {
      titulo: "",
      posicion: "",
      descripcion: "",
    },
    validationSchema: addBannerSchema,
    onSubmit: AgregarBanner,
  });

  useEffect(() => {
    if (errors && isSubmitting) {
      const firstErrorKey = Object.keys(errors)[0];
      const firstErrorElement = document.getElementsByName(firstErrorKey)[0];
      if (firstErrorElement) {
        firstErrorElement.focus();
      }
    }
  }, [touched, errors, isSubmitting]);
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="w-full mt-8 mb-12">
          <h2 className="text-3xl font-semibold text-secondary-main text-center">
            Agregar banner
          </h2>
        </div>
        <div className="w-full space-y-6">
          <div className="w-full flex flex-col md:flex-row gap-4 items-center">
            <div className="w-full lg:w-5/6">
              <InputForm
                label="Título"
                placeholder="Escriba el título"
                name="titulo"
                type="text"
                value={values.titulo}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`${
                  errors.titulo && touched.titulo
                    ? "!border-red-500 !focus:border-red-500"
                    : "border-secondary-main focus:border-secondary-main"
                }`}
              />
              <Errors errors={errors.titulo} touched={touched.titulo} />
            </div>
            <div className="w-full lg:w-1/6">
              <label
                htmlFor="posicion"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Posición
              </label>
              <select
                id="posicion"
                name="posicion"
                value={values.posicion}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full rounded-main border px-3 py-2 focus:outline-none transition ${
                  errors.posicion && touched.posicion
                    ? "border-red-500 focus:border-red-500"
                    : "border-secondary-main focus:border-secondary-main"
                }`}
              >
                <option value="">Selecciona una posición</option>
                {[1, 2, 3, 4, 5].map((pos) => (
                  <option key={pos} value={pos}>
                    {pos}
                  </option>
                ))}
              </select>
              <Errors errors={errors.posicion} touched={touched.posicion} />
            </div>
          </div>
          <div className="w-full flex flex-col md:flex-row gap-4 items-center">
            <div className="w-full">
              <InputForm
                label="Descripción"
                placeholder="Escriba la descripción"
                name="descripcion"
                type="text"
                value={values.descripcion}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`${
                  errors.descripcion && touched.descripcion
                    ? "!border-red-500 !focus:border-red-500"
                    : "border-secondary-main focus:border-secondary-main"
                }`}
              />
              <Errors
                errors={errors.descripcion}
                touched={touched.descripcion}
              />
            </div>
          </div>

          <div className="w-full">
            <label
              htmlFor=""
              className="flex gap-1 text-sm text-black-900 mb-1"
            >
              Imagen{" "}
            </label>
            <UploadImages
              maxFiles={1}
              maxHeight={1600}
              maxWidth={2000}
              maxSize={5 * 1024 * 1024}
              onChange={setFiles}
            />
          </div>
        </div>
        <div className="w-full flex flex-col md:flex-row gap-2 md:gap-4 items-center justify-center mt-6">
          <ButtonCancelar />
          <ButtonSubmit
            loading={loading}
            text="Agregar"
            textLoading="Agregando..."
          />
        </div>
      </form>
    </>
  );
};
