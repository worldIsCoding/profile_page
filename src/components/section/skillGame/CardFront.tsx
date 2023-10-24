

import Image from 'next/image'
export const CardFront = ({item}:{item:{title:string, image:string}}) => {



    
    return(
        <div className='h-full bg-white rounded-card shadow-lg border-2  flex flex-row items-center justify-center p-10 '>
        <div className=" w-full object-contain  ">
        <Image
   src={item.image}
   alt={item.title}
   width={500}
   height={500}
   fill={false}
   className="w-full h-full  object-contain"
 />
           </div>
           </div>
    )
}