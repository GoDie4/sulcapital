"use client";
import React, { useEffect } from "react";
import { useAuth } from "@/assets/context/AuthContext";
import ModalWrapper from "./ModalWrapper";
import { usePathname } from "next/navigation";

export const ModalRender = () => {
  const { modalContent, modalSize, setShowMenu } = useAuth();

  const pathname = usePathname();

  useEffect(() => {
    setShowMenu(false);
  }, [pathname, setShowMenu]);
  return (
    <>
      <ModalWrapper componente={modalContent} modalSize={modalSize} />
    </>
  );
};
