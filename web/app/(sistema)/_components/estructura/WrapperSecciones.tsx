"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAuth } from "@/assets/context/AuthContext";
import React, { ReactNode } from "react";
import { DataTable } from "./DataTable";
import { Pagination } from "../interfaces/Pagination";
import { AccionesTable } from "./AccionesTable";
import { DeleteOptionTypes } from "../modal/DeleteModal";
import { ModalSizes } from "../../../_components/modal/ModalWrapper";

export const WrapperSecciones = ({
  searchColumnId,
  data,
  pagination,
  renderAddForm,
  renderEditForm,
  columns,
  deleteOptions,
  modalSize
}: {
  searchColumnId: string;
  data: any;
  pagination: Pagination;
  renderAddForm: ReactNode;
  renderEditForm: ReactNode;
  columns: any;
  deleteOptions: DeleteOptionTypes;
  modalSize?: ModalSizes
}) => {
  const { setModalContent, openModal, setRowEdit } = useAuth();

  const rowActions = AccionesTable(
    setModalContent,
    renderEditForm,
    openModal,
    setRowEdit,
    deleteOptions
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
    />
  );
};
