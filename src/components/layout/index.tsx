"use client";
import { DarkModeProvider , useDarkMode} from "@/hook/useDarkModeHook";
import { useState, useEffect, useMemo, useContext } from "react";
import { motion,AnimatePresence  } from "framer-motion";
import { useIsClient } from "usehooks-ts";
import clsx from "clsx";

import DayImage from "@public/images/pexels-jimmy-chan-day.jpg"
import NightImage from "@public/images/pexels-pixabay-night.jpg"
import {Background} from "./Background"
import {Header} from "./Header"

export const Layout = ({ children }: { children: React.ReactNode }) => {
  
  
  return (
    // <AnimatePresence initial={false} >
     
      <div className={clsx("h-auto relative    overflow-x-hidden")}> 
      <Header  />
       {children}
      <Background />
    
      </div>
      // </AnimatePresence>
   
  );
};
