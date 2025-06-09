"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAuth } from "@/assets/context/AuthContext";
import React, { ReactNode } from "react";
import { DataTable, FilterBuscador } from "./DataTable";
import { Pagination } from "../interfaces/Pagination";
import { AccionesTable } from "./AccionesTable";
import { DeleteOptionTypes } from "../modal/DeleteModal";
import { ModalSizes } from "../../../_components/modal/ModalWrapper";
import { ActionDefinition } from "./DataTableRowActions";
import { useRouter } from "next/navigation";
import { VerPropiedad } from "../../sistema/propiedades/_components/form/VerPropiedad";
import { CambiarEstadoPropiedad } from "../../sistema/propiedades/_components/form/CambiarEstadoPropiedad";

type seccionsType =
  | "usuarios"
  | "tipo_propiedades"
  | "ciudades"
  | "propiedades";

export const WrapperSecciones = ({
  searchColumnId,
  data,
  pagination,
  renderAddForm,
  renderEditForm,
  columns,
  deleteOptions,
  modalSize,
  actionsSeccion,
  disabledActionsColumn = false,
  filters = [],
  noRenderAddButton = false,
}: {
  searchColumnId: string;
  data: any;
  pagination: Pagination;
  renderAddForm: ReactNode;
  renderEditForm: ReactNode;
  columns: any;
  deleteOptions: DeleteOptionTypes;
  modalSize?: ModalSizes;
  actionsSeccion?: seccionsType;
  disabledActionsColumn?: boolean;
  filters?: FilterBuscador[];
  noRenderAddButton?: boolean;
}) => {
  const { setModalContent, openModal, setRowEdit, setModalSize } = useAuth();
  const router = useRouter();
  let accionesTable: ActionDefinition<any>[] = [{ type: "" }];

  const actionsTableUsuarios: ActionDefinition<any>[] = [
    {
      label: "Ver propiedades",
      onAction: (row) => {
        router.push(`/sistema/usuarios/propiedades/${row.id}`);
      },
      type: "item",
    },
  ];

  const actionsTablePropiedades: ActionDefinition<any>[] = [
    {
      label: "Ver propiedad",
      onAction: (row) => {
        setModalSize("large");
        setModalContent(<VerPropiedad row={row} />);
        openModal();
      },
      type: "item",
    },
    {
      label: "Cambiar estado",
      onAction: (row) => {
        setModalSize("small");
        setModalContent(<CambiarEstadoPropiedad rowEdit={row} />);
        openModal();
      },
      type: "item",
    },
  ];

  if (actionsSeccion === "usuarios") {
    accionesTable = actionsTableUsuarios;
  }
  if (actionsSeccion === "propiedades") {
    accionesTable = actionsTablePropiedades;
  }

  const rowActions = AccionesTable(
    setModalContent,
    renderEditForm,
    openModal,
    setRowEdit,
    deleteOptions,
    accionesTable
  );

  return (
    <DataTable
      data={data}
      rowActions={rowActions}
      pagination={pagination}
      columns={columns}
      renderAddForm={renderAddForm}
      searchColumnId={searchColumnId}
      modalSize={modalSize}
      disableActionsColumn={disabledActionsColumn}
      filters={filters}
      noRenderAddButton={noRenderAddButton}
    />
  );
};
