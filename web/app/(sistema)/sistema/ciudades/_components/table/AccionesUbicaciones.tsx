"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ActionDefinition } from "../../../../_components/estructura/DataTableRowActions";

export const paymentRowActionsDefinition: ActionDefinition<any>[] = [
  {
    type: "item",
    label: "Previsualizar",
    onAction: (payment) =>
      navigator.clipboard
        .writeText(payment.id)
        .then(() => alert("ID copiado: " + payment.id)),
  },
  {
    type: "item",
    label: "Editar",
    onAction: (payment) =>
      navigator.clipboard
        .writeText(payment.id)
        .then(() => alert("ID copiado: " + payment.id)),
  },
  {
    type: "item",
    label: "Eliminar",
    onAction: (payment) =>
      alert(`Mostrando detalles del cliente: ${payment.nombre}`),
  },
];
