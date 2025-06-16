import * as yup from "yup";

export const empresaContactoSchema = yup.object({
  facebook: yup.string().url().nullable(),
  instagram: yup.string().url().nullable(),
  twitter: yup.string().url().nullable(),
  tiktok: yup.string().url().nullable(),
  youtube: yup.string().url().nullable(),
  linkedin: yup.string().url().nullable(),
  whatsapp: yup.string().url().nullable(),
  direccion: yup.string().required("La dirección es obligatoria"),
  horarios: yup.string().nullable(),
});
