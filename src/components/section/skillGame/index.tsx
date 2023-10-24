import data from "@data";
import { AnimatePresence, motion } from "framer-motion";
import { useParams } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import clsx from "clsx";
import { SkillGameCard } from "./SkillGameCard";
import { delay } from "@/util/delay";
import { useIsClient } from "usehooks-ts";

import { app, db, storage } from "@/firebase";
import {
  collection,
  addDoc,
  getDoc,
  QuerySnapshot,
  query,
  onSnapshot,
} from "firebase/firestore";
import { RankView } from "./RankView";
type SkillSet = {
  title: string;
  image: string;
}[];
export type RankItem = {
  name: string;
  time: number;
};

export const SkillGame = () => {
  const params = useParams();
  const skillSet = data.getData(params.lng).skillSet;
  const isClient = useIsClient();

  const [matchList, setMatchList] = useState<number[]>([]); //limited 2 item

  const [doneList, setDoneList] = useState<SkillSet>([]);

  const [isStart, setIsStart] = useState<boolean>(false);
  const [timeStart, setTimeStart] = useState<number>(0);

  const [timeCount, setTimeCount] = useState<number>(0);
  const [allTime, setAllTime] = useState<number>(0);
  const [rankList, setRankList] = useState<RankItem[]>([]);

  const [randomList, setRandomList] = useState<SkillSet>([]);
  const [name, setName] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);


  let intervalId: NodeJS.Timeout | null = null;
  useEffect(() => {
    if (isStart) {
      setRandomListHandle();
      intervalId = setInterval(() => {
        setTimeCount((prev) => prev + 1);
      }, 1000);
    } else {
      intervalId && clearInterval(intervalId);
    }

    return () => {
      intervalId && clearInterval(intervalId);
    };
  }, [isStart]);

  useEffect(() => {
    if(isClient){
      getRankList();
      setRandomListHandle()
    } 
  }, [isClient]);

  useEffect(() => {
    if (doneList.length > 0 && doneList.length === skillSet.length) {
      doneGameHandle();
    }
  }, [doneList]);

  const resetGame = () => {
    setIsStart(false);

    setDoneList([]);
    setMatchList([]);
  };

  const setRandomListHandle = () => {
    const list = skillSet.concat(skillSet);
    list.sort(() => Math.random() - 0.5);
    setRandomList(list);
  };

  const transformList = useMemo(() => {
    return randomList.map((it) => {
      return {
        ...it,
        isDone: doneList.some((doneItem) => doneItem.title === it.title),
      };
    });
  }, [randomList, doneList]);

  const checkMatch = async (newIndex: number) => {
    await delay(500);
    if (transformList[newIndex].title === transformList[matchList[0]].title) {
      //match
      setDoneList([...doneList, transformList[matchList[0]]]);
      setMatchList([]);
    } else {
      setMatchList([]);
    }
  };

  const doneGameHandle = () => {
    const endTime = new Date().getTime();
    const timeDiff = (endTime - timeStart) / 1000;
   
    setAllTime(timeDiff);

    setSuccess(true);

    setIsStart(false);

    resetGame();
  };

  const addName = async () => {
    await addDoc(collection(db, "rank"), {
      name: name,
      time: allTime,
    });

    setSuccess(false);
    setName("");
    
  };

  const getRankList = () => {
    const q = query(collection(db, "rank"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let list = [] as RankItem[];
      querySnapshot.forEach((doc) => {
        list.push({ name: doc.data().name, time: doc.data().time });
      });

      list.sort((a, b) => a.time - b.time);

      setRankList(list);
    });
  };

  return (
    <div className=" relative  ">
      <h1> GAME</h1>
      <div className="relative">
        <div className=" flex flex-row flex-wrap gap-4 mb-4 ">
          {skillSet.map((skill, index) => {
            const isDone = doneList.some((it) => it.title == skill.title);
            return (
              <div
                className={clsx("w-10 lg:w-20 h-auto aspect-square ", isDone ? "" : "")}
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
       
        <div className=" flex flex-row  justify-between gap-2">
          CURRENT TIME :{timeCount}
        </div>

        <div className=" grid   grid-cols-4 lg:grid-cols-8 gap-2 lg:gap-4 mt-10 relative p-2 lg:p-10">
          {( !isStart ||success)
            && (
              <div className="flex items-center  absolute top-0 bottom-0 right-0 left-0 bg-black/50  z-10">
                {success ? (
                  <div className="mx-auto   bg-white p-10">
                    <div className=" flex flex-row  justify-between mb-4 gap-4" >
                    <input
                      value={name}
                      onChange={(event) => {
                        setName(event.target.value);
                      }}
                      placeholder="input name"
                      className="border  w-auto p-2"
                    />
                     Time: {allTime}
                    </div>
                   
                    <button
                      onClick={() => {
                        addName();
                      }}
                      disabled={name.trim().length == 0}
                      className=" bg-secondary-500 text-white disabled:bg-gray-500 px-4 py-2 rounded-3xl shadow "
                    >
                      enter
                    </button>
                    
                  </div>
                ) : (
                  <button
                    className="transition-all hover:scale-105 mx-auto border-2  px-4 py-2 bg-secondary-500 text-white rounded-3xl shadow "
                    onClick={() => {
                      setIsStart(true);
                      const startTime = new Date().getTime();
                      setTimeStart(startTime);
                    }}
                  >
                    start
                  </button>
                )}
              </div>
            )  
            }

            {transformList.map((item, index) => {
              const propsFlipped = !matchList.includes(index);

              const isDone = doneList.some((it) => it.title == item.title);
              return  <motion.div key={index} >
                  
                    <SkillGameCard
                      index={index}
                      item={item}
                      isDone={isDone}
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
              
            })}
        </div>
      </div>

      <div className="">
        {rankList.length>0&&  <RankView rankList={rankList} />}
        </div>
    </div>
  );
};
