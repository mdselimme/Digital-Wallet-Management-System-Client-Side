import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from "motion/react";
interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

const FaqPage = () => {
  const heading = "Frequently asked questions";
  const description =
    "Find answers to common questions about our products. Can't find what you're looking for? Contact our support team.";
  const faqItems: FaqItem[] = [
    {
      id: "faq1",
      question: "What is Mobile Money Transfer (MFS)?",
      answer:
        "Mobile Money Transfer (MFS) is a service that allows you to send, receive, and store money securely using your mobile phone without the need for a bank account.",
    },
    {
      id: "faq2",
      question: "How do I register for MFS?",
      answer:
        "You can register by visiting your nearest agent or downloading the MFS app, then completing the registration with your mobile number and national ID.",
    },
    {
      id: "faq3",
      question: "Can I send money to someone who is not registered?",
      answer:
        "Yes, you can send money to both registered and unregistered users. Unregistered users can collect the money from the nearest MFS agent.",
    },
    {
      id: "faq4",
      question: "Is my money safe in MFS?",
      answer:
        "Yes, your money is safe. All transactions are secured with a PIN code, encryption, and regulated under the central bank.",
    },
    {
      id: "faq5",
      question: "What are the charges for sending money?",
      answer:
        "Charges vary depending on the transaction amount. Typically, a small service fee applies for sending, withdrawing, or transferring money.",
    },
    {
      id: "faq6",
      question: "Can I pay bills using MFS?",
      answer:
        "Yes, you can pay utility bills, mobile recharges, and even make online purchases directly from your MFS account.",
    },
  ];

  return (
    <motion.section
      initial={{ scale: 0, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeIn" }}
      layout
      className="py-32"
    >
      <div className="container mx-auto space-y-16">
        <div className="mx-auto flex max-w-3xl flex-col text-left md:text-center">
          <h2 className="mb-3 text-3xl font-semibold md:mb-4 lg:mb-6 lg:text-4xl">
            {heading}
          </h2>
          <p className="text-muted-foreground lg:text-lg">{description}</p>
        </div>
        <Accordion
          type="single"
          collapsible
          className="mx-auto w-full lg:max-w-3xl"
        >
          {faqItems.map((item) => (
            <AccordionItem key={item.id} value={item.id}>
              <AccordionTrigger className="transition-opacity duration-200 hover:no-underline hover:opacity-60">
                <div className="font-medium sm:py-1 lg:py-2 lg:text-lg">
                  {item.question}
                </div>
              </AccordionTrigger>
              <AccordionContent className="sm:mb-1 lg:mb-2">
                <div className="text-muted-foreground lg:text-lg">
                  {item.answer}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </motion.section>
  );
};

export default FaqPage;
