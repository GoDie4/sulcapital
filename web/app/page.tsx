"use client";
import {
  sampleProperties,
  TiposPropiedad,
  ubicaciones,
} from "@/assets/data/DataGeneral";
import { ContentMain } from "./_components/estructura/ContentMain";
import SearchSection from "./_components/inicio/SearchSection";
import InnovativeSlider from "./_components/inicio/Slides";
import { SwiperInmuebles } from "./_components/inmuebles/SwiperInmuebles";
import { CardUbicacion } from "./_components/inicio/lugares/CardUbicacion";
import {
  CardTipoInmueble,
  TipoInmueble,
} from "./_components/inicio/tiposInmuebles/CardTipoInmueble";
import Link from "next/link";
import { MapaGeneral } from "./_components/inicio/lugares/MapaGeneral";
import { BsFacebook, BsInstagram, BsTiktok } from "react-icons/bs";
import CardInmueble, {
  CardInmuebleProps,
} from "./_components/inmuebles/CardInmueble";
import { Paginacion } from "./_components/estructura/Paginacion";
import { Header } from "./_components/estructura/Header";
import { Footer } from "./_components/estructura/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <section className="relative">
        <InnovativeSlider />
        <div className="w-full absolute bottom-0 lg:bottom-8 left-0 z-[100]">
          <ContentMain>
            <SearchSection />
          </ContentMain>
        </div>
      </section>
      <section className="bg-white-main">
        <ContentMain className="py-20 ">
          <h2 className="text-center text-2xl  md:text-3xl mb-5  text-secondary-main lg:text-4xl font-TypographBold">
            Descubre nuestros inmuebles
          </h2>
          <p className="mb-14 text-center text-lg md:text-xl text-black-900">
            Oportunidades únicas para cada estilo de vida
          </p>
          <SwiperInmuebles inmuebles={sampleProperties} />
          <SwiperInmuebles inmuebles={sampleProperties} reverse />
        </ContentMain>
      </section>

      <section className="relative after:absolute after:w-full after:h-full after:top-0 after:left-0 after:bg-secondary-main after:opacity-50 after:-z-20 z-10 before:absolute before:w-full before:h-full before:top-0 before:left-0 before:bg-secondary-main before:bg-[url(/images/fondos/fondo_ubicaciones.webp)] before:-z-20 before:bg-fixed before:bg-cover">
        <ContentMain className="py-20">
          <h2 className="text-center text-2xl md:text-3xl mb-16  text-white-main lg:text-4xl font-TypographBold">
            Explora diferentes{" "}
            <span className="text-primary-main"> ciudades</span>
          </h2>

          <div className="w-full grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {ubicaciones.map((ubicacion) => (
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
          <div className="w-full grid md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {TiposPropiedad.map((tipoinmueble: TipoInmueble) => (
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
          <Link
            href={""}
            className="flex w-fit mt-8 text-white-main text-xl mx-auto bg-secondary-main rounded-full px-6 py-2"
          >
            Contactar
          </Link>
        </ContentMain>
      </section>
      <section>
        <ContentMain className="py-20">
          <h2 className="text-center text-3xl mb-16  text-secondary-main md:text-4xl font-TypographBold">
            Explora diferentes{" "}
            <span className="text-primary-main"> ciudades</span>
          </h2>
          <div className="w-full grid md:grid-cols-2 gap-5">
            {sampleProperties.map((inmueble: CardInmuebleProps) => (
              <CardInmueble data={inmueble} type="list" key={inmueble.id} />
            ))}
          </div>
          <Paginacion />
        </ContentMain>
      </section>
      <section>
        <MapaGeneral />
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
              <a
                href=""
                className="text-secondary-main text-3xl transition-colors duration-200 hover:text-primary-main"
              >
                <BsFacebook />
              </a>
              <a
                href=""
                className="text-secondary-main text-3xl transition-colors duration-200 hover:text-primary-main"
              >
                <BsInstagram />
              </a>
              <a
                href=""
                className="text-secondary-main text-3xl transition-colors duration-200 hover:text-primary-main"
              >
                <BsTiktok />
              </a>
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
      <Footer />
    </>
  );
}
