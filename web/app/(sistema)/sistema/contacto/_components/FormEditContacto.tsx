/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { config } from "@/assets/config/config";
import { Errors } from "@/components/form/Errors";
import { InputForm } from "@/components/form/InputForm";
import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { toast } from "sonner";
import Numeros, { NumerosItem } from "./Numeros";
import Correos, { CorreosItem } from "./Correos";
import { ButtonCancelar } from "@/components/form/ButtonCancelar";
import { ButtonSubmit } from "@/components/form/ButtonSubmit";
import { empresaContactoSchema } from "./SchemasContacto";
type Props = {
  initialData: any | null;
};
export const FormEditContacto = ({ initialData }: Props) => {
  const [load, setLoading] = useState<boolean>(false);
  const [numeros, setNumeros] = useState<NumerosItem[]>(() =>
    initialData?.TelefonoEmpresa?.length
      ? initialData.TelefonoEmpresa.map((tel: any, i: number) => ({
          numero: tel.numero,
          position: Number(tel.posicion?.replace(/\D/g, "")) || i + 1,
        }))
      : [{ numero: "", position: 1 }]
  );

  const [correos, setCorreos] = useState<CorreosItem[]>(() =>
    initialData?.CorreoEmpresa?.length
      ? initialData.CorreoEmpresa.map((c: any, i: number) => ({
          correo: c.email,
          position: Number(c.posicion?.replace(/\D/g, "")) || i + 1,
        }))
      : [{ correo: "", position: 1 }]
  );
  const upadateBanner = async (): Promise<void> => {
    if (correos.length < 1 || numeros.length < 1) {
      toast.error("Correos o números al menos debe tener 1 registro");
      setLoading(false);
      return;
    }

    if (correos[0].correo === "" || correos[0].correo === null) {
      toast.error("El correo no puede estar vacío");
      setLoading(false);
      return;
    }

    if (numeros[0].numero === "" || numeros[0].numero === null) {
      toast.error("El número no puede estar vacío");
      setLoading(false);
      return;
    }
    setLoading(true);
    const payload = {
      ...values,
      correos: correos.map((c) => ({
        email: c.correo,
        posicion: `${c.position}`,
      })),
      telefonos: numeros.map((n) => ({
        numero: n.numero,
        posicion: `${n.position}`,
      })),
    };
    try {
      const respuesta = await axios.post(
        `${config.API_URL}/contacto`,
        payload,
        { withCredentials: true }
      );

      if (respuesta.status === 200) {
        toast.success("Actualizado correctamente");
      }
    } catch (error) {
      console.log(error);
      toast.error("Error");
    }
    setLoading(false);
  };

  const { handleSubmit, handleChange, errors, values, touched, handleBlur } =
    useFormik({
      initialValues: {
        direccion: initialData?.direccion || "",
        horarios: initialData?.horarios || "",
        facebook: initialData?.facebook || "",
        instagram: initialData?.instagram || "",
        twiter: initialData?.twitter || "",
        linkedin: initialData?.linkedin || "",
        youtube: initialData?.youtube || "",
        tiktok: initialData?.tiktok || "",
        whatsapp: initialData?.whatsapp || "",
      },
      validationSchema: empresaContactoSchema,
      onSubmit: upadateBanner,
    });

  return (
    <form className="rounded-xl" onSubmit={handleSubmit}>
      <section className="w-full flex flex-col  gap-2">
        <Numeros numeros={numeros} setNumeros={setNumeros} />
      </section>

      <section className="w-full flex flex-col gap-2">
        <Correos correos={correos} setCorreos={setCorreos} />
      </section>

      <section className="w-full flex flex-col gap-2">
        <div className="w-full">
          <InputForm
            label="Direccion"
            name="direccion"
            onBlur={handleBlur}
            onChange={handleChange}
            type="text"
            value={values.direccion}
          />
          <Errors errors={errors.direccion} touched={touched.direccion} />
        </div>
      </section>

      <h2 className="text-secondary-main text-lg font-bold mb-4 mt-8 text-left font-TypographBold">
        Url Redes
      </h2>
      <div className="w-full lg:relative mb-5">
        <InputForm
          label="Facebook"
          name="facebook"
          type="text"
          value={values.facebook}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <Errors errors={errors.facebook} touched={touched.facebook} />
      </div>
      <div className="w-full lg:relative mb-5">
        <InputForm
          label="Instagram"
          name="instagram"
          type="text"
          value={values.instagram}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <Errors errors={errors.instagram} touched={touched.instagram} />
      </div>

      <div className="w-full lg:relative mb-5">
        <InputForm
          label="Tiktok"
          name="tiktok"
          type="text"
          value={values.tiktok}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <Errors errors={errors.tiktok} touched={touched.tiktok} />
      </div>

      <div className="w-full lg:relative mb-5">
        <InputForm
          name="youtube"
          label="Youtube"
          type="text"
          value={values.youtube}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <Errors errors={errors.youtube} touched={touched.youtube} />
      </div>

      <div className="w-full lg:relative mb-5">
        <InputForm
          name="whatsapp"
          label="Whatsapp"
          type="text"
          value={values.whatsapp}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <Errors errors={errors.whatsapp} touched={touched.whatsapp} />
      </div>

      <div className="w-full flex flex-col justify-center md:flex-row gap-5">
        <ButtonCancelar />
        <ButtonSubmit
          loading={load}
          text="Actualizar"
          textLoading="Actualizando"
        />
      </div>
    </form>
  );
};
