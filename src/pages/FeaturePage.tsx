import PageTitle from "@/utils/PageTitle";
import {
  DollarSign,
  MessagesSquare,
  PersonStanding,
  Timer,
  Zap,
  ZoomIn,
} from "lucide-react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const FeaturePage = () => {
  const features = [
    {
      title: "Send Money",
      description:
        "Instantly send money to other users or family members with a fast and secure system.",
      icon: Timer,
    },
    {
      title: "Cash In",
      description:
        "Cash in from any authorized agent without paying any transaction fees.",
      icon: Zap,
    },
    {
      title: "Cash Out",
      description:
        "Withdraw your balance from nearby agents whenever you need.",
      icon: ZoomIn,
    },
    {
      title: "B2B Transfer",
      description:
        "Agents can transfer balance to other Digipay agents to expand their network.",
      icon: PersonStanding,
    },
    {
      title: "Add Money",
      description:
        "Add funds easily through our trusted local bank distributors.",
      icon: DollarSign,
    },
    {
      title: "24/7 Support",
      description:
        "Our customer support team is available around the clock to help you.",
      icon: MessagesSquare,
    },
  ];

  return (
    <>
      <PageTitle title="Digipay || Features" />

      <section className="py-20">
        <div className="container mx-auto max-w-7xl px-6">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mx-auto mb-16 max-w-2xl text-center"
          >
            <p className="mb-3 text-sm font-medium text-muted-foreground">
              Digipay Features
            </p>
            <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
              Our Core Features
            </h2>
            <p className="mt-4 text-muted-foreground">
              Everything you need to manage digital money securely, quickly,
              and efficiently.
            </p>
          </motion.div>

          {/* Feature Cards */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, idx) => {
              const Icon = feature.icon;

              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.08 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -6 }}
                >
                  <Card className="h-full border-muted/60 transition-shadow hover:shadow-lg">
                    <CardHeader className="flex flex-col items-center gap-4 text-center">
                      <span className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <Icon className="size-6" />
                      </span>
                      <CardTitle className="text-lg">
                        {feature.title}
                      </CardTitle>
                    </CardHeader>

                    <CardContent className="text-center text-sm text-muted-foreground">
                      {feature.description}
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default FeaturePage;
