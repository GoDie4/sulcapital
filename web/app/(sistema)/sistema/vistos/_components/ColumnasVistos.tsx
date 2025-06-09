"use client";
import { ColumnDef } from "@tanstack/react-table";
import { config } from "@/assets/config/config";
import Link from "next/link";
import { Propiedad } from "../../propiedades/_components/table/ColumnasPropiedades";

/* eslint-disable @next/next/no-img-element */
export const columnsVistos: ColumnDef<Propiedad>[] = [
  {
    accessorKey: "id",
    header: "Ir",
    cell: ({ row }) => {
      return (
        <Link
          href={`/propiedad/${row.original.id}/try`}
          className="underline text-secondary-main text-center"
        >
          Ver en la web
        </Link>
      );
    },
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

];
