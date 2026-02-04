import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import { motion } from "framer-motion";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function CallToAction() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const heading = "Experience Banking Made Simple";
  const description =
    "Join today and enjoy fast, secure, and convenient mobile financial services designed to keep you happy and in control.";

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Text animation
      gsap.from(".cta-text > *", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          end: "bottom 30%",
          toggleActions: "play reverse play reverse",
        },
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.15,
      });

      // Button animation
      gsap.from(".cta-action", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "bottom 30%",
          toggleActions: "play reverse play reverse",
        },
        opacity: 0,
        x: 60,
        duration: 0.8,
        ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative mb-20 py-20">
      <div className="container mx-auto max-w-7xl px-6">
        <div
          className="
            flex w-full flex-col gap-12 overflow-hidden
            rounded-2xl border bg-background
            p-8 md:p-12 lg:flex-row lg:items-center lg:justify-between
          "
        >
          {/* ---------------- Text ---------------- */}
          <div className="cta-text flex-1 text-center lg:text-left">
            <h3 className="mb-4 text-2xl font-extrabold tracking-tight md:text-4xl">
              {heading}
            </h3>
            <p className="mx-auto max-w-xl text-muted-foreground md:text-lg lg:mx-0">
              {description}
            </p>
          </div>

          {/* ---------------- Action ---------------- */}
          <motion.div
            className="cta-action flex shrink-0 justify-center lg:justify-end"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <Button asChild size="lg">
              <Link to="/register">Register an Account</Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
