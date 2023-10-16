import { useTranslation } from "@/i18n/client";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useMemo, useState } from "react";

import { useLayout } from "@/hook/useLayoutHook";

export const Nav = ({
//   onClickOption,
}: {
//   onClickOption: (index: number) => void;
}) => {
  const { t } = useTranslation();
  const {isShowHeader, currentScrollYProgress, scrollYProgress } = useLayout();

  const optionList = useMemo(() => {
    return [
      {
        name: "AboutMe",
        
        onClick: () => onClickOption("#about_me"),
      },
      {
        name: "Job",
        onClick: () => onClickOption("#job"),
      },
      {
        name: "Project",
        onClick: () => onClickOption("#project"),
      },
    ];
  }, []);

  const onClickOption=(id:string )=>{
    const section = document.querySelector( id );
    section && section.scrollIntoView( { behavior: 'smooth', block: 'start' } );
  }

  return (
    <motion.nav
      className="z-50 fixed top-0 w-full h-14 bg-black/90"
      initial={{ opacity: 0 }}
      animate={isShowHeader ? { opacity: 1, scaleX: 1 } : { scaleX: 0, opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mx-auto h-full container flex flex-row items-center w-full  gap-10">
        {optionList.map((data, index) => {
          return (
            <motion.div
              className="cursor-pointer text-white"
              key={index}
              onClick={
                
                data.onClick}
            >
              {data.name}
            </motion.div>
          );
        })}
      </div>

      <motion.div
        className="absolute bottom-0 w-full h-1    bg-blue-400  shadow-2xl shadow-white"
        style={{ scaleX: scrollYProgress }}
      />
    </motion.nav>
  );
};
