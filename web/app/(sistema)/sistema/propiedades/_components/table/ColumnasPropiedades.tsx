"use client";
/* eslint-disable @next/next/no-img-element */
import { config } from "@/assets/config/config";
import { ColumnDef } from "@tanstack/react-table";

export type Propiedad = {
  id: string;
  slug?: string;
  favorito?: boolean;
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
  //   {
  //     accessorKey: "id",
  //     header: "ID",
  //   },
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
    accessorKey: "disponibilidad",
    header: "Disponibilidad",
    cell: ({ row }) => {
      const value = row.getValue("disponibilidad");

      const map: Record<string, { label: string; color: string }> = {
        EN_COMPRA: { label: "Compra", color: "text-green-600 bg-green-100" },
        EN_VENTA: { label: "Venta", color: "text-blue-600 bg-blue-100" },
        EN_ALQUILER: {
          label: "Alquiler",
          color: "text-yellow-600 bg-yellow-100",
        },
      };

      const disponibilidad = map[value as string] ?? {
        label: "Desconocido",
        color: "text-gray-600 bg-gray-100",
      };

      return (
        <span
          className={`px-2 py-1 rounded-full text-sm font-medium ${disponibilidad.color}`}
        >
          {disponibilidad.label}
        </span>
      );
    },
  },
  {
    accessorKey: "exclusivo",
    header: "Exclusivo",
    cell: ({ row }) => <span>{row.getValue("exclusivo") ? "Sí" : "No"}</span>,
  },
  {
    accessorKey: "tipoPropiedad.nombre",
    header: "Tipo",
  },
  {
    accessorKey: "ciudad.nombre",
    header: "Ciudad",
  },
  {
    accessorKey: "estado",
    header: "Estado",
    cell: ({ row }) => {
      const value = row.getValue("estado");

      const map: Record<string, { label: string; color: string }> = {
        EN_REVISION: {
          label: "En revisión",
          color: "text-yellow-700 bg-yellow-100",
        },
        PUBLICADO: { label: "Publicado", color: "text-green-700 bg-green-100" },
        RECHAZADO: { label: "Rechazado", color: "text-red-700 bg-red-100" },
        OCULTO: { label: "Oculto", color: "text-gray-700 bg-gray-200" },
      };

      const estado = map[value as string] ?? {
        label: "Desconocido",
        color: "text-gray-600 bg-gray-100",
      };

      return (
        <span
          className={`px-2 py-1 rounded-full text-sm font-medium ${estado.color}`}
        >
          {estado.label}
        </span>
      );
    },
  },
  {
    accessorKey: "fondoPortada",
    header: "Portada",
    cell: ({ row }) => {
      const fondoPortadas = row.getValue("fondoPortada") as { url: string }[];
      return (
        <img
          src={`${config.API_IMAGE_URL}${
            fondoPortadas[0] ? fondoPortadas[0].url : ""
          }`}
          alt={row.getValue("titulo")}
          className="h-12 w-12 object-cover rounded"
        />
      );
    },
  },
  //   {
  //     accessorKey: "imagenes",
  //     header: "Imágenes",
  //     cell: ({ row }) => {
  //       console.log(row.original);
  //       console.log(row.getValue("imagenes"));
  //       const imagenes = row.getValue("imagenes") as { url: string }[];
  //       return (
  //         <div className="flex gap-1">
  //           <img
  //             src={`${config.API_IMAGE_URL}${imagenes[0].url}`}
  //             alt={`Imagen`}
  //             className="h-10 w-10 object-cover rounded"
  //           />
  //         </div>
  //       );
  //     },
  //   },
];
