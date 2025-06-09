import { config } from "@/assets/config/config";
import axios from "axios";

export const registrarReciente = async (propiedadId: string) => {
  try {
    await axios.post(
      `${config.API_URL}/vistos/agregar`,
      {
        propiedadId,
      },
      {
        withCredentials: true,
      }
    );
  } catch (err) {
    console.error("Error al registrar recientemente visto", err);
  }
};
