/* eslint-disable @typescript-eslint/no-explicit-any */
import { getServerSideProps } from "@/server/getServerSideProps";
import { Propiedad } from "./propiedades/_components/table/ColumnasPropiedades";
import CardInmueble from "../../_components/inmuebles/CardInmueble";
import CardUsuario from "./usuarios/_components/ui/CardUsuario";
import { MapaGeneral } from "../../_components/inicio/lugares/MapaGeneral";

export default async function page() {
  const dataPropiedades = await getServerSideProps("propiedades/ultimos");
  const dataUsuarios = await getServerSideProps("ultimosUsuarios");
  const dataCiudades = await getServerSideProps("ciudades");

  return (
    <>
      <div className="w-full flex flex-col xl:flex-row gap-4 p-4">
        <div className="w-full xl:w-2/3">
          <div className="w-full">
            <h2 className="text-2xl text-secondary-main font-TypographBold mb-6">
              Últimas propiedades publicadas
            </h2>
            <div className="w-full grid grid-cols-2 md:grid-cols-3 gap-5">
              {dataPropiedades.map((propiedad: Propiedad) => (
                <CardInmueble
                  data={propiedad}
                  renderFavorito={false}
                  type="grid"
                  key={propiedad.id}
                />
              ))}
            </div>
          </div>
          <div className="w-full mt-6">
            <h2 className="text-2xl text-secondary-main font-TypographBold mb-4">
              Ciudades
            </h2>
            <div className="w-full rounded-main overflow-hidden">
              <MapaGeneral dataCiudades={dataCiudades} />
            </div>
          </div>
        </div>
        <div className="w-full xl:w-1/3">
          <h2 className="text-2xl text-secondary-main font-TypographBold mb-6">
            Últimos usuarios
          </h2>
          <div className="grid grid-cols-1 gap-4">
            {dataUsuarios.map((usuario: any) => (
              <CardUsuario key={usuario.id} usuario={usuario} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
