import SunnyIcon from "@public/images/day-sunny-icon.svg";
import MoonIcon from "@public/images/moon-line-icon.svg";
import Image from "next/image";
import { DarkModeProvider, useDarkMode } from "@/hook/useDarkModeHook";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";

export const Header = () => {
  const { isDarkMode, changeTheme } = useDarkMode();

  const [currentScrollYProgress, setCurrentScrollYProgress] =
    useState<number>(0);

  const { scrollYProgress, scrollY } = useScroll();

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    console.log("Page scroll: ", latest);

    setCurrentScrollYProgress(latest * 100);
  });

  return (
    <>
      <motion.nav className=" fixed top-0 right-0 left-0 h-20  z-10 TODO bg-white/30">
        <div className="  z-10  flex flex-row items-center justify-between">
          
    <div />
          <div
            className="   w-12 h-12  cursor-pointer transition-all z-10"
            onClick={() => {
              changeTheme();
            }}
          >
            {isDarkMode ? (
              <SunnyIcon className={" w-full h-full"} />
            ) : (
              <MoonIcon className={"w-full h-full "} />
            )}
          </div>
        </div>
        <motion.div
          className="absolute bottom-0 w-full h-1 bg-black  "
          style={{ scaleX: scrollYProgress }}
        />
      </motion.nav>
    </>
  );
};
