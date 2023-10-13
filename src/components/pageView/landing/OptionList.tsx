import { TypeTextView } from "@/components/common/TypeTextView";
import { animate, motion, stagger } from "framer-motion";
import clsx from "clsx";
import { useEffect, useMemo, useState } from "react";
import PlayIcon from "@public/images/play-icon.svg"
export const OptionItem = (props: {
  clickHandle: () => void;
  children: React.ReactNode;
}) => {
  const { clickHandle, children } = props;
  //   infoRef?.current?.scrollIntoView({ behavior: "smooth" })
  return (
    <motion.button
      onClick={() => clickHandle()}
      className={clsx("whitespace-nowrap TODO hidden delayShow")}>
      {children} 
    </motion.button>
  );
};

export const OptionList = () => {
  const [currentSelected, setCurrentSelected] = useState<null|number>(null);
  useEffect(() => {
    animate(
      ".delayShow",
      {
        display: ["none", "block"],
        opacity: [0, 1],
        scale: 1,
        filter: "blur(0px)",
      },
      {
        duration: 1,

        delay: stagger(1, { startDelay: 4 }),
      }
    );
  }, []);

  const optionListData = useMemo(() => {
    return [
      {
        delay: 4,
        label: "anchor INFO",
        duration: 1,
        clickHandle: () => {},
      },
      {
        delay: 5,
        label: "anchor INFO",
        duration: 1,
        clickHandle: () => {},
      },
      {
        delay: 6,
        label: "anchor INFO",
        duration: 1,
        clickHandle: () => {},
      },
    ];
  }, []);

  return (
    <motion.div
      initial={{ display: "none" }}
      animate={{ display: "flex" }}
      transition={{ delay: 3, duration: 1 }}
      className="hidden  w-full TODO text-white   flex-col items-start justify-start gap-4 relative"
    >
      {optionListData.map((data, index) => {
        
        const isCurrentSelected=currentSelected&& index+1==currentSelected?true:false
        return (
          <motion.div key={index}
          onHoverEnd={()=>{
            // setCurrentSelected(null)
          }}
          onHoverStart={()=>{
            setCurrentSelected(index+1)
          }}
          className={clsx("flex flex-row items-center gap-4",isCurrentSelected&&" ")}
          >
            <OptionItem 
            clickHandle={() => {data.clickHandle()}} >
              <TypeTextView
                baseText={data.label}
                delay={data.delay}
                duration={data.duration}
                cursorClassName="bg-white"
                className={clsx("text-4xl font-Binary text-white",isCurrentSelected?"scale-125 ":"text-white")}
              />
            </OptionItem>

            {isCurrentSelected&&
              <motion.div 
              animate={{backgroundColor:["transparent","white"]}}
              transition={{duration:0,repeat:Infinity,ease:"linear",repeatDelay:1}}
              viewport={{once:false}}
              className="w-4 h-8   border   "
              ><PlayIcon className=" rotate-180 w-full h-full text-transparent fill-black bg-transparent " /></motion.div>
            }
          
          </motion.div>
        );
      })}
    
    </motion.div>
  );
};
