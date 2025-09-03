import { UbicacionProps } from "../../../app/_components/inicio/lugares/CardUbicacion";
import { FaStore, FaHome } from "react-icons/fa";
import { GiValley } from "react-icons/gi";
import { TbRulerMeasure } from "react-icons/tb";
import { MdOutlineHouseSiding } from "react-icons/md";
import { TipoInmueble } from "../../../app/_components/inicio/tiposInmuebles/CardTipoInmueble";

// export const sampleProperties: CardInmuebleProps[] = [
//   {
//     id: "Inmueble_5",
//     images: ["/images/propiedades/propiedad5.webp"],
//     price: "S/ 320,000",
//     ubicacion: "Pangoa",
//     propertyType: "Terreno",
//     address: "Sector rural, Pangoa, Junín, Perú",
//     isExclusive: false,
//   },
//   {
//     id: "Inmueble_6",
//     images: ["/images/propiedades/propiedad6.webp"],
//     price: "S/ 500,000",
//     ubicacion: "La Merced",
//     propertyType: "Casa",
//     address: "Calle Central, La Merced, Junín, Perú",
//     isExclusive: true,
//   },
//   {
//     id: "Inmueble_7",
//     images: ["/images/propiedades/propiedad7.webp"],
//     price: "S/ 280,000",
//     ubicacion: "Perené",
//     propertyType: "Terreno",
//     address: "Zona agrícola, Perené, Junín, Perú",
//     isExclusive: false,
//   },
//   {
//     id: "Inmueble_8",
//     images: ["/images/propiedades/propiedad8.webp"],
//     price: "S/ 350,000",
//     ubicacion: "Sangani",
//     propertyType: "Local",
//     address: "Av. Comercio, Sangani, Junín, Perú",
//     isExclusive: true,
//   },
//   {
//     id: "Inmueble_1",
//     images: ["/images/propiedades/propiedad1.webp"],
//     price: "S/ 450,000",
//     ubicacion: "Pichanaki",
//     propertyType: "Terreno",
//     address: "Zona céntrica, Pichanaki, Junín, Perú",
//     isExclusive: true,
//   },
//   {
//     id: "Inmueble_2",
//     images: ["/images/propiedades/propiedad2.webp"],
//     price: "S/ 320,000",
//     ubicacion: "Satipo",
//     propertyType: "Casa",
//     address: "Av. Principal, Satipo, Junín, Perú",
//     isExclusive: false,
//   },
//   {
//     id: "Inmueble_3",
//     images: [
//       "/images/propiedades/propiedad3.webp",
//       "/images/propiedades/propiedad7.webp",
//     ],
//     price: "S/ 680,000",
//     ubicacion: "Río Negro",
//     propertyType: "Lote",
//     address: "Zona alta, Río Negro, Junín, Perú",
//     isExclusive: true,
//   },
//   {
//     id: "Inmueble_4",
//     images: ["/images/propiedades/propiedad4.webp"],
//     price: "S/ 450,000",
//     ubicacion: "Mazamari",
//     propertyType: "Local",
//     address: "Centro de Mazamari, Junín, Perú",
//     isExclusive: true,
//   },

//   {
//     id: "Inmueble_9",
//     images: ["/images/propiedades/propiedad9.webp"],
//     price: "S/ 600,000",
//     ubicacion: "San Ramón",
//     propertyType: "Casa",
//     address: "Centro de San Ramón, Junín, Perú",
//     isExclusive: true,
//   },
//   {
//     id: "Inmueble_10",
//     images: ["/images/propiedades/propiedad10.webp"],
//     price: "S/ 400,000",
//     ubicacion: "Villa Rica",
//     propertyType: "Lote",
//     address: "Calle Principal, Villa Rica, Pasco, Perú",
//     isExclusive: false,
//   },
// ];
export const ubicaciones: UbicacionProps[] = [
  {
    id: "1",
    imagen: "/images/lugares/pichanaki.webp",
    nombre: "Pichanaki",
    descripcion: "Un destino que vibra en la selva.",
  },
  {
    id: "2",
    imagen: "/images/lugares/satipo.webp",
    nombre: "Satipo",
    descripcion: "Puerta de entrada a la selva central.",
  },
  {
    id: "3",
    imagen: "/images/lugares/rionegro.webp",
    nombre: "Río Negro",
    descripcion: "Aventura entre ríos y montañas.",
  },
  {
    id: "4",
    imagen: "/images/lugares/mazamari.webp",
    nombre: "Mazamari",
    descripcion: "Naturaleza y cultura viva.",
  },
  {
    id: "5",
    imagen: "/images/lugares/pangoa.webp",
    nombre: "Pangoa",
    descripcion: "Refugio verde lleno de vida.",
  },
  {
    id: "6",
    imagen: "/images/lugares/lamerced.webp",
    nombre: "La Merced",
    descripcion: "Encanto y tradición cafetera.",
  },
  {
    id: "7",
    imagen: "/images/lugares/perene.webp",
    nombre: "Perené",
    descripcion: "Aventura y naturaleza sin fin.",
  },
  {
    id: "8",
    imagen: "/images/lugares/sangani.webp",
    nombre: "Sangani",
    descripcion: "Magia natural y cultura viva.",
  },
  {
    id: "9",
    imagen: "/images/lugares/sanramon.webp",
    nombre: "San Ramón",
    descripcion: "Puerta de ingreso a la Amazonía.",
  },
  {
    id: "10",
    imagen: "/images/lugares/villarica.webp",
    nombre: "Villa Rica",
    descripcion: "Café y paisajes de ensueño.",
  },
  {
    id: "11",
    imagen: "/images/lugares/oxapampa.webp",
    nombre: "Oxapampa",
    descripcion: "Cultura austro-alemana y naturaleza.",
  },
  {
    id: "12",
    imagen: "/images/lugares/puertoocopa.webp",
    nombre: "Puerto Ocopa",
    descripcion: "Un puerto fluvial con historia y naturaleza.",
  },
];

export const TiposPropiedad: TipoInmueble[] = [
  {
    id: "TipoInmueble1",
    nombre: "Locales",
    icono: <FaStore className="text-2xl" />,
    imagen: "/images/tipos/tipoinmueble1.webp",
  },
  {
    id: "TipoInmueble2",
    nombre: "Terrenos",
    icono: <GiValley className="text-2xl" />,
    imagen: "/images/tipos/tipoinmueble2.webp",
  },
  {
    id: "TipoInmueble3",
    nombre: "Casas",
    icono: <FaHome className="text-2xl" />,
    imagen: "/images/tipos/tipoinmueble3.webp",
  },
  {
    id: "TipoInmueble4",
    nombre: "Lotes",
    icono: <TbRulerMeasure className="text-2xl" />,
    imagen: "/images/tipos/tipoinmueble4.webp",
  },
  {
    id: "TipoInmueble5",
    nombre: "Alquiler",
    icono: <MdOutlineHouseSiding className="text-2xl" />,
    imagen: "/images/tipos/tipoinmueble5.webp",
  },
];
