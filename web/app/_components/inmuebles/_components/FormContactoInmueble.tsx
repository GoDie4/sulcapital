"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAuth } from "@/assets/context/AuthContext";
import React, { useEffect, useState } from "react";
import { BsEnvelope, BsWhatsapp } from "react-icons/bs";
import axios from "axios";
import { config } from "@/assets/config/config";
import { toast } from "sonner";
import {
  EnviarConsulta,
  enviarConsultaSchema,
} from "./schemas/EnviarConsultaSchemas";
import { useFormik } from "formik";
import { InputForm } from "@/components/form/InputForm";
import { Errors } from "@/components/form/Errors";
import { TextareaForm } from "@/components/form/TextArea";
import { usePathname, useRouter } from "next/navigation";

export const FormContactoInmueble = ({
  idPropiedad,
}: {
  idPropiedad: string;
}) => {
  const { authUser } = useAuth();

  const router = useRouter();
  const path = usePathname();

  const [loading, setLoading] = useState<boolean>(false);

  const enviarConsulta = async (values: EnviarConsulta): Promise<void> => {
    setLoading(true);
    if (!authUser || authUser === undefined) {
      router.push("/iniciar-sesion");
      return;
    }

    try {
      const response = await axios.post(
        `${config.API_URL}/propiedades/enviarConsulta`,
        {
          idPropiedad: idPropiedad,
          celular: values.celular,
          mensaje: `Hola deseo que se comuniquen conmigo por este inmueble ${config.DOMAIN}${path}`,
          nombres: values.nombre,
          dni: values.dni,
          email: values.email,
        },
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        toast.success(response.data.mensaje);
        resetForm()
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
    setFieldValue,
    touched,
    handleBlur,
    resetForm,
    isSubmitting,
  } = useFormik({
    initialValues: {
      nombre: "",
      email: "",
      celular: "",
      mensaje: "",
      dni: "",
    },
    validationSchema: enviarConsultaSchema,
    onSubmit: enviarConsulta,
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
    setFieldValue("email", authUser?.email ?? null);
    setFieldValue("celular", authUser?.celular ?? null);
    setFieldValue("nombres", authUser?.nombres ?? null);
    setFieldValue(
      "mensaje",
      `Hola deseo que se comuniquen conmigo por este inmueble`
    );
  }, [authUser, path, setFieldValue]);

  const sendWhatsAppMessage = ({
    phoneNumber,
    message,
  }: {
    phoneNumber: string;
    message: string;
  }) => {
    if (!phoneNumber || !message) {
      console.error("Faltan datos para enviar el mensaje de WhatsApp.");
      return;
    }

    const encodedMessage = encodeURIComponent(message);
    const cleanedNumber = phoneNumber.replace(/\D/g, ""); // elimina caracteres no numéricos

    const url = `https://wa.me/${cleanedNumber}?text=${encodedMessage}`;
    window.open(url, "_blank");
  };

  const consultarPorWhatsapp = () => {
    if (!authUser || authUser === undefined) {
      router.push("/iniciar-sesion");
      return;
    }
    sendWhatsAppMessage({
      phoneNumber: "+51953528808",
      message: `Hola deseo que se comuniquen conmigo por este inmueble ${config.DOMAIN}${path}`,
    });
  };
  return (
    <div className="rounded-main border bg-secondary-main border-secondary-main/40 flex justify-center p-4">
      <div className=" p-2 sm:p-3 w-full max-w-lg">
        <h2 className="text-xlfont-medium font-TypographBold text-white-main mb-6">
          Déjanos tus datos para contactarte
        </h2>

        <form onSubmit={handleSubmit}>
          {/* Email Field */}
          <div className="mb-5">
            <InputForm
              label="Email"
              name="email"
              type="email"
              value={values.email}
              className=""
              onBlur={handleBlur}
              labelClassName="!text-white-main"
              onChange={handleChange}
              placeholder="Escribe tu correo"
            />
            <Errors errors={errors.email} touched={touched.email} />
          </div>

          {/* Name and Phone Fields */}
          <div className="flex flex-col sm:flex-row gap-4 mb-5">
            <div className="flex-1">
              <InputForm
                label="Nombres"
                name="nombre"
                type="text"
                value={values.nombre}
                onBlur={handleBlur}
                labelClassName="!text-white-main"
                onChange={handleChange}
                placeholder="Escribe tu nombre"
              />
              <Errors errors={errors.nombre} touched={touched.nombre} />
            </div>
            <div className="flex-1">
              <InputForm
                label="Celular"
                name="celular"
                type="text"
                value={values.celular}
                onBlur={handleBlur}
                labelClassName="!text-white-main"
                onChange={handleChange}
                placeholder="Escribe tu celular"
              />
              <Errors errors={errors.celular} touched={touched.celular} />
            </div>
          </div>

          {/* DNI Field */}
          <div className="mb-5">
            <InputForm
              label="DNI"
              name="dni"
              type="text"
              value={values.dni}
              onBlur={handleBlur}
              labelClassName="!text-white-main"
              onChange={handleChange}
              placeholder="Escribe tu dni"
            />
            <Errors errors={errors.dni} touched={touched.dni} />
          </div>

          {/* Unit of Interest Dropdown */}
          {/* <div className="mb-5">
            <select
              id="unidad-interes"
              className="w-full p-3 border border-gray-300 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            >
              <option value="">Selecciona la unidad de interés</option>
              <option value="apartamento">Apartamento</option>
              <option value="casa">Casa</option>
              <option value="local">Local Comercial</option>
            </select>
          </div> */}

          {/* Message Textarea */}
          <div className="mb-6">
            <TextareaForm
              placeholder="Mensaje"
              className="w-full p-3 border border-gray-300 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px] resize-y"
              label="Mensaje"
              name="mensaje"
              value={values.mensaje}
              onBlur={handleBlur}
              labelClassName="!text-white-main"
              onChange={handleChange}
            />
            <Errors errors={errors.mensaje} touched={touched.mensaje} />
          </div>

          {/* Checkboxes */}
          {/* <div className="mb-4 flex items-start">
            <input
              type="checkbox"
              id="acepto-terminos"
              className="form-checkbox h-5 w-5 text-green-600 border-gray-300 rounded focus:ring-green-500 mt-1 mr-2"
              defaultChecked // O checked si lo manejas con estado
              required
            />
            <label
              htmlFor="acepto-terminos"
              className="text-sm text-gray-700 leading-tight"
            >
              Acepto los{" "}
              <a href="#" className="text-blue-600 hover:underline">
                Términos y Condiciones de Uso
              </a>
              , y las{" "}
              <a href="#" className="text-blue-600 hover:underline">
                políticas de privacidad
              </a>
              .
            </label>
          </div>

          <div className="mb-6 flex items-start">
            <input
              type="checkbox"
              id="autorizo-informacion"
              className="form-checkbox h-5 w-5 text-green-600 border-gray-300 rounded focus:ring-green-500 mt-1 mr-2"
              defaultChecked // O checked si lo manejas con estado
            />
            <label
              htmlFor="autorizo-informacion"
              className="text-sm text-gray-700 leading-tight"
            >
              Autorizo el uso de mi información para{" "}
              <a href="#" className="text-blue-600 hover:underline">
                fines adicionales
              </a>
            </label>
          </div> */}

          {/* Buttons */}
          <div className="flex flex-col gap-4">
            <button
              type={loading ? "button" : "submit"}
              className="bg-primary-main hover:bg-primary-700 text-white-main font-medium py-3 px-6 rounded-main flex gap-2 items-center justify-center transition-colors duration-200"
            >
              <BsEnvelope />
              {loading ? "Enviando..." : "Contactar"}
            </button>
            <button
              type={"button"}
              onClick={consultarPorWhatsapp}
              className="bg-secondary-700 hover:bg-secondary-800 text-white-main font-medium py-3 px-6 rounded-main flex gap-2 items-center justify-center transition-colors duration-200"
            >
              <BsWhatsapp />
              Contactar por WhatsApp
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
