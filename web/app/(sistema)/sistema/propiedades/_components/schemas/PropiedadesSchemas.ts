import * as yup from "yup";

export const addPropiedadSchema = yup.object({
  titulo: yup.string().required("El título es obligatorio"),
  descripcionCorta: yup.string().optional(),
  direccion: yup.string().required("La dirección es obligatoria"),
  precio: yup
    .number()
    .required("El precio es obligatorio")
    .positive("El precio debe ser positivo"),
  video: yup.string().url("Debe ser una URL válida").optional(),
  coordenadas: yup.string().optional(),
  disponibilidad: yup
    .mixed<"EN_COMPRA" | "EN_VENTA" | "EN_ALQUILER">()
    .oneOf(["EN_COMPRA", "EN_VENTA", "EN_ALQUILER"], "Disponibilidad inválida")
    .required("Campo obligatorio"),
  exclusivo: yup.string().optional(),
  tipoPropiedadId: yup.string().required("El tipo de propiedad es obligatorio"),
  ciudadId: yup.string().required("La ciudad es obligatoria"),
  estado: yup
    .mixed<"EN_REVISION" | "PUBLICADO" | "RECHAZADO" | "OCULTO">()
    .oneOf(
      ["EN_REVISION", "PUBLICADO", "RECHAZADO", "OCULTO"],
      "Estado inválido"
    )
    .required("El estado es obligatorio"),
});
