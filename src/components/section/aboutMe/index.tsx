import { motion } from "framer-motion";
import { NumberCard } from "./NumberCard";
import { useMemo, useState } from "react";
import { useTranslation } from "@/i18n/client";
import { CustomDialog } from "@/components/common/CustomDialog";
import { SkillGame } from "./skillGame";
import { useParams } from "next/navigation";
import data from "@data";

export const AboutMe = () => {
  const { t } = useTranslation();

  const params = useParams();
  const skillSet = data.getData(params.lng).skillSet;
  const [openModel, setOpenModel] = useState<boolean>(false);

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
      { number: 181, label: "cm tall" },
    ];
  }, []);

  return (
    <>
      <div className=" relative ">
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          className=" relative flex flex-col justify-center items-center text-white"
        >
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "100%" }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.5 }}
            className="w-full"
          >
            <h1 className=" text-lg lg:text-4xl">{t("aboutMe.title")}</h1>
            <motion.div className=" bg-white my-2 h-1" />
          </motion.div>

          <div className="flex flex-col gap-4  text-sm lg:text-base">
            <div className=" whitespace-normal">{t("aboutMe.intro")}</div>
            <div
              className=" cursor-pointer text-base lg:text-lg rounded-lg border p-2 text-center"
              onClick={() => {
                setOpenModel(true);
              }}
            >
              skillset game
            </div>
            <div className=" flex flex-row flex-wrap gap-1 ">
              {skillSet.map((skill, index) => {
                return (
                  <div
                    className="   text-base lg:text-lg"
                    key={index}
                    title={skill.title}
                  >
                    {skill.title}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex flex-row flex-wrap items-center justify-between  gap-2 lg:gap-4 text-base lg:text-lg">
            {numberCardData.map((data, index) => {
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  transition={{ delay: index + 1, duration: 1 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  className=""
                >
                  <NumberCard number={data.number} label={data.label} />
                </motion.div>
              );
            })}
          </div>

          <div className="flex flex-row flex-wrap">
            <div>
              contact
              <div>tel: 4</div>
            </div>
          </div>
        </motion.div>
      </div>
      {openModel && (
        <CustomDialog close={() => setOpenModel(false)}>
          <SkillGame />
        </CustomDialog>
      )}
    </>
  );
};
