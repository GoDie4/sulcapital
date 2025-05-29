import * as Yup from "yup";

export const agregarCiudadSchema = Yup.object().shape({
  nombre: Yup.string().required("El nombre es obligatorio"),
  descripcion: Yup.string()
    .max(30, "La descripción no puede tener más de 30 caracteres")
    .required("La descripción es obligatoria"),
  coordenadas: Yup.string()
    .max(100, "Las coordenadas no pueden tener más de 100 caracteres")
    .required("Las coordenadas son obligatorias"),
});
