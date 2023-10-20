import { motion, useSpring } from "framer-motion";
import clsx from "clsx";
import { MutableRefObject, RefObject, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { CardBack } from "./CardBack";
import { CardFront } from "./CardFront";

type SkillGameCardType = {
  index: number;
  clickHandle: () => void;
  item: { title: string; image: string };
};

const spring = {
  type: "spring",
  stiffness: 300,
  damping: 40,
};

export const SkillGameCard = (props: SkillGameCardType) => {
  const { index, clickHandle, item } = props;

  const ref = useRef<HTMLDivElement>(null);
  const [isFlipped, setIsFlipped] = useState<boolean>(true);
  //isFlipped true is poker, fakse is image

  const [rotateXaxis, setRotateXaxis] = useState(0);
  const [rotateYaxis, setRotateYaxis] = useState(0);

  const handleMouseMove = (event: { clientY: number; clientX: number; }) => {

    const element = ref.current;
    if(element){
        const elementRect = element.getBoundingClientRect();
        const elementWidth = elementRect.width;
        const elementHeight = elementRect.height;
        const elementCenterX = elementWidth / 2;
        const elementCenterY = elementHeight / 2;
        const mouseX = event.clientY - elementRect.y - elementCenterY;
        const mouseY = event.clientX - elementRect.x - elementCenterX;
        const degreeX = (mouseX / elementWidth) * 20; //The number is the rotation factor
        const degreeY = (mouseY / elementHeight) * 20; //The number is the rotation factor
        setRotateXaxis(degreeX);
        setRotateYaxis(degreeY);
    }
   
  };

  const handleMouseEnd = () => {
    setRotateXaxis(0);
    setRotateYaxis(0);
  };

  const dx = useSpring(0, spring);
  const dy = useSpring(0, spring);

  useEffect(() => {
    dx.set(-rotateXaxis);
    dy.set(rotateYaxis);
  }, [rotateXaxis, rotateYaxis]);

  return (
    <motion.div
      transition={spring}
      style={{
        perspective: "1200px",
        transformStyle: "preserve-3d",
      }}
      onClick={() => setIsFlipped(!isFlipped)}
      className="  aspect-poker  relative  w-full h-full  "
    >
      <motion.div
        
        whileHover={{ scale: 1.1 }}
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseEnd}
        transition={spring}
        style={{
          rotateX: dx,
          rotateY: dy,
        }}
        className="w-full h-full"
      >
        <div
          style={{
            perspective: "1200px",
            transformStyle: "preserve-3d",
            width: "100%",
            height: "100%",
          }}
        >
          <motion.div
                            animate={{ rotateY: isFlipped ? -180 : 0 }}
                            transition={spring}
                            style={{
                                width: "100%",
                                height: "100%",
                                zIndex: isFlipped ? 0 : 1,
                                backfaceVisibility: "hidden",
                                position: "absolute",
                            }}
                        >
                            <CardFront item={item} />
                         


                        </motion.div>

                        <motion.div
                            initial={{ rotateY: 180 }}
                            animate={{ rotateY: isFlipped ? 0 : 180 }}
                            transition={spring}
                            style={{
                                zIndex: isFlipped ? 1 : 0,
                                backfaceVisibility: "hidden",
                                position: "absolute",
                            }}
                            className="w-full h-full "
                        >
                            <CardBack />
                         
                        </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};






