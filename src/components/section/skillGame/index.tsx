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
type SkillSet = {
  title: string;
  image: string;
}[];
type RankItem = {
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
    isClient && getRankList();
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
    await delay(300);
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
    console.log("endTime", endTime);
    console.log("timeDiff", timeDiff);
    setAllTime(timeDiff);


    setSuccess(true);


    setIsStart(false);

    resetGame();
  };

  const addName = async () => {
    console.log("add...");
    await addDoc(collection(db, "rank"), {
      name: name,
      time: allTime,
    });

    setSuccess(false);
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
                className={clsx("w-20 h-auto aspect-square ", isDone ? "" : "")}
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
        <div>
          RANK :
          {rankList.map((rank, index) => {
            return (
              <div key={index} className=" flex flex-row ">
                <div>Name:{rank.name}</div>
                <div>Time:{rank.time}</div>
              </div>
            );
          })}

         {success&& <div className=" flex flex-row ">
            <input
              value={name}
              onChange={(event) => {
                setName(event.target.value);
              }}
              placeholder="name"
            />
            <button
              onClick={() => {
                addName();
              }}
            >
              addName
            </button> , allTime{allTime}
            <div></div>
          </div>}
        </div>

        <div>需時: {allTime.toFixed(2)}s</div>
        {/* <div>done LIst: {doneList.map((listData,index)=><span key={index}>{listData.title}</span>)}</div> */}
        <div className=" flex flex-row  justify-between gap-2">
          CURRENT TIME :{timeCount}
        </div>

        <div className=" grid   grid-cols-4 lg:grid-cols-8 gap-4 mt-10 relative p-10">
          {!isStart && (
            <div className="flex items-center  absolute top-0 bottom-0 right-0 left-0 bg-black/50  z-10">
              <button
                className="transition-all hover:scale-105 mx-auto border-2  px-4 py-2 bg-secondary-500 text-white rounded-3xl shadow "
                onClick={() => {
                  setIsStart(true);
                  const startTime = new Date().getTime();
                  console.log("startTime", startTime);
                  setTimeStart(startTime);
                }}
              >
                start
              </button>
            </div>
          )}

          <AnimatePresence>
            {transformList.map((item, index) => {
              const propsFlipped = !matchList.includes(index);

              const isDone = doneList.some((it) => it.title == item.title);
              return (
                <motion.div key={index} layoutId={`card-${index}`}>
                  {item.isDone ? (
                    <div />
                  ) : (
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
                  )}
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
        <div>
          <button onClick={resetGame}>refresh</button>
        </div>
      </div>
    </div>
  );
};
