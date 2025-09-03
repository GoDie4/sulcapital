import * as yup from "yup";

export const HabilitarPublicacionesSchema = yup.object({
  publicaciones_automaticas: yup.string().required("Es obligatorio"),
});
