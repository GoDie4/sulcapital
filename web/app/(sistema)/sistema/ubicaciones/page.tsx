import { DataTable } from "../../_components/estructura/DataTable";
import { columns, ubicaciones } from "./_components/Columnas";

export default function page() {
  return (
    <>
      <h2>Ubicaciones</h2>
      <DataTable columns={columns} data={ubicaciones} />
    </>
  );
}
