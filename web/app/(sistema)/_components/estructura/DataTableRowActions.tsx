"use client";

import * as React from "react";
import { Row } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button"; // Ajusta la ruta
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"; // Ajusta la ruta

// Define el tipo para una acción individual o un separador
export type ActionDefinition<TData> =
  | {
      type: "item";
      label: string;
      onAction: (data: TData) => void; // Función que se ejecuta al hacer clic
      disabled?: boolean; // Opcional: para deshabilitar el ítem
      className?: string; // Opcional: para clases CSS adicionales
    }
  | {
      type: "separator";
    }
  | {
      type: "";
    };

interface DataTableRowActionsProps<TData> {
  row: Row<TData>; // La fila actual de la tabla
  actions: ActionDefinition<TData>[]; // Array de acciones a mostrar
  menuLabel?: string; // Etiqueta opcional para el menú
  triggerIcon?: React.ReactNode; // Icono opcional para el trigger
}

export function DataTableRowActions<TData>({
  row,
  actions,
  menuLabel = "Acciones", // Etiqueta por defecto
  triggerIcon = <MoreHorizontal className="h-4 w-4" />, // Icono por defecto
}: DataTableRowActionsProps<TData>) {
  const itemData = row.original; // Los datos originales de la fila

  if (!actions || actions.length === 0) {
    return null; // No renderizar nada si no hay acciones
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Abrir menú</span>
          {triggerIcon}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {menuLabel && <DropdownMenuLabel>{menuLabel}</DropdownMenuLabel>}
        {actions.map((action, index) => {
          if (action.type === "separator") {
            return <DropdownMenuSeparator key={`separator-${index}`} />;
          }
          if (action.type === "") {
            return <></>;
          }
          // Clave única para cada ítem del menú
          const key = `${action.label}-${index}`;
          return (
            <DropdownMenuItem
              key={key}
              onClick={(event) => {
                event.stopPropagation(); // Prevenir que eventos de la fila se disparen si es necesario
                if (!action.disabled) {
                  action.onAction(itemData);
                }
              }}
              disabled={action.disabled}
              className={`${action.className} cursor-pointer hover:bg-white-100`}
            >
              {action.label}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
