import * as Yup from "yup";

export interface EnviarConsulta {
  email: string;
  celular: string;
  dni: string;
  mensaje: string;
  nombre: string;
}

export const enviarConsultaSchema = Yup.object().shape({
  nombre: Yup.string().required("El nombre es obligatorio"),
  celular: Yup.string().required("Celular obligatorio"),
  dni: Yup.string().nullable(),
  mensaje: Yup.string().nullable(),
  email: Yup.string().required("El email es obligatorio"),
});
