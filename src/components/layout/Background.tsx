import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import React, { useCallback } from "react";

import clsx from "clsx";
import { useDarkMode } from "@/hook/useDarkModeHook";
import type { ISourceOptions, Engine } from "tsparticles-engine";
import { loadSlim } from "tsparticles-slim";
import { useMediaQuery } from "usehooks-ts";

const Particle = () => {
  const { isDarkMode } = useDarkMode();

  const matches = useMediaQuery("(min-width: 1024px)");

  const particlesinit = useCallback(async (main: Engine) => {
    await loadSlim(main);
  }, []);

  const particlesLoaded = async (container: any) => {
    await console.log(container);
  };

  return (
    <Particles
      id="tsparticles"
      init={particlesinit}
      className="z-0"
      // loaded={particlesLoaded}
      options={{
        name: "Chars",
        fpsLimit: 60,

        particles: {
          collisions: {
            // absorb: {speed:0.1},
            // bounce: IParticlesBounce;
            enable: true,
            // maxSpeed: RangeValue;
            mode: "bounce",
            overlap: {
              enable: false,
            },
          },
          number: {
            value: 512,
            density: {
              enable: true,
            },
          },
          color: {
            value: ["#ffffff", "#d4f0fc", "#89d6fb", "#02a9f7"],
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
                  value: ["0️", "1️"],
                  font: "Binary X CHR BRK",
                  // font: "arial",
                  style: " ",
                  weight: "100",
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
            value: matches ? 12 : 8,
            // {

            //     min:12,
            //     max:16},
          },
          links: {
            enable: false,
            distance: 50,
            color: {
              value: "random",
            },
            opacity: 1,
            width: 1,
          },
          move: {
            enable: true,
            speed: 1,
            direction: "bottom",
            straight: true,
            random: false,
          },
          rotate: {
            animation: {
              enable: false,
              speed: 10,
              sync: false,
            },
          },
        },
        interactivity: {
          detect_on: "window",
          events: {
            onHover: {
              enable: true,
              mode: ["bubble", "grab"],
              // parallax: {
              //     enable: true,
              //     force: 60,
              //     smooth: 10
              //   }
            },
            onClick: {
              enable: false,
              mode: ["repulse"],
            },
            resize: true,
          },

          modes: {
            grab: {
              distance: 200,
              links: {
                opacity: 0.8,
              },
            },
            bubble: {
              distance: 200,
              sie: 20,
              opacity: 1,
              duration: 1,
            },
            repulse: {
              distance: 150,
            },
            push: {
              quantity: 1,
            },
            trail: {
              delay: 0.05,
              quantity: 5,
            },
          },
        },
        // background: {
        //     color: ""

        // },
        detectRetina: true,
        retina_detect: true,
        backgroundMode: {
          zIndex: -11,
          enable: true,
        },
      }}
    />
  );
};

export const Background = () => {
  return (
    <div className={clsx("")}>
      <Particle />
    </div>
  );
};
