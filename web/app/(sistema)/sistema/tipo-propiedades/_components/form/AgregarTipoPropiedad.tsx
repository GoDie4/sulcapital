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
import { AddTipoPropiedad } from "../interfaces/TipoPropiedadInterfaces";
import { addTipoPropiedadSchema } from "../schemas/SchemasTipoPropiedad";
import UploadImages from "@/components/form/UploadImages";

export const AgregarTipoPropiedad = ({
  pagination,
  totalItems,
}: {
  pagination: Pagination;
  totalItems: number;
}) => {
  const [files, setFiles] = useState<(File | string)[]>([]);
  const [icono, setIcono] = useState<(File | string)[]>([]);

  const { closeModal } = useAuth();
  const [loading, setLoading] = useState<boolean>(false);

  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get("page") ?? "1") || 1;

  const router = useRouter();
  const pathname = usePathname();

  const AgregarTipoPropiedad = async (
    values: AddTipoPropiedad
  ): Promise<void> => {
    setLoading(true);
    if (files.length === 0) {
      toast.error("Debes agregar una imagen para el tipo de propiedad");
      setLoading(false);
      return;
    }
    if (icono.length === 0) {
        toast.error("Debes agregar un icono para el tipo de propiedad");
        setLoading(false);
        return;
      }
    try {
      const formData = new FormData();
      formData.append("nombre", values.nombre);
      if (icono.length > 0) {
        formData.append("icono", icono[0]);
      }
      if (files.length > 0) {
        formData.append("imagen", files[0]);
      }

      const response = await axios.post(
        `${config.API_URL}/tipo_propiedades/agregar`,
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
      nombre: "",
    },
    validationSchema: addTipoPropiedadSchema,
    onSubmit: AgregarTipoPropiedad,
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
            Agregar tipo de propiedad
          </h2>
        </div>
        <div className="w-full space-y-6">
          <div className="w-full flex flex-col md:flex-row gap-4 items-center">
            <div className="w-full">
              <InputForm
                label="Nombre"
                placeholder="Escriba el nombre"
                name="nombre"
                type="text"
                value={values.nombre}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`${
                  errors.nombre && touched.nombre
                    ? "!border-red-500 !focus:border-red-500"
                    : "border-secondary-main focus:border-secondary-main"
                }`}
              />
              <Errors errors={errors.nombre} touched={touched.nombre} />
            </div>
          </div>

          <div className="w-full">
            <label
              htmlFor=""
              className="flex gap-1 text-sm text-black-900 mb-1"
            >
              Icono{" "}
            </label>
            <UploadImages
              maxFiles={1}
              maxHeight={64}
              maxWidth={64}
              maxSize={0.08 * 1024 * 1024}
              onChange={setIcono}
            />
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
              maxHeight={1024}
              maxWidth={1024}
              maxSize={0.5 * 1024 * 1024}
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
