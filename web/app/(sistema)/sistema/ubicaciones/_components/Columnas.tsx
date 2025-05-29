'use client'
/* eslint-disable @next/next/no-img-element */
// columns.ts
import { ColumnDef } from "@tanstack/react-table";

export type Ubicacion = {
  id: number;
  nombre: string;
  descripcion: string;
  imagen: string;
};

export const columns: ColumnDef<Ubicacion>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "nombre",
    header: "Nombre",
  },
  {
    accessorKey: "descripcion",
    header: "Descripción",
  },
  {
    accessorKey: "imagen",
    header: "Imagen",
    cell: ({ row }) => (
      <img
        src={row.getValue("imagen")}
        alt={row.getValue("nombre")}
        className="h-12 w-12 object-cover rounded"
      />
    ),
  },
 
];

export const ubicaciones: Ubicacion[] = [
  {
    id: 1,
    nombre: "Oficina Principal",
    descripcion: "Sede administrativa",
    imagen: "https://via.placeholder.com/150", // URL de imagen de ejemplo
  },
  {
    id: 2,
    nombre: "Sucursal Norte",
    descripcion: "Atención al cliente",
    imagen: "https://via.placeholder.com/150",
  },
  {
    id: 3,
    nombre: "Centro de Distribución",
    descripcion: "Almacén",
    imagen: "https://via.placeholder.com/150",
  },
];
