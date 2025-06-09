/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { config } from "@/assets/config/config";
import { useAuth } from "@/assets/context/AuthContext";
import { Errors } from "@/components/form/Errors";
import { InputForm } from "@/components/form/InputForm";
import UploadImages from "@/components/form/UploadImages";
import axios from "axios";
import { useFormik } from "formik";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  AddPropiedad,
  disponibilidadPropiedades,
} from "../interfaces/PropiedadesInterfaces";
import { addPropiedadSchema } from "../schemas/PropiedadesSchemas";
import { ButtonCancelar } from "@/components/form/ButtonCancelar";
import { ButtonSubmit } from "@/components/form/ButtonSubmit";
import { CiudadList } from "../../../ciudades/_components/interfaces/CiudadesInterfaces";
import { SelectForm } from "@/components/form/SelectForm";
import { TipoPropiedad } from "../../../tipo-propiedades/_components/table/ColumnasTipoPropiedad";
import RichTextEditor from "@/components/form/TextEditor";
import { TextareaForm } from "@/components/form/TextArea";

export const EditarPropiedad = () => {
  const { closeModal, authUser, rowEdit } = useAuth();

  const [portada, setPortada] = useState<(File | string)[]>([]);
  const [imagenes, setImagenes] = useState<(File | string)[]>([]);

  const [loading, setLoading] = useState<boolean>(false);
  const [loadCiudades, setLoadCiudades] = useState<boolean>(false);
  const [loadTipoPropiedades, setLoadTipoPropiedades] =
    useState<boolean>(false);

  const [ciudades, setCiudades] = useState<CiudadList[]>([]);
  const [tiposPropiedades, setTipoPropiedades] = useState<TipoPropiedad[]>([]);

  const [descripcion, setDescripcion] = useState("");

  const urlsImagenes: string[] = rowEdit.imagenes.map(
    (img: any) => `${config.API_IMAGE_URL}${img.url}`
  );

  const urlsPortadas: string[] = rowEdit.fondoPortada.map(
    (img: any) => `${config.API_IMAGE_URL}${img.url}`
  );

  const searchParams = useSearchParams();

  const router = useRouter();
  const pathname = usePathname();

  const AgregarPropiedad = async (values: AddPropiedad): Promise<void> => {
    setLoading(true);
    if (rowEdit.imagenes.length === 0 && imagenes.length === 0) {
      toast.error("Debes agregar al menos una imagen de tu propiedad");
      setLoading(false);
      return;
    }
    if (rowEdit.fondoPortada.length === 0 && portada.length === 0) {
      toast.error("Debes agregar un icono para el tipo de propiedad");
      setLoading(false);
      return;
    }
    try {
      const formData = new FormData();
      formData.append("titulo", values.titulo);
      formData.append("descripcionLarga", JSON.stringify(descripcion));
      if (values.descripcionCorta) {
        formData.append("descripcionCorta", values.descripcionCorta);
      }
      formData.append("direccion", values.direccion);
      formData.append("precio", String(values.precio));
      if (values.video) {
        formData.append("video", values.video);
      }
      if (values.coordenadas) {
        formData.append("coordenadas", values.coordenadas);
      }
      formData.append("disponibilidad", values.disponibilidad);
      formData.append("exclusivo", String(values.exclusivo ?? false));
      formData.append("tipoPropiedadId", values.tipoPropiedadId);
      formData.append("ciudadId", String(values.ciudadId));
      formData.append("estado", values.estado);
      formData.append("idUser", String(authUser?.id));

      if (portada.length > 0) {
        formData.append("fondoPortada", portada[0]);
      }
      if (imagenes.length > 0) {
        imagenes.forEach((file) => {
          formData.append("imagenes", file);
        });
      }

      const response = await axios.put(
        `${config.API_URL}/propiedades/editar/${String(rowEdit.id)}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );
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
    setFieldValue,
    touched,
    handleBlur,
    isSubmitting,
  } = useFormik({
    initialValues: {
      titulo: "",
      ciudadId: "",
      descripcionLarga: "",
      direccion: "",
      disponibilidad: "",
      estado: "EN_REVISION",
      precio: 0,
      tipoPropiedadId: "",
      coordenadas: "",
      descripcionCorta: "",
      exclusivo: "",
      video: "",
    },
    validationSchema: addPropiedadSchema,
    onSubmit: AgregarPropiedad,
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
    const getCiudades = async () => {
      try {
        setLoadCiudades(true);
        const response = await axios.get(`${config.API_URL}/ciudades`);
        setCiudades(response.data.data);
      } catch (error: any) {
        toast.error(
          "No se pudo traer las ciudades, consulta con el soporte técnico"
        );
        console.log("No se pudo traer las ciudades: ", error);
      } finally {
        setLoadCiudades(false);
      }
    };

    const getTipoPropiedades = async () => {
      try {
        setLoadTipoPropiedades(true);
        const response = await axios.get(`${config.API_URL}/tipo_propiedades`);
        setTipoPropiedades(response.data.data);
      } catch (error: any) {
        toast.error(
          "No se pudo traer los tipos de propiedades, consulta con el soporte técnico"
        );
        console.log("No se pudo traer los tipos de propiedades: ", error);
      } finally {
        setLoadTipoPropiedades(false);
      }
    };

    getCiudades();
    getTipoPropiedades();
  }, []);

  useEffect(() => {
    if (rowEdit !== null) {
      setFieldValue("exclusivo", rowEdit.exclusivo === 1 ? "si" : "no");
      setValues({ ...rowEdit });
    }
  }, [rowEdit, setValues, setFieldValue]);


  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="w-full mt-8 mb-12">
          <h2 className="text-3xl font-semibold text-secondary-main text-center">
            Editar propiedad
          </h2>
        </div>
        <div className="w-full space-y-6">
          <div className="w-full flex flex-wrap space-y-4 justify-between items-start">
            <div
              className={`w-full  ${
                authUser?.rol_id === 1 ? "lg:w-[49%]" : "lg:w-[32%]"
              }`}
            >
              <InputForm
                label="Título"
                placeholder="Escriba el titulo"
                name="titulo"
                type="text"
                value={values.titulo}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`${
                  errors.titulo && touched.titulo
                    ? "!border-red-500 !focus:border-red-500"
                    : "border-secondary-main focus:border-secondary-main"
                }`}
              />
              <Errors errors={errors.titulo} touched={touched.titulo} />
            </div>
            <div
              className={`w-full  ${
                authUser?.rol_id === 1 ? "lg:w-[49%]" : "lg:w-[32%]"
              }`}
            >
              <SelectForm
                label="Ciudad"
                name="ciudadId"
                onChange={handleChange}
                onBlur={handleBlur}
                load={loadCiudades}
                options={ciudades}
                value={values.ciudadId}
                className={` border w-full placeholder:text-sm focus:border-secondary-main outline-none  rounded-main p-2 ${
                  errors.ciudadId && touched.ciudadId
                    ? "border-red-500 focus:border-red-500"
                    : "border-secondary-main focus:border-secondary-main"
                }`}
              />
              <Errors errors={errors.ciudadId} touched={touched.ciudadId} />
            </div>
            <div
              className={`w-full  ${
                authUser?.rol_id === 1 ? "lg:w-[49%]" : "lg:w-[32%]"
              }`}
            >
              <SelectForm
                label="Tipo de propiedad"
                name="tipoPropiedadId"
                onChange={handleChange}
                onBlur={handleBlur}
                load={loadTipoPropiedades}
                options={tiposPropiedades}
                value={values.tipoPropiedadId}
                className={` border w-full placeholder:text-sm focus:border-secondary-main outline-none  rounded-main p-2 ${
                  errors.tipoPropiedadId && touched.tipoPropiedadId
                    ? "border-red-500 focus:border-red-500"
                    : "border-secondary-main focus:border-secondary-main"
                }`}
              />
              <Errors
                errors={errors.tipoPropiedadId}
                touched={touched.tipoPropiedadId}
              />
            </div>
            {authUser?.rol_id === 1 && (
              <div className="w-full lg:w-[49%]">
                <div className="w-full">
                  <label className="text-black-800 font-bold">
                    APROBAR PUBLICACIÓN
                  </label>
                  <select
                    name="estado"
                    id=""
                    value={values.estado}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={` border w-full placeholder:text-sm focus:border-secondary-main outline-none  rounded-main p-2 ${
                      errors.estado && touched.estado
                        ? "border-red-500 focus:border-red-500"
                        : "border-secondary-main focus:border-secondary-main"
                    }`}
                  >
                    <option value={""}>Selecionar</option>
                    <option value="PUBLICADO">Aprobar</option>
                    <option value="RECHAZADO">Rechazar</option>
                    <option value="OCULTO">Ocultar</option>
                  </select>
                  {errors.estado && (
                    <Errors errors={errors.estado} touched={touched.estado} />
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="w-full">
            <RichTextEditor
              label="Descripción"
              initialValue={descripcion}
              onChange={setDescripcion}
            />
          </div>
          <div className="w-full flex flex-col md:flex-row gap-4">
            <div className="w-full lg:w-1/2  space-y-4">
              <div className="w-full flex flex-col md:flex-row gap-4 ">
                <div
                  className={`w-full  ${
                    authUser?.rol_id === 1 ? "md:w-1/3" : "md:w-1/2"
                  }`}
                >
                  <InputForm
                    label="Precio"
                    placeholder="Escriba el precio"
                    name="precio"
                    type="number"
                    value={values.precio}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`${
                      errors.precio && touched.precio
                        ? "!border-red-500 !focus:border-red-500"
                        : "border-secondary-main focus:border-secondary-main"
                    }`}
                  />
                  <Errors errors={errors.precio} touched={touched.precio} />
                </div>
                <div
                  className={`w-full  ${
                    authUser?.rol_id === 1 ? "md:w-1/3" : "md:w-1/2"
                  }`}
                >
                  <div className="w-full">
                    <label className="text-black-800">Disponibilidad</label>
                    <select
                      name="disponibilidad"
                      id=""
                      value={values.disponibilidad}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={` border w-full placeholder:text-sm focus:border-secondary-main outline-none  rounded-main p-2 ${
                        errors.disponibilidad && touched.disponibilidad
                          ? "border-red-500 focus:border-red-500"
                          : "border-secondary-main focus:border-secondary-main"
                      }`}
                    >
                      {disponibilidadPropiedades.map((item, index: number) => (
                        <option value={item.value} key={index}>
                          {item.nombre}
                        </option>
                      ))}
                    </select>
                    {errors.disponibilidad && (
                      <Errors
                        errors={errors.disponibilidad}
                        touched={touched.disponibilidad}
                      />
                    )}
                  </div>
                </div>
                {authUser?.rol_id === 1 && (
                  <div className="w-full md:w-1/3">
                    <div className="w-full">
                      <label className="text-black-800">Exclusivo</label>
                      <select
                        name="exclusivo"
                        id=""
                        value={values.exclusivo}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={` border w-full placeholder:text-sm focus:border-secondary-main outline-none  rounded-main p-2 ${
                          errors.exclusivo && touched.exclusivo
                            ? "border-red-500 focus:border-red-500"
                            : "border-secondary-main focus:border-secondary-main"
                        }`}
                      >
                        <option value={""}>Selecionar</option>
                        <option value="si">Sí</option>
                        <option value="no">No</option>
                      </select>
                      {errors.exclusivo && (
                        <Errors
                          errors={errors.exclusivo}
                          touched={touched.exclusivo}
                        />
                      )}
                    </div>
                  </div>
                )}
              </div>
              <div className="w-full">
                <InputForm
                  label="Dirección"
                  placeholder="Escriba la dirección de la propiedad"
                  name="direccion"
                  type="text"
                  value={values.direccion}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`${
                    errors.direccion && touched.direccion
                      ? "!border-red-500 !focus:border-red-500"
                      : "border-secondary-main focus:border-secondary-main"
                  }`}
                />
                <Errors errors={errors.direccion} touched={touched.direccion} />
              </div>
            </div>
            <div className="w-full lg:w-1/2">
              <TextareaForm
                label="Descripción corta"
                name="descripcionCorta"
                value={values.descripcionCorta ?? ""}
                onBlur={handleBlur}
                onChange={handleChange}
                placeholder="Descripción corta"
                className={` border w-full placeholder:text-sm focus:border-secondary-main outline-none  rounded-main p-2 ${
                  errors.descripcionCorta && touched.descripcionCorta
                    ? "border-red-500 focus:border-red-500"
                    : "border-secondary-main focus:border-secondary-main"
                }`}
              />
              <Errors
                errors={errors.descripcionCorta}
                touched={touched.descripcionCorta}
              />
            </div>
          </div>
          <div className="w-full flex flex-col md:flex-row gap-4">
            <div className="w-full lg:w-1/2">
              <InputForm
                label="Coordenadas del mapa (Opcional)"
                placeholder="Pegue las coordenadas"
                name="coordenadas"
                type="text"
                value={values.coordenadas ?? ""}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`${
                  errors.coordenadas && touched.coordenadas
                    ? "!border-red-500 !focus:border-red-500"
                    : "border-secondary-main focus:border-secondary-main"
                }`}
              />
              <Errors
                errors={errors.coordenadas}
                touched={touched.coordenadas}
              />
            </div>
            <div className="w-full lg:w-1/2">
              <InputForm
                label="Enlace de Youtube (Opcional)"
                placeholder="Pegue las coordenadas"
                name="video"
                type="text"
                value={values.video ?? ""}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`${
                  errors.video && touched.video
                    ? "!border-red-500 !focus:border-red-500"
                    : "border-secondary-main focus:border-secondary-main"
                }`}
              />
              <Errors errors={errors.video} touched={touched.video} />
            </div>
          </div>

          <div className="w-full">
            <label
              htmlFor=""
              className="flex gap-1 text-sm text-black-900 mb-1"
            >
              Imagenes{" "}
            </label>
            <UploadImages
              maxFiles={6}
              maxHeight={2048}
              maxWidth={2560}
              maxSize={1 * 1024 * 1024}
              onChange={setImagenes}
              filesInit={urlsImagenes}
            />
          </div>

          <div className="w-full">
            <label
              htmlFor=""
              className="flex gap-1 text-sm text-black-900 mb-1"
            >
              Portada{" "}
            </label>
            <UploadImages
              filesInit={urlsPortadas}
              maxFiles={3}
              maxHeight={1024}
              maxWidth={1024}
              maxSize={0.5 * 1024 * 1024}
              onChange={setPortada}
            />
          </div>
        </div>
        <div className="w-full flex flex-col-reverse md:flex-row gap-2 md:gap-4 items-center justify-center mt-6">
          <ButtonCancelar />
          <ButtonSubmit
            loading={loading}
            text="Editar propiedad"
            textLoading="Editando..."
          />
        </div>
      </form>
    </>
  );
};
