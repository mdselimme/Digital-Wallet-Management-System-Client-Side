import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import HeroBanner from "@/assets/images/banner-mobile.svg";
import { Link } from "react-router";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(".hero-item", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.15,
      });

      gsap.from(imageRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
        opacity: 0,
        y: 80,
        scale: 0.95,
        duration: 1,
        ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="
        relative flex items-center overflow-hidden
        min-h-[80vh] lg:min-h-[85vh]
        bg-background
        before:absolute before:inset-0
        before:bg-gradient-to-br
        before:from-primary/10
        before:via-background
        before:to-primary/5
        before:content-['']
      "
    >
      {/* Content wrapper */}
      <div className="container relative z-10 mx-auto max-w-7xl">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          {/* ---------------- Text Content ---------------- */}
          <div className="flex flex-col items-center px-6 py-16 text-center lg:items-start lg:px-0 lg:py-0 lg:text-left">
            <p className="hero-item text-sm font-medium text-muted-foreground">
              Manage your money the smart way
            </p>

            <h1 className="hero-item my-6 max-w-xl text-pretty font-bold tracking-tight text-3xl sm:text-4xl lg:text-6xl">
              <span className="bg-gradient-to-r from-primary via-primary/80 to-muted-foreground bg-clip-text text-transparent">
                Smart Finance
              </span>
              <br />
              Secure Future
            </h1>

            <p className="hero-item mb-8 max-w-xl text-muted-foreground sm:text-base lg:text-lg">
              Our experienced financial advisors help you choose the right
              investment options, affordable loan plans, and long-term wealth
              strategies—online or offline, whenever it suits you.
            </p>

            <div className="hero-item flex w-full flex-col justify-center gap-3 sm:flex-row lg:justify-start">
              <Button asChild size="lg">
                <Link to="/feature" className="flex items-center gap-2">
                  Explore More
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>

          {/* ---------------- Image ---------------- */}
          <div ref={imageRef} className="flex justify-center lg:justify-end">
            <img
              src={HeroBanner}
              alt="Financial dashboard illustration"
              className="w-full max-w-lg max-h-[70vh] object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
