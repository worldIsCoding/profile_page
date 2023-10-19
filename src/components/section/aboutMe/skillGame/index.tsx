import data from "@data";
import { motion } from "framer-motion";
import { useParams } from "next/navigation";
import { useMemo, useState } from "react";
import Image from "next/image";
import clsx from "clsx"

export const SkillGame = () => {
  const params = useParams();
  const skillSet = data.getData(params.lng).skillSet;

  const [roundCount, setRoundCount] = useState<number>(0);

  const [currentShow, setCurrentShow] = useState<number[]>([]);
    const [active,setActive]=useState<number>(-1)
    const [nextActive,setNextActive]=useState(-1)

  const transformList = useMemo(() => {
    const arr = skillSet.concat(skillSet);
    arr.sort(() => Math.random() - 0.5);

    console.log(arr);
    return arr;
  }, [skillSet]);


  const checkMatch=(newIndex:number)=>{
    if(transformList[newIndex].title=== transformList[currentShow[0]].title){
        //match
  }
    }


  return (
    <div className=" relative z-auto">
      SkillGame
      <div className=" grid  grid-cols-8 gap-4">
        {transformList.map((item, index) => {
          const cardStatus = "";
          const isBack = currentShow.indexOf(index) === -1;
          return (
            <motion.div
              key={index}
              className="relative skill_card_content border-2  p-2  rounded-xl  w-full h-auto aspect-square "
              onClick={() =>
                {
                    setActive(0)
                    if(currentShow.length===2){
                        checkMatch(index)
                        setCurrentShow([])
                    }else{
                        setCurrentShow([...currentShow, index]) 
                    }
                }
                }
            >
                <motion.div className={clsx("", active===index||nextActive===index?"skill_card_content active":"skill_card_content" )}>
              {!isBack ? (
                <div className="skill_card_front">
                  <h1>?</h1>
                </div>
              ) : (
                <div className="skill_card_back "></div>
              )}

              {!isBack&&<motion.div className="  w-full h-full "
              initial={{opacity:0}}
              animate={{opacity:1}}
              >
                <Image src={item.image} alt={item.title} layout="fill" />
              </motion.div>}

              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
