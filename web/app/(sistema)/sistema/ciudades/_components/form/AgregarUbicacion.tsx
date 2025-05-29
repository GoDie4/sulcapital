/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { ButtonCancelar } from "@/components/form/ButtonCancelar";
import { ButtonSubmit } from "@/components/form/ButtonSubmit";
import { InputForm } from "@/components/form/InputForm";
import UploadImages from "@/components/form/UploadImages";
import React, { useEffect, useState } from "react";
import { agregarCiudadSchema } from "../schemas/CiudadesSchemas";
import { useFormik } from "formik";
import { toast } from "sonner";
import axios from "axios";
import { config } from "@/assets/config/config";
import { Ciudad } from "../interfaces/CiudadesInterfaces";
import { Errors } from "@/components/form/Errors";
import { useAuth } from "@/assets/context/AuthContext";

export const AgregarUbicacion = () => {
  const [files, setFiles] = useState<File[]>([]);
  const { closeModal } = useAuth();
  const [loading, setLoading] = useState<boolean>(false);

  const agregarCiudad = async (values: Ciudad): Promise<void> => {
    setLoading(true);
    if (files.length === 0) {
      toast.error("Debes agregar una imagen para la ciudad");
      setLoading(false);
      return;
    }
    try {
      console.log("FILES: ", files);
      const formData = new FormData();
      formData.append("nombre", values.nombre);
      formData.append("descripcion", values.descripcion);
      formData.append("coordenadas", values.coordenadas);
      if (files.length > 0) {
        formData.append("imagen", files[0]);
      }

      const response = await axios.post(
        `${config.API_URL}/ciudades/agregar`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );
      if (response.status === 201) {
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
      descripcion: "",
      coordenadas: "",
    },
    validationSchema: agregarCiudadSchema,
    onSubmit: agregarCiudad,
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
    <form onSubmit={handleSubmit}>
      <div className="w-full mt-8 mb-12">
        <h2 className="text-3xl font-semibold text-secondary-main text-center">
          Agregar ciudad
        </h2>
      </div>
      <div className="w-full space-y-6">
        <div className="w-full flex flex-col md:flex-row gap-4 items-center">
          <div className="w-full md:w-1/2">
            <InputForm
              label="Nombre de la ciudad"
              placeholder="Escriba el nombre de la ciudad"
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
          <div className="w-full md:w-1/2">
            <InputForm
              label="Coordenadas de Google Maps"
              name="coordenadas"
              placeholder="Pegar coordenadas"
              type="text"
              value={values.coordenadas}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`${
                errors.coordenadas && touched.coordenadas
                  ? "!border-red-500 !focus:border-red-500"
                  : "border-secondary-main focus:border-secondary-main"
              }`}
            />
            <Errors errors={errors.coordenadas} touched={touched.coordenadas} />
          </div>
        </div>
        <div className="w-full">
          <InputForm
            label="Descripción de la ciudad"
            name="descripcion"
            placeholder="Escriba una descripción (Máx. 30 caracteres)"
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
          <Errors errors={errors.descripcion} touched={touched.descripcion} />
        </div>
        <div className="w-full">
          <UploadImages
            maxFiles={1}
            maxHeight={120}
            maxWidth={120}
            maxSize={2 * 1024 * 1024}
            onChange={setFiles}
          />
          <p className="mt-4">Seleccionaste {files.length} archivo(s).</p>
        </div>
      </div>
      <div className="w-full flex flex-col md:flex-row gap-2 md:gap-4 items-center justify-center mt-6">
        <ButtonCancelar />
        <ButtonSubmit
          loading={loading}
          text="Agregar ciudad"
          textLoading="Agregando ciudad..."
        />
      </div>
    </form>
  );
};
