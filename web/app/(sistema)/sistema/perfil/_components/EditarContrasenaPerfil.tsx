/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import axios from "axios";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { CambiarContrasenaInterface } from "../../../../(auth)/_components/AuthInterfaces";
import { config } from "@/assets/config/config";
import { SchemaCambiarContrasena } from "../../../../(auth)/_components/schemas/SchemasAuth";
import { InputForm } from "@/components/form/InputForm";
import { Errors } from "@/components/form/Errors";
import { ButtonSubmit } from "@/components/form/ButtonSubmit";

export const FormEditarContrasena = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const cambiarContrasena = async (
    values: CambiarContrasenaInterface
  ): Promise<void> => {
    setLoading(true);

    const data = {
      newPassword: values.password,
    };

    try {
      const response = await axios.put(
        `${config.API_URL}/user/cambiarContrasena/logueado`,
        data,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        toast.success(response.data.message);
        router.push("/iniciar-sesion");
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
      password: "",
      confirmPassword: "",
    },
    validationSchema: SchemaCambiarContrasena,
    onSubmit: cambiarContrasena,
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
    <form className="w-full p-2 md:p-4" onSubmit={handleSubmit}>
      <div className="w-full space-y-6 mb-5">
        <div className="flex flex-col w-full gap-1 ">
          <InputForm
            label="Contraseña"
            name="password"
            onBlur={handleBlur}
            onChange={handleChange}
            placeholder="Escribe tu contraseña"
            type="password"
            value={values.password}
            className={`${
              errors.password && touched.password
                ? "border-red-500 focus:border-red-500"
                : " focus:border-secondary-main"
            }`}
          />
          {errors.password && errors.password !== "undefined" && (
            <Errors errors={errors.password} touched={touched.password} />
          )}
        </div>
        <div className="flex flex-col w-full gap-1 ">
          <InputForm
            label="Confirmar contraseña"
            name="confirmPassword"
            onBlur={handleBlur}
            onChange={handleChange}
            placeholder="Confirma tu contraseña"
            type="password"
            value={values.confirmPassword}
            className={`${
              errors.confirmPassword && touched.confirmPassword
                ? "border-red-500 focus:border-red-500"
                : " focus:border-secondary-main"
            }`}
          />
          {errors.confirmPassword && (
            <Errors
              errors={errors.confirmPassword}
              touched={touched.confirmPassword}
            />
          )}
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
