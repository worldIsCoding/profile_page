import "./globals.scss";
import type { Metadata } from "next";
import { dir } from "i18next";
import { NextResponse } from "next/server";
import { DarkModeProvider } from "@/hook/useDarkModeHook";
import { LayoutProvider } from "@/hook/useLayoutHook";



export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <head>
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        {/* <link
          href="https://fonts.googleapis.com/css2?family=Courier+Prime:wght@700&family=Montserrat:wght@400;800&display=swap"
          rel="stylesheet"
        /> */}

<link rel="preconnect" href="https://fonts.googleapis.com"/>
<link rel="preconnect" href="https://fonts.gstatic.com"  />
<link href="https://fonts.googleapis.com/css2?family=Courier+Prime:wght@700&family=Montserrat:wght@400;800&family=Noto+Sans+HK&display=swap" rel="stylesheet" />
<link href="https://fonts.cdnfonts.com/css/binary" rel="stylesheet" />

      </head>
      
      <body>
      <DarkModeProvider>
        <LayoutProvider >
        {children}
        </LayoutProvider>
        </DarkModeProvider></body>
    </html>
  );
}
