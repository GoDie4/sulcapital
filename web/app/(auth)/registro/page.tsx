/* eslint-disable @next/next/no-img-element */
import { BsArrowLeft } from "react-icons/bs";
import { FormRegistro } from "./_components/FormRegistro";
import Link from "next/link";

const Register = () => {
  return (
    <section className="h-screen flex items-center justify-center bg-[url(/images/fondos/portada_registro.webp)] relative z-10 before:absolute before:w-full before:h-full before:inset-0 before:bg-black-main before:opacity-30 before:-z-10">
      <div className=" bg-transparent">
        <div className="flex items-center justify-center  py-8 px-4 sm:px-6 lg:px-8">
          <div className="w-full max-w-xl animate-fade-in">
            <div className="shadow-xl border-0 bg-white-main p-6 relative">
              <Link
                href={"/"}
                className="flex items-center gap-1 text-sm  text-primary-main absolute top-3 left-3"
              >
                <BsArrowLeft /> Regresar
              </Link>
              <div className="text-center pb-5 mb-4">
                <div className="flex justify-center mb-4">
                  <Link
                    href={"/"}
                    className="p-3 bg-primary-main/10 rounded-full"
                  >
                    <img
                      src="/images/logo/ico_color.png"
                      alt=""
                      className="w-[40px]"
                    />
                  </Link>
                </div>
                <div className="text-2xl font-bold text-secondary-main font-TypographBold">
                  Crear Cuenta
                </div>
                <div className="text-gray-600">
                  Únete a Sulcapital y encuentra tu hogar ideal
                </div>
              </div>

              <div className="space-y-6">
                <FormRegistro />

                <div className="text-center">
                  <span className="text-sm text-gray-600">
                    ¿Ya tienes una cuenta?{" "}
                    <Link
                      href="/iniciar-sesion"
                      className="text-secondary-main hover:text-secondary-main/80 underline font-medium transition-colors"
                    >
                      Inicia sesión aquí
                    </Link>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
