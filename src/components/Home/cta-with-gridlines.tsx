"use client";
import { cn } from "@/lib/utils";
import { IconMessageCircleQuestion, IconPhone } from "@tabler/icons-react";
import Link from "next/link";
import React from "react";
import { HiArrowRight } from "react-icons/hi2";

export function CTAWithDashedGridLines() {
  return (
    <section className="relative z-20 mx-auto mt-20 grid w-full max-w-7xl grid-cols-1 justify-start bg-gradient-to-br from-gray-100 to-white dark:from-neutral-900 dark:to-neutral-950 md:mt-40 md:mb-10 md:grid-cols-3">
      <GridLineHorizontal className="top-0" offset="200px" />
      <GridLineHorizontal className="bottom-0 top-auto" offset="200px" />
      <GridLineVertical className="left-0" offset="80px" />
      <GridLineVertical className="left-auto right-0" offset="80px" />
      <div className="p-8 md:col-span-2 md:p-14">
        <h2 className="text-left text-xl text-neutral-500 font-medium tracking-tight md:text-3xl">
          Ready for a Cleaner, More Beautiful Pool?{" "}
          <span className="font-bold text-black dark:text-white">
            Let Krystal Clean Handle It!
          </span>
        </h2>
        <p className="mt-4 max-w-lg text-left text-xl font-medium tracking-tight text-neutral-500 dark:text-neutral-200 md:text-3xl">
          Enjoy sparkling clean pools all year long with our{" "}
          <span className="text-sky-700">reliable and professional services</span>, tailored for{" "}
          <span className="text-orange-800/70">small pools, play pools, and commercial properties</span>.
        </p>

        <div className="flex flex-col items-start sm:flex-row sm:items-center sm:gap-4">
          <Link
            href="/booking"
            className="group mt-8 flex items-center space-x-2 rounded-lg bg-primary px-4 py-2 text-base text-white shadow-[0px_2px_0px_0px_rgba(255,255,255,0.3)_inset]"
          >
            <span>Book Now</span>
            <HiArrowRight className="mt-0.5 h-3 w-3 stroke-[1px] text-white transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
          <Link
            href="tel:+17609127396"
            className="group mt-8 flex items-center space-x-2 rounded-lg border border-neutral-200 px-4 py-2 text-base text-black shadow-[0px_2px_0px_0px_rgba(255,255,255,0.3)_inset] dark:border-neutral-800 dark:text-white"
          >
            <span>Get a Consultation</span>
            <IconPhone className="mt-0.5 h-3 w-3 stroke-[1px] text-black transition-transform duration-200 group-hover:translate-x-1 dark:text-white" />
          </Link>
        </div>
      </div>
      <div className="border-t border-dashed p-8 md:border-l md:border-t-0 md:p-14">
        <p className="text-base text-neutral-700 dark:text-neutral-200">
          &quot;Thanks to Krystal Clean Pool Service, our pool always looks amazing. Their team is reliable, friendly, and thorough!&quot;
        </p>
        <div className="mt-4 flex flex-col items-start gap-1 text-sm">
          <p className="font-bold text-neutral-800 dark:text-neutral-200">
            Hannah Davis
          </p>
          <p className="text-neutral-500 dark:text-neutral-400">
            San Tan Valley, AZ
          </p>
        </div>
      </div>
    </section>
  );
}

const GridLineHorizontal = ({
  className,
  offset,
}: {
  className?: string;
  offset?: string;
}) => {
  return (
    <div
      style={
        {
          "--background": "#ffffff",
          "--color": "rgba(0, 0, 0, 0.2)",
          "--height": "1px",
          "--width": "5px",
          "--fade-stop": "90%",
          "--offset": offset || "200px", //-100px if you want to keep the line inside
          "--color-dark": "rgba(255, 255, 255, 0.2)",
          maskComposite: "exclude",
        } as React.CSSProperties
      }
      className={cn(
        "absolute left-[calc(var(--offset)/2*-1)] h-[var(--height)] w-[calc(100%+var(--offset))]",
        "bg-[linear-gradient(to_right,var(--color),var(--color)_50%,transparent_0,transparent)]",
        "[background-size:var(--width)_var(--height)]",
        "[mask:linear-gradient(to_left,var(--background)_var(--fade-stop),transparent),_linear-gradient(to_right,var(--background)_var(--fade-stop),transparent),_linear-gradient(black,black)]",
        "[mask-composite:exclude]",
        "z-30",
        "dark:bg-[linear-gradient(to_right,var(--color-dark),var(--color-dark)_50%,transparent_0,transparent)]",
        className,
      )}
    ></div>
  );
};

const GridLineVertical = ({
  className,
  offset,
}: {
  className?: string;
  offset?: string;
}) => {
  return (
    <div
      style={
        {
          "--background": "#ffffff",
          "--color": "rgba(0, 0, 0, 0.2)",
          "--height": "5px",
          "--width": "1px",
          "--fade-stop": "90%",
          "--offset": offset || "150px", //-100px if you want to keep the line inside
          "--color-dark": "rgba(255, 255, 255, 0.2)",
          maskComposite: "exclude",
        } as React.CSSProperties
      }
      className={cn(
        "absolute top-[calc(var(--offset)/2*-1)] h-[calc(100%+var(--offset))] w-[var(--width)]",
        "bg-[linear-gradient(to_bottom,var(--color),var(--color)_50%,transparent_0,transparent)]",
        "[background-size:var(--width)_var(--height)]",
        "[mask:linear-gradient(to_top,var(--background)_var(--fade-stop),transparent),_linear-gradient(to_bottom,var(--background)_var(--fade-stop),transparent),_linear-gradient(black,black)]",
        "[mask-composite:exclude]",
        "z-30",
        "dark:bg-[linear-gradient(to_bottom,var(--color-dark),var(--color-dark)_50%,transparent_0,transparent)]",
        className,
      )}
    ></div>
  );
};
