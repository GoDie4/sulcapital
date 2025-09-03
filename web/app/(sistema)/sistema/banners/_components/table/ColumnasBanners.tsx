"use client";
import { config } from "@/assets/config/config";
/* eslint-disable @next/next/no-img-element */
// columns.ts
import { ColumnDef } from "@tanstack/react-table";

export type Banner = {
  id: string;
  titulo: string;
  descripcion: string;
  imagen: string;
  posicion: number;
};

export const columnsBanner: ColumnDef<Banner>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "titulo",
    header: "Título",
  },
  {
    accessorKey: "descripcion",
    header: "Descripción",
  },
  {
    accessorKey: "posicion",
    header: "Posición",
  },
  {
    accessorKey: "imagen",
    header: "Imagen",
    cell: ({ row }) => (
      <img
        src={`${config.API_IMAGE_URL}${row.getValue("imagen")}`}
        alt={row.getValue("titulo")}
        className="h-12 w-12 object-cover rounded"
      />
    ),
  },
];
