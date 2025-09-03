import * as yup from "yup";

export const addTipoPropiedadSchema = yup.object().shape({
  nombre: yup
    .string()
    .required("El nombre es obligatorio")
    .max(100, "El nombre no puede superar los 100 caracteres"),
 
});
