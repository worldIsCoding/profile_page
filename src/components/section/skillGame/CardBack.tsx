import { useMemo } from "react"

import cardBgA from"@public/images/skill/cardback/cardA.png"
import cardBgB from"@public/images/skill/cardback/cardB.png"

import Image from "next/image"


export const CardBack=()=>{


    
    const text=useMemo(()=>{
        return 
    },[])


    return (

        <div className=" bg-gradient-to-t  from-black to-primary-600   p-10  border-black shadow-lg rounded-card    relative w-full h-full  flex flex-row flex-wrap justify-center items-center font-Binary">
        
        <div className="rounded-card absolute top-0 bottom-0 right-0 left-0 overflow-hidden">
            <Image src={cardBgA} fill={false} alt={"card"} className="rounded-card  w-full h-full object-cover " width={300} height={300} />
            </div>
        <div className="w-full   text-5xl">
         
        {/* <div className=" whitespace-normal   ">
            CODE
        </div> */}
      
        </div>
        </div>
    )
}