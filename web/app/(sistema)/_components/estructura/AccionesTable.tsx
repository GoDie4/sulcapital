/* eslint-disable @typescript-eslint/no-explicit-any */
// AccionesUbicaciones.tsx

import { Dispatch, ReactNode, SetStateAction } from "react";
import { ActionDefinition } from "./DataTableRowActions";
import DeleteConfirmationModal, {
  DeleteOptionTypes,
} from "../modal/DeleteModal";

export const AccionesTable = (
  setModalContent: (content: React.ReactNode) => void,
  renderEditForm: ReactNode,
  openModal: () => void,
  setRowEdit: Dispatch<SetStateAction<any | null>>,
  deleteOptions: DeleteOptionTypes
): ActionDefinition<any>[] => [
  {
    type: "item",
    label: "Editar",
    onAction: (row) => {
      setRowEdit(row);
      setModalContent(renderEditForm);
      openModal();
    },
  },
  {
    type: "item",
    label: "Eliminar",
    onAction: (row) => {
      setModalContent(
        <DeleteConfirmationModal
          apiEndpoint={deleteOptions.apiEndpoint}
          pagination={deleteOptions.pagination}
          totalItems={deleteOptions.totalItems}
          recordId={row.id}
        />
      );
      openModal();
    },
  
  },
];
