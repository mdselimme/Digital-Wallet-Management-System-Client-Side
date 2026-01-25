import { useEffect, useRef } from "react";
import { Check } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import PageTitle from "@/utils/PageTitle";
import { motion } from "framer-motion";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function PricingPage() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Header animation
      gsap.from(".pricing-header > *", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          toggleActions: "play reverse play reverse",
        },
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.15,
      });

      // Cards animation
      gsap.from(".pricing-card", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          end: "bottom 20%",
          toggleActions: "play reverse play reverse",
        },
        opacity: 0,
        y: 60,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.25,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 md:py-32">
      <PageTitle title="Digipay | Pricing" />

      <div className="container mx-auto max-w-7xl px-6">
        {/* ---------------- Header ---------------- */}
        <div className="pricing-header mb-16 text-center">
          <h2 className="mb-4 text-4xl font-extrabold tracking-tight md:text-5xl lg:text-6xl">
            Pricing & Fees
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground md:text-lg">
            Transparent pricing with no hidden costs. Choose the plan that fits
            your needs.
          </p>
        </div>

        {/* ---------------- Cards ---------------- */}
        <div className="grid gap-10 md:grid-cols-2">
          {/* -------- Personal Account -------- */}
          <motion.div
            whileHover={{ y: -6, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 250, damping: 20 }}
            className="pricing-card rounded-2xl border bg-background p-8 shadow-sm"
          >
            <h3 className="mb-6 text-center text-2xl font-bold">
              Personal Account
            </h3>

            <ul className="space-y-4">
              <Separator />
              <li className="flex items-center justify-between text-sm font-medium">
                <span>Cash Out</span>
                <span className="flex items-center gap-2">
                  Fee: 1%
                  <Check className="h-4 w-4 text-primary" />
                </span>
              </li>
              <Separator />
              <li className="flex items-center justify-between text-sm font-medium">
                <span>Cash In</span>
                <span className="flex items-center gap-2">
                  Free
                  <Check className="h-4 w-4 text-primary" />
                </span>
              </li>
              <Separator />
              <li className="flex items-center justify-between text-sm font-medium">
                <span>Send Money</span>
                <span className="flex items-center gap-2">
                  0.3%
                  <Check className="h-4 w-4 text-primary" />
                </span>
              </li>
              <Separator />
              <li className="flex items-center justify-between text-sm font-medium">
                <span>Add Money</span>
                <span className="flex items-center gap-2">
                  Free
                  <Check className="h-4 w-4 text-primary" />
                </span>
              </li>
            </ul>
          </motion.div>

          {/* -------- Agent Account -------- */}
          <motion.div
            whileHover={{ y: -6, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 250, damping: 20 }}
            className="pricing-card rounded-2xl border bg-background p-8 shadow-sm"
          >
            <h3 className="mb-6 text-center text-2xl font-bold">
              Agent Account
            </h3>

            <ul className="space-y-4">
              <Separator />
              <li className="flex items-center justify-between text-sm font-medium">
                <span>Cash Out</span>
                <span className="flex items-center gap-2">
                  0.5% Commission
                  <Check className="h-4 w-4 text-primary" />
                </span>
              </li>
              <Separator />
              <li className="flex items-center justify-between text-sm font-medium">
                <span>Cash In</span>
                <span className="flex items-center gap-2">
                  0.5% Commission
                  <Check className="h-4 w-4 text-primary" />
                </span>
              </li>
              <Separator />
              <li className="flex items-center justify-between text-sm font-medium">
                <span>B2B</span>
                <span className="flex items-center gap-2">
                  Free
                  <Check className="h-4 w-4 text-primary" />
                </span>
              </li>
              <Separator />
              <li className="flex items-center justify-between text-sm font-medium">
                <span>Add Money</span>
                <span className="flex items-center gap-2">
                  Free
                  <Check className="h-4 w-4 text-primary" />
                </span>
              </li>
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
