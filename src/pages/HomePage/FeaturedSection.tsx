import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Zap, ShieldCheck, Globe2 } from "lucide-react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const FEATURES = [
  {
    title: "Instant Delivery",
    description:
      "Transfer funds across borders in seconds, not days. Real-time updates every step of the way.",
    icon: Zap,
  },
  {
    title: "Bank-Level Security",
    description:
      "Your money is protected by 256-bit encryption and advanced fraud prevention systems.",
    icon: ShieldCheck,
  },
  {
    title: "Global Reach",
    description:
      "Send money to over 160 countries with competitive exchange rates and zero hidden fees.",
    icon: Globe2,
  },
];

export default function FeatureSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      /* ---------------- Title ---------------- */
      gsap.from(".feature-title", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
        },
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: "power3.out",
      });

      /* ---------------- Subtitle: in → out while staying ---------------- */
      gsap
        .timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "center center",
            scrub: true,
          },
        })
        .fromTo(
          ".feature-subtitle",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.5 },
        )
        .to(".feature-subtitle", {
          opacity: 0,
          y: -20,
          duration: 0.5,
        });

      /* ---------------- Cards ---------------- */
      gsap.from(".feature-card", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          end: "bottom 20%",
          toggleActions: "play reverse play reverse",
        },
        opacity: 0,
        y: 50,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.2,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-6">
        {/* ---------------- Header ---------------- */}
        <div className="mb-12 text-center md:mb-16">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-primary">
            Why Choose Us
          </p>

          <h2 className="feature-title mb-4 text-3xl font-extrabold tracking-tight md:text-4xl lg:text-5xl">
            Built for Speed, Security & Scale
          </h2>

          <p className="feature-subtitle mx-auto max-w-2xl text-muted-foreground md:text-lg">
            Everything you need to move money globally—fast, safely, and without
            hidden fees.
          </p>
        </div>

        {/* ---------------- Cards ---------------- */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {FEATURES.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <motion.div
                key={index}
                whileHover={{ y: -6, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="
                  feature-card group rounded-3xl border
                  bg-background p-8
                  transition-colors
                  hover:border-primary
                "
              >
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <Icon className="h-6 w-6" />
                </div>

                <h3 className="mb-4 text-xl font-bold tracking-tight">
                  {feature.title}
                </h3>

                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
