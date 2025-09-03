"use client";
import React from "react";
import { useAuth } from "@/assets/context/AuthContext";
import ModalWrapper from "./ModalWrapper";

export const ModalRender = () => {
  const { modalContent, modalSize } = useAuth();
  return (
    <>
      <ModalWrapper componente={modalContent} modalSize={modalSize} />
    </>
  );
};
