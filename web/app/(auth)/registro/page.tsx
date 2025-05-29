/* eslint-disable @next/next/no-img-element */
import { FormRegistro } from "./_components/FormRegistro";
import Link from "next/link";
import { BannerInternas } from "../../_components/estructura/BannerInternas";

const Register = () => {
  return (
    <>
      <BannerInternas
        title="Registrarse"
        image="/images/fondos/fondo_registro.webp"
      />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white-main to-blue-50">
        <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="w-full max-w-md animate-fade-in">
            <div className="shadow-xl border-0 bg-white-main p-6">
              <div className="text-center pb-6 mb-6">
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-primary-main/10 rounded-full">
                    <img
                      src="/images/logo/ico_color.png"
                      alt=""
                      className="w-[50px]"
                    />
                  </div>
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
    </>
  );
};

export default Register;
