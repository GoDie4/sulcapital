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
  const estado =
    typeof searchParams.estado === "string" ? searchParams.estado : "";
  const disponibilidad =
    typeof searchParams.disponibilidad === "string"
      ? searchParams.disponibilidad
      : "";

  const tipo =
    typeof searchParams.tipo === "string"
      ? searchParams.tipo
      : "";

  const ciudad =
    typeof searchParams.ciudad === "string" ? searchParams.ciudad : "";

  const res = await fetch(
    `${
      config.API_URL
    }/propiedades/byUser?page=${safePage}&limit=${limit}&search=${encodeURIComponent(
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

  //FILTROS
  const resTipos = await fetch(
    `${config.API_URL}/tipo_propiedades?page=${safePage}&limit=${limit}`
  );
  const { data: tipos } = await resTipos.json();

  const resCiudades = await fetch(
    `${config.API_URL}/ciudades?page=${safePage}&limit=${50}`
  );
  const { data: ciudades } = await resCiudades.json();

  const filtros = [
    {
      name: "disponibilidad",
      label: "Disponibilidad",
      options: [
        { value: "EN_VENTA", label: "Venta" },
        { value: "EN_COMPRA", label: "Compra" },
        { value: "EN_ALQUILER", label: "Alquiler" },
      ],
    },
    {
      name: "ciudad",
      label: "Ciudad",
      options: ciudades.map((ciudad: any) => ({
        value: ciudad.id,
        label: ciudad.nombre,
      })),
    },
    {
      name: "estado",
      label: "Estado",
      options: [
        { value: "EN_REVISION", label: "En revisión" },
        { value: "PUBLICADO", label: "Publicado" },
        { value: "RECHAZADO", label: "Rechazado" },
        { value: "OCULTO", label: "Oculto" },
      ],
    },
    {
      name: "tipo",
      label: "Tipo de prop.",
      options: tipos.map((tipo: any) => ({
        value: tipo.id,
        label: tipo.nombre,
      })),
    },
  ];
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
        filters={filtros}
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
