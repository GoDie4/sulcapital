import * as yup from "yup";

export const addBannerSchema = yup.object().shape({
  titulo: yup
    .string()
    .required("El título es obligatorio")
    .max(100, "El título no puede superar los 100 caracteres"),
  descripcion: yup
    .string()
    .required("El título es obligatorio")
    .max(100, "El título no puede superar los 100 caracteres"),
  posicion: yup.string().required("La posición es obligatoria"),
});
