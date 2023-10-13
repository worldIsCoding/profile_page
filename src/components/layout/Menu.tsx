import { DarkModeProvider, useDarkMode } from "@/hook/useDarkModeHook";
import SunnyIcon from "@public/images/day-sunny-icon.svg";
import MoonIcon from "@public/images/moon-line-icon.svg";
import { motion } from "framer-motion";







export const Menu=(props:{})=>{

    const { isDarkMode, changeTheme } = useDarkMode();


    return (
        <motion.div
        initial={{height:0,y:100  }}
        // exit={{scaleY:0}}
        animate={{scale:1,height:"auto",y:0}}
          className=" overflow-hidden absolute right-0   top-full  rounded-lg  ">
            <div className="w-full h-full absolute blur-lg   z-0"/>
            

            <div className="flex flex-col  items-center z-10 px-10 gap-4 py-4">

            <motion.div className="flex flex-row items-center  "
              initial={{y:"100%",opacity:0}}
              animate={{y:0,opacity:1}}
              transition={{delay:0}}
            >
              <span>set:</span>
              <motion.div
            className="   w-6 h-6  cursor-pointer transition-all z-10"
            onClick={() => {
              changeTheme();
            }}
            whileHover={{scale:0.8}}
            whileTap={{scale:0.8}}
          >
            {isDarkMode ? (
              <SunnyIcon className={" w-full h-full"} />
            ) : (
              <MoonIcon className={"w-full h-full "} />
            )}
          </motion.div>
            </motion.div>


            <motion.div className="flex flex-row items-center  flex-nowrap whitespace-nowrap"
            initial={{y:"100%",opacity:0}}
            animate={{y:0,opacity:1}}
            transition={{delay:0.5}}
            >
                NUM TOW 
                </motion.div>

                <motion.div className="flex flex-row items-center  flex-nowrap whitespace-nowrap"
            initial={{y:"100%",opacity:0}}
            animate={{y:0, opacity:1}}
            transition={{delay:1}}
            >
                NUM TOW 
                </motion.div>




              </div>

            </motion.div>
    )
}