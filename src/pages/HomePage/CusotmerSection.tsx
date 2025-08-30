import { ArrowRight, ArrowUpRight } from "lucide-react";
import CustomerBanner from "../../assets/images/hero-banner.svg";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router";
import { motion } from "motion/react";

const CustomerSection = () => {
  const badge = "✨ Our Customer Our Family Member.";
  const heading = "Customer Happiness Is Our first priority.";
  const description =
    "Customers feel happy with mobile financial services because they enjoy secure, fast, and easy transactions, saving time while gaining trust and convenience.";
  const buttons = {
    primary: {
      text: "Discover all components",
      url: "https://www.shadcnblocks.com",
    },
    secondary: {
      text: "View on GitHub",
      url: "https://www.shadcnblocks.com",
    },
  };
  const image = {
    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-1.svg",
    alt: "Hero section demo image showing interface components",
  };
  return (
    <section className="py-32">
      <div className="container mx-auto">
        <div className="grid items-center gap-8 lg:grid-cols-2">
          <motion.div
            className="box"
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            layout
          >
            <img
              src={CustomerBanner}
              alt={image.alt}
              className="max-w-full rounded-md object-cover"
            />
          </motion.div>
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            layout
            className="flex flex-col items-center text-center lg:items-start lg:text-left p-10"
          >
            {badge && (
              <Badge variant="outline" className="py-3 px-10">
                {badge}
                <ArrowUpRight className="ml-2 size-4" />
              </Badge>
            )}
            <h1 className="my-6 text-pretty text-4xl font-bold lg:text-6xl leading-20">
              {heading}
            </h1>
            <p className="text-muted-foreground mb-8 max-w-xl lg:text-xl">
              {description}
            </p>
            <div className="flex w-full flex-col justify-center gap-2 sm:flex-row lg:justify-start">
              {buttons.secondary && (
                <Button
                  asChild
                  variant="outline"
                  className="w-full sm:w-auto py-5 px-5"
                >
                  <Link to={"/contact"}>
                    Contact Us
                    <ArrowRight className="size-4" />
                  </Link>
                </Button>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CustomerSection;
