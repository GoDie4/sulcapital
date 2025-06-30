/* eslint-disable @typescript-eslint/ban-ts-comment */
"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { Banner } from "../../(sistema)/sistema/banners/_components/table/ColumnasBanners";
import { config } from "@/assets/config/config";

// interface SlideData {
//   id: number;
//   titulo: string;
//   descripcion: string;
//   imagen: string;
//   posicion: string;
// }

// const slides: SlideData[] = [
//   {
//     id: 1,
//     titulo: " Tu portal inmobiliario en la selva central",
//     descripcion:
//       "Descubre propiedades únicas que se adaptan a tu estilo de vida.",
//     imagen: "/images/slides/slide1.webp",
//     posicion: "1",
//   },
//   {
//     id: 2,
//     titulo: " Haz realidad tus sueños",
//     descripcion: "Te ayudamos a encontrar la propiedad perfecta para ti.",
//     imagen: "/images/slides/slide2.webp",
//     posicion: "2",
//   },
//   {
//     id: 3,
//     titulo: " Tu nuevo comienzo está aquí",
//     descripcion:
//       "Explora nuestras exclusivas opciones de casas y departamentos.",
//     imagen: "/images/slides/slide3.webp",
//     posicion: "3",
//   },
// ];

type AnimationType =
  | "morph3d"
  | "particles"
  | "liquid"
  | "geometric"
  | "kaleidoscope";

