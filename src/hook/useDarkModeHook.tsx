"use client"

import React, { useLayoutEffect } from "react";
import { useState, useEffect, useMemo, useContext } from "react";
import clsx from "clsx";
import { useIsClient } from "usehooks-ts";

const DarkModeContext = React.createContext(
  {} as {
    isDarkMode: boolean;
    changeTheme: () => void;
  }
);
export const DarkModeProvider = (props: { children?: React.ReactNode }) => {
  const [isDarkMode, setDarkMode] = useState(false);
  const isClient = useIsClient();
  useEffect(() => {
    if(isClient)
      getDefaultTheme();
  }, [isClient]);

  const getDefaultTheme = async () => {
    const localTheme = await localStorage.getItem("theme");
    setDarkMode(localTheme == "dark");

    const root = window.document.documentElement;
    root.className = localTheme == "dark" ? "dark" : "";
  };

  const changeTheme = async () => {
    const root = window.document.documentElement;
    await localStorage.setItem("theme", isDarkMode ? "light" : "dark");

    root.className = isDarkMode ? "" : "dark";

    setDarkMode(!isDarkMode);
  };

  return (
    <DarkModeContext.Provider
      value={{
        isDarkMode: isDarkMode,
        changeTheme: changeTheme,
      }}
    >
      <>
        {props.children}  
      </>
    </DarkModeContext.Provider>
  );
};

export const useDarkMode = () =>  useContext(DarkModeContext);

