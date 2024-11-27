"use client";
import React from "react";
import { IconCircleCheckFilled } from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { motion } from "framer-motion";
import { Outfit } from "next/font/google";
import Link from "next/link";

const outfit = Outfit({
    subsets: ["latin"],
    weight: ["400", "500", "700"],
});

export type Tier = {
    name: string;
    id: string;
    href: string;
    price: string;
    priceSubheading?: string;
    priceUnit?: string;
    description: string;
    features: string[];
    featured: boolean;
    cta: string;
    onClick: () => void;
    link: string;
};

export const residentialServices: Tier[] = [
    {
        name: "Small Pools",
        id: "tier-small-pools",
        href: "#",
        price: "$100",
        priceSubheading: "per month",
        priceUnit: "",
        description:
            "Affordable and reliable pool cleaning services designed specifically for small residential pools.",
        features: [
            "Weekly cleaning and debris removal",
            "Chemical balancing for safe swimming conditions",
            "Filter inspection and maintenance",
            "Flexible scheduling to fit your needs",
        ],
        featured: false,
        cta: "Get Started Today",
        onClick: () => { },
        link: "/contact",
    },
    {
        name: "Play Pools",
        id: "tier-play-pools",
        href: "#",
        price: "$145",
        priceSubheading: "per month",
        priceUnit: "",
        description:
            "Comprehensive pool cleaning and maintenance services tailored for play pools to ensure safe and fun swimming experiences.",
        features: [
            "Weekly vacuuming and skimming for pristine water",
            "Precise chemical testing and adjustments",
            "Pump and filter system checks",
            "Seasonal maintenance and adjustments",
        ],
        featured: true,
        cta: "Schedule Your Service",
        onClick: () => { },
        link: "/contact",
    },
    {
        name: "Commercial Pools",
        id: "tier-commercial-pools",
        href: "#",
        price: "Custom",
        priceSubheading: "per month",
        priceUnit: "",
        description:
            "Customized pool cleaning and maintenance plans for commercial properties, ensuring your pool is always ready for guests.",
        features: [
            "Comprehensive cleaning for high-traffic pools",
            "Frequent chemical testing and balancing",
            "Routine equipment inspections and repairs",
            "Flexible scheduling to minimize disruptions",
        ],
        featured: false,
        cta: "Contact Us for a Quote",
        onClick: () => { },
        link: "/contact",
    },
];

export function PricingGrid() {
    return (
        <div className="relative py-10 md:pt-20 max-w-7xl mx-auto flex flex-col items-center justify-between">
            <div className="relative md:mx-0 mx-6">
                <h2
                    className={cn(
                        "text-center text-xl md:text-4xl font-bold text-black dark:text-white",
                        outfit.className
                    )}
                >
                    Transparent Pricing for Crystal Clear Pools
                </h2>
                <p
                    className={cn(
                        "text-center text-sm md:text-base text-neutral-700 dark:text-neutral-400 max-w-2xl mt-4 mx-auto font-normal",
                        outfit.className
                    )}
                >
                    Krystal Clean Pool Service provides tailored pool cleaning and maintenance plans for small pools, play pools, and commercial properties in Florence, AZ. With flexible pricing and a commitment to excellence, we make keeping your pool pristine easy and hassle-free.
                </p>
            </div>
            <Pricing />
        </div>
    );
}

