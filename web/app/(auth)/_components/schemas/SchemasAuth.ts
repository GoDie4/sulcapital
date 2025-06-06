import * as Yup from "yup";

export const SchemaRecuperarContrasena = Yup.object().shape({
  email: Yup.string()
    .email("Email invalido")
    .required("Este campo es requerido"),
});

export const SchemaCambiarContrasena = Yup.object().shape({
  password: Yup.string()
    .min(8, "Debe tener al menos 8 caracteres")
    .max(20, "Debe tener máximo 20 caracteres")
    .matches(/[A-Z]/, "Debe contener al menos una letra mayúscula")
    .matches(/[a-z]/, "Debe contener al menos una letra minúscula")
    .matches(/[0-9]/, "Debe contener al menos un número")
    .matches(
      /[@$!%*?&]/,
      "Debe contener al menos un carácter especial (@$!%*?&)"
    )
    .required("Este campo es requerido"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Las contraseñas no coinciden")
    .required("Este campo es requerido"),
});

export const SchemaEditarPerfil = Yup.object().shape({
  nombres: Yup.string()
    .min(2, "Debe tener al menos 2 caracteres")
    .max(50, "Debe tener máximo 50 caracteres")
    .required("Este campo es requerido"),

  apellidos: Yup.string()
    .min(2, "Debe tener al menos 2 caracteres")
    .max(50, "Debe tener máximo 50 caracteres")
    .nullable(),
  celular: Yup.string()
    .matches(/^[0-9]+$/, "Solo se permiten números")
    .min(7, "Debe tener al menos 7 dígitos")
    .max(15, "Debe tener máximo 15 dígitos")
    .required("Este campo es requerido"),
});
