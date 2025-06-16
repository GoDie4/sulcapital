/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormEditContacto } from "./_components/FormEditContacto";
import { config } from "@/assets/config/config";
async function getContacto(): Promise<any> {
  const res = await fetch(`${config.API_URL}/contacto`, {
    cache: "no-store",
    // credentials: "include" ← solo si estás pasando cookies
  });

  if (!res.ok) {
    console.error("Error al obtener contacto:", res.statusText);
    return null;
  }

  const data = await res.json();
  console.log("👉 data recibida:", data);
  return data.contacto || null;
}

export default async function page() {
  const data = await getContacto();

  return (
    <>
      <FormEditContacto initialData={data} />
    </>
  );
}
