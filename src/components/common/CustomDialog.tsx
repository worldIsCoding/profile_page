import { motion } from "framer-motion";
import { useRef } from "react";
import { useOnClickOutside } from "usehooks-ts";
import CloseIcon from "@public/images/close.svg";
export const CustomDialog = ({
  close,
  children,
}: {
  close: () => void;
  children: React.ReactNode;
}) => {
  const dialogRef = useRef(null);

  useOnClickOutside(dialogRef, () => {
    close();
  });

  return (
    <motion.div
      className=" fixed  top-0 bottom-0 right-0 left-0 flex flex-row justify-center items-center   "
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className=" relative bg-white  w-[90dvw] max-h-[80dvh] overflow-auto "
        ref={dialogRef}
      >
        <div className="sticky top-0 flex flex-row justify-end">
        <motion.div
          onClick={close}
          className=" w-10 h-10   cursor-pointer   ">
          <CloseIcon />
        </motion.div>
        </div>

        <div className="p-10">{children}</div>
      </motion.div>
    </motion.div>
  );
};
