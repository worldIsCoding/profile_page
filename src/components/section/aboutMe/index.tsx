import { motion } from "framer-motion";
import { NumberCard } from "./NumberCard";
import { useMemo, useState } from "react";
import { useTranslation } from "@/i18n/client";
import { CustomDialog } from "@/components/common/CustomDialog";
import { SkillGame } from "../skillGame";
import Link from "next/link";
import { useParams } from "next/navigation";

export const AboutMe = () => {
  const { t } = useTranslation();
  const { lng } = useParams();
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

  const skillSetData = useMemo(() => {
    return [
      { label: "React", Level: 100 },
      {
        label: "Next.js",
        Level: 100,
      },
      {
        label: "Node.js",
        Level: 100,
      },
      { label: "TypeScript", Level: 100 },
      { label: "JavaScript", Level: 100 },
      { label: "HTML", Level: 100 },
      { label: "CSS", Level: 100 },
      { label: "TailwindCSS", Level: 100 },
      { label: "Framer Motion", Level: 100 },
      { label: "Git", Level: 100 },
      { label: "Vue", Level: 100 },
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
            <h1 className="text-4xl">
              {t("aboutMe.title")}
              test
            </h1>
            <motion.div className=" bg-white my-2 h-1" />
          </motion.div>

          <div className="flex flex-col gap-4 lg:flex-row ">
            <div className=" whitespace-normal">{t("aboutMe.intro")}</div>

            <div>
              <Link href={`${lng}/game`}>to Game Page</Link>
            </div>
            <div
              className=" flex flex-row flex-wrap TODO "
              onClick={() => {
                setOpenModel(true);
              }}
            >
              {skillSetData.map((data, index) => {
                return (
                  <div className=" border border-white p-2 " key={index}>
                    {data.label}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex flex-row flex-wrap items-center justify-between gap-4">
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
    </>
  );
};
