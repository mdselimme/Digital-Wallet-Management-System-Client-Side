import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router";

gsap.registerPlugin(ScrollTrigger);

export default function ContactHeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      /* ---------------- Main section enter / exit ---------------- */
      gsap.fromTo(
        sectionRef.current,
        { opacity: 0, y: 80 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play reverse play reverse",
          },
        },
      );

      /* ---------------- Stagger content ---------------- */
      gsap.from(".contact-item", {
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.15,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          end: "bottom 25%",
          toggleActions: "play reverse play reverse",
        },
      });

      /* ---------------- Floating cards ---------------- */
      gsap.to(".floating", {
        y: -20,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(".floating-rev", {
        y: 20,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden px-6 py-12 md:py-24"
    >
      <div className="mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-2xl border bg-background p-8 md:p-24">
          {/* Background wave */}
          <div className="absolute inset-0 hero-wave opacity-40 dark:opacity-10" />

          {/* Floating card (left) */}
          <div className="absolute left-10 top-20 hidden w-32 floating md:left-20 md:w-48 lg:block">
            <div className="aspect-[1.6/1] -rotate-12 rounded-2xl border-t border-white/20 bg-primary shadow-2xl p-4 flex flex-col justify-between">
              <div className="h-8 w-10 rounded-md bg-background/80" />
              <div className="space-y-1">
                <div className="h-2 w-full rounded bg-white/20" />
                <div className="h-2 w-2/3 rounded bg-white/20" />
              </div>
            </div>
          </div>

          {/* Floating card (right) */}
          <div className="absolute bottom-20 right-10 hidden w-32 floating-rev md:right-20 md:w-48 lg:block">
            <div className="aspect-[1.6/1] rotate-12 rounded-2xl border-t border-white/20 bg-primary/90 shadow-2xl p-4 flex flex-col justify-end">
              <div className="mb-2 h-6 w-full rounded-sm bg-primary-foreground/90" />
              <div className="h-1 w-full rounded bg-white/20" />
            </div>
          </div>

          {/* Content */}
          <div className="relative z-10 mx-auto max-w-4xl text-center">
            <div className="contact-item mb-8 inline-flex items-center rounded-full border bg-background/60 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-primary">
              Contact Us
            </div>

            <h1 className="contact-item mb-8 text-4xl font-extrabold leading-tight tracking-tight md:text-6xl lg:text-7xl">
              Global Money Transfers for the{" "}
              <span className="relative inline-block">
                Modern Worker
                <span className="absolute -bottom-2 left-0 h-1.5 w-full rounded-full bg-primary/40" />
              </span>
            </h1>

            <p className="contact-item mx-auto mb-12 max-w-2xl text-lg font-medium text-muted-foreground md:text-xl">
              Being a money transfer service for hard working people, Soldi is
              your fast and simple solution for borderless payments.
            </p>

            <div className="contact-item flex flex-col items-center justify-center gap-4 sm:flex-row">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
              >
                <Link to={"/contact"}>
                  <Button
                    size="lg"
                    className="rounded-2xl px-10 py-6 cursor-pointer"
                  >
                    Personal Account
                  </Button>
                </Link>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
              >
                <Link to={"/contact"}>
                  <Button
                    size="lg"
                    variant="secondary"
                    className="rounded-2xl px-10 py-6 cursor-pointer"
                  >
                    Agent Account
                  </Button>
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
