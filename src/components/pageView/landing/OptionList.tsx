import { TypeTextView } from "@/components/common/TypeTextView";
import { animate, motion, stagger } from "framer-motion";
import clsx from "clsx";
import { useEffect, useMemo, useState } from "react";
import PlayIcon from "@public/images/play-icon.svg";
import { useTranslation } from "@/i18n/client";

type OptionListType = {
  onClickOption: (index: number) => void;
};

const cursorVariants = {
  blinking: {
    opacity: [0, 0, 1, 1],
    transition: {
      duration: 1,
      repeat: Infinity,
      repeatDelay: 0,
      ease: "linear",
      times: [0, 0.5, 0.5, 1],
    },
  },
};

export const OptionItem = (props: {
  clickHandle: () => void;
  children: React.ReactNode;
}) => {
  const { clickHandle, children } = props;
  //   infoRef?.current?.scrollIntoView({ behavior: "smooth" })
  return (
    <motion.button
      onClick={() => clickHandle()}
      className={clsx("whitespace-nowrap  hidden delayShow ")}
    >
      {children}
    </motion.button>
  );
};

export const OptionList = (props: OptionListType) => {
  const {} = props;
  const { t } = useTranslation();
  const [currentSelected, setCurrentSelected] = useState<null | number>(null);
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
        label: t("option.aboutMe"),
        duration: 1,
        id: "#about_me",
      },
      {
        delay: 5,
        label: t("option.job"),
        duration: 1,
        id: "#job",
      },
      {
        delay: 6,
        label: t("option.project"),
        duration: 1,
        id: "#project",
      },
    ];
  }, [t]);

  return (
    <motion.div
      initial={{ display: "none" }}
      animate={{ display: "flex" }}
      transition={{ delay: 3, duration: 1 }}
      className={clsx(
        "hidden  w-full  flex-col text-white   items-start justify-start gap-4 relative"
      )}
    >
      {optionListData.map((data, index) => {
        const isCurrentSelected =
          currentSelected && index + 1 == currentSelected ? true : false;
        return (
          <motion.div
            key={index}
            onHoverEnd={() => {
              setCurrentSelected(null);
            }}
            onHoverStart={() => {
              setCurrentSelected(index + 1);
            }}
            className={clsx(
              "flex flex-row items-center gap-2 transition-all",
              isCurrentSelected && "scale-105 bg-secondary-500 px-2 "
            )}
          >
            <OptionItem
              clickHandle={() => {
                const section = document.querySelector(data.id);
                section &&
                  section.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                  });
              }}
            >
              <TypeTextView
                baseText={data.label}
                delay={data.delay}
                duration={data.duration}
                cursorClassName="bg-white"
                className={clsx(" text-4xl font-COOL text-white",isCurrentSelected&&"")}
              />
            </OptionItem>

            {isCurrentSelected && (
              <motion.div className="w-6 h-6 transition-colors ">
                <PlayIcon className={clsx(" rotate-180 w-full h-full  fill-white  ")} />
              </motion.div>
            )}
          </motion.div>
        );
      })}
    </motion.div>
  );
};