const InnovativeSlider = ({ dataBanners }: { dataBanners: Banner[] }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [animationType] = useState<AnimationType>("morph3d");
  const [isPlaying] = useState(true);

  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % dataBanners.length);
      }, 12000);
      return () => clearInterval(interval);
    }
  }, [isPlaying, dataBanners]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % dataBanners.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + dataBanners.length) % dataBanners.length);
  };

  const getAnimationVariants = () => {
    switch (animationType) {
      case "morph3d":
        return {
          initial: {
            rotateY: 90,
            rotateX: 45,
            scale: 0.8,
            opacity: 0,
            z: -200,
          },
          animate: {
            rotateY: 0,
            rotateX: 0,
            scale: 1,
            opacity: 1,
            z: 0,
            transition: {
              duration: 1.2,
              ease: [0.25, 0.46, 0.45, 0.94],
            },
          },
          exit: {
            rotateY: -90,
            rotateX: -45,
            scale: 1.2,
            opacity: 0,
            z: 200,
            transition: {
              duration: 0.8,
              ease: [0.55, 0.06, 0.68, 0.19],
            },
          },
        };

      case "particles":
        return {
          initial: {
            scale: 0,
            opacity: 0,
            filter: "blur(20px)",
          },
          animate: {
            scale: 1,
            opacity: 1,
            filter: "blur(0px)",
            transition: {
              duration: 1.5,
              ease: "easeOut",
              scale: {
                type: "spring",
                damping: 10,
                stiffness: 100,
              },
            },
          },
          exit: {
            scale: 0,
            opacity: 0,
            filter: "blur(20px)",
            transition: {
              duration: 0.8,
            },
          },
        };

      case "liquid":
        return {
          initial: {
            clipPath: "circle(0% at 50% 50%)",
            scale: 1.3,
            rotate: 180,
          },
          animate: {
            clipPath: "circle(100% at 50% 50%)",
            scale: 1,
            rotate: 0,
            transition: {
              duration: 1.4,
              ease: [0.76, 0, 0.24, 1],
              clipPath: {
                duration: 1.2,
              },
            },
          },
          exit: {
            clipPath: "circle(0% at 20% 80%)",
            scale: 0.8,
            rotate: -180,
            transition: {
              duration: 0.8,
              ease: [0.76, 0, 0.24, 1],
            },
          },
        };

      case "geometric":
        return {
          initial: {
            clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
            skewX: 45,
            opacity: 0,
          },
          animate: {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            skewX: 0,
            opacity: 1,
            transition: {
              duration: 1.2,
              ease: [0.25, 0.46, 0.45, 0.94],
              clipPath: {
                duration: 1.0,
              },
            },
          },
          exit: {
            clipPath: "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)",
            skewX: -45,
            opacity: 0,
            transition: {
              duration: 0.8,
            },
          },
        };

      case "kaleidoscope":
        return {
          initial: {
            rotate: 360,
            scale: 0,
            opacity: 0,
            filter: "hue-rotate(180deg) saturate(2)",
          },
          animate: {
            rotate: 0,
            scale: 1,
            opacity: 1,
            filter: "hue-rotate(0deg) saturate(1)",
            transition: {
              duration: 1.6,
              ease: [0.68, -0.55, 0.265, 1.55],
              rotate: {
                duration: 2,
                ease: "easeInOut",
              },
            },
          },
          exit: {
            rotate: -360,
            scale: 2,
            opacity: 0,
            filter: "hue-rotate(-180deg) saturate(3)",
            transition: {
              duration: 1.2,
            },
          },
        };

      default:
        return {};
    }
  };

  return (
    <div className="w-full h-[55vh] lg:h-[77vh] relative overflow-hidden bg-secondary-main">
      <AnimatePresence mode="wait">
        <motion.div
          key={`bg-${currentSlide}-${animationType}`}
          className="absolute inset-0 z-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
        >
          <div
            className="absolute inset-0 w-full h-full bg-cover bg-center"
            style={{
              backgroundImage: `url(${config.API_IMAGE_URL}${dataBanners[currentSlide].imagen})`,
            }}
          />
          <div className="absolute inset-0 bg-black-main bg-opacity-40" />
        </motion.div>
      </AnimatePresence>

      {/* Main Slider Container */}
      <div className="relative w-full h-full flex  items-center justify-center perspective-1500 z-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${currentSlide}-${animationType}`}
            className="w-full h-full flex items-start md:items-center  lg:mb-0 justify-center"
            style={{ transformStyle: "preserve-3d" }}
            //@ts-ignore
            variants={getAnimationVariants()}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            {/* Slide Content centered on screen */}
            <div className="relative max-w-4xl mt-28 md:mt-0 px-8 text-center">
              <motion.h1
                className="text-base sm:text-3xl md:text-4xl lg:text-[42px] font-TypographBold leading-[1.4rem] md:leading-[2.5rem] lg:leading-[4rem] font-bold mb-3 text-center text-white-main text-shadow-lg"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
              >
                {(() => {
                  const words = dataBanners[currentSlide].titulo.split(" ");
                  return words.map((word, index) => (
                    <span
                      key={index}
                      className={
                        index === 2
                          ? "text-white-main"
                          : index === words.length - 1
                          ? "text-white-main"
                          : ""
                      }
                    >
                      {word}{" "}
                    </span>
                  ));
                })()}
              </motion.h1>

              <motion.p
                className="hidden lg:block text-lg lg:text-xl text-center text-white-100 max-w-5xl mx-auto  opacity-90 font-light text-shadow"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                {dataBanners[currentSlide].descripcion}
              </motion.p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Controls positioned at the bottom */}
      <div className="absolute h-fit w-full px-3 md:px-10 lg:px-20  bottom-0 left-0 right-0 mx-auto -top-[140px] md:top-0 my-auto gap-2 transform justify-between flex items-center z-30">
        <motion.button
          onClick={prevSlide}
          className="p-2 bg-secondary-main bg-opacity-60 rounded-full backdrop-blur-sm  text-white-main hover:bg-opacity-70 transition-all"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <BsChevronLeft className="text-base sm:text-2xl md:text-4xl" />
        </motion.button>

        {/* <motion.button
          onClick={() => setIsPlaying(!isPlaying)}
          className="p-2 bg-secondary-main bg-opacity-60 rounded-full backdrop-blur-sm  text-white-main hover:bg-opacity-70 transition-all"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {isPlaying ? <BsPause size={40} /> : <BsPlay size={40} />}
        </motion.button> */}

        <motion.button
          onClick={nextSlide}
          className="p-2 bg-secondary-main bg-opacity-60 rounded-full backdrop-blur-sm  text-white-main hover:bg-opacity-70 transition-all"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <BsChevronRight className="text-base sm:text-2xl md:text-4xl" />
        </motion.button>
      </div>

      {/* Slide Indicators */}
      <div className="fixed bottom-8 right-8 flex space-x-2 z-30">
        {dataBanners.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentSlide ? "bg-white" : "bg-white bg-opacity-40"
            }`}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.8 }}
          />
        ))}
      </div>
    </div>
  );
};

export default InnovativeSlider;
