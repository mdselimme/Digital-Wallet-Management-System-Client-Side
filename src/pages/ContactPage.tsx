/* eslint-disable @typescript-eslint/no-explicit-any */
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

const contactFormSchema = z.object({
  name: z.string().min(3, { error: "Enter your name min 3 character length" }),
  email: z.email({ error: "Must be a valid email." }),
  subject: z
    .string()
    .min(10, { error: "write your subject min 10 character." }),
  message: z
    .string()
    .min(10, { error: "write your subject min 10 character." }),
});

const ContactPage = () => {
  const [contactForm] = useContactEmailMutation();

  const form = useForm<z.infer<typeof contactFormSchema>>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const contactData = {
    title: "Contact Us",
    description:
      "We're here to help! Whether you have questions about our mobile money transfer services, need assistance with your account, or want to share feedback, our team is always ready to listen. Reach out to us through the form below, call our support line, or visit one of our service centers. Your satisfaction and security are our top priority.",
    phone: "+8801932772523",
    email: "digi@pay.com",
    label: "digipay.com",
    url: "https://digipay.com",
  };

  const onSubmit = async (data: z.infer<typeof contactFormSchema>) => {
    const toastId = toast.loading("Message Sending ......");
    const messageBody = {
      name: data.name,
      email: data.email,
      subject: data.subject,
      message: data.message,
    };

    try {
      const result = await contactForm(messageBody).unwrap();
      if (result.success) {
        toast.success("Send Message Successfully.", { id: toastId });
        form.reset();
      }
    } catch (error: any) {
      if (error) {
        toast.error(error?.data?.message, { id: toastId });
      }
    }
  };

  return (
    <section className="py-32">
      <div className="container mx-auto">
        <div className="mx-auto flex sm:max-w-full md:max-w-7xl flex-col justify-between gap-10 lg:flex-row lg:gap-20">
          <div className="mx-auto flex sm:w-full md:max-w-1/2 flex-col justify-between gap-10">
            <div className="text-center lg:text-left">
              <h1 className="mb-2 text-5xl font-semibold lg:mb-1 lg:text-6xl">
                {contactData.title}
              </h1>
              <p className="text-muted-foreground p-4">
                {contactData.description}
              </p>
            </div>
            <div className="mx-auto lg:mx-0">
              <h3 className="mb-6 text-center text-2xl font-semibold lg:text-left">
                Contact Details
              </h3>
              <ul className="ml-4 list-disc">
                <li>
                  <span className="font-bold">Phone: </span>
                  {contactData.phone}
                </li>
                <li>
                  <span className="font-bold">Email: </span>
                  <a href={`mailto:${contactData.email}`} className="underline">
                    {contactData.email}
                  </a>
                </li>
                <li>
                  <span className="font-bold">Web: </span>
                  <a
                    href={contactData.url}
                    target="_blank"
                    className="underline"
                  >
                    {contactData.label}
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mx-auto flex sm:w-full md:w-1/2 flex-col gap-6 rounded-lg border p-10">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Your name</FormLabel>
                      <FormControl>
                        <Input
                          className="w-full"
                          type="text"
                          placeholder="write your name"
                          {...field}
                        />
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
                      <FormLabel>Your Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="write your email"
                          {...field}
                        />
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
                      <FormLabel>Your Subject</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="write your email"
                          {...field}
                        />
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
                          placeholder="Write your message here"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="text-end">
                  <Button type="submit" className="w-full">
                    Send Message
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactPage;
