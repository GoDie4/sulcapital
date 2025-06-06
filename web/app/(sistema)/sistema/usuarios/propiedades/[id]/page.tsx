import axios from "axios";
import { columnsPropiedad } from "../../../propiedades/_components/table/ColumnasPropiedades";
import { config } from "@/assets/config/config";
import { WrapperSecciones } from "../../../../_components/estructura/WrapperSecciones";
import { cookies } from "next/headers";
async function getPropiedadesByUser(id: string) {
  const cookieStore = await cookies(); // extrae las cookies actuales
  const token = cookieStore.get("token")?.value;
  try {
    const response = await axios.get(
      `${config.API_URL}/propiedades/byUserAdmin/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Cookie: `token=${token}`,
        },
        withCredentials: true,
      }
    );
    return {
      data: response.data.data,
      pagination: response.data.pagination,
    };
  } catch (error) {
    console.log(error);
    return {
      data: [],
      pagination: { limit: 0, page: 0, total: 0, totalPages: 0 },
    };
  }
}
export default async function page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;

  const { data, pagination } = await getPropiedadesByUser(id);

  console.log("data: ", data);
  console.log("pagination: ", pagination);

  return (
    <WrapperSecciones
      columns={columnsPropiedad}
      data={data}
      searchColumnId="nombre"
      renderAddForm={<p></p>}
      pagination={pagination}
      renderEditForm={<p></p>}
      disabledActionsColumn={true}
      modalSize="medium"
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
      noRenderAddButton={true}
    />
  );
}
