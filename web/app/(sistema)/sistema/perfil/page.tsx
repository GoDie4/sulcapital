'use client'
import Link from "next/link";
import { FormEditarContrasena } from "./_components/EditarContrasenaPerfil";
import { FormEditarPerfil } from "./_components/FormEditarPerfil";
import { useAuth } from "@/assets/context/AuthContext";

export default function Perfil() {
  const { authUser } = useAuth();
  return (
    <>
      <div className="w-full">
        {authUser?.rol_id === 2 && (
          <Link
            href={"/sistema/propiedades"}
            className="block underline text-red-500"
          >
            Ir a mis propiedades
          </Link>
        )}
      </div>
      <section className="w-full flex flex-col gap-3 lg:flex-row">
        <div className="w-full lg:w-1/2">
          <FormEditarPerfil />
        </div>
        <div className="w-full lg:w-1/2">
          <FormEditarContrasena />
        </div>
      </section>
    </>
  );
}
