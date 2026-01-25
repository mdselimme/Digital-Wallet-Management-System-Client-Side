"use client";

import { useEffect, useRef } from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import CustomerBanner from "@/assets/images/hero-banner.svg";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router";
import { motion } from "framer-motion";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function CustomerSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const badge = "✨ Our Customers Are Our Family";
  const heading = "Customer Happiness Is Our First Priority";
  const description =
    "Customers feel happy with mobile financial services because they enjoy secure, fast, and easy transactions—saving time while gaining trust and convenience.";

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Image animation
      gsap.from(".customer-image", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play reverse play reverse",
        },
        opacity: 0,
        x: -80,
        duration: 1,
        ease: "power3.out",
      });

      // Text animation
      gsap.from(".customer-text > *", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          end: "bottom 25%",
          toggleActions: "play reverse play reverse",
        },
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.15,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 md:py-32">
      <div className="container mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* ---------------- Image ---------------- */}
          <motion.div
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="customer-image flex justify-center"
          >
            <img
              src={CustomerBanner}
              alt="Happy customers using digital finance"
              className="w-full max-w-lg rounded-2xl object-contain shadow-lg"
            />
          </motion.div>

          {/* ---------------- Text Content ---------------- */}
          <div className="customer-text flex flex-col items-center text-center lg:items-start lg:text-left">
            <Badge
              variant="outline"
              className="mb-6 px-6 py-2 text-sm font-semibold"
            >
              {badge}
              <ArrowUpRight className="ml-2 h-4 w-4" />
            </Badge>

            <h2 className="mb-6 max-w-xl text-pretty text-3xl font-extrabold tracking-tight md:text-4xl lg:text-5xl">
              {heading}
            </h2>

            <p className="mb-8 max-w-xl text-muted-foreground md:text-lg">
              {description}
            </p>

            <div className="flex w-full flex-col justify-center gap-3 sm:flex-row lg:justify-start">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
              >
                <Button asChild size="lg" variant="outline">
                  <Link to="/contact" className="flex items-center gap-2">
                    Contact Us
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
