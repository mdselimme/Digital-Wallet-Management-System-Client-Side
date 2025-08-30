import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import HeroBanner from "../../assets/images/banner-mobile.svg";
import { Link } from "react-router";
import { motion } from "motion/react";

const HeroSection = () => {
  return (
    <section className="bg-muted">
      <div className="container mx-auto">
        <div className="grid items-center gap-8 lg:grid-cols-2">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            layout
            className="flex flex-col items-center p-16 text-center lg:items-start lg:text-left"
          >
            <p>Manage Your Money With a smart way</p>
            <h1 className="my-6 text-pretty text-4xl font-bold leading-20 lg:text-6xl">
              Smart Finance <br /> Secure Future
            </h1>
            <p className="text-muted-foreground mb-8 max-w-xl lg:text-xl">
              Our experienced financial advisors will guide you on the right
              investment options, affordable loan plans, tax saving tips, and
              long-term wealth growth strategies. Get advice online or offline -
              whichever is most convenient for you!
            </p>
            <div className="flex w-full flex-col justify-center gap-2 sm:flex-row lg:justify-start">
              <Link to={"/feature"}>
                <Button className="py-6 px-10">
                  Explore More
                  <ArrowRight className="size-4" />
                </Button>
              </Link>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 75 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            animate="visible"
          >
            <img
              src={HeroBanner}
              alt="placeholder hero"
              className="h-full w-full object-cover"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
