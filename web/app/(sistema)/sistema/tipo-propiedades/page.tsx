import { config } from "@/assets/config/config";
import { WrapperSecciones } from "../../_components/estructura/WrapperSecciones";
import { AgregarTipoPropiedad } from "./_components/form/AgregarTipoPropiedad";
import { EditarTipoPropiedad } from "./_components/form/EditarTipoPropiedad";
import { columnsTipoPropiedad } from "./_components/table/ColumnasTipoPropiedad";

/* eslint-disable @typescript-eslint/no-explicit-any */
export default async function page({ searchParams }: { searchParams: any }) {
  const limitParam = searchParams?.limit;

  const rawLimit = Array.isArray(limitParam)
    ? limitParam[0]
    : limitParam ?? "10";
  const pageParam = searchParams?.page;

  const limit = parseInt(rawLimit);

  const page = parseInt(
    Array.isArray(pageParam) ? pageParam[0] : pageParam ?? "1"
  );

  const safePage = isNaN(page) || page < 1 ? 1 : page;
  const search =
    typeof searchParams.search === "string" ? searchParams.search : "";

  const res = await fetch(
    `${
      config.API_URL
    }/tipo_propiedades?page=${safePage}&limit=${limit}&search=${encodeURIComponent(
      search
    )}`,
  );
  const { data, pagination } = await res.json();

  return (
    <>
      <WrapperSecciones
        columns={columnsTipoPropiedad}
        data={data}
        searchColumnId="nombre"
        renderAddForm={
          <AgregarTipoPropiedad
            pagination={pagination}
            totalItems={Number(data.length)}
          />
        }
        pagination={pagination}
        renderEditForm={
          <EditarTipoPropiedad
          />
        }
        deleteOptions={{
          apiEndpoint: "/tipo_propiedades/eliminar",
          pagination: {
            limit: pagination.limit,
            page: pagination.page,
            total: pagination.total,
            totalPages: pagination.totalPages,
          },
          totalItems: Number(data.length),
        }}
      />
    </>
  );
}
