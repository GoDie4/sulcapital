"use client";
import { config } from "@/assets/config/config";
/* eslint-disable @next/next/no-img-element */
// columns.ts
import { ColumnDef } from "@tanstack/react-table";

export type TipoPropiedad = {
  id: string;
  nombre: string;
  imagen: string;
  icono: string;
};

export const columnsTipoPropiedad: ColumnDef<TipoPropiedad>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "nombre",
    header: "Nombre",
  },
  {
    accessorKey: "icono",
    header: "Icono",
    cell: ({ row }) => (
      <img
        src={`${config.API_IMAGE_URL}${row.getValue("icono")}`}
        alt={row.getValue("nombre")}
        className="h-10 w-10 object-cover rounded"
      />
    ),
  },
  {
    accessorKey: "imagen",
    header: "Imagen",
    cell: ({ row }) => (
      <img
        src={`${config.API_IMAGE_URL}${row.getValue("imagen")}`}
        alt={row.getValue("nombre")}
        className="h-12 w-12 object-cover rounded"
      />
    ),
  },
];

