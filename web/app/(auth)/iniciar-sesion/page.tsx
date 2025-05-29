import Link from "next/link";
import { FormLogin } from "./_components/FormLogin";
import { BannerInternas } from "../../_components/estructura/BannerInternas";

/* eslint-disable @next/next/no-img-element */
export default function page() {
  return (
    <>
      <BannerInternas
        title="Ingresar"
        image="/images/fondos/fondo_login.webp"
      />

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
                Iniciar Sesión
              </div>
              <div className="text-gray-600">
                Accede a tu cuenta de InmoPortal
              </div>
            </div>

            <div className="space-y-6">
              <FormLogin />

              <div className="text-center">
                <span className="text-sm text-gray-600">
                  ¿No tienes una cuenta?{" "}
                  <Link
                    href="/registro"
                    className="text-secondary-main hover:text-secondary-main/80 font-medium transition-colors"
                  >
                    Regístrate aquí
                  </Link>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
