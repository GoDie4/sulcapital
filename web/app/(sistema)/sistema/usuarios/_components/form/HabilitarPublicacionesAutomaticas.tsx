/* eslint-disable @typescript-eslint/no-explicit-any */
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { config } from "@/assets/config/config";
import axios from "axios";
import { useAuth } from "@/assets/context/AuthContext";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { Errors } from "@/components/form/Errors";
import { ButtonCancelar } from "@/components/form/ButtonCancelar";
import { ButtonSubmit } from "@/components/form/ButtonSubmit";
import { HabilitaPublicaciones } from "../interfaces/HabilitarPublicacionesInterfaces";
import { HabilitarPublicacionesSchema } from "../schemas/HabilitarPublicacionesSchemas";

export const HabilitarPublicacionesAutomaticas = ({
  rowEdit,
}: {
  rowEdit: any;
}) => {
  const { closeModal } = useAuth();

  const [loading, setLoading] = useState<boolean>(false);
  const searchParams = useSearchParams();

  const router = useRouter();
  const pathname = usePathname();
  const EditarEstado = async (values: HabilitaPublicaciones): Promise<void> => {
    setLoading(true);

    try {
      const response = await axios.post(
        `${config.API_URL}/user/publicaciones-automaticas`,
        { valor: values.publicaciones_automaticas, id: rowEdit.id },
        {
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
    setFieldValue,
    touched,
    handleBlur,
  } = useFormik({
    initialValues: {
      publicaciones_automaticas: "",
    },
    validationSchema: HabilitarPublicacionesSchema,
    onSubmit: EditarEstado,
  });

  useEffect(() => {
    if (rowEdit) {
      setFieldValue(
        "publicaciones_automaticas",
        rowEdit.publicaciones_automaticas === true ? "si" : "no"
      );
    }
  }, [rowEdit, setFieldValue]);
  return (
    <>
      <form onSubmit={handleSubmit} className="w-full space-y-4">
        <h2 className="text-xl font-bold text-gray-800">
          Habilitar publicaciones automaticas para el usuario {rowEdit.nombres}
        </h2>

        <div>
          <label className="font-medium">Habilitar publicaciones</label>
          <select
            name="publicaciones_automaticas"
            value={values.publicaciones_automaticas}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`w-full p-2 rounded border ${
              errors.publicaciones_automaticas &&
              touched.publicaciones_automaticas
                ? "border-red-500"
                : "border-gray-300"
            }`}
          >
            <option value="">Seleccionar</option>
            <option value="si">Habilitar</option>
            <option value="no">No habilitar</option>
          </select>
          {errors.publicaciones_automaticas &&
            touched.publicaciones_automaticas && (
              <Errors
                errors={errors.publicaciones_automaticas}
                touched={touched.publicaciones_automaticas}
              />
            )}
        </div>

        <div className="flex gap-4">
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
