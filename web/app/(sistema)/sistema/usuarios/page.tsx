import { config } from "@/assets/config/config";
import { WrapperSecciones } from "../../_components/estructura/WrapperSecciones";
import { columnsUsuario } from "./_components/table/ColumnasUsuarios";

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

  const rol = typeof searchParams.rol === "string" ? searchParams.rol : "";
  const estado =
    typeof searchParams.estado === "string" ? searchParams.estado : "";

  const publicaciones =
    typeof searchParams.publicaciones === "string"
      ? searchParams.publicaciones
      : "";

  const res = await fetch(
    `${
      config.API_URL
    }/listar-usuarios?page=${safePage}&limit=${limit}&search=${encodeURIComponent(
      search
    )}&rol=${rol}&estado=${estado}&publicaciones=${publicaciones}`
  );
  const { data, pagination } = await res.json();

  const filtros = [
    {
      name: "rol",
      label: "Roles",
      options: [
        { value: "administrador", label: "Administradores" },
        { value: "anunciante", label: "Anunciantes" },
        { value: "cliente", label: "Clientes" },
      ],
    },
    {
      name: "estado",
      label: "Estado",
      options: [
        { value: "1", label: "Activos" },
        { value: "0", label: "Inactivos" },
      ],
    },
    {
      name: "publicaciones",
      label: "Publicaciones",
      options: [
        { value: "1", label: "Con publicaciones" },
        { value: "0", label: "Sin publicaciones" },
      ],
    },
  ];

  return (
    <>
      <WrapperSecciones
        columns={columnsUsuario}
        data={data}
        renderAddForm={<p></p>}
        renderEditForm={<p></p>}
        searchColumnId="nombre"
        pagination={pagination}
        filters={filtros}
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
        actionsSeccion="usuarios"
      />
    </>
  );
}
