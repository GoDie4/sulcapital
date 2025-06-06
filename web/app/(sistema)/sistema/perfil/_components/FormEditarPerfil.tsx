/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useAuth } from "@/assets/context/AuthContext";
import axios from "axios";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { UserInterfaceEdit } from "../../../../(auth)/_components/AuthInterfaces";
import { config } from "@/assets/config/config";
import { SchemaEditarPerfil } from "../../../../(auth)/_components/schemas/SchemasAuth";
import { InputForm } from "@/components/form/InputForm";
import { Errors } from "@/components/form/Errors";
import { ButtonSubmit } from "@/components/form/ButtonSubmit";

export const FormEditarPerfil = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { authUser } = useAuth();

  const procesarActualizacion = async (
    values: UserInterfaceEdit
  ): Promise<void> => {
    setLoading(true);

    const data = {
      nombres: values.nombres,
      apellidos: values.apellidos,
      celular: values.celular,
    };

    try {
      const response = await axios.put(
        `${config.API_URL}/user/editarPerfil`,
        data,
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        toast.success(response.data.message);
      }
    } catch (error: any) {
      console.log(error);
      toast.error("Error al actualizar usuario");
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
      nombres: "",
      apellidos: "",
      celular: "",
      email: "",
    },
    validationSchema: SchemaEditarPerfil,
    onSubmit: procesarActualizacion,
  });

  useEffect(() => {
    if (authUser) {
      setValues(() => ({
        ...values,
        nombres: authUser.nombres || "",
        apellidos: authUser.apellidos || "",
        celular: authUser.celular || "",
        email: authUser.email || "",
      }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authUser]);

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
    <form className="w-full p-2 md:p-4" onSubmit={handleSubmit}>
      <div className="w-full space-y-5 mb-8">
        <div className="w-full flex flex-col md:flex-row gap-4">
          <div className="w-full md:w-1/2">
            <InputForm
              label="Nombres"
              name="nombres"
              placeholder="Nombres"
              type="text"
              value={values.nombres}
              onBlur={handleBlur}
              onChange={handleChange}
              className={`${
                errors.nombres && touched.nombres
                  ? "border-red-500 focus:border-red-500"
                  : "border-secondary-main focus:border-secondary-main"
              }`}
            />
            {errors.nombres && (
              <Errors errors={errors.nombres} touched={touched.nombres} />
            )}
          </div>
          <div className="w-full md:w-1/2">
            <InputForm
              label="Apellidos"
              name="apellidos"
              placeholder="Apellidos"
              type="text"
              value={values.apellidos}
              onBlur={handleBlur}
              onChange={handleChange}
              className={`${
                errors.apellidos && touched.apellidos
                  ? "border-red-500 focus:border-red-500"
                  : "border-secondary-main focus:border-secondary-main"
              }`}
            />
            {errors.apellidos && (
              <Errors errors={errors.apellidos} touched={touched.apellidos} />
            )}
          </div>
        </div>
        <div className="w-full flex flex-col md:flex-row gap-4 ">
          <div className="w-full md:w-1/2">
            <InputForm
              label="Correo electrónico"
              name="email"
              placeholder="Correo electrónico"
              type="text"
              disabled
              value={values.email}
              onBlur={handleBlur}
              onChange={handleChange}
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
          <div className="w-full md:w-1/2">
            <InputForm
              label="Celular"
              name="celular"
              placeholder="Celular"
              type="text"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.celular}
              className={`${
                errors.celular && touched.celular
                  ? "border-red-500 focus:border-red-500"
                  : "border-secondary-main focus:border-secondary-main"
              }`}
            />
            {errors.celular && (
              <Errors errors={errors.celular} touched={touched.celular} />
            )}
          </div>
        </div>
      </div>
      <ButtonSubmit
        loading={loading}
        text="Actualizar"
        textLoading="Actualizando..."
        className="!w-full"
      />
    </form>
  );
};
