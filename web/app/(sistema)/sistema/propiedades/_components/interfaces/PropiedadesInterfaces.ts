export interface AddPropiedad {
  titulo: string;
  descripcionLarga: string;
  descripcionCorta?: string;
  direccion: string;
  precio: number;
  video?: string;
  coordenadas?: string;
  disponibilidad: disponibilidadPropiedad;
  exclusivo?: string;
  tipoPropiedadId: string;
  ciudadId: string;
  estado: estadoPropiedad;
  Imagenes?: { url: string }[];
}

type estadoPropiedad = "EN_REVISION" | "PUBLICADO" | "RECHAZADO" | "OCULTO";
type disponibilidadPropiedad = "EN_COMPRA" | "EN_VENTA" | "EN_ALQUILER" | "";

interface listaDisponibilidadPropiedades {
  value: disponibilidadPropiedad;
  nombre: string;
}

export interface CambiarEstado {
  estado: estadoPropiedad;
  mensaje: string;
}

export const disponibilidadPropiedades: listaDisponibilidadPropiedades[] = [
  {
    value: "",
    nombre: "Seleccionar",
  },
  {
    value: "EN_VENTA",
    nombre: "Venta",
  },
  {
    value: "EN_COMPRA",
    nombre: "Compra",
  },

  {
    value: "EN_ALQUILER",
    nombre: "Alquiler",
  },
];
