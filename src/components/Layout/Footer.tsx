import { useEffect, useRef } from "react";
import DigiPayLogo from "@/assets/images/Logo";
import { motion } from "framer-motion";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!footerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(".footer-item", {
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 90%",
          end: "bottom 40%",
          toggleActions: "play reverse play reverse",
        },
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.15,
      });
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer ref={footerRef} className="border-t bg-background py-12">
      <div className="container mx-auto max-w-7xl px-6">
        {/* ---------------- Top ---------------- */}
        <div className="grid gap-10 md:grid-cols-4">
          {/* Logo & tagline */}
          <div className="footer-item md:col-span-2">
            <DigiPayLogo width={110} height={50} />
            <p className="mt-4 max-w-sm text-sm font-medium text-muted-foreground">
              Do life easy with our secure and reliable digital payment system.
            </p>
          </div>

          {/* Navigation */}
          <div className="footer-item">
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide">
              Company
            </h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="hover:text-primary transition-colors">
                <a href="/">Home</a>
              </li>
              <li className="hover:text-primary transition-colors">
                <a href="/features">Features</a>
              </li>
              <li className="hover:text-primary transition-colors">
                <a href="/pricing">Pricing</a>
              </li>
              <li className="hover:text-primary transition-colors">
                <a href="/contact">Contact</a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div className="footer-item">
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide">
              Social
            </h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="hover:text-primary transition-colors">
                <a href="#">Twitter</a>
              </li>
              <li className="hover:text-primary transition-colors">
                <a href="#">LinkedIn</a>
              </li>
              <li className="hover:text-primary transition-colors">
                <a href="#">Instagram</a>
              </li>
            </ul>
          </div>
        </div>

        {/* ---------------- Bottom ---------------- */}
        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t pt-6 text-sm text-muted-foreground md:flex-row">
          <p>© 2025 DigiPay. All rights reserved.</p>

          <div className="flex gap-4">
            <motion.a
              whileHover={{ y: -2 }}
              href="/terms"
              className="hover:text-primary transition-colors"
            >
              Terms
            </motion.a>
            <motion.a
              whileHover={{ y: -2 }}
              href="/privacy"
              className="hover:text-primary transition-colors"
            >
              Privacy
            </motion.a>
          </div>
        </div>
      </div>
    </footer>
  );
}
