import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import { motion } from "motion/react";

const CallToAction = () => {
  const heading = "Experience Banking Made Simple";
  const description =
    "Join today and enjoy fast, secure, and convenient mobile financial services designed to keep you happy and in control.";

  return (
    <section className="py-20 mb-20">
      <div className="container mx-auto">
        <div className="flex w-full flex-col gap-16 overflow-hidden rounded-lg p-8 md:rounded-xl lg:flex-row lg:items-center lg:p-12">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            layout
            className="flex-1"
          >
            <h3 className="mb-3 text-2xl font-semibold md:mb-4 md:text-4xl lg:mb-6">
              {heading}
            </h3>
            <p className="text-muted-foreground max-w-xl lg:text-lg">
              {description}
            </p>
          </motion.div>
          <motion.div
            initial={{ left: 0, opacity: 0 }}
            whileInView={{ left: "100", opacity: 1 }}
            transition={{ delay: 0.1, ease: "easeIn" }}
            className="flex shrink-0 flex-col gap-2 sm:flex-row"
          >
            <Button asChild variant="default" size="lg">
              <Link to={"/register"}>Register An Account</Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
