
"use client"
import {motion, useScroll,useMotionValueEvent } from "framer-motion"
import human from "@public/images/human.png"
import Image from "next/image"
import { useState } from "react"

export const Landing=()=>{


    const { scrollYProgress ,scrollY} = useScroll();

    const [currentScrollYProgress,setCurrentScrollYProgress]=useState<number>(0)

    useMotionValueEvent(scrollYProgress,"change",(latest)=>{
        console.log("Page scroll: ", latest);

        setCurrentScrollYProgress( (latest*100) )
    })
    
    return (
        <div>
        <motion.div className=" sticky top-0"
        >
           <span className=" text-2xl text-black"> scrollYProgress:{((currentScrollYProgress).toFixed(2)) +"%"}</span>
        <motion.div  
        // initial={{rotate:0}}
        style={{ rotate: Number(currentScrollYProgress)*3.6
        
        }}
        className=" w-20 h-20 rounded-full "
        >

<Image  src={human} alt={""}  />
</motion.div>
        </motion.div>

        <motion.div className="w-full h-4 bg-red-500 sticky top-0 "  style={{ scaleX: scrollYProgress }} />  

<motion.div
    initial={{opacity:0}}
    whileInView={{opacity:1}}
    exit={{opacity:0}}
    viewport={{once:false, amount:0.8}}

className="h-screen bg-blue-300 w-full ">section1</motion.div>
           
            <motion.div
            initial={{opacity:0}}
            whileInView={{opacity:1}}
            exit={{opacity:0}}
            viewport={{once:false, amount:0.8}}
            className="h-screen bg-red-300 w-full ">section2</motion.div>

        </div>
    )
}