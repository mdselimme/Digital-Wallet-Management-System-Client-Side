import { Code, Cog, PenTool, Shrub } from "lucide-react";
import TeamDetails from "./TeamDetails";
import { motion } from "motion/react";
const AboutPage = () => {
  const services = [
    {
      icon: <Cog className="h-6 w-6" />,
      title: "Our Mission",
      description:
        "We aim to make financial services simple, secure, and accessible for everyone, anytime, anywhere.",
      items: [
        "Secure transactions",
        "Easy accessibility",
        "Customer empowerment",
      ],
    },
    {
      icon: <PenTool className="h-6 w-6" />,
      title: "Our Vision",
      description:
        "To be the most trusted mobile financial service provider, empowering customers with convenience and reliability.",
      items: ["Trusted services", "Convenient solutions", "Global reach"],
    },
    {
      icon: <Code className="h-6 w-6" />,
      title: "Our Values",
      description:
        "Integrity, trust, customer focus, and innovation guide everything we do for our users.",
      items: [
        "Integrity first",
        "Customer centricity",
        "Continuous innovation",
      ],
    },
    {
      icon: <Shrub className="h-6 w-6" />,
      title: "Why Choose Us",
      description:
        "We provide fast, secure, and reliable financial solutions that keep our customers happy and in control.",
      items: ["Fast and reliable", "24/7 support", "User-friendly services"],
    },
  ];

  return (
    <div>
      <section className="py-20">
        <div className="container mx-auto">
          <div className="mx-auto max-w-6xl space-y-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 1 }}
              transition={{
                delay: 0.3,
                duration: 0.6,
                ease: "easeOut",
              }}
              className="space-y-4 text-center"
            >
              <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
                About Us
              </h2>
              <p className="text-muted-foreground mx-auto max-w-2xl text-sm tracking-tight md:text-lg">
                We are a trusted mobile financial service provider dedicated to
                making everyday transactions simple, secure, and accessible.
              </p>
            </motion.div>

            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              layout
              className="grid grid-cols-1 gap-8 md:grid-cols-2"
            >
              {services.map((service, index) => (
                <div
                  key={index}
                  className="border-border space-y-6 rounded-lg border p-8 transition-shadow hover:shadow-sm"
                >
                  <div className="flex items-center gap-4">
                    <div className="bg-muted rounded-full p-3">
                      {service.icon}
                    </div>
                    <h3 className="text-xl font-semibold">{service.title}</h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    {service.description}
                  </p>
                  <div className="space-y-2">
                    {service.items.map((item, itemIndex) => (
                      <div key={itemIndex} className="flex items-center gap-2">
                        <div className="bg-foreground h-1.5 w-1.5 rounded-full" />
                        <span className="text-sm font-medium">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>
      <TeamDetails />
    </div>
  );
};

export default AboutPage;
