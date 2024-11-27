"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

export function LogosWithBlurFlip() {
    const [logos, setLogos] = useState([
        [
            {
                name: "Veteran Owned",
                src: "/certs/veteran-owned.png",
            },
            {
                name: "BBB Accredited Business",
                src: "/certs/better-business-bureau.png",
            },
            {
                name: "Certified Pool & Hot Tub Operator",
                src: "/certs/APSPlogo.png",
            },


            {
                name: "NSFP Certified",
                src: "/certs/NSPFlogo.png",
            },
            {
                name: "Eco-Friendly Certified",
                src: "/certs/ECOlogo.png",
            },

        ],
        [
            {
                name: "Veteran Owned2",
                src: "/certs/veteran-owned.png",
            },

            {
                name: "BBB Accredited Business2",
                src: "/certs/better-business-bureau.png",
            }, {
                name: "Certified Pool & Hot Tub Operator2",
                src: "/certs/APSPlogo.png",
            },

            {
                name: "NSFP Certified2",
                src: "/certs/NSPFlogo.png",
            },
            {
                name: "Eco-Friendly Certified2",
                src: "/certs/ECOlogo.png",
            },

        ],
    ]);
    const [activeLogoSet, setActiveLogoSet] = useState(logos[0]);
    const [isAnimating, setIsAnimating] = useState<boolean>(false);

    const flipLogos = () => {
        setLogos((currentLogos) => {
            const newLogos = [...currentLogos.slice(1), currentLogos[0]];
            setActiveLogoSet(newLogos[0]);
            setIsAnimating(true);
            return newLogos;
        });
    };

    useEffect(() => {
        if (!isAnimating) {
            const timer = setTimeout(() => {
                flipLogos();
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [isAnimating]);

    return (
        <div className="relative z-20 pb-32 px-4 md:px-8">
            <h2 className="text-center text-4xl md:text-5xl font-bold font-sans  bg-clip-text text-transparent bg-gradient-to-b from-neutral-900 to-neutral-600 dark:from-white dark:to-neutral-600">
                Our credentials
            </h2>
            <p className="text-center text-base text-neutral-700 font-sans dark:text-neutral-300 mt-4">
                We are proud of our certifications and qualifications. We are
                constantly learning and growing to better serve you.
            </p>
            <div className="flex gap-10 flex-wrap justify-center md:gap-10 relative h-full w-full mt-20">
                <AnimatePresence
                    mode="popLayout"
                    onExitComplete={() => {
                        setIsAnimating(false);
                    }}
                >
                    {activeLogoSet.map((logo, idx) => (
                        <motion.div
                            initial={{
                                y: 40,
                                opacity: 0,
                                filter: "blur(10px)",
                            }}
                            animate={{
                                y: 0,
                                opacity: 1,
                                filter: "blur(0px)",
                            }}
                            exit={{
                                y: -40,
                                opacity: 0,
                                filter: "blur(10px)",
                            }}
                            transition={{
                                duration: 0.8,
                                delay: 0.1 * idx,
                                ease: [0.4, 0, 0.2, 1],
                            }}
                            key={logo.name}
                            className="relative"
                        >
                            <Image
                                src={logo.src}
                                alt={logo.name}
                                width="125"
                                height="125"
                                className="md:h-[100px] md:w-[100px] lg:w-[125px] lg:h-[125px] h-20 w-40 object-contain filter dark:invert"
                            />
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </div>
    );
}
