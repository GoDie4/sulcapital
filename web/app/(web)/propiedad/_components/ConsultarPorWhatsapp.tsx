/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useAuth } from "@/assets/context/AuthContext";
import { useRouter } from "next/navigation";
import React from "react";
import { FloatingWhatsApp } from "react-floating-whatsapp";

export const ConsultarPorWhatsapp = ({ propiedad }: { propiedad: any }) => {
  const ruta = useRouter();
  const { authUser } = useAuth();

  function sendWhatsAppMessage(phone: string, message: string) {
    if (!authUser) {
      ruta.push("/iniciar-sesion");
      return;
    }

    const url = `https://api.whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(
      message
    )}`;
    window.open(url, "_blank");
  }
  return (
    <FloatingWhatsApp
      phoneNumber={propiedad.usuario.celular ?? ""}
      onSubmit={() =>
        sendWhatsAppMessage(
          `${propiedad.usuario.celular ?? ""}`,
          `Hola! Estoy interesado en tu propiedad 🚀\n\n¿Podrías brindarme más detalles?`
        )
      }
      accountName={propiedad.usuario.nombres}
      avatar="/images/logo/wsp.png"
      statusMessage="En línea"
      chatMessage="¡Hola! Gracias por tu interés en la propiedad, ¿en qué puedo ayudarte?"
      placeholder="Escribe un mensaje"
      notification
      notificationSound
    />
  );
};
