import { config } from "@/assets/config/config";
import { WrapperSecciones } from "../../_components/estructura/WrapperSecciones";
import { columnsPropiedad } from "./_components/table/ColumnasPropiedades";
import { AgregarPropiedad } from "./_components/form/AgregarPropiedad";
import { EditarPropiedad } from "./_components/form/EditarPropiedad";
import { cookies } from "next/headers";

/* eslint-disable @typescript-eslint/no-explicit-any */
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

  const res = await fetch(
    `${
      config.API_URL
    }/propiedades/byUser?page=${safePage}&limit=${limit}&search=${encodeURIComponent(
      search
    )}`,
    {
      cache: "no-store",

      headers: {
        // 'Authorization': `Bearer ${localStorage.getItem('token')}`,
        Cookie: `token=${token}`,
      },
    }
  );
  const { data, pagination } = await res.json();

  console.log("DATA: ", data)
  return (
    <>
      <WrapperSecciones
        columns={columnsPropiedad}
        data={data}
        searchColumnId="nombre"
        renderAddForm={
          <AgregarPropiedad
            pagination={pagination}
            totalItems={Number(data.length)}
          />
        }
        pagination={pagination}
        renderEditForm={<EditarPropiedad />}
        modalSize="medium"
        deleteOptions={{
          apiEndpoint: "/propiedades/eliminar",
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
