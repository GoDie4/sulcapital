/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { InputForm } from "@/components/form/InputForm";
import React, { useEffect, useState } from "react";
import { FaEnvelope, FaLock, FaPhone, FaUser } from "react-icons/fa";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import axios from "axios";
import { config } from "@/assets/config/config";
import { toast } from "sonner";
import { registerSchema } from "../../_components/AuthSchemas";
import { RegisterInterface } from "../../_components/AuthInterfaces";
import { Errors } from "@/components/form/Errors";

export const FormRegistro = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();

  const login = async (values: RegisterInterface): Promise<void> => {
    setLoading(true);

    const data = {
      email: values.email,
      password: values.password,
      nombres: values.nombres,
      apellidos: values.apellidos,
      celular: values.celular,
      rol: values.rol,
    };

    try {
      const response = await axios.post(`${config.API_URL}/registro`, data, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      if (response.status === 200) {
        router.push("/sistema");

        toast.success(response.data.message);
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
      email: "",
      password: "",
      confirmPassword: "",
      apellidos: "",
      celular: "",
      nombres: "",
      rol: "",
    },
    validationSchema: registerSchema,
    onSubmit: login,
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
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <div className="relative">
            <FaUser className="absolute left-3 bottom-4 z-10 h-4 w-4 text-gray-400" />
            <InputForm
              name="nombres"
              type="text"
              placeholder="Juan"
              value={values.nombres}
              onChange={handleChange}
              onBlur={handleBlur}
              label="Nombres"
              className={`pl-10 ${
                errors.nombres && touched.nombres
                  ? "border-red-500 focus:border-red-500"
                  : "border-secondary-main focus:border-secondary-main"
              }`}
            />
          </div>
          {errors.nombres && (
            <Errors errors={errors.nombres} touched={touched.nombres} />
          )}
        </div>

        <div className="space-y-2">
          <div className="relative">
            <InputForm
              label="Apellidos"
              name="apellidos"
              type="text"
              placeholder="Pérez"
              value={values.apellidos}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`pl-10 ${
                errors.apellidos && touched.apellidos
                  ? "border-red-500 focus:border-red-500"
                  : "border-secondary-main focus:border-secondary-main"
              }`}
            />
          </div>
          {errors.apellidos && (
            <Errors errors={errors.apellidos} touched={touched.apellidos} />
          )}
        </div>
      </div>

      <div className="space-y-2">
        <div className="relative">
          <FaEnvelope className="absolute left-3 bottom-4 z-10 h-4 w-4 text-gray-400" />
          <InputForm
            name="email"
            type="email"
            placeholder="juan@email.com"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`pl-10 ${
              errors.email && touched.email
                ? "border-red-500 focus:border-red-500"
                : "border-secondary-main focus:border-secondary-main"
            }`}
            label="Email"
          />
        </div>
        {errors.email && (
          <Errors errors={errors.email} touched={touched.email} />
        )}
      </div>

      <div className="space-y-2">
        <div className="relative">
          <FaPhone className="absolute left-3 bottom-4 z-10 h-4 w-4 text-gray-400" />
          <InputForm
            name="celular"
            label="Celular"
            type="tel"
            placeholder="+34 600 000 000"
            value={values.celular}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`pl-10  ${
              errors.celular && touched.celular
                ? "border-red-500 focus:border-red-500"
                : "border-secondary-main focus:border-secondary-main"
            }`}
          />
        </div>
        {errors.celular && (
          <Errors errors={errors.celular} touched={touched.celular} />
        )}
      </div>
      <div className="w-full">
        <label className="text-black-800">¿Qué quieres realizar?</label>
        <select
          name="rol"
          id=""
          value={values.rol}
          onChange={handleChange}
          onBlur={handleBlur}
          className={` border w-full placeholder:text-sm focus:border-secondary-main outline-none  rounded-main p-2 ${
            errors.rol && touched.rol
              ? "border-red-500 focus:border-red-500"
              : "border-secondary-main focus:border-secondary-main"
          }`}
        >
          <option value="">Selecciona una opción</option>
          <option value="ANUNCIANTE">Publicar mis inmuebles</option>
          <option value="CLIENTE">Comprar o alquilar inmuebles</option>
        </select>
        {errors.rol && <Errors errors={errors.rol} touched={touched.rol} />}
      </div>

      <div className="space-y-2">
        <div className="relative">
          <FaLock className="absolute left-3 bottom-4 z-10 h-4 w-4 text-gray-400" />
          <InputForm
            label="Contraseña"
            name="password"
            type={"password"}
            placeholder="Mínimo 8 caracteres"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            className="pl-10 pr-12 h-12 border-gray-200 focus:border-primary focus:ring-primary"
          />
        </div>
        {errors.password && (
          <Errors errors={errors.password} touched={touched.password} />
        )}
      </div>

      <div className="space-y-2">
        <div className="relative">
          <FaLock className="absolute left-3 bottom-4 z-10 h-4 w-4 text-gray-400" />
          <InputForm
            label="Repite tu contraseña"
            name="confirmPassword"
            type={"password"}
            placeholder="Repite tu contraseña"
            value={values.confirmPassword}
            onChange={handleChange}
            onBlur={handleBlur}
            className="pl-10 pr-12 h-12 border-gray-200 focus:border-primary focus:ring-primary"
          />
        </div>
        {errors.confirmPassword && (
          <Errors
            errors={errors.confirmPassword}
            touched={touched.confirmPassword}
          />
        )}
      </div>

      <button
        type="submit"
        className="w-full h-12 bg-primary-main rounded-main text-white-main hover:bg-primary-700 text-white font-medium transition-all duration-200 transform hover:scale-[1.02]"
        disabled={loading}
      >
        {loading ? (
          <div className="flex items-center justify-center space-x-2">
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            <span>Creando cuenta...</span>
          </div>
        ) : (
          "Crear Cuenta"
        )}
      </button>
    </form>
  );
};
