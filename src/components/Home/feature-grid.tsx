import { cn } from "@/lib/utils";
import {
  IconAdjustmentsAlt,
  IconBuilding,
  IconCalendar,
  IconCurrencyDollar,
  IconDrone,
  IconDroplet,
  IconFileReport,
  IconHelpCircle,
  IconLeaf,
  IconMessageCircle,
  IconShieldCheck,
  IconTestPipe,
  IconTool,
} from "@tabler/icons-react";

export function FeaturesGrid() {
  const features = [
    {
      title: "Pristine Pool Cleaning",
      description:
        "Our team specializes in keeping pools in Florence, AZ, crystal clear and swim-ready with regular cleaning and debris removal.",
      icon: <IconDroplet className="text-primary" />,
    },
    {
      title: "Chemical Balancing Expertise",
      description:
        "We ensure your pool water is perfectly balanced to prevent bacteria and algae, delivering safe swimming conditions year-round.",
      icon: <IconTestPipe className="text-primary" />,
    },
    {
      title: "Customized Maintenance Plans",
      description:
        "From small residential pools to commercial properties, we tailor our services to meet your unique needs in Florence, AZ, and surrounding areas.",
      icon: <IconAdjustmentsAlt className="text-primary" />,
    },
    {
      title: "Reliable Equipment Checks",
      description:
        "We perform routine inspections of your pumps, filters, and heaters to ensure your pool runs smoothly and efficiently.",
      icon: <IconTool className="text-primary" />,
    },
    {
      title: "Seasonal Pool Care",
      description:
        "Prepare your pool for summer fun or winterize it for colder months with our expert seasonal services in Florence, AZ.",
      icon: <IconCalendar className="text-primary" />,
    },
    {
      title: "Eco-Friendly Practices",
      description:
        "We prioritize eco-conscious pool care methods to reduce water and chemical waste while maintaining pristine results.",
      icon: <IconLeaf className="text-primary" />,
    },
    {
      title: "Transparent Pricing",
      description:
        "No surprises—just clear and competitive pricing. Our flat-rate plans offer unbeatable value for pool owners in Florence, AZ.",
      icon: <IconCurrencyDollar className="text-primary" />,
    },
    {
      title: "Free Consultation",
      description:
        "Not sure where to start? Book a free consultation to discuss your pool care needs and receive expert advice tailored to your situation.",
      icon: <IconMessageCircle className="text-primary" />,
    },
  ];
  return (
    <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 py-10 md:grid-cols-2 lg:grid-cols-4">
      {features.map((feature, index) => (
        <Feature key={feature.title} {...feature} index={index} />
      ))}
    </div>
  );
}

const Feature = ({
  title,
  description,
  icon,
  index,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
}) => {
  return (
    <div
      className={cn(
        "group/feature relative flex flex-col py-10 dark:border-neutral-800 lg:border-r",
        (index === 0 || index === 4) && "dark:border-neutral-800 lg:border-l",
        index < 4 && "dark:border-neutral-800 lg:border-b",
      )}
    >
      {index < 4 && (
        <div className="pointer-events-none absolute inset-0 h-full w-full bg-gradient-to-t from-neutral-100 to-transparent opacity-0 transition duration-200 group-hover/feature:opacity-100 dark:from-neutral-800" />
      )}
      {index >= 4 && (
        <div className="pointer-events-none absolute inset-0 h-full w-full bg-gradient-to-b from-neutral-100 to-transparent opacity-0 transition duration-200 group-hover/feature:opacity-100 dark:from-neutral-800" />
      )}
      <div className="relative z-10 mb-4 px-10 text-neutral-600 dark:text-neutral-400">
        {icon}
      </div>
      <div className="relative z-10 mb-2 px-10 text-lg font-bold">
        <div className="absolute inset-y-0 left-0 h-6 w-1 origin-center rounded-br-full rounded-tr-full bg-neutral-300 transition-all duration-200 group-hover/feature:h-8 group-hover/feature:bg-primary dark:bg-neutral-700" />
        <span className="inline-block text-neutral-800 transition duration-200 group-hover/feature:translate-x-2 dark:text-neutral-100">
          {title}
        </span>
      </div>
      <p className="relative z-10 max-w-xs px-10 text-sm text-neutral-600 dark:text-neutral-300">
        {description}
      </p>
    </div>
  );
};
