
import { DarkModeProvider } from "@/hook/useDarkModeHook";
import { useState, useEffect, useMemo, useContext } from "react";

import { useIsClient } from "usehooks-ts";
import clsx from "clsx"

export const Layout =({
    children,
  }: {
    children: React.ReactNode;
  })=>{


 
    


    return (
        <DarkModeProvider>
            <div className={clsx("h-screen")}>
            {children}
            </div>
        </DarkModeProvider>
    )
}