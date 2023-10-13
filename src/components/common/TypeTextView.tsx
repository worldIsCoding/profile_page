
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { DocumentTextIcon } from "@heroicons/react/20/solid";

import { useEffect, useMemo, useState } from "react";
import clsx from "clsx"

export interface IAnimTextProps {
    baseText:string
    delay: number;
    duration?:number;
    className?:string
    cursorClassName?:string
    hiddenCursor?:boolean
  }
  

  const cursorVariants = {
    blinking: {
      opacity: [0, 0, 1, 1],
      transition: {
        duration: 1,
        repeat: Infinity,
        repeatDelay: 0,
        ease: "linear",
        times: [0, 0.5, 0.5, 1]
      }
    }
  };


 export const TypeTextView=({baseText, delay,duration=3,className,cursorClassName,hiddenCursor }: IAnimTextProps)=>{
    const [done, setDone] = useState(false);
    const count = useMotionValue(0);
    const rounded = useTransform(count, (latest) => Math.round(latest));

    const displayText =  useTransform(rounded, (latest) =>  baseText?.slice(0, latest))
        
  

  useEffect(() => {
 
    const controls = animate(count, baseText?.length, {
      type: "tween",
      delay: delay,
      duration: duration,
      ease: "easeInOut",
      onPlay:()=>{
        setShowCursor(true)
      },
      onComplete: () => {
        setDone(true);
        setShowCursor(false)
      }
    });
    // animate(count, 60, {
    //     type: "tween",
    //     delay: delay,
    //     duration: 1,
    //     ease: "easeIn",
    //     repeat: Infinity,
    //     repeatType: "reverse",
    //     repeatDelay: 1,
    //     onUpdate(latest) {
    //       if (updatedThisRound.get() === true && latest > 0) {
    //         updatedThisRound.set(false);
    //       } else if (updatedThisRound.get() === false && latest === 0) {
    //         if (textIndex.get() === texts.length - 1) {
    //           textIndex.set(0);
    //         } else {
    //           textIndex.set(textIndex.get() + 1);
    //         }
    //         updatedThisRound.set(true);
    //       }
    //     }
    //   });
    return controls.stop;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);



  const [showCursor,setShowCursor]=useState(false)

    return (
<span className={clsx("selection",className)}>
      <motion.span >{displayText}</motion.span>
      {showCursor&& <motion.div
      variants={cursorVariants}
      animate="blinking"
      className={clsx("inline-block  h-9 w-[4px] translate-y-1 bg-slate-900",cursorClassName)}
    />}
    </span>

    )
}