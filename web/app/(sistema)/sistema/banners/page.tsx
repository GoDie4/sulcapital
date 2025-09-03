import { config } from "@/assets/config/config";
import { WrapperSecciones } from "../../_components/estructura/WrapperSecciones";
import { columnsBanner } from "./_components/table/ColumnasBanners";
import { AgregarBanner } from "./_components/form/AgregarBanner";
import { EditarBanner } from "./_components/form/EditarBanner";
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
    }/banners?page=${safePage}&limit=${limit}&search=${encodeURIComponent(
      search
    )}`
  );
  const { data, pagination } = await res.json();

  return (
    <>
      <WrapperSecciones
        columns={columnsBanner}
        data={data}
        searchColumnId="nombre"
        renderAddForm={
          <AgregarBanner
            pagination={pagination }
            totalItems={data ? Number(data.length) : 0}
          />
        }
        pagination={pagination}
        renderEditForm={<EditarBanner />}
        deleteOptions={{
          apiEndpoint: "/banners/eliminar",
          pagination: {
            limit: pagination ? pagination.limit : 0,
            page: pagination ? pagination?.page : 0,
            total: pagination ? pagination?.total : 0,
            totalPages: pagination ? pagination?.totalPages : 0,
          },
          totalItems: data ? Number(data.length) : 0,
        }}
      />
    </>
  );
}
