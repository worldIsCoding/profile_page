"use client";
import { InfoSection } from "@/components/section/InfoSection";
import {
  motion,
  useScroll,
  useMotionValueEvent,
  stagger,
  animate,
} from "framer-motion";
import Image from "next/image";
import {
  ReactComponentElement,
  ReactElement,
  Ref,
  useEffect,
  useRef,
  useState,
} from "react";
import { ProfileIcon } from "./ProfileIcon";
import { useParams } from "next/navigation";
import { TypeTextView } from "@/components/common/TypeTextView";
import data from "@data";
import { useTranslation } from "@/i18n/client";
import { SpotlightCard } from "@/components/common/SpotlightCard";
import clsx from "clsx";
import { OptionList } from "./OptionList";

const SectionDiv = ({ children }: { children: ReactElement }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: false, amount: 0.8 }}
      className="h-screen w-full pt-20"
    >
      {children}
    </motion.div>
  );
};

export const Landing = () => {
  const { lng } = useParams();
  const { t } = useTranslation(["common"]);
  const infoRef = useRef<HTMLDivElement>(null);
  const expRef = useRef<HTMLDivElement>(null);
  const projectRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  return (
    <div className=" relative w-full  ">
      <div className=" container h-full mx-auto    relative py-20">
        <div className=" sticky top-0   ">
          <div className=" flex flex-row    w-full   TODO ">
            <div>
              <ProfileIcon />
            </div>
            <div className="w-full">
              <SpotlightCard>
                <div className="  ">
                  <div className="mb-2">
                    <TypeTextView
                      baseText={t("intro")}
                      delay={1}
                      duration={2}
                      cursorClassName="bg-white"
                      className="text-4xl font-Binary text-white"
                    />
                  </div>

                  <OptionList />
                </div>
              </SpotlightCard>
            </div>
          </div>
        </div>

        <div className=" flex-1 bg-white ">
          <div ref={infoRef}>
            <SectionDiv>
              <div>
                <InfoSection />
              </div>
            </SectionDiv>
          </div>

          <div ref={expRef}>
            <SectionDiv>
              <div>section expRef</div>
            </SectionDiv>
          </div>

          <div ref={projectRef}>
            <SectionDiv>
              <div>section projectRef</div>
            </SectionDiv>
          </div>

          <div ref={contactRef}>
            <SectionDiv>
              <div>section contactRef</div>
            </SectionDiv>
          </div>
        </div>
      </div>
    </div>
  );
};
