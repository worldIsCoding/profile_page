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
        collisions:{
            // absorb: {speed:0.1},
            // bounce: IParticlesBounce;
            enable: true,
            // maxSpeed: RangeValue;
            mode: "bounce",
            overlap:{
                enable:false
            }
        },
        number: {
            value: 512,
            density: {
                enable: true,
            },
        },
        color: {
            value: ["#ffffff","#d4f0fc","#89d6fb","#02a9f7","#02577a"],
        },
        
        stroke: {
            width: 1,
            color: "#ffffff",
        },
        shape: {
            type: "char",
            options: {
                char: [ 
                    {
                        value:["0️","1️"],
                        font: "arial",
                        // font: "arial",
                        style: " ",
                        weight: "300",
                        fill: true,
                    },
                ],
            },
        },
        opacity: {
            // value:0.,
            value: {
                min: 0.4,
                max: 0.7,
            },
            animation: {
                enable: false,
                speed: 0.5,
            },
        },
        size: {
            value: 12
            // {
                
            //     min:12,
            //     max:16},
        },
        links: {
            enable: false,
            distance: 50,
            color: {
                value: "random"
            } ,
            opacity: 1,
            width: 1,
        },
        move: {
            enable: true,
            speed: 1,
            direction:"bottom",
            straight:true,
            random:false,
        
        },
        rotate: {
            animation: {
              enable: false,
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
                mode: ["bubble","grab"],
                // parallax: {
                //     enable: true,
                //     force: 60,
                //     smooth: 10
                //   }
            },
            onClick: {
                enable: false,
                mode:  ["repulse"],
            },
            resize:true
        },

        modes: {
            grab: {
                distance: 200,
                links: {
                    opacity: 0.8,
                },
            },
        bubble:{
            distance:200,
            sie:20,
            opacity:1,
            duration:1

        },
            repulse: {
                distance: 150,
            },
            push: {
                quantity: 1,
            },
            trail: {
                delay: 0.05,
                quantity: 5
              },
            
        },
        
    },
    background: {
        color: "#000000"
        
    },
    detectRetina: true,
    retina_detect:true,
    backgroundMode: {
        zIndex:-11,
        enable: true
      }
        }}

        />

    )
}


export const Background=()=>{

    return (
        <div className={clsx(" ")}>
            {/* <div className={clsx(` fixed w-1/2 h-1/2 top-1/2 bottom-1/2 right-1/2 left-1/2 
            -translate-y-1/2  -translate-x-1/2  rounded-full  shadow-lg shadow-[#02577a] bg-[#02577a]/50 blur-xl -z-10`)} /> */}
            <Particle />
         </div>
    )
}