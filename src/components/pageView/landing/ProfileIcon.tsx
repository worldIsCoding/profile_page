import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import human from "@public/images/human.png";
import Typewriter from "typewriter-effect";
import clsx from "clsx";

export const ProfileIcon = () => {
  const [currentScrollYProgress, setCurrentScrollYProgress] =
    useState<number>(0);

  const { scrollYProgress, scrollY } = useScroll();

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    console.log("Page scroll: ", latest);

    setCurrentScrollYProgress(latest * 100);
  });

  return (
    <div className="  w-full flex flex-col justify-center  items-center ">

      <div className="   m-8 relative   ">
        <svg
          className="transform rounded-full  z-0  -rotate-90  absolute top-1/2 bottom-1/2 right-1/2 left-1/2  -translate-x-1/2 -translate-y-1/2 "
          width="100%"
          height="100%"
          viewBox="0 0 100 100"
        >
          <circle
            cx="50"
            cy="50"
            r="40"
            pathLength="1"
            className="fill-transparent stroke-[8]    stroke-white"
          />
          <motion.circle
            cx="50"
            cy="50"
            r="40"
            pathLength="1"
            className={clsx("stroke-red-500 stroke-[8] fill-transparent  ")}
            style={{ pathLength: scrollYProgress }}
          />
        </svg>

      <div className=" p-4 rounded-full z-10 bg-white">
        <motion.div
        initial={{rotate:0}}
          style={{ rotate: Number(currentScrollYProgress) * 3.6 }}
          className=" w-40 h-40 rounded-full z-10   "
        >
          <Image src={human} alt={""} className="" />
        </motion.div>
      </div>
      </div>
    </div>
  );
};
