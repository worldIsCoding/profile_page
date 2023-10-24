"use client";

import React, { useLayoutEffect } from "react";
import { useState, useEffect, useMemo, useContext } from "react";
import clsx from "clsx";
import { useIsClient } from "usehooks-ts";
import { MotionValue, useMotionValueEvent, useScroll } from "framer-motion";

const LayoutContext = React.createContext(
  {} as {
    currentScrollYProgress: number;
    scrollYProgress: MotionValue<number>;
    setIsShowHeader:(boolean:boolean)=>void
    isShowHeader:boolean
  }
);

export const LayoutProvider = (props: { children?: React.ReactNode }) => {
  const isClient = useIsClient();

  const [isShowHeader,setIsShowHeader]=useState(false)

  const [currentScrollYProgress, setCurrentScrollYProgress] =
    useState<number>(0);

    useEffect(()=>{
        window.scrollTo(0, 0)
    },[])
  //   useEffect(() => {
  //     if(isClient)
  //       getDefaultTheme();
  //   }, [isClient]);

  const { scrollYProgress } = useScroll();

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setCurrentScrollYProgress(latest * 100);
  });

  return (
    <LayoutContext.Provider
      value={{
        currentScrollYProgress: currentScrollYProgress,
        scrollYProgress: scrollYProgress,
        isShowHeader:isShowHeader,
        setIsShowHeader:(boolean:boolean)=>setIsShowHeader(boolean),
      }}
    >
      <>{props.children}</>
    </LayoutContext.Provider>
  );
};

export const useLayout = () => useContext(LayoutContext);
