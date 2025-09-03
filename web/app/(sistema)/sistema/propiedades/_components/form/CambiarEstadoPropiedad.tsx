/* eslint-disable @typescript-eslint/no-explicit-any */
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { CambiarEstado } from "../interfaces/PropiedadesInterfaces";
import { config } from "@/assets/config/config";
import axios from "axios";
import { useAuth } from "@/assets/context/AuthContext";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { Errors } from "@/components/form/Errors";
import { CambiarEstadoSchema } from "../schemas/PropiedadesSchemas";
import { ButtonCancelar } from "@/components/form/ButtonCancelar";
import { ButtonSubmit } from "@/components/form/ButtonSubmit";
import { TextareaForm } from "@/components/form/TextArea";

export const CambiarEstadoPropiedad = ({ rowEdit }: { rowEdit: any }) => {
  const { closeModal } = useAuth();

  const [loading, setLoading] = useState<boolean>(false);
  const searchParams = useSearchParams();

  const router = useRouter();
  const pathname = usePathname();
  const EditarEstado = async (values: CambiarEstado): Promise<void> => {
    setLoading(true);

    try {
      const response = await axios.put(
        `${config.API_URL}/propiedades/cambiarEstado/${String(rowEdit.id)}`,
        values,
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
    setValues,
    setFieldValue,
    touched,
    handleBlur,
  } = useFormik({
    initialValues: {
      estado: "EN_REVISION",
      mensaje: "",
    },
    validationSchema: CambiarEstadoSchema,
    onSubmit: EditarEstado,
  });

  useEffect(() => {
    if (rowEdit !== null) {
      setValues({ ...rowEdit });
    }
  }, [rowEdit, setValues, setFieldValue]);
  return (
    <>
      <form onSubmit={handleSubmit} className="w-full space-y-4">
        <h2 className="text-xl font-bold text-gray-800">
          Cambiar estado de la propiedad:
        </h2>
        <p className="text-sm text-gray-600">
          {rowEdit?.direccion || "Propiedad sin dirección"}
        </p>

        <div>
          <label className="font-medium">Estado</label>
          <select
            name="estado"
            value={values.estado}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`w-full p-2 rounded border ${
              errors.estado && touched.estado
                ? "border-red-500"
                : "border-gray-300"
            }`}
          >
            <option value="">Seleccionar</option>
            <option value="PUBLICADO">Aprobar</option>
            <option value="RECHAZADO">Rechazar</option>
            <option value="OCULTO">Ocultar</option>
          </select>
          {errors.estado && touched.estado && (
            <Errors errors={errors.estado} touched={touched.estado} />
          )}
        </div>

        <div>
          <TextareaForm
            label="Mensaje (opcional)"
            name="mensaje"
            value={values.mensaje}
            onChange={handleChange}
            onBlur={handleBlur}
            rows={4}
            className="w-full p-2 border rounded border-gray-300"
            placeholder="Escribe un comentario sobre la decisión"
          />
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
