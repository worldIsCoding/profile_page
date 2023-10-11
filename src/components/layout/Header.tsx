
import Image from "next/image";
import { DarkModeProvider, useDarkMode } from "@/hook/useDarkModeHook";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useRef, useState } from "react";
import SettingIcon from "@public/images/setting.svg";
import { useOnClickOutside } from 'usehooks-ts'
import {Menu} from "./Menu"

export const Header = () => {

  const menuRef=useRef(null)
  const [showMenu,setShowMenu]=useState<boolean>(false)
  const [currentScrollYProgress, setCurrentScrollYProgress] =
    useState<number>(0);

  const { scrollYProgress, scrollY } = useScroll();

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    console.log("Page scroll: ", latest);

    setCurrentScrollYProgress(latest * 100);
  });


  const handleClickOutsideMenu=()=>{
    setShowMenu(false)
  }
  useOnClickOutside(menuRef, handleClickOutsideMenu)


  return (
    <>
      <motion.nav className=" fixed top-0 right-0 left-0 h-20  z-10 ">
        

        <div className="h-full  z-10  flex flex-row items-center justify-between px-6 lg:px-10">
        <div />

      <div className=" relative" ref={menuRef}>
        <motion.button className="w-10 h-10 z-50   dark:text-dark-main-500 text-main-500  rounded-full"
        style={{rotate: Number(currentScrollYProgress) * 3.6 }}
        whileHover={{scale:1.2}}
        whileTap={{scale:0.8, }}
        onClick={(e)=>{
            e.preventDefault()
          setShowMenu(!showMenu)
        }}
        >
          <SettingIcon  /></motion.button>

          {showMenu&&

          <Menu />
          
          }
          </div>

          


        </div>
        <motion.div
          className="absolute top-0 w-full h-1    bg-normal-500 "
          style={{ scaleX: scrollYProgress }}
        />
      </motion.nav>
    </>
  );
};
