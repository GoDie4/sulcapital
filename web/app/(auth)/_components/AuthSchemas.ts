import * as yup from "yup";

export const registerSchema = yup.object().shape({
  nombres: yup
    .string()
    .max(255, "Máximo 255 caracteres")
    .required("Los nombres son requeridos"),
  apellidos: yup
    .string()
    .max(255, "Máximo 255 caracteres")
    .required("Los apellidos son requeridos"),
  rol: yup.string().required("Es necesario este campo"),
  email: yup
    .string()
    .email("Correo inválido")
    .max(255, "Máximo 255 caracteres")
    .required("El correo es requerido"),
  celular: yup
    .string()
    .max(20, "Máximo 20 caracteres")
    .required("El número de celular es requerido"),
  password: yup
    .string()
    .min(8, "La contraseña debe tener al menos 8 caracteres")
    .required("La contraseña es requerida"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Las contraseñas deben coincidir")
    .required("La confirmación es requerida"),
});

export default registerSchema;

export const SchemaLogin = yup.object().shape({
  email: yup
    .string()
    .email("Email invalido")
    .required("Este campo es requerido"),
  password: yup
    .string()
    .required("Este campo es requerido")
    .min(8, "No cumple con el mínimo de caracteres"),
});
