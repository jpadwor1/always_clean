'use client'

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Map from "../icons/map";
import { cn } from "@/lib/utils";
import { IconCircleCheckFilled } from "@tabler/icons-react";
import Link from "next/link";
import House from "../icons/house";
import { IconBuilding } from '@tabler/icons-react';
import { School } from 'lucide-react';
// Example service data
const services = [
    {
        id: "small-pools",
        name: "Small Pools",
        description: "Professional maintenance and cleaning services tailored for small residential pools to keep them pristine and swim-ready.",
        price: "$100 per month",
        icon: <House height={50} width={50} />, // Replace this with an appropriate icon for pool maintenance
        discount: "Flat monthly pricing",
        image: "/pools/smallpool.webp", // Replace with a relevant image
        features: [
            "Weekly cleaning and skimming to remove debris",
            "Chemical balancing for safe and crystal-clear water",
            "Filter inspection and maintenance",
            "Optional add-ons for seasonal maintenance",
        ],
    },
    {
        id: "play-pools",
        name: "Play Pools",
        description: "Comprehensive pool cleaning and maintenance services designed for play pools, ensuring a safe and fun swimming experience.",
        price: "$145 per month",
        icon: <School height={50} width={50} strokeWidth={1} />, // Replace this with an appropriate icon for play pools
        discount: "Flat monthly pricing",
        image: "/pools/playpool.webp", // Replace with a relevant image
        features: [
            "Weekly cleaning and vacuuming to maintain a clean surface",
            "Precise chemical testing and balancing for safe swimming",
            "Pump and filter system checks to ensure optimal performance",
            "Seasonal adjustments for year-round pool enjoyment",
        ],
    },
    {
        id: "commercial-pools",
        name: "Commercial Pools",
        description: "Customized cleaning and maintenance services for commercial pools, tailored to meet the needs of businesses and large facilities.",
        price: "Custom pricing per month",
        icon: <IconBuilding height={50} width={50} stroke={1} />, // Replace this with an appropriate icon for commercial pools
        discount: "Pricing based on pool size and scope of service",
        image: "/pools/commpool.webp", // Replace with a relevant image
        features: [
            "Comprehensive cleaning and debris removal for large pools",
            "Frequent chemical testing and adjustments for high-traffic use",
            "Routine equipment inspections and repairs",
            "Flexible scheduling to minimize disruptions to your business",
        ],
    },
];

const ServiceShowcase = () => {
    const [selectedService, setSelectedService] = useState(services[0]);

    return (
        <div className="p-10 flex text-gray-800 flex-col max-w-6xl mx-auto">
            <h1 className="text-6xl font-bold text-left mb-3">
                Discover Our <span className="text-primary">Services</span>
            </h1>
            <p className="text-left text-lg mb-20 max-w-xl">
                Discover our range of pool maintenance plans, designed to cater to different needs and pool sizes. From residential play pools to expansive commercial pools, we offer customized care solutions.
            </p>

            {/* Icon Selector */}
            <div className="md:grid grid-rows-1 md:grid-cols-2 gap-0">


                {/* Service Image */}
                <div className="w-full mb-6 sm:mb-0">
                    <div className="flex md:justify-start justify-center space-x-8 mb-6">
                        {services.map((service) => (
                            <div key={service.id} className="group flex flex-col items-center justify-center space-y-2">
                                <button

                                    onClick={() => setSelectedService(service)}
                                    className={`text-3xl  ${selectedService.id === service.id ? "  text-primary hover:text-primary/80" : "text-gray-400 group-hover:text-gray-300"
                                        }`}
                                >
                                    {service.icon}
                                </button>
                                <p className={` tracking-tight ${selectedService.id === service.id ? "text-primary hover:text-primary/80" : "text-gray-400 group-hover:text-gray-300"}`}>{service.name}</p>
                            </div>
                        ))}
                    </div>
                    <div className="w-full h-full ">
                        <Image
                            src={selectedService.image}
                            alt={selectedService.name}
                            width={500}
                            height={500}
                            className="rounded-xl shadow-2xl w-[450px] object-cover h-[350px]"
                        />
                        <Link href="/services">
                            <Button size={"sm"} className="mt-4 bg-orange-500/70 font-normal rounded-full tracking-wider text-white hover:bg-orange-500/70 hover:scale-95 shadow-md ">Learn More</Button>
                        </Link>
                    </div>

                </div>

                {/* Service Details */}
                <div className="max-h-[500px] w-full bg-blue-800 text-white flex flex-col items-start justify-between sm:pl-6 shadow-lg sm:ml-4 p-4 rounded-lg ">
                    <div>
                        <h2 className="text-2xl font-semibold">{selectedService.name}</h2>
                        <p className="mt-2">{selectedService.description}</p>
                        <p className="text-white mt-4 text-lg font-medium">
                            {selectedService.price}
                        </p>
                        <p className="text-accent text-xs">{selectedService.discount}</p>

                        {/* Features */}
                        <ul
                            role="list"
                            className={cn(
                                "text-white dark:text-neutral-300",
                                "mt-8 space-y-3 text-sm leading-6 sm:mt-10"
                            )}
                        >
                            {selectedService.features.map((feature) => (
                                <li key={feature} className="flex gap-x-3 text-[13px]">
                                    <IconCircleCheckFilled
                                        className={cn("text-white dark:text-neutral-400",
                                            "h-6 w-5 flex-none"
                                        )}
                                        aria-hidden="true"
                                    />
                                    {feature}
                                </li>
                            ))}
                        </ul>
                    </div>

                </div>
            </div>

        </div>
    );
};

export default ServiceShowcase;
