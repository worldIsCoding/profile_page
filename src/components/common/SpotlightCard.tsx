import { useMotionValue,motion, useMotionTemplate } from "framer-motion";
import { useEffect, useState ,MouseEvent} from "react";
import clsx from "clsx"

export const SpotlightCard=(props:{children:React.ReactNode})=>{
    const {children}=props

     const mouseX= useMotionValue(0)
     const mouseY= useMotionValue(0)


  useEffect(() => {}, []);


  const mouseMoveHandle = ({clientX,clientY,currentTarget  }: MouseEvent) => {
    const {left, top}= currentTarget.getBoundingClientRect();

    const xPosition=clientX -left
    const yPosition=clientY -top
  
    mouseX.set(xPosition)
    mouseY.set(yPosition)
  };


  
    return (

        <div className="relative  spotlight_card  p-10 group "
        onMouseMove={mouseMoveHandle}
        >
            <div  className="spotlight-shadow"/>
            <motion.div 
            className={clsx("top-0 bottom-0 right-0 left-0  absolute  pointer-events-none  ",
            "group-hover:opacity-100 opacity-0 ")} 
        style={{background:useMotionTemplate`radial-gradient(200px circle at ${mouseX}px ${mouseY}px, rgb(212,240,252,0.3),transparent 100%) `}}
        />
        {children}
       

        <motion.div
        className="absolute inset-0 z-0 overflow-hidden bg-fixed"
        style={{
          clipPath: `polygon(0% 0%, 0% 100%, calc(0% + 1px) 100%, calc(0% + 1px) calc(0% + 1px), calc(100% - 1px) calc(0% + 1px), calc(100% - 1px) calc(100% - 1px), calc(0% + 1px) calc(100% - 1px), calc(0% + 1px) 100%, 100% 100%, 100% 0%)`,
          background: `radial-gradient(circle at ${mouseX}px ${mouseY}px, hsla(${(Number(mouseX) + Number(mouseY))/5},90%,70%,0.35) 0%,transparent 10%,transparent) fixed`
        }}
      ></motion.div>

        </div>
    )
}