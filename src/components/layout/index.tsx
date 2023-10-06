"use client";
import { DarkModeProvider } from "@/hook/useDarkModeHook";
import { useState, useEffect, useMemo, useContext } from "react";
import { motion } from "framer-motion";
import { useIsClient } from "usehooks-ts";
import clsx from "clsx";
import  SunnyIcon  from "@public/images/day-sunny-icon.svg"
import  MoonIcon  from "@public/images/moon-line-icon.svg"

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {}, []);

  useEffect(() => {
    window.addEventListener("mousemove", mouseMove);
    return () => {
      window.removeEventListener("mousemove", mouseMove);
    };
  }, []);

  const mouseMove = (e: MouseEvent) => {
    setMousePos({
      x: e.clientX,
      y: e.clientY,
    });
  };

  const variants = {
    default: {
      x: mousePos.x - 16,
      y: mousePos.y - 16,
    },
  };

  return (
    <DarkModeProvider>
      <div className={clsx("h-screen relative")}>

        <div className=" fixed right-0 top-0  w-12 h-12  cursor-pointer transition-all">
            <SunnyIcon className={" w-full h-full"} />
            </div>
        {/* <motion.div
          className="cursor"
          variants={variants}
          animate={"default"}
        /> */}
        {children}
      </div>
    </DarkModeProvider>
  );
};
