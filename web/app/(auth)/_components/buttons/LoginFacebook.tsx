"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { FacebookAuthProvider, signInWithPopup } from "firebase/auth";
import axios from "axios";
import { toast } from "sonner";
import { Facebook } from "lucide-react";
import { auth } from "@/assets/config/firebase";
import { config } from "@/assets/config/config";
import { useRouter } from "next/navigation";
import { useAuth } from "@/assets/context/AuthContext";

export const FacebookLoginButton = ({ rol }: { rol: string }) => {
  const { setAuthUser } = useAuth();
  const router = useRouter();

  const handleFacebookLogin = async () => {
    const provider = new FacebookAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const credential = FacebookAuthProvider.credentialFromResult(result);
      const accessToken = credential?.accessToken;

      if (!accessToken) {
        toast.error("No se pudo obtener el token de Facebook");
        return;
      }

      // Enviar token y rol a tu backend
      const res = await axios.post(
        `${config.API_URL}/auth/facebook`,
        {
          access_token: accessToken,
          rol,
        },
        { withCredentials: true }
      );

      if (res.status === 200) {
        toast.success("Sesión iniciada con Facebook");

        console.log("DATA: ", res.data);
        setAuthUser(res.data.usuario);

        const usuario = res.data.usuario;
        if (usuario.rol_id === 2) router.push("/sistema/propiedades");
        else if (usuario.rol_id === 3) router.push("/sistema/favoritos");
        else router.push("/sistema");
      }
    } catch (error: any) {
      console.error("Error en login con Facebook:", error);
      toast.error("Error al iniciar sesión con Facebook");
    }
  };

  return (
    <button
      type="button"
      onClick={handleFacebookLogin}
      className="w-full text-sm rounded-md h-12 bg-[#1877F2] hover:bg-[#166FE5] transition-all duration-200 group"
    >
      <div className="flex items-center text-left space-x-1">
        <Facebook className="w-5 h-5 text-white-main" />
        <span className="text-white-main ">Continuar con Facebook</span>
      </div>
    </button>
  );
};
