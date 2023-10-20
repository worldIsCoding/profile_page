import data from "@data";
import { motion } from "framer-motion";
import { useParams } from "next/navigation";
import { useMemo, useState } from "react";
import Image from "next/image";
import clsx from "clsx"
import { SkillGameCard } from "./SkillGameCard";

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
      <h1>SkillGame</h1>
      <div>roundCount:{roundCount}</div>

      <div className=" grid  grid-cols-8 gap-4">
        {transformList.map((item, index) => {
          const cardStatus = "";
          const isBack = currentShow.indexOf(index) === -1;
          return (


            <SkillGameCard 
            key={index}
            index={index}
            item={item}
            clickHandle={()=>{
                setActive(0)
                if(currentShow.length===2){
                    checkMatch(index)
                    setCurrentShow([])
                }else{
                    setCurrentShow([...currentShow, index]) 
                }

            }}
            />
          );
        })}
      </div>
    </div>
  );
};
