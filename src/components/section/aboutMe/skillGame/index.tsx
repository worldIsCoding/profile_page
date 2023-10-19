import data from "@data";
import { motion } from "framer-motion";
import { useParams } from "next/navigation";
import { useMemo } from "react";
import Image from "next/image";
export const SkillGame = () => {
  const params = useParams();
  const skillSet = data.getData(params.lng).skillSet;

  const transformList = useMemo(() => {
    const arr = skillSet.concat(skillSet);
    arr.sort(() => Math.random() - 0.5);

    console.log(arr);
    return arr;
  }, [skillSet]);

  return (
    <div className=" relative">
      SkillGame
      <div className=" grid  grid-cols-4 gap-4">
        {transformList.map((item, index) => {
          const cardStatus = "";
          return (
            <motion.div key={index} className=" border-2  p-2  rounded-xl  ">
              item.
              <div className=" w-52 h-36">
                <Image
                  src={item.image}
                  alt={item.title}
                  width={100}
                  height={100}
                  objectFit="cover"
                />
              </div>
              {item.title}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
