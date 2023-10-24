"use client";
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
import { AboutMe } from "@/components/section/aboutMe";
import { Job } from "@/components/section/job";
import { Project } from "@/components/section/project";
import { useLayout } from "@/hook/useLayoutHook";

const SectionDiv = ({ children }: { children: ReactElement }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true, amount: 0.8 }}
      className="relative w-full min-h-screen"
    >
     
      {children}
    </motion.div>
  );
};

export const Landing = () => {
  // const { lng } = useParams();
  const { t } = useTranslation();
  const { isShowHeader, setIsShowHeader}=useLayout()
  const infoRef = useRef<HTMLDivElement>(null);
  const jobRef = useRef<HTMLDivElement>(null);
  const projectRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const anchorRef = useRef<HTMLDivElement>(null);

  const [isSticky, setIsSticky] = useState<boolean>(false);




  const onClickOption=(index:number)=>{
    if (index == 0) {
      infoRef.current?.scrollIntoView({
        behavior: "smooth",
      });
    }
    if (index == 1) {
      jobRef.current?.scrollIntoView({
        behavior: "smooth",
      });
    }
    if (index == 2) {
      projectRef.current?.scrollIntoView({
        behavior: "smooth",
      });
    }
  }



  return (
    <div className=" relative w-full   ">
      <div className="  container  mx-auto  overflow-y-auto   relative ">
        <motion.div className=" relative py-20  " id="/"
        >
          <motion.div className=" flex flex-row   relative  w-full    "
           onViewportLeave={()=>{
            setIsShowHeader(true)
          }}
          onViewportEnter={()=>{
            setIsShowHeader(false)
          }} 
          >
            <div className="flex-1 relative">
              <div className="mb-2">
                <SpotlightCard>
                  <div className="  ">
                    <ProfileIcon />
                    <div className="mb-8">
                      <TypeTextView
                        baseText={t("intro")}
                        delay={1}
                        duration={2}
                        cursorClassName="bg-white"
                        className="text-4xl font-COOL text-white"
                      />
                    </div> 
                    <motion.div
                      ref={anchorRef}
                     
                    >
                      <OptionList
                        onClickOption={onClickOption}
                      />
                    </motion.div>
                  </div>
                </SpotlightCard>
              </div>
            </div>
          </motion.div>
        </motion.div>
        

        <motion.div className=" relative mt-20  z-auto" >
          <div ref={infoRef} id={"about_me"} className=" relative" >   
            <SectionDiv>
            <SpotlightCard> 
              <div>
           
                <AboutMe />
              </div>
              </SpotlightCard>
            </SectionDiv>
           
          </div>

          <div ref={jobRef} id={"job"}>
            <SectionDiv>
               <SpotlightCard><div>
                <Job />
              </div> </SpotlightCard>
            </SectionDiv>
          </div>

          <div ref={projectRef} id={"project"}>
            <SectionDiv>
            <SpotlightCard>
              <div>
                <Project />
              </div>
              </SpotlightCard>
            </SectionDiv>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