export function Pricing() {
    const [active, setActive] = useState<TierType>("play");
    const tabs = [
        { name: "Small Pool", value: "small" },
        { name: "Play Pool", value: "play" },
        { name: "Commercial", value: "commercial" },
    ];

    type TierType = 'small' | 'play' | 'commercial';

    const tiers: Record<
        TierType,
        {
            name: string;
            id: string;
            price: string;
            priceSubheading: string;
            description: string;
            features: string[];
            featured: boolean;
            cta: string;
            link: string;
        }[]
    > = {
        small: [
            {
                name: "Small Pools",
                id: "tier-small-pools",
                price: "$100",
                priceSubheading: "per month",
                description:
                    "Affordable and reliable pool cleaning services designed specifically for small residential pools.",
                features: [
                    "Weekly cleaning and debris removal",
                    "Chemical balancing for safe swimming conditions",
                    "Filter inspection and maintenance",
                    "Flexible scheduling to fit your needs",
                    "Flexible billing options for your convenience",
                    "Comprehensive service reports including photos",
                    "Access to invoice history to simplify tax season",
                ],
                featured: true,
                cta: "Get Started Today",
                link: "/contact",
            },
        ],
        play: [
            {
                name: "Play Pools",
                id: "tier-play-pools",
                price: "$145",
                priceSubheading: "per month",
                description:
                    "Comprehensive pool cleaning and maintenance services tailored for play pools to ensure safe and fun swimming experiences.",
                features: [
                    "Weekly vacuuming and skimming for pristine water",
                    "Precise chemical testing and adjustments",
                    "Pump and filter system checks",
                    "Seasonal maintenance and adjustments",
                    "Flexible billing options for your convenience",
                    "Comprehensive service reports including photos",
                    "Access to invoice history to simplify tax season",
                ],
                featured: true,
                cta: "Schedule Your Service",
                link: "/contact",
            },
        ],
        commercial: [
            {
                name: "Commercial Pools",
                id: "tier-commercial-pools",
                price: "Custom",
                priceSubheading: "per month",
                description:
                    "Customized pool cleaning and maintenance plans for commercial properties, ensuring your pool is always ready for guests.",
                features: [
                    "Comprehensive cleaning for high-traffic pools",
                    "Frequent chemical testing and balancing",
                    "Routine equipment inspections and repairs",
                    "Flexible scheduling to minimize disruptions",
                    "Flexible billing options for your convenience",
                    "Comprehensive service reports including photos",
                    "Access to invoice history to simplify tax season",
                ],
                featured: true,
                cta: "Contact Us for a Quote",
                link: "/contact",
            },
        ],
    };

    return (
        <div className="relative">
            <div className="flex items-center justify-center bg-neutral-100 dark:bg-neutral-800 w-fit mx-auto mt-10 mb-12 rounded-md overflow-hidden">
                {tabs.map((tab) => (
                    <button
                        key={tab.value}
                        className={cn(
                            "text-sm font-medium text-gray-500 dark:text-neutral-400 p-4 rounded-md relative",
                            active === tab.value ? " text-white dark:text-black" : ""
                        )}
                        onClick={() => setActive(tab.value as TierType)}
                    >
                        {active === tab.value && (
                            <motion.span
                                layoutId="moving-div"
                                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                className="absolute inset-0 bg-primary dark:bg-white"
                            />
                        )}
                        <span className="relative z-10">{tab.name}</span>
                    </button>
                ))}
            </div>
            <div className="mx-6 sm:mx-auto mt-4 max-w-md md:mt-20 grid relative z-20 grid-cols-1 items-center">
                {tiers[active].map((tier, tierIdx) => (
                    <div
                        key={tier.id}
                        className={cn(
                            tier.featured
                                ? "relative bg-[radial-gradient(164.75%_100%_at_50%_0%,#0025bb_0%,#001774_48.73%)] shadow-2xl"
                                : "bg-white dark:bg-black",
                            "rounded-lg px-6 py-8 sm:mx-8 lg:mx-0 h-full flex flex-col justify-between"
                        )}
                    >
                        <div>
                            <h3
                                id={tier.id}
                                className={cn(
                                    tier.featured
                                        ? "text-white"
                                        : "text-neutral-700 dark:text-neutral-400",
                                    "text-base font-semibold leading-7"
                                )}
                            >
                                {tier.name}
                            </h3>
                            <p className="mt-4 inline">
                                <motion.span
                                    initial={{ y: 20, opacity: 0, filter: "blur(10px)" }}
                                    animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                                    transition={{
                                        duration: 0.2,
                                        ease: "easeOut",
                                        delay: 0.1 * tierIdx,
                                    }}
                                    key={active}
                                    className={cn(
                                        "text-4xl font-bold tracking-tight inline-block",
                                        tier.featured
                                            ? "text-white"
                                            : "text-neutral-900 dark:text-neutral-200"
                                    )}
                                >
                                    {tier.price}
                                </motion.span>
                                {tier.priceSubheading && (
                                    <motion.span
                                        initial={{ y: 20, opacity: 0, filter: "blur(10px)" }}
                                        animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                                        transition={{
                                            duration: 0.2,
                                            ease: "easeOut",
                                            delay: 0.1 * tierIdx,
                                        }}
                                        key={active}
                                        className={cn(
                                            "ml-2 text-sm font-bold tracking-tight inline-block",
                                            tier.featured
                                                ? "text-white"
                                                : "text-neutral-600 dark:text-neutral-200"
                                        )}
                                    >
                                        {tier.priceSubheading}
                                    </motion.span>
                                )}
                            </p>
                            <p
                                className={cn(
                                    tier.featured
                                        ? "text-neutral-300"
                                        : "text-neutral-600 dark:text-neutral-300",
                                    "mt-6 text-sm leading-7"
                                )}
                            >
                                {tier.description}
                            </p>
                            <ul
                                role="list"
                                className={cn(
                                    tier.featured
                                        ? "text-neutral-300"
                                        : "text-neutral-600 dark:text-neutral-300",
                                    "mt-8 space-y-3 text-sm leading-6 sm:mt-10"
                                )}
                            >
                                {tier.features.map((feature) => (
                                    <li key={feature} className="flex gap-x-3">
                                        <IconCircleCheckFilled
                                            className={cn(
                                                tier.featured
                                                    ? "text-white"
                                                    : "text-neutral-700 dark:text-neutral-400",
                                                "h-6 w-5 flex-none"
                                            )}
                                            aria-hidden="true"
                                        />
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <Link href={tier.link}>
                                <button
                                    className={cn(
                                        "mt-8 bg-primary text-white hover:ring-2 ring-offset-2 dark:ring-offset-2 transition duration-200 ring-black dark:ring-white dark:text-black dark:bg-white rounded-full py-2.5 px-3.5 text-center text-sm font-semibold sm:mt-10 block w-full",
                                        tier.featured
                                            ? "bg-white dark:bg-white text-black shadow-sm hover:bg-white/90"
                                            : ""
                                    )}
                                >
                                    {tier.cta}
                                </button>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}


