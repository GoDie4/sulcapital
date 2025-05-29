import type { Metadata } from "next";
import { Geist, Montserrat } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/assets/context/AuthContext";
import { ModalRender } from "./_components/modal/ModalRender";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMontserrat = Montserrat({
  variable: "--font-geist-montserrat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SULCAPITAL | Property Investments",
  description:
    "SULCAPITAL ofrece distintos tipos de inmuebles en la selva central del Perú, incluyendo terrenos, departamentos y casas para inversión o vivienda. Encuentra oportunidades únicas con asesoría especializada.",
  openGraph: {
    images: [
      {
        url: "https://sulcapital.exportando.online/images/slides/slide1.webp",
        width: 1200,
        height: 630,
        alt: "Inmuebles en la selva central del Perú",
      },
    ],
  },
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMontserrat.variable} antialiased`}
      >
        <AuthProvider>
          {children}
          <ModalRender />
        </AuthProvider>
      </body>
    </html>
  );
}
