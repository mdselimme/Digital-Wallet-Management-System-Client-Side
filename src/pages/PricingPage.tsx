import { Check } from "lucide-react";
import { motion } from "motion/react";
import { Separator } from "@/components/ui/separator";

const PricingPage = () => {
  return (
    <section className="pb-32 pt-10">
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        layout
        className="text-center mb-12"
      >
        <h2 className="text-4xl font-semibold text-pretty lg:text-6xl mb-5">
          Pricing And Fees
        </h2>
        <p className="text-muted-foreground lg:text-xl text-center">
          See Our Payment Fees by Account wise
        </p>
      </motion.div>
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        layout
        className="container mx-auto grid md:grid-cols-2 gap-10 justify-between items-start p-4"
      >
        <div className="flex flex-col items-center gap-6 text-center">
          <div className="mx-auto flex w-full flex-col rounded-lg border p-6">
            <div className="flex justify-center">
              <span className="text-3xl font-semibold">
                Personal User Account
              </span>
            </div>
            <div className="my-6">
              <div>
                <ul className="flex flex-col gap-5">
                  <Separator />
                  <li className="flex items-center justify-between gap-2 text-sm font-medium">
                    Cash Out <p>Fee: 1% Per Transaction</p>{" "}
                    <Check className="inline size-4 shrink-0" />
                  </li>
                  <Separator />
                  <li className="flex items-center justify-between gap-2 text-sm font-medium">
                    Cash In <p>Fee: Free</p>
                    <Check className="inline size-4 shrink-0" />
                  </li>
                  <Separator />
                  <li className="flex items-center justify-between gap-2 text-sm font-medium">
                    Send Money <p>Fee: 0.3% Per Transaction</p>{" "}
                    <Check className="inline size-4 shrink-0" />
                  </li>
                  <Separator />
                  <li className="flex items-center justify-between gap-2 text-sm font-medium">
                    Add Money <p>Fee: Free</p>{" "}
                    <Check className="inline size-4 shrink-0" />
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center gap-6 text-center">
          <div className="mx-auto flex w-full flex-col rounded-lg border p-6">
            <div className="flex justify-center">
              <span className="text-3xl font-semibold">Agent Account</span>
            </div>
            <div className="my-6">
              <div>
                <ul className="flex flex-col gap-5">
                  <Separator />
                  <li className="flex items-center justify-between gap-2 text-sm font-medium">
                    Cash Out <p>Commission: 0.5% Commission Per Transaction</p>{" "}
                    <Check className="inline size-4 shrink-0" />
                  </li>
                  <Separator />
                  <li className="flex items-center justify-between gap-2 text-sm font-medium">
                    Cash In <p>Commission: 0.5% Commission Per Transaction</p>
                    <Check className="inline size-4 shrink-0" />
                  </li>
                  <Separator />
                  <li className="flex items-center justify-between gap-2 text-sm font-medium">
                    B2B <p>Commission: Free</p>{" "}
                    <Check className="inline size-4 shrink-0" />
                  </li>
                  <Separator />
                  <li className="flex items-center justify-between gap-2 text-sm font-medium">
                    Add Money <p>Commission: Free</p>{" "}
                    <Check className="inline size-4 shrink-0" />
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default PricingPage;
