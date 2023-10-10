import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useState } from "react";
import Image from "next/image"
import human from "@public/images/human.png";
import Typewriter from 'typewriter-effect';
 

export const ProfileIcon =()=>{


    const [currentScrollYProgress, setCurrentScrollYProgress] =
    useState<number>(0);

  const { scrollYProgress, scrollY } = useScroll();

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    console.log("Page scroll: ", latest);

    setCurrentScrollYProgress(latest * 100);
  });

  
    return(

        <div className="TODO w-full flex flex-col justify-center  items-center">
        

        <div className=" border-4 rounded-full overflow-hidden m-4">
        <motion.div
            style={{ rotate: Number(currentScrollYProgress) * 3.6 }}
            className=" w-20 h-20 rounded-full  "
          >
            
            <Image src={human} alt={""} />
          </motion.div>
          </div>


          <div className="text-4xl ">
           
           <Typewriter
  onInit={(typewriter) => {
    typewriter.typeString(`Hello World!  I'm Angus`)
      .callFunction(() => {
        console.log('String typed out!');
      })
      .pauseFor(1000)
      .start();
  }}
/>
          </div>
        </div>
    )
}