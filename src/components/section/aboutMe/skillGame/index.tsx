import data from "@data";
import { AnimatePresence, motion } from "framer-motion";
import { useParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import clsx from "clsx";
import { SkillGameCard } from "./SkillGameCard";
import { delay } from "@/util/delay";

type SkillSet = {
  title: string;
  image: string;
}[];

export const SkillGame = () => {
  const params = useParams();
  const skillSet = data.getData(params.lng).skillSet;

  const [roundCount, setRoundCount] = useState<number>(0);

  const [matchList, setMatchList] = useState<number[]>([]); //limited 2 item

  const [errorCount, setErrorCount] = useState<number>(0);

  const [doneList, setDoneList] = useState<SkillSet>([]);

  useEffect(() => {
    if (matchList.length === 2) {
      console.log("checking......");
    }
  }, [matchList]);

  const refreshGame = () => {
    setDoneList([]);
    setRoundCount(0);
    setMatchList([]);
    setErrorCount(0);
  };

  const randomList = useMemo(() => {
    const list = skillSet.concat(skillSet);
    list.sort(() => Math.random() - 0.5);
    return list;
  }, [skillSet]);

  const transformList = useMemo(() => {
    return randomList.map((it) => {
      return {
        ...it,
        isDone: doneList.some((doneItem) => doneItem.title === it.title),
      };
    });
  }, [randomList, doneList]);

  const checkMatch = async (newIndex: number) => {
    setRoundCount(roundCount + 1);
    await delay(500);
    if (transformList[newIndex].title === transformList[matchList[0]].title) {
      //match
      setDoneList([...doneList, transformList[matchList[0]]]);
      setMatchList([]);
    } else {
      setErrorCount(errorCount + 1);
      setMatchList([]);
    }
  };

  return (
    <div className=" relative  TODO text-black">
      <div className=" flex flex-row flex-wrap gap-4 mb-4 ">
        {skillSet.map((skill, index) => {
          const isDone = doneList.some((it) => it.title == skill.title);
          return (
            <div
              className={clsx(
                " select-none w-10 h-auto aspect-square ",
                isDone ? "" : ""
              )}
              key={index}
              title={skill.title}
            >
              <Image
                style={
                  isDone
                    ? {}
                    : {
                        WebkitFilter: "grayscale(100%)",
                        filter: "grayscale(100%)",
                      }
                }
                src={skill.image}
                alt={skill.title}
                fill={false}
                width={500}
                height={500}
                className="  w-full h-full object-contain "
              />
            </div>
          );
        })}
      </div>

      <div>Error :{errorCount}</div>

      {/* <div>done LIst: {doneList.map((listData,index)=><span key={index}>{listData.title}</span>)}</div> */}
      <div className=" flex flex-row  justify-between gap-2">
        <div>roundCount:{roundCount}</div>
      </div>
      <div className=" grid  grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4 mt-10">
        <AnimatePresence>
          {transformList.map((item, index) => {
            const propsFlipped = !matchList.includes(index);

            return (
              <motion.div key={index} layoutId={`card-${index}`}>
                <SkillGameCard
                  index={index}
                  item={item}
                  isDone={item?.isDone ?? false}
                  enableClick={matchList.length < 2}
                  clickHandle={() => {
                    if (matchList.length == 0) {
                      setMatchList([index]);
                    } else if (matchList.length == 1) {
                      setMatchList([...matchList, index]);
                      checkMatch(index);
                    }
                  }}
                  propsFlipped={propsFlipped}
                />
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
      <div>
        <button onClick={refreshGame}>refresh</button>
      </div>
    </div>
  );
};
