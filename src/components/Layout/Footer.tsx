import DigiPayLogo from "@/assets/images/Logo";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";

const topSectionVariants: Variants = {
  hidden: { opacity: 0, y: 32 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: "easeOut",
      staggerChildren: 0.14,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: "easeOut",
    },
  },
};

const bottomVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut", delay: 0.1 },
  },
};

export default function Footer() {
  return (
    <footer className="border-t bg-background py-12">
      <div className="container mx-auto max-w-7xl px-6">
        {/* Top  */}
        <motion.div
          variants={topSectionVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.25 }}
          className="grid gap-10 md:grid-cols-4"
        >
          {/* Logo & tagline */}
          <motion.div variants={itemVariants} className="md:col-span-2">
            <DigiPayLogo width={110} height={50} />
            <p className="mt-4 max-w-sm text-sm font-medium text-muted-foreground">
              Do life easy with our secure and reliable digital payment system.
            </p>
          </motion.div>

          {/* Navigation */}
          <motion.div variants={itemVariants}>
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
          </motion.div>

          {/* Social */}
          <motion.div variants={itemVariants}>
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
          </motion.div>
        </motion.div>

        {/* Bottom  */}
        <motion.div
          variants={bottomVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.35 }}
          className="mt-10 flex flex-col items-center justify-between gap-4 border-t pt-6 text-sm text-muted-foreground md:flex-row"
        >
          <p>© {new Date().getFullYear()} DigiPay. All rights reserved.</p>

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
        </motion.div>
      </div>
    </footer>
  );
}
