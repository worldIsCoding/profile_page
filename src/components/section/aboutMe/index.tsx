import { motion } from "framer-motion";
import { NumberCard } from "./NumberCard";
import { useMemo } from "react";
import { useTranslation } from "@/i18n/client";

export const AboutMe = () => {
  const { t } = useTranslation();


  const numberCardData = useMemo(() => {
    return [
      {
        number: 30,
        label: "year old",
      },
      {
        number: 4,
        label: "expensive year",
      },
    ];
  }, []);


  const skillSetData=useMemo(()=>{
    return (
        [
            {label:"React",Level:100
        
        },{
            label:"Next.js",Level:100
        },{
            label:"Node.js",Level:100
        },
        {label:"TypeScript",Level:100}
        ]   
    )
  },[])

  return (
    <div>
      <motion.div
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: false }}
        className=" flex flex-col justify-center items-center"
      >
        <div></div>

        <div>desc</div>
        <div>images</div>

        <div className="flex flex-row items-center justify-between">
          {numberCardData.map((data, index) => {
            return (
              <motion.div
                key={index}
                
                initial={{ opacity: 0 ,y:100}}
                transition={{ delay: index + 1, duration: 1 }}
                whileInView={{ opacity: 1,y:0 }}
                
                className=""
              >
                <NumberCard number={data.number} label={data.label} />
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
};
