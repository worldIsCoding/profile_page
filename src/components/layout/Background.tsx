import Particles from "react-tsparticles"
import {loadFull} from "tsparticles"
import React, { useCallback } from "react";

import clsx from "clsx"
import { useDarkMode } from "@/hook/useDarkModeHook"
import type { ISourceOptions,Engine } from "tsparticles-engine";
import { loadSlim } from "tsparticles-slim";




const Particle=()=>{
    const {isDarkMode}=useDarkMode()



        const particlesinit= useCallback(async(main:Engine)=>{
           
            await loadSlim(main)
        },[])

        const particlesLoaded=async(container:any)=>{
              await  console.log(container);
        }

1010

    return(
        <Particles 
        id="tsparticles"
        init={particlesinit}
        className="z-0"
        // loaded={particlesLoaded}
 options={{
    name: "Chars",
    fpsLimit: 60,
    particles: {
        number: {
            value: 100,
            density: {
                enable: false,
            },
        },
        color: {
            value: isDarkMode?"FDF0F0": "E55604",
        },
        stroke: {
            width: 1,
            color: isDarkMode?"FDF0F0": "E55604",
        },
        shape: {
            type: "char",
            options: {
                char: [
                    // {
                    //     value: ["true", "false"],
                    //     font: "Verdana",
                    //     style: "",
                    //     weight: "300",
                    //     fill: true,
                    // },
                    {
                        value:isDarkMode?["👻","🧛"] :["0️⃣","1️⃣","2️⃣","3️⃣","5️⃣","7️⃣","8️⃣","9️⃣","🔟"],
                        font: "Verdana",
                        style: "",
                        weight: "300",
                        fill: false,
                    },
                    // {
                    //     value: ["undefined", "null"],
                    //     font: "Plecnik",
                    //     style: "",
                    //     weight: "300",
                    //     fill: true, 
        
                    // },
                ],
            },
        },
        opacity: {
            value: {
                min: 0,
                max: 0.7,
            },
            animation: {
                enable: true,
                speed: 1,
            },
        },
        size: {
            value: 16,
        },
        links: {
            enable: false,
            distance: 50,
            color: isDarkMode?"#FDF0F0":  "#26577C",
            opacity: 0.5,
            width: 1,
        },
        move: {
            enable: true,
            speed: 1,
            // direction:"right",
        },
        rotate: {
            animation: {
              enable: true,
              speed: 10,
              sync: false
            }
          },
    },
    interactivity: {
        detect_on:"window",
        events: {
            onHover: {
                enable: true,
                mode: isDarkMode?"repulse": ["grab"],
                // parallax: {
                //     enable: true,
                //     force: 60,
                //     smooth: 10
                //   }
            },
            onClick: {
                enable: true,
                mode: isDarkMode?["trail"]: "repulse",
            },
            resize:true
        },

        modes: {
            grab: {
                distance: 300,
                links: {
                    opacity: 0.5,
                },
            },
            repulse: {
                distance: 300,
            },
            push: {
                quantity: 4,
            },
            trail: {
                delay: 0.05,
                quantity: 5
              },
        },
        
    },
    background: {
        color: isDarkMode?"132043":"EBE4D1",
        
    },
    detectRetina: true,
    retina_detect:true,
    backgroundMode: {
        zIndex:-1,
        enable: true
      }
        }}

        />

    )
}


export const Background=()=>{

    return (
        <div className={clsx(" ")}>
            <Particle />
         </div>
    )
}