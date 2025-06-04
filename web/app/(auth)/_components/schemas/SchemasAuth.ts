import * as Yup from "yup";

export const SchemaRecuperarContrasena = Yup.object().shape({
  email: Yup.string()
    .email("Email invalido")
    .required("Este campo es requerido"),
});
