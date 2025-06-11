import Link from "next/link";
import { FormLogin } from "./_components/FormLogin";

/* eslint-disable @next/next/no-img-element */
export default function page() {
  return (
    <section className="h-screen flex items-center justify-center bg-[url(/images/fondos/portada_login.webp)] relative z-10 before:absolute before:w-full before:h-full before:inset-0 before:bg-black-main before:opacity-30 before:-z-10">
      <div className="py-8 ">
        <div className="w-full min-w-[450px] animate-fade-in">
          <div className="shadow-xl border-0 bg-white-main p-6">
            <div className="text-center pb-6 mb-6">
              <div className="flex justify-center mb-4">
                <Link
                  href={"/"}
                  className="p-3 bg-primary-main/10 rounded-full"
                >
                  <img
                    src="/images/logo/ico_color.png"
                    alt=""
                    className="w-[50px]"
                  />
                </Link>
              </div>
              <div className="text-2xl font-bold text-secondary-main font-TypographBold">
                Iniciar Sesión
              </div>
              <div className="text-gray-600">
                Accede a tu cuenta de Sulcapital
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
    </section>
  );
}
