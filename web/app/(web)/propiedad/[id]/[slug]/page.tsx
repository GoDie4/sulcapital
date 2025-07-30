/* eslint-disable @typescript-eslint/no-explicit-any */
import { config } from "@/assets/config/config";
import axios from "axios";
import { BannerInternas } from "../../../../_components/estructura/BannerInternas";
import DescripcionInmueble from "../../../../_components/inmuebles/_components/DescripcionInmueble";
import { GaleriaInmuebles } from "../../../../_components/inmuebles/_components/GaleriaInmuebles";
import { ContentMain } from "../../../../_components/estructura/ContentMain";
import { OtrosInmueblesUsuario } from "../../../../_components/inmuebles/_components/OtrosInmueblesUsuario";
import { ContenteInmuebles } from "../../_components/ContenteInmuebles";
import ClientMediaInmueble from "../../../../_components/inmuebles/_components/ImportDynamicUbicacionVideoInmueble";
import { ConsultarPorWhatsapp } from "../../_components/ConsultarPorWhatsapp";

async function getPropiedad(id: string): Promise<any> {
  const response = await axios.get(`${config.API_URL}/propiedades/find/${id}`);

  return response.data.data;
}

export async function generateMetadata({ params }: { params: any }) {
  const response = await axios.get(
    `${config.API_URL}/propiedades/find/${params.id}`
  );
  const propiedad = response.data.data.propiedad;

  function stripHTML(html: string): string {
    return html.replace(/<[^>]+>/g, "");
  }

  const seoDescription = `${stripHTML(
    propiedad?.descripcionLarga ?? ""
  )}`.slice(0, 160);
  const seoImage = `${config.API_IMAGE_URL}${
    propiedad?.imagenes?.[0]?.url ?? ""
  }`;

  const titleSeo = `${propiedad?.titulo} | Sulcapital Sac`;
  const url = `https://sulcapital.pe/propiedad/${propiedad.id}/${propiedad.slug}`;
  return {
    title: `${propiedad?.titulo} | Sulcapital Sac`,
    description: seoDescription,
    generator: "Next.js",
    authors: [{ name: "Logos Perú" }],
    icons: {
      icon: "/assets/images/logo/ico.png",
    },
    openGraph: {
      titleSeo,
      seoDescription,
      url,
      type: "article",
      siteName: "TuSitio.com",
      images: [
        {
          url: seoImage,
          width: 1200,
          height: 630,
          alt: propiedad.titulo,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      titleSeo,
      seoDescription,
      images: [seoImage],
    },

    other: {
      // Structured data personalizado
      "script:ld+json": JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Residence", // puedes usar "House", "Apartment" según el tipo
        name: propiedad.titulo,
        seoDescription,
        image: seoImage,
        url,
        address: {
          "@type": "PostalAddress",
          streetAddress: propiedad.direccion,
          addressCountry: "PE",
        },
        offers: {
          "@type": "Offer",
          price: propiedad.precio,
          priceCurrency: "PEN",
          availability: "https://schema.org/InStock",
        },
      }),
    },
  };
}

export default async function page({
  params,
}: {
  params: Promise<{ id: string; slug: string }>;
}) {
  const id = (await params).id;

  const data = await getPropiedad(id);

  const propiedad = data.propiedad;

  return (
    <>
      <BannerInternas
        image={`${config.API_IMAGE_URL}${propiedad.imagenes[0].url}`}
        title={propiedad.titulo}
      />
      <GaleriaInmuebles
        imagenes={propiedad.imagenes}
        descripcionCorta={propiedad.descripcionCorta ?? ""}
        direccion={propiedad.direccion}
        precio={String(propiedad.precio)}
        disponibilidad={propiedad.disponibilidad}
        propiedadId={id}
        celular={propiedad.usuario.celular}
      />
      <section>
        <ContentMain className="w-full flex flex-col lg:flex-row gap-8 pb-10">
          <div className="w-full lg:w-2/3 space-y-6">
            <DescripcionInmueble descripcion={propiedad.descripcionLarga} />
            <ClientMediaInmueble
              coordenadas={propiedad.coordenadas}
              direccion={propiedad.direccion}
              video={propiedad.video}
            />
          </div>
          <div className="w-full lg:w-1/3 space-y-12 ">
            {data.ultimasPropiedades && (
              <OtrosInmueblesUsuario
                ultimasPropiedades={data.ultimasPropiedades}
              />
            )}
          </div>
        </ContentMain>
        <ContentMain className="pb-20">
          <p className="text-xl font-TypographBold text-secondary-main mb-6">
            Inmuebles relacionados
          </p>
          <ContenteInmuebles
            propiedadesRelacionadas={data.propiedadesRelacionadas}
          />
        </ContentMain>
      </section>
            
      <ConsultarPorWhatsapp propiedad={data.propiedad} />
    </>
  );
}
