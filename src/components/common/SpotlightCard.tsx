import { useMotionValue,motion, useMotionTemplate, AnimatePresence } from "framer-motion";
import { useEffect, useState ,MouseEvent} from "react";
import clsx from "clsx"

export const SpotlightCard=(props:{children:React.ReactNode})=>{
    const {children}=props

     const mouseX= useMotionValue(0)
     const mouseY= useMotionValue(0)

     const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {}, []);


  const mouseMoveHandle = ({clientX,clientY,currentTarget  }: MouseEvent) => {
    const {left, top}= currentTarget.getBoundingClientRect();

    const xPosition=clientX -left
    const yPosition=clientY -top
  
    mouseX.set(xPosition)
    mouseY.set(yPosition)
  };


  
    return (

      <div className="relative  group bg-primary-700/30 z-auto"
      onMouseMove={mouseMoveHandle}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        >
      <div  className="absolute  backdrop-blur  w-full h-full -z-10"/>
            {/* <div  className="spotlight-shadow"/> */}
            
           <motion.div 
            className={clsx("top-0 bottom-0 right-0 left-0  absolute  pointer-events-none   ",
            "group-hover:opacity-100 opacity-0 ")} 
        style={{background:useMotionTemplate`radial-gradient(circle at ${mouseX}px ${mouseY}px, rgb(212,240,252,0.3),transparent 50%) `}}
        />
     

      <div className="z-auto p-10 relative w-full h-full"> 
      {children}
      </div>
        </div>
    
    )
}