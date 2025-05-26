import { UbicacionProps } from "../../../app/_components/inicio/lugares/CardUbicacion";
import { CardInmuebleProps } from "../../../app/_components/inmuebles/CardInmueble";
import { FaStore, FaHome } from "react-icons/fa";
import { GiValley } from "react-icons/gi";
import { TbRulerMeasure } from "react-icons/tb";
import { MdOutlineHouseSiding } from "react-icons/md";
import { TipoInmueble } from "../../../app/_components/inicio/tiposInmuebles/CardTipoInmueble";

export const sampleProperties: CardInmuebleProps[] = [
  {
    id: "Imueble_1",
    images: [
      "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=400&h=300&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=400&h=300&fit=crop&crop=center",
    ],
    price: "S/ 450,000",
    ubicacion: "Madrid",
    propertyType: "Apartamento",
    address: "Calle Gran Vía, 28, 28013 Madrid, España",
    isExclusive: true,
  },
  {
    id: "Imueble_2",
    images: [
      "https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=400&h=300&fit=crop&crop=center",
    ],
    price: "S/ 320,000",
    ubicacion: "Barcelona",
    propertyType: "Piso",
    address: "Passeig de Gràcia, 15, 08007 Barcelona, España",
    isExclusive: false,
  },
  {
    id: "Imueble_3",
    images: [
      "https://images.unsplash.com/photo-1493397212122-2b85dda8106b?w=400&h=300&fit=crop&crop=center",
    ],
    price: "S/ 680,000",
    ubicacion: "Valencia",
    propertyType: "Casa",
    address: "Avenida del Puerto, 42, 46023 Valencia, España",
    isExclusive: true,
  },
  {
    id: "Imueble_4",
    images: [
      "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=400&h=300&fit=crop&crop=center",
    ],
    price: "S/ 450,000",
    ubicacion: "Madrid",
    propertyType: "Apartamento",
    address: "Calle Gran Vía, 28, 28013 Madrid, España",
    isExclusive: true,
  },
  {
    id: "Imueble_5",
    images: [
      "https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=400&h=300&fit=crop&crop=center",
    ],
    price: "S/ 320,000",
    ubicacion: "Barcelona",
    propertyType: "Piso",
    address: "Passeig de Gràcia, 15, 08007 Barcelona, España",
    isExclusive: false,
  },
];

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
