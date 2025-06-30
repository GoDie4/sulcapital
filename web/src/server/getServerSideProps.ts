/* eslint-disable @typescript-eslint/no-explicit-any */
import { config } from "@/assets/config/config";
import { cookies } from "next/headers";

export async function getServerSideProps(url: string, revalidateTime?: number) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  
  const fetchOptions: RequestInit = {
    headers: {
      Cookie: `token=${token}`,
    },
  };

  // Lógica para cacheo o no cacheo
  if (revalidateTime !== undefined) {
    (fetchOptions as any).next = { revalidate: revalidateTime }; 
  } else {
    // Si no se especifica revalidateTime, por defecto no cachear (para el usuario, etc.)
    fetchOptions.cache = 'no-store'; 
  }

  // --- ANTES DE HACER EL FETCH, AJUSTA PARA PROPIEDADES CON FAVORITOS ---
  // Si la URL es la de propiedades con favoritos y es personalizada, FUERZA 'no-store'
  if (url === "propiedades/propiedadesConFavoritos") {
    fetchOptions.cache = 'no-store'; 
  }
  // --- FIN AJUSTE ---

  try {
    const res = await fetch(`${config.API_URL}/${url}`, fetchOptions);

    const contentType = res.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      console.error(`Expected JSON, but received ${contentType} for URL: ${url}`);
      return null;
    }
    const data = await res.json();
    
    if (url === "contacto") {
      return data.contacto;
    } else {
      return data.data;
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}