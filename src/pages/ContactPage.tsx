/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useContactEmailMutation } from "@/redux/features/contact/contact.api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import PageTitle from "@/utils/PageTitle";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ---------------- Schema ---------------- */
const contactFormSchema = z.object({
  name: z.string().min(3, { message: "Minimum 3 characters required" }),
  email: z.string().email({ message: "Must be a valid email" }),
  phone: z
    .string()
    .length(11, { message: "Phone number must be exactly 11 digits" })
    .regex(/^01\d{9}$/, { message: "Invalid Bangladeshi phone number" }),
  subject: z.string().min(10, { message: "Minimum 10 characters required" }),
  message: z.string().min(10, { message: "Minimum 10 characters required" }),
});

export default function ContactPage() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [contactForm] = useContactEmailMutation();

  const form = useForm<z.infer<typeof contactFormSchema>>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    },
  });

  /* ---------------- GSAP ---------------- */
  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(".contact-left > *", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "bottom 40%",
          toggleActions: "play reverse play reverse",
        },
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.15,
      });

      gsap.from(".contact-form", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          end: "bottom 30%",
          toggleActions: "play reverse play reverse",
        },
        opacity: 0,
        x: 80,
        duration: 0.9,
        ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  /* ---------------- Submit ---------------- */
  const onSubmit = async (data: z.infer<typeof contactFormSchema>) => {
    const toastId = toast.loading("Sending message...");
    try {
      const res = await contactForm(data).unwrap();
      if (res.success) {
        toast.success("Message sent successfully", { id: toastId });
        form.reset();
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "Something went wrong", {
        id: toastId,
      });
    }
  };

  return (
    <section
      ref={sectionRef}
      className="
        relative overflow-hidden py-24 md:py-32
        before:absolute before:inset-0
        before:bg-gradient-to-br
        before:from-primary/5 before:via-background before:to-primary/10
        before:content-['']
      "
    >
      <PageTitle title="Digipay | Contact" />

      <div className="container relative z-10 mx-auto max-w-7xl px-6">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
          {/* ---------------- Left Content ---------------- */}
          <div className="contact-left text-center lg:text-left">
            <h1 className="mb-4 text-4xl font-extrabold tracking-tight md:text-5xl lg:text-6xl">
              Contact Us
            </h1>

            <p className="mb-10 max-w-xl text-muted-foreground md:text-lg lg:mx-0 mx-auto">
              Have questions about our mobile money services or need help with
              your account? Our team is always ready to assist you.
            </p>

            <div className="rounded-2xl border bg-background/60 p-6 backdrop-blur">
              <h3 className="mb-4 text-xl font-semibold">
                Contact Information
              </h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <span className="font-medium text-foreground">Phone:</span>{" "}
                  +8801737210235
                </li>
                <li>
                  <span className="font-medium text-foreground">Email:</span>{" "}
                  <a href="mailto:digi@pay.com" className="underline">
                    digi@pay.com
                  </a>
                </li>
                <li>
                  <span className="font-medium text-foreground">Website:</span>{" "}
                  <a
                    href="https://digipay.com"
                    target="_blank"
                    className="underline"
                  >
                    digipay.com
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* ---------------- Form Card ---------------- */}
          <div className="contact-form rounded-2xl border bg-background p-6 shadow-lg md:p-8">
            <h3 className="mb-6 text-2xl font-bold tracking-tight">
              Send Us a Message
            </h3>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <div className="grid gap-4 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Your Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="john@email.com"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input placeholder="01XXXXXXXXX" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Subject</FormLabel>
                      <FormControl>
                        <Input placeholder="How can we help?" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Message</FormLabel>
                      <FormControl>
                        <Textarea
                          rows={5}
                          placeholder="Write your message here..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  variant="default"
                  type="submit"
                  size="lg"
                  className="w-full cursor-pointer"
                >
                  Send Message
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
}
