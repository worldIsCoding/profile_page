"use client";
import { InfoSection } from "@/components/section/InfoSection";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import Image from "next/image";
import {
  ReactComponentElement,
  ReactElement,
  Ref,
  useRef,
  useState,
} from "react";
import { ProfileIcon } from "./ProfileIcon";
import { useParams } from "next/navigation";

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
  const infoRef = useRef<HTMLDivElement>(null);
  const expRef = useRef<HTMLDivElement>(null);
  const projectRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  return (
    <div className=" relative">
      <div className=" container h-full mx-auto   TODO flex flex-row  relative">
        <div className="  flex-1     TODO ">
          <div className="bg-white/40   sticky top-20   pb-20   ">
            <div className=" h-full  w-full flex flex-col items-center justify-end  ">
              <ProfileIcon />
              <div className=" flex flex-col items-center gap-8 relative">
                <div className=" absolute top-0 bottom-0 -left-2 bg-white/70 w-1"></div>
                <div
                  onClick={() =>
                    infoRef?.current?.scrollIntoView({ behavior: "smooth" })
                  }
                >
                  anchor INFO
                </div>
                <div
                  onClick={() =>
                    expRef?.current?.scrollIntoView({ behavior: "smooth" })
                  }
                >
                  anchor JOBS EXP
                </div>
                <div
                  onClick={() =>
                    projectRef?.current?.scrollIntoView({ behavior: "smooth" })
                  }
                >
                  anchor PJ
                </div>
                <div
                  onClick={() =>
                    contactRef?.current?.scrollIntoView({ behavior: "smooth" })
                  }
                >
                  anchor CONTACT{" "}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className=" bg-gray-200 flex-1 ">
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
