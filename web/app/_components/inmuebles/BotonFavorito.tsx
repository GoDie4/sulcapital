"use client";
import { config } from "@/assets/config/config";
import { useAuth } from "@/assets/context/AuthContext";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import { toast } from "sonner";

interface BotonFavoritoProps {
  itemId: string;
  initialIsFavorite?: boolean;
}

const BotonFavorito: React.FC<BotonFavoritoProps> = ({
  itemId,
  initialIsFavorite = false,
}) => {
  const [isFavorite, setIsFavorite] = useState(initialIsFavorite);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const { authUser } = useAuth();
  const handleClick = async (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();

    if (authUser === null || authUser == undefined) {
      router.push("/iniciar-sesion");
      return;
    }

    if (isLoading) return;

    setIsLoading(true);

    try {
      let response;
      if (isFavorite) {
        response = await axios.delete(`${config.API_URL}/favoritos/eliminar`, {
          data: { propiedadId: itemId },
          withCredentials: true,
        });
      } else {
        response = await axios.post(
          `${config.API_URL}/favoritos/agregar`,
          { propiedadId: itemId },
          { withCredentials: true }
        );
      }

      toast.success(response.data?.mensaje);
      setIsFavorite(!isFavorite);
    } catch (err) {
      console.error("Error al actualizar favorito:", err);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="w-fit">
      <button
        type="button"
        onClick={handleClick}
        className={`text-gray-400 group active:scale-75 w-5 h-5 text-lg sm:text-xl transition-all duration-150 ${
          isLoading ? "opacity-50 cursor-not-allowed" : ""
        }`}
        disabled={isLoading}
      >
        {!isFavorite && (
          <span className="block">
            <BsHeart className="text-secondary-main " />
          </span>
        )}
        {isFavorite && (
          <span className="block">
            <BsHeartFill className="text-secondary-main " />
          </span>
        )}
      </button>
    </div>
  );
};

export default BotonFavorito;
