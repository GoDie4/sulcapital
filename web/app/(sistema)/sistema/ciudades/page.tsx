import { DataTable } from "../../_components/estructura/DataTable";
import { AgregarUbicacion } from "./_components/form/AgregarUbicacion";
import { paymentRowActionsDefinition } from "./_components/table/AccionesUbicaciones";
import { columns, ubicaciones } from "./_components/table/ColumnasUbicaciones";

export default function page() {
  return (
    <>
      <DataTable
        columns={columns}
        data={ubicaciones}
        searchColumnId="nombre"
        rowActions={paymentRowActionsDefinition}
        renderAddForm={<AgregarUbicacion />}
      />
    </>
  );
}
