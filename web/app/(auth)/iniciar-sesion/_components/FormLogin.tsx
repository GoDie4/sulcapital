/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { InputForm } from "@/components/form/InputForm";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaEnvelope } from "react-icons/fa";
import { MdLock } from "react-icons/md";
import { LoginInterface } from "../../_components/AuthInterfaces";
import axios from "axios";
import { config } from "@/assets/config/config";
import { toast } from "sonner";
import { useFormik } from "formik";
import { SchemaLogin } from "../../_components/AuthSchemas";
import { Errors } from "@/components/form/Errors";
import { RecuperarContrasena } from "./RecuperarContrasena";
import { useAuth } from "@/assets/context/AuthContext";
import { GoogleLogin } from "@react-oauth/google";
import { FacebookLoginButton } from "../../_components/buttons/LoginFacebook";

export const FormLogin = () => {
  const { setModalContent, openModal, setAuthUser } = useAuth();
  const [loading, setLoading] = useState<boolean>(false);
  const [mantenerConexion, setMantenerConexion] = useState<boolean>(false);

  const router = useRouter();

  const searchParams = new URLSearchParams(window.location.search);
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const login = async (values: LoginInterface): Promise<void> => {
    setLoading(true);

    const data = {
      email: values.email,
      password: values.password,
      mantenerConexion: mantenerConexion,
    };

    try {
      const response = await axios.post(`${config.API_URL}/login`, data, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      if (response.status === 200) {
        setAuthUser(response.data.usuario);
        if (response.data.usuario.rol_id === 2) {
            router.push('/')
        } else if (response.data.usuario.rol_id === 3) {
          router.push(callbackUrl);
        } else {
          router.push(callbackUrl);
        }
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
    },
    validationSchema: SchemaLogin,
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
      <div className="space-y-2">
        <div className="relative">
          <FaEnvelope className="absolute left-3 bottom-4 z-10 h-4 w-4 text-gray-400" />
          <InputForm
            name="email"
            type="email"
            placeholder="tu@email.com"
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
          <MdLock className="absolute left-3 bottom-4 z-10 h-4 w-4 text-gray-400" />
          <InputForm
            name="password"
            type={"password"}
            placeholder="Tu contraseña"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`pl-10 ${
              errors.password && touched.password
                ? "border-red-500 focus:border-red-500"
                : "border-secondary-main focus:border-secondary-main"
            }`}
            label="Contraseña"
          />
        </div>
        {errors.password && (
          <Errors errors={errors.password} touched={touched.password} />
        )}
      </div>

      <div className="flex items-center justify-between">
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={mantenerConexion}
            onChange={() => {
              setMantenerConexion(!mantenerConexion);
            }}
            className="h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary"
          />
          <span className="ml-2 text-sm text-gray-600">Recordarme</span>
        </label>
        <button
          type="button"
          onClick={() => {
            setModalContent(<RecuperarContrasena />);
            openModal();
          }}
          className="text-sm text-secondary-700 hover:text-secondary-800 transition-colors"
        >
          ¿Olvidaste tu contraseña?
        </button>
      </div>

      <button
        type="submit"
        className="w-full h-12 bg-primary-main hover:bg-primary-700 text-white-main rounded-main font-medium transition-all duration-200 transform hover:scale-[1.02]"
        disabled={loading}
      >
        {loading ? (
          <div className="flex items-center justify-center space-x-2">
            <div className="w-4 h-4 border-2 border-white-main border-t-transparent rounded-full animate-spin"></div>
            <span>Iniciando sesión...</span>
          </div>
        ) : (
          "Iniciar Sesión"
        )}
      </button>

      <div className="w-full flex flex-col md:flex-row gap-5">
        <div className="w-full md:w-1/2">
          <GoogleLogin
            onSuccess={async (credentialResponse) => {
              if (!credentialResponse.credential) {
                toast.error("Error al iniciar sesión con Google");
                return;
              }

              try {
                const res = await axios.post(
                  `${config.API_URL}/auth/google`,
                  {
                    id_token: credentialResponse.credential,
                    rol: "",
                  },
                  {
                    withCredentials: true,
                  }
                );

                if (res.status === 200) {
                  setAuthUser(res.data.usuario);
                  toast.success("Sesión iniciada con Google");

                  console.log("DATA: ", res.data.usuario.rol_id);

                  if (res.data.usuario.rol_id === 2) {
                    router.push("/sistema/propiedades");
                  } else if (res.data.usuario.rol_id === 3) {
                    router.push("/sistema/favoritos");
                  } else {
                    router.push("/sistema");
                  }
                }
              } catch (err: any) {
                console.log(err);
                toast.error(
                  err.response?.data?.message || "Error al iniciar sesión"
                );
              }
            }}
            onError={() => {
              toast.error("Error en autenticación con Google");
            }}
          />
        </div>
        <div className="w-full md:w-1/2">
          <FacebookLoginButton rol="CLIENTE" />
        </div>
      </div>
    </form>
  );
};
