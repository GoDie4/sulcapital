/* eslint-disable @next/next/no-img-element */
"use client";
import React, { Dispatch, SetStateAction } from "react";
import { GoTriangleDown } from "react-icons/go";
import { TbMenu2 } from "react-icons/tb";
import { IoCloseOutline } from "react-icons/io5";
import { useAuth } from "@/assets/context/AuthContext";
export const HeaderSistema = ({
  scrolled,
  setShowMenu,
  showMenu,
}: {
  scrolled: boolean;
  setShowMenu: Dispatch<SetStateAction<boolean>>;
  showMenu: boolean;
}) => {
  const { authUser } = useAuth();
  return (
    <div
      className={`w-full z-[1200] top-0 left-0 flex items-center justify-between gap-3 pl-4 lg:pl-6 pr-4 h-20 ${
        scrolled ? "fixed " : "relative "
      }`}
    >
      <div className="flex items-center gap-2 w-full">
        <button
          type="button"
          onClick={() => {
            setShowMenu(!showMenu);
          }}
          className="flex items-center justify-center w-8 h-8 p-1 text-xl rounded-full bg-primary-main lg:hidden text-white-main"
        >
          {showMenu ? <IoCloseOutline /> : <TbMenu2 />}
        </button>
        <div className="w-full ">
          <input
            className="w-full rounded-md bg-white-main py-3 h-12 px-5 border placeholder:text-sm focus:border-secondary-main outline-none "
            placeholder="Busca cualquier cosa"
          />
        </div>
      </div>
      <div className="w-fit">
        <button
          type="button"
          className="relative flex bg-white-main h-12 items-center gap-1 px-2 py-3 md:px-4 btn--menuProfile rounded-md sm:gap-2 hover:bg-secondary-50"
        >
          {authUser?.provider === "credentials" ? (
            <span className="flex items-center justify-center flex-1 w-6 h-6 font-bold uppercase rounded-full bg-primary-main sm:w-8 sm:h-8 text-white-main">
              <p className="text-sm sm:text-base text-white-main ">
                {authUser !== null && authUser !== undefined
                  ? authUser.nombres.charAt(0)
                  : ""}
              </p>
            </span>
          ) : (
            <img src={authUser?.avatarUrl} alt="" className="block w-9 h-9 rounded-full" />
          )}
          <p className="hidden text-sm sm:block sm:text-base lg:text-black-main">
            {authUser?.nombres}
          </p>

          <span className="text-secondary-main lg:text-black-main">
            <GoTriangleDown />
          </span>
        </button>
      </div>
    </div>
  );
};
