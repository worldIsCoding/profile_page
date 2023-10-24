import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { useOnClickOutside } from "usehooks-ts";
import CloseIcon from "@public/images/close.svg";
export const CustomDialog = ({
  close,
  children,
}: {
  close: () => void;
  children: React.ReactNode;
}) => {
  const dialogRef = useRef(null);

  useOnClickOutside(dialogRef, () => {
    close();
  });

  useEffect(()=>{
    const html = document.querySelector("html");
    if(html){
      html.style.overflow ="hidden"
    }
    return ()=>{
        if(html){
          html.style.overflow ="auto" 
        }
    }
  },[])

  return (

    <motion.div
      className=" fixed  top-0 bottom-0 right-0 left-0 backdrop-blur z-50  flex  items-center  "
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >

      <motion.div
        className=" rounded-lg  absolute  right-1/2 left-1/2 overflow-hidden   -translate-x-1/2  bg-white lg:container   w-[90dvw]   h-screen lg:h-[90dvh]    "
        ref={dialogRef}
      >
          
        <motion.div
          onClick={close}
          className="z-20 hover:scale-110 transition-all  w-12 h-12  bg-white border shadow-lg p-2  rounded-full   absolute top-10 right-10 cursor-pointer  ">
          <CloseIcon />
        </motion.div>
        

        <div className="rounded-lg relative p-10 h-full w-full    overflow-auto ">{children}</div>
      
      </motion.div>
    </motion.div>

  );
};
