"use client";
import { ContentMain } from "./_components/estructura/ContentMain";
import SearchSection from "./_components/inicio/SearchSection";
import InnovativeSlider from "./_components/inicio/Slides";
import { SwiperInmuebles } from "./_components/inmuebles/SwiperInmuebles";
import { CardUbicacion } from "./_components/inicio/lugares/CardUbicacion";
import { CardTipoInmueble } from "./_components/inicio/tiposInmuebles/CardTipoInmueble";
import { MapaGeneral } from "./_components/inicio/lugares/MapaGeneral";
import { BsFacebook, BsInstagram, BsTiktok } from "react-icons/bs";
import { Paginacion } from "./_components/estructura/Paginacion";
import { Header } from "./_components/estructura/Header";
import { Footer } from "./_components/estructura/Footer";
import { useAuth } from "@/assets/context/AuthContext";
import { CiudadList } from "./(sistema)/sistema/ciudades/_components/interfaces/CiudadesInterfaces";
import { TipoPropiedad } from "./(sistema)/sistema/tipo-propiedades/_components/table/ColumnasTipoPropiedad";
import { GridPropiedades } from "./_components/inmuebles/GridPropiedades";
import { useEffect, useState } from "react";
import { AgregarPropiedad } from "./(sistema)/sistema/propiedades/_components/form/AgregarPropiedad";
import { SideBarHome } from "./(sistema)/_components/SideBarHome";

export default function Home() {
  const {
    dataPropiedades,
    dataCiudades,
    dataTiposPropiedades,
    dataContacto,
    dataBanners,
    setModalContent,
    openModal,
    authUser,
    setShowMenu,
    showMenu,
  } = useAuth();
  const [ocultarSideBar, setOcultarSideBar] = useState<boolean>(false);

  useEffect(() => {
    const alreadyShown = localStorage.getItem("modalShownAfterLogin");

    if (authUser && !alreadyShown) {
      setModalContent(
        <AgregarPropiedad
          pagination={{ total: 0, totalPages: 0, limit: 1, page: 1 }}
          totalItems={0}
        />
      );
      openModal();

      localStorage.setItem("modalShownAfterLogin", "true");
    }
  }, [authUser, setModalContent, openModal]);
  return (
    <>
      <SideBarHome
        ocultarSideBar={ocultarSideBar}
        setOcultarSideBar={setOcultarSideBar}
        setShowMenu={setShowMenu}
        showMenu={showMenu}
      />
      <Header
        ciudades={dataCiudades}
        tipoPropiedades={dataTiposPropiedades}
        contacto={dataContacto}
      />
      <section className="relative">
        <InnovativeSlider dataBanners={dataBanners}/>
        <div className="w-full absolute bottom-0  left-0 z-[100]">
          <SearchSection
            ciudades={dataCiudades}
            tipoPropiedades={dataTiposPropiedades}
          />
        </div>
      </section>
      <section className="bg-white-main">
        <ContentMain className="py-6 sm:py-10 md:py-20 ">
          <h2 className="text-center text-sm sm:text-[20px]  md:text-3xl mb-5  text-secondary-main lg:text-4xl font-TypographBold">
            Descubre nuestros inmuebles
          </h2>
          <p className="hidden md:block mb-5 md:mb-14 text-center text-lg md:text-xl text-black-900">
            Oportunidades únicas para cada estilo de vida
          </p>
          <div className="w-full hidden lg:block">
            <SwiperInmuebles inmuebles={dataPropiedades} />
            <SwiperInmuebles inmuebles={dataPropiedades} reverse />
          </div>
          <div className="w-full block lg:hidden">
            <GridPropiedades
              propiedades={[
                ...dataPropiedades,
                ...dataPropiedades,
                ...dataPropiedades,
              ]}
            />
          </div>
          <Paginacion url="/buscar" />
        </ContentMain>
      </section>

      <section className="relative after:absolute after:w-full after:h-full after:top-0 after:left-0 after:bg-secondary-main after:opacity-50 after:-z-20 z-10 before:absolute before:w-full before:h-full before:top-0 before:left-0 before:bg-secondary-main before:bg-[url(/images/fondos/fondo_ubicaciones.webp)] before:-z-20 before:bg-fixed before:bg-cover">
        <ContentMain className="py-20">
          <h2 className="text-center text-2xl md:text-3xl mb-16  text-white-main lg:text-4xl font-TypographBold">
            Explora diferentes{" "}
            <span className="text-primary-main"> ciudades</span>
          </h2>

          <div className="w-full grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {dataCiudades.map((ubicacion: CiudadList) => (
              <CardUbicacion key={ubicacion.id} ubicacion={ubicacion} />
            ))}
          </div>
        </ContentMain>
      </section>
      <section>
        <ContentMain className="py-20">
          <h2 className="text-center text-2xl md:text-3xl mb-5  text-secondary-main lg:text-4xl font-TypographBold">
            Diferentes tipos de propiedades{" "}
            <span className="text-primary-main"> para ti</span>
          </h2>
          <p className="mb-14 text-center text-lg md:text-xl text-black-900">
            Conoce lo mejor de cada ciudad y encuentra tu nuevo hogar
          </p>
          <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-center">
            {dataTiposPropiedades.map((tipoinmueble: TipoPropiedad) => (
              <CardTipoInmueble
                tipoinmueble={tipoinmueble}
                key={tipoinmueble.id}
              />
            ))}
          </div>
        </ContentMain>
      </section>
      <section className="bg-primary-main">
        <ContentMain className="py-20">
          <h2 className="text-2xl md:text-3xl mb-6 font-TypographBold text-white-main text-center">
            Tienes preguntas sobre tu próximo inmueble. Contáctanos y te
            ayudamos a encontrar la mejor opción.
          </h2>
          <p className="text-white-100 text-center  text-base md:text-lg">
            Estamos aquí para brindarte asesoría personalizada y encontrar
            juntos la mejor opción para tu inversión o nuevo hogar.
          </p>
          <a
            target="_blank"
            href={`https://api.whatsapp.com/send?phone=51${dataContacto.whatsapp}&text=Hola%20tengo%20unas%20dudas%20en%20su%20plataforma`}
            className="flex w-fit mt-8 text-white-main text-xl mx-auto bg-secondary-main rounded-full px-6 py-2"
          >
            Contactar
          </a>
        </ContentMain>
      </section>
      {/* <section>
        <ContentMain className="py-20">
          <h2 className="text-center text-3xl mb-16  text-secondary-main md:text-4xl font-TypographBold">
            Explora diferentes{" "}
            <span className="text-primary-main"> ciudades</span>
          </h2>
          <div className="w-full grid md:grid-cols-2 gap-5">
            {dataPropiedades.map((inmueble: Propiedad) => (
              <CardInmueble data={inmueble} type="list" key={inmueble.id} />
            ))}
          </div>
        </ContentMain>
      </section> */}
      <section>
        <MapaGeneral dataCiudades={dataCiudades} />
      </section>
      <section>
        <ContentMain className="py-20 flex flex-col lg:flex-row">
          <div className="w-full lg:w-1/2">
            <h2 className="mb-8 text-secondary-main text-3xl font-TypographBold">
              Contáctanos y encuentra tu lugar ideal
            </h2>
            <p className="text-black-900 mb-2">
              ¿Tienes preguntas o necesitas más información? Completa el
              formulario y uno de nuestros asesores se pondrá en contacto
              contigo para ayudarte a encontrar la propiedad perfecta para ti.
            </p>
            <p className="text-black-900">
              Queremos ayudarte a dar el siguiente paso. Cuéntanos lo que
              necesitas y nuestro equipo estará encantado de asesorarte en tu
              búsqueda.
            </p>
            <div className="w-full mt-10 flex items-center gap-8">
              {dataContacto?.facebook && (
                <a
                  href={dataContacto.facebook}
                  target="_blank"
                  className="text-secondary-main text-3xl transition-colors duration-200 hover:text-primary-main"
                >
                  <BsFacebook />
                </a>
              )}
              {dataContacto?.instagram && (
                <a
                  href={dataContacto.instagram}
                  target="_blank"
                  className="text-secondary-main text-3xl transition-colors duration-200 hover:text-primary-main"
                >
                  <BsInstagram />
                </a>
              )}
              {dataContacto?.tiktok && (
                <a
                  href={dataContacto.tiktok ?? ""}
                  target="_blank"
                  className="text-secondary-main text-3xl transition-colors duration-200 hover:text-primary-main"
                >
                  <BsTiktok />
                </a>
              )}
            </div>
          </div>
          <div className="w-full lg:w-1/2">
            <form
              action=""
              className="max-w-xl px-8 py-6 mx-auto rounded-main shadow-main"
            >
              <div className="w-full flex flex-col gap-5">
                <div className="w-full">
                  <label htmlFor="nombres" className="mb-1 text-black-900">
                    Nombres
                  </label>
                  <input
                    type="text"
                    placeholder="Escribe tu nombre"
                    className="w-full rounded-main border border-black-200 p-3 outline-none  focus:border-secondary-main "
                  />
                </div>
                <div className="w-full">
                  <label htmlFor="nombres" className="mb-1 text-black-900">
                    Celular
                  </label>
                  <input
                    type="text"
                    placeholder="Escribe tu celular"
                    className="w-full rounded-main border border-black-200 p-3 outline-none  focus:border-secondary-main "
                  />
                </div>
                <div className="w-full">
                  <label htmlFor="nombres" className="mb-1 text-black-900">
                    Email
                  </label>
                  <input
                    type="text"
                    placeholder="Escribe tu email"
                    className="w-full rounded-main border border-black-200 p-3 outline-none  focus:border-secondary-main "
                  />
                </div>
                <div className="w-full">
                  <label htmlFor="nombres" className="mb-1 text-black-900">
                    Mensaje
                  </label>
                  <input
                    type="text"
                    placeholder="Escribe algo"
                    className="w-full rounded-main border border-black-200 p-3 outline-none  focus:border-secondary-main "
                  />
                </div>
              </div>
              <button
                type="button"
                className="w-full mt-6 bg-secondary-main rounded-full px-6 py-3 flex items-center justify-center text-white-main font-TypographBold"
              >
                Enviar
              </button>
            </form>
          </div>
        </ContentMain>
      </section>
      <Footer
        ciudades={dataCiudades}
        tipoPropiedades={dataTiposPropiedades}
        contacto={dataContacto}
      />
    </>
  );
}
