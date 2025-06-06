import { FormEditarContrasena } from "./_components/EditarContrasenaPerfil";
import { FormEditarPerfil } from "./_components/FormEditarPerfil";

export default function page() {
  return (
    <>
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
