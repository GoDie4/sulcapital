'use client'
import React, { ReactNode } from "react";

interface ContentMain {
  children: ReactNode;
  className?: string;
}

export const ContentMain: React.FC<ContentMain> = ({ children, className }) => {
  return (
    <div
      className={`${
        className ?? ""
      } w-full max-w-[1520px] px-4 md:px-6  mx-auto`}
    >
      {children}
    </div>
  );
};
