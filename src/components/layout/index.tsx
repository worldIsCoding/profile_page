"use client";
import { DarkModeProvider , useDarkMode} from "@/hook/useDarkModeHook";
import { useState, useEffect, useMemo, useContext } from "react";
import { motion,AnimatePresence  } from "framer-motion";
import { useIsClient } from "usehooks-ts";
import clsx from "clsx";

import DayImage from "@public/images/pexels-jimmy-chan-day.jpg"
import NightImage from "@public/images/pexels-pixabay-night.jpg"
import {Header} from  "./Header"
import {Background} from "./Background"

// const Background=()=>{
//   const {isDarkMode}=useDarkMode()
//   return (
//     <div className="fixed top-0 bottom-0 right-0 left-0 -z-10  ">
     
//      {isDarkMode&&<motion.img 
//     initial={{opacity:0}}
//     animate={{opacity:1, }}
//       transition={{duration:0.5,ease:"linear"}}
//     className={clsx("w-full h-full object-cover  ")}
//     src={NightImage.src}  
//     />
//   }

//       <motion.img  
//       src={DayImage.src}   
//       initial={{opacity:isDarkMode?0:1}}
//       animate={{opacity:isDarkMode?0:1 }}
//       transition={{duration:0.5,ease:"linear"}}
//       className={clsx("w-full h-full object-cover  ",isDarkMode&&"hidden")}
//        alt="bg"/>
//     </div>
//   )
// }

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
    <AnimatePresence initial={false}>
     
      <div className={clsx("h-screen relative  ")}> 
      <Header />
      
      


  
        
        {/* <motion.div
          className="cursor"
          variants={variants}
          animate={"default"}
        /> */}
       
       {children}


        
      <Background />
    
      </div>
      </AnimatePresence>
   
  );
};
