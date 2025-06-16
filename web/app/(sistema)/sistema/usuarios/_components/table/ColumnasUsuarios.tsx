'use client'
import { ColumnDef } from "@tanstack/react-table";
import { UserInterface } from "../../../../../(auth)/_components/AuthInterfaces";
export function formatFechaHora(dateString: string) {
  const fecha = new Date(dateString);
  const year = fecha.getFullYear();
  const month = String(fecha.getMonth() + 1).padStart(2, "0");
  const day = String(fecha.getDate()).padStart(2, "0");
  const hours = String(fecha.getHours()).padStart(2, "0");
  const minutes = String(fecha.getMinutes()).padStart(2, "0");
  return `${year}-${month}-${day} ${hours}:${minutes}`;
}
export const columnsUsuario: ColumnDef<UserInterface>[] = [
  {
    accessorKey: "nombres",
    header: "Nombres",
  },
  {
    accessorKey: "apellidos",
    header: "Apellidos",
  },
  {
    accessorKey: "email",
    header: "Correo",
  },
  {
    accessorKey: "celular",
    header: "Celular",
  },
  {
    accessorKey: "rol.nombre",
    header: "Rol",
  },
  {
    accessorKey: "cant_publicaciones",
    header: "Cant. Propiedades",
  },
  {
    accessorKey: "publicaciones_automaticas",
    header: "Pub. Automáticas",
    cell: ({ row }) => {
        const value = row.getValue("publicaciones_automaticas");
        return (
          <span
            className={`px-2 py-1 rounded-full text-sm font-medium ${
              value ? "text-green-700 bg-green-100" : "text-red-700 bg-red-100"
            }`}
          >
            {value ? "Sí" : "No"}
          </span>
        );
      },
  },
 
  {
    accessorKey: "createdAt",
    header: "Fecha de Registro",
    cell: ({ row }) => {
      const value = row.getValue("createdAt") as string;
      return <span>{formatFechaHora(value)}</span>;
    },
  },
];
