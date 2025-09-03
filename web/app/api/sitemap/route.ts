/* eslint-disable @typescript-eslint/no-explicit-any */
import { config } from "@/assets/config/config";
import axios from "axios";
import { NextResponse } from "next/server";

export async function GET() {
  const baseUrl = "https://www.sulcapital.pe"; 

  try {
    // Cambia esta URL a tu API real
    const response = await axios.get(
      `${config.API_URL}/propiedades`
    );
    const propiedades = response.data.data ?? [];
    console.log(propiedades)

    const urls = propiedades.map((p: any) => {
      return `
        <url>
          <loc>${baseUrl}/propiedad/${p.id}/${p.slug}</loc>
          <lastmod>${new Date(p.updatedAt).toISOString()}</lastmod>
          <changefreq>weekly</changefreq>
          <priority>0.8</priority>
        </url>
      `;
    });

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        <url>
          <loc>${baseUrl}</loc>
          <changefreq>daily</changefreq>
          <priority>1.0</priority>
        </url>
        ${urls.join("")}
      </urlset>`;

    return new NextResponse(xml, {
      status: 200,
      headers: {
        "Content-Type": "application/xml",
      },
    });
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error:", {
        message: error.message,
        url: error.config?.url,
        status: error.response?.status,
        data: error.response?.data,
      });
    } else {
      console.error("Unexpected error:", error);
    }
    console.log(error);
    return new NextResponse("Error al generar sitemap", { status: 500 });
  }
}
