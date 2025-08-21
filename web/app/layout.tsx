import type { Metadata } from "next";
import { Geist, Montserrat } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/assets/context/AuthContext";
import { ModalRender } from "./_components/modal/ModalRender";
import { Toaster } from "sonner";
import { getServerSideProps } from "@/server/getServerSideProps";
import { cookies } from "next/headers";
import axios from "axios";
import { config } from "@/assets/config/config";
import { GoogleOAuthProvider } from "@react-oauth/google";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMontserrat = Montserrat({
  variable: "--font-geist-montserrat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SULCAPITAL SAC",
  description:
    "SULCAPITAL ofrece distintos tipos de inmuebles en la selva central del Perú, incluyendo terrenos, departamentos y casas para inversión o vivienda. Encuentra oportunidades únicas con asesoría especializada.",
  openGraph: {
    images: [
      {
        url: "https://sulcapital.pe/images/slides/slide1.webp",
        width: 1200,
        height: 630,
        alt: "Inmuebles en la selva central del Perú",
      },
    ],
  },
};

async function getUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value || "";

  // Si no hay token, devolver null
  if (!token) return null;

  // Validar que sea un JWT válido en formato (3 partes)
  if (token.split(".").length !== 3) {
    cookieStore.delete("token");
    return null;
  }

  try {
    const response = await axios.get(`${config.API_URL}/user/yo`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Cookie: `token=${token}`,
      },
      withCredentials: true,
    });

    // Validar que la API realmente devuelva el usuario
    if (response.data?.usuario) {
      return response.data.usuario;
    } else {
      // Si la API no devuelve el usuario esperado, borrar token
      cookieStore.delete("token");
      return null;
    }
  } catch (error) {
    console.error("Error al obtener usuario:", error);
    // Si hay error (401, 500, etc.), eliminar token y devolver null
    cookieStore.delete("token");
    return null;
  }
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let dataPropiedades;
  const [dataCiudades, dataTiposPropiedades, dataContacto, dataBanners] =
    await Promise.all([
      getServerSideProps("ciudades", 0),
      getServerSideProps("tipo_propiedades", 0),
      getServerSideProps("contacto", 0),
      getServerSideProps("banners", 0),
    ]);
  const user = await getUser();
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value || "";

  if (!token) {
    dataPropiedades = await getServerSideProps("propiedades", 0);
  } else {
    dataPropiedades = await getServerSideProps(
      "propiedades/propiedadesConFavoritos",
      0
    );
  }

  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMontserrat.variable} antialiased`}
      >
        <GoogleOAuthProvider clientId={config.GOOGLE_CLIENT_ID!}>
          <AuthProvider
            dataCiudadesInitial={dataCiudades}
            dataPropiedadesInitial={dataPropiedades}
            dataTiposPropiedadesInitial={dataTiposPropiedades}
            userAuthenticated={user}
            dataContactoInitial={dataContacto}
            dataBannersInitial={dataBanners}
          >
            {children}
            <ModalRender />
          </AuthProvider>
          <Toaster
            position="top-center"
            richColors
            closeButton
            duration={4000}
            toastOptions={{
              style: {
                fontFamily: "inherit",
              },
            }}
          />
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}
