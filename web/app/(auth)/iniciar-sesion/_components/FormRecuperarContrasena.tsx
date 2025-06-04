"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { config } from "@/assets/config/config";
import { ButtonSubmit } from "@/components/form/ButtonSubmit";
import { Errors } from "@/components/form/Errors";
import { InputForm } from "@/components/form/InputForm";
import axios from "axios";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { SchemaRecuperarContrasena } from "../../_components/schemas/SchemasAuth";
import { RecuperarContrasenaInteface } from "../../_components/AuthInterfaces";
import { ButtonCancelar } from "@/components/form/ButtonCancelar";

export const FormRecuperarContrasena = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [envioExitoso, setEnvioExitoso] = useState({
    mensaje: "",
    estado: false,
  });

  const recuperar = async (
    values: RecuperarContrasenaInteface
  ): Promise<void> => {
    setLoading(true);

    const data = {
      email: values.email,
    };

    try {
      const response = await axios.post(`${config.API_URL}/recuperar`, data, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      if (response.status === 200) {
        toast.success(response.data.message);
        setEnvioExitoso({
          mensaje: response.data.message,
          estado: true,
        });
      }
    } catch (error: any) {
      console.log(error);
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
      email: "",
    },
    validationSchema: SchemaRecuperarContrasena,
    onSubmit: recuperar,
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
      {envioExitoso.estado ? (
        <p className="text-center">{envioExitoso.mensaje}</p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col w-full gap-1">
            <InputForm
              label="Correo electrónico"
              name="email"
              onBlur={handleBlur}
              onChange={handleChange}
              placeholder="Escribe tu correo electrónico"
              type="email"
              value={values.email}
              className={`${
                errors.email && touched.email
                  ? "border-red-500 focus:border-red-500"
                  : "border-secondary-main focus:border-secondary-main"
              }`}
            />
            {errors.email && (
              <Errors errors={errors.email} touched={touched.email} />
            )}
          </div>
          <div className="w-full flex flex-col lg:flex-row gap-4">
            <ButtonCancelar />
            <ButtonSubmit
              loading={loading}
              text="Enviar"
              textLoading="Enviando..."
            />
          </div>
        </form>
      )}
    </>
  );
};
