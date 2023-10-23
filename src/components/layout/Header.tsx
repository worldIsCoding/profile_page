import Image from "next/image";
import { DarkModeProvider, useDarkMode } from "@/hook/useDarkModeHook";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useMemo, useRef, useState } from "react";
import SettingIcon from "@public/images/setting.svg";
import { useOnClickOutside } from "usehooks-ts";
import { Menu } from "./Menu";
import { OptionList } from "../pageView/landing/OptionList";
import { useTranslation } from "@/i18n/client";
import { useLayout } from "@/hook/useLayoutHook";
import clsx from "clsx";
import { useMediaQuery } from "usehooks-ts";

export const Header = () => {
  const matches = useMediaQuery("(min-width: 1024px)");

  const menuRef = useRef(null);

  const [showMenu, setShowMenu] = useState<boolean>(false);

  const { t } = useTranslation();
  const { isShowHeader, currentScrollYProgress, scrollYProgress } = useLayout();

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

  const onClickOption = (id: string) => {
    const section = document.querySelector(id);
    section && section.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleClickOutsideMenu = () => {
    setShowMenu(false);
  };
  useOnClickOutside(menuRef, handleClickOutsideMenu);

  return (
    <motion.nav
      className={clsx(
        "backdrop-blur z-50 fixed top-0 w-full h-14 bg-gradient-to-r from-primary-700 to-black to-70% "
        // `to-[${scrollYProgress}]`
      )}
      initial={{ opacity: 0 }}
      style={{
        background: `linear-gradient(to right, #000 ${currentScrollYProgress}%,  #01303f  ,#02577a  )`,
      }}
      // style={{gradientColorStopPositions:currentScrollYProgress}}
      animate={
        !matches || isShowHeader
          ? { opacity: 1, width: "100%", y: 0 }
          : { opacity: 0, y: -50 }
      }
      transition={{ duration: 0.3 }}
    >
      <div className="mx-auto h-full container flex flex-row items-center w-full gap-4 lg:gap-10  px-4 ">
        {optionList.map((data, index) => {
          return (
            <motion.div
              className="cursor-pointer text-white "
              key={index}
              onClick={data.onClick}
            >
              {data.name}
            </motion.div>
          );
        })}
      </div>

      <motion.div
        className="absolute bottom-0 w-full h-1   left-0  "
        style={{
          width: `${currentScrollYProgress}%`,
          background: `linear-gradient(to right, #fff ${currentScrollYProgress}%, #d4f0fc , #89d6fb  )`,
        }}
      />
      {/* <motion.div 
       whileHover={{scale:1.2}}
       whileTap={{scale:0.8, }}
      className="w-16 h-16  relative rounded-full shadow-xl shadow-primary-500  " ref={menuRef}>
        <motion.button className=" z-50 w-full h-full   text-primary-500   rounded-full "
        style={{rotate: Number(currentScrollYProgress) * 3.6 }}
       
        onClick={(e)=>{
            e.preventDefault()
          setShowMenu(!showMenu)
        }}
        >
          <SettingIcon  /></motion.button>

          {showMenu&&
          <Menu />
          }
          </motion.div> */}
    </motion.nav>
  );
};
