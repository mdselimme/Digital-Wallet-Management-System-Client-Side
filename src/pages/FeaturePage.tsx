import PageTitle from "@/utils/PageTitle";
import {
  DollarSign,
  MessagesSquare,
  PersonStanding,
  Timer,
  Zap,
  ZoomIn,
} from "lucide-react";
import { motion } from "motion/react";
const FeaturePage = () => {
  const heading = "Our Core Features";
  const subheading = "Digipay Features";
  const features = [
    {
      title: "Send Money",
      description:
        "Users Can Send Money Another Users Easily When Another Users or Family Members Need Balance.",
      icon: <Timer className="size-4 md:size-6" />,
    },
    {
      title: "Cash In",
      description:
        "Users Can Cash In From Any Agent With Out Any Transaction Fee When his need.",
      icon: <Zap className="size-4 md:size-6" />,
    },
    {
      title: "Cash Out",
      description: "Users Can Cash Out From An Agent When His Need.",
      icon: <ZoomIn className="size-4 md:size-6" />,
    },
    {
      title: "B2B",
      description:
        "Agents Can B2B to grow his network another digipay agent with out any transaction fee.",
      icon: <PersonStanding className="size-4 md:size-6" />,
    },
    {
      title: "Add Money",
      description:
        "Users And Agent Can Add Money From Our Local Bank Distributor.",
      icon: <DollarSign className="size-4 md:size-6" />,
    },
    {
      title: "Customer Support",
      description: "Our Customer Service Open 24/7 When Your Need.",
      icon: <MessagesSquare className="size-4 md:size-6" />,
    },
  ];
  return (
    <>
      <PageTitle title="Digipay || Feature" />
      <section className="py-20 px-8 md:px-0">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          layout
          className="container mx-auto max-w-7xl"
        >
          <p className="mb-4 text-xs text-muted-foreground md:pl-5">
            {subheading}
          </p>
          <h2 className="text-3xl font-medium md:pl-5 lg:text-4xl">
            {heading}
          </h2>
          <div className="mx-auto mt-6 grid gap-x-20 gap-y-8 md:grid-cols-2 md:gap-y-6 lg:mt-20">
            {features.map((feature, idx) => (
              <div className="flex gap-6 rounded-lg md:block md:p-5" key={idx}>
                <span className="mb-8 flex size-10 shrink-0 items-center justify-center rounded-full bg-accent md:size-12">
                  {feature.icon}
                </span>
                <div>
                  <h3 className="font-medium md:mb-2 md:text-xl">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted-foreground md:text-base">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </section>
    </>
  );
};

export default FeaturePage;
