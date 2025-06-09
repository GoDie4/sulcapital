/* eslint-disable @typescript-eslint/no-explicit-any */
import { config } from "@/assets/config/config";
import { cookies } from "next/headers";
import { WrapperSecciones } from "../../_components/estructura/WrapperSecciones";
import { columnsFavoritos } from "./_components/table/ColumnasFavoritos";

export default async function page({ searchParams }: { searchParams: any }) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
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
  const estado =
    typeof searchParams.estado === "string" ? searchParams.estado : "";
  const disponibilidad =
    typeof searchParams.disponibilidad === "string"
      ? searchParams.disponibilidad
      : "";

  const tipo = typeof searchParams.tipo === "string" ? searchParams.tipo : "";

  const ciudad =
    typeof searchParams.ciudad === "string" ? searchParams.ciudad : "";

  const res = await fetch(
    `${
      config.API_URL
    }/favoritos/byUser?page=${safePage}&limit=${limit}&search=${encodeURIComponent(
      search
    )}&estado=${estado}&disponibilidad=${disponibilidad}&ciudad=${ciudad}&tipo=${tipo}`,
    {
      cache: "no-store",

      headers: {
        Cookie: `token=${token}`,
      },
    }
  );
  const { data, pagination } = await res.json();

  return (
    <>
      <WrapperSecciones
        columns={columnsFavoritos}
        data={data}
        searchColumnId="nombre"
        renderAddForm={<></>}
        pagination={pagination}
        renderEditForm={<></>}
        modalSize="medium"
        filters={[]}
        noRenderAddButton
        disabledActionsColumn
        deleteOptions={{
          apiEndpoint: "",
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
