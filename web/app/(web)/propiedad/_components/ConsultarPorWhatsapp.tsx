/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
import { FloatingWhatsApp } from "react-floating-whatsapp";

export const ConsultarPorWhatsapp = ({ propiedad }: { propiedad: any }) => {
  return (
    <FloatingWhatsApp
      phoneNumber={propiedad.usuario.whatsapp ?? ""}
      accountName={propiedad.usuario.nombres}
      avatar="/images/logo/ico_color.png"
      statusMessage="En línea"
      chatMessage="¡Hola! Gracias por tu interés en la propiedad, ¿en qué puedo ayudarte?"
      placeholder="Escribe un mensaje"
      allowClickAway
      notification
      notificationSound
    />
  );
};
