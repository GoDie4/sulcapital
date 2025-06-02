"use client";
/* eslint-disable @next/next/no-img-element */
import { config } from "@/assets/config/config";
import { ColumnDef } from "@tanstack/react-table";

export type Propiedad = {
  id: string;
  slug?: string;
  titulo: string;
  descripcionLarga: string;
  descripcionCorta?: string;
  direccion: string;
  precio: number;
  video?: string;
  coordenadas?: string;
  fondoPortada: {
    id: number;
    url: string;
  }[];
  disponibilidad: string;
  exclusivo: boolean;
  tipoPropiedad: {
    nombre: string;
  };
  ciudad: {
    nombre: string;
  };
  estado: string;
  createdAt: string;
  updatedAt: string;
  imagenes: {
    id: number;
    url: string;
  }[];
};

export const columnsPropiedad: ColumnDef<Propiedad>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "titulo",
    header: "Título",
  },
  {
    accessorKey: "precio",
    header: "Precio",
    cell: ({ row }) => <span>{String(row.getValue("precio"))}</span>,
  },
  {
    accessorKey: "tipo",
    header: "Tipo",
  },
  {
    accessorKey: "disponibilidad",
    header: "Disponibilidad",
  },
  {
    accessorKey: "exclusivo",
    header: "Exclusivo",
    cell: ({ row }) => <span>{row.getValue("exclusivo") ? "Sí" : "No"}</span>,
  },
  {
    accessorKey: "tipoPropiedad.nombre",
    header: "Tipo de Propiedad",
  },
  {
    accessorKey: "ciudad.nombre",
    header: "Ciudad",
  },
  {
    accessorKey: "estado",
    header: "Estado",
  },
  {
    accessorKey: "fondoPortada",
    header: "Portada",
    cell: ({ row }) => {
      const fondoPortadas = row.getValue("fondoPortada") as { url: string }[];

      return (
        <img
          src={`${config.API_IMAGE_URL}${fondoPortadas[0].url}`}
          alt={row.getValue("titulo")}
          className="h-12 w-12 object-cover rounded"
        />
      );
    },
  },
  {
    accessorKey: "imagenes",
    header: "Imágenes",
    cell: ({ row }) => {
      console.log(row.original);
      console.log(row.getValue("imagenes"));
      const imagenes = row.getValue("imagenes") as { url: string }[];
      return (
        <div className="flex gap-1">
          <img
            src={`${config.API_IMAGE_URL}${imagenes[0].url}`}
            alt={`Imagen`}
            className="h-10 w-10 object-cover rounded"
          />
        </div>
      );
    },
  },
];
