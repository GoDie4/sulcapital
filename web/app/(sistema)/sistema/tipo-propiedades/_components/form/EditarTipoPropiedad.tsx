"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ButtonCancelar } from "@/components/form/ButtonCancelar";
import { ButtonSubmit } from "@/components/form/ButtonSubmit";
import { Errors } from "@/components/form/Errors";
import { InputForm } from "@/components/form/InputForm";
import UploadImages from "@/components/form/UploadImages";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { addTipoPropiedadSchema } from "../schemas/SchemasTipoPropiedad";
import { toast } from "sonner";
import axios from "axios";
import { config } from "@/assets/config/config";
import { AddTipoPropiedad } from "../interfaces/TipoPropiedadInterfaces";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/assets/context/AuthContext";

export const EditarTipoPropiedad = () => {
  const { rowEdit, closeModal } = useAuth();

  const [files, setFiles] = useState<(File | string)[]>([]);
  const [icono, setIcono] = useState<(File | string)[]>([]);

  const [loading, setLoading] = useState<boolean>(false);

  const searchParams = useSearchParams();

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

      const response = await axios.put(
        `${config.API_URL}/tipo_propiedades/editar/${rowEdit.id}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );
      console.log("RESPONSE: ", response);
      if (response.status === 200) {
        const currentPath = `${pathname}?${searchParams.toString()}`;
        router.push(currentPath);
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
    setValues,
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

  useEffect(() => {
    if (rowEdit !== null) {
      setFiles([rowEdit.imagen]);
      setIcono([rowEdit.icono]);
      setValues({ ...rowEdit });
    }
  }, [rowEdit, setValues, setFiles]);
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
              filesInit={[`${config.API_IMAGE_URL}${rowEdit.icono}`]}
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
              filesInit={[`${config.API_IMAGE_URL}${rowEdit.imagen}`]}
              maxFiles={1}
              maxHeight={768}
              maxWidth={550}
              maxSize={0.5 * 1024 * 1024}
              onChange={setFiles}
            />
          </div>
        </div>
        <div className="w-full flex flex-col md:flex-row gap-2 md:gap-4 items-center justify-center mt-6">
          <ButtonCancelar />
          <ButtonSubmit
            loading={loading}
            text="Editar"
            textLoading="Editando..."
          />
        </div>
      </form>
    </>
  );
};
