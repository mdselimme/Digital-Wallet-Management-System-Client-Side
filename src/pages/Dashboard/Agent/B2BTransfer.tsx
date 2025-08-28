/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { BanknoteArrowUp } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useAgentB2BAgentMutation } from "@/redux/features/transaction/transaction.api";
import z from "zod";
import { toast } from "sonner";
import Password from "@/components/ui/password";

const userMoneySentSchema = z.object({
  receiverEmail: z.email({ error: "Must be a valid email." }),
  senderPassword: z
    .string({ error: "Password must be string type." })
    .min(5, { error: "Password minimum 5 characters long." })
    .max(5, { error: "Password maximum 5 characters long." })
    .regex(/^[1-9][0-9]{4}$/, {
      message: "Password must be exactly 5 digits and cannot start with 0.",
    }),
  amount: z.coerce
    .number({ error: "Amount must be a number." })
    .min(1, { error: "Must be greater than 0." }),
});

const B2BTransaction = () => {
  const [open, setOpen] = useState(false);

  const [b2bTransaction] = useAgentB2BAgentMutation();

  const form = useForm<z.infer<typeof userMoneySentSchema>>({
    resolver: zodResolver(userMoneySentSchema) as any,
    defaultValues: {
      receiverEmail: "",
      senderPassword: "",
      amount: 0,
    },
  });
  // Send Money Form
  const senderFormSubmit = async (
    data: z.infer<typeof userMoneySentSchema>
  ) => {
    const toastId = toast.loading("b2b Processing ......");

    const b2bBody = {
      receiverEmail: data.receiverEmail,
      senderPassword: data.senderPassword,
      amount: data.amount,
    };

    try {
      const result = await b2bTransaction(b2bBody).unwrap();
      if (result.success) {
        setOpen(false);
        form.reset();
        toast.success("B2b transaction successful..", { id: toastId });
      }
    } catch (error: any) {
      if (error) {
        toast.error(error?.data?.message, { id: toastId });
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="w-full">
        <BanknoteArrowUp className="mx-auto mb-2" size={70} />
        <h1 className="text-lg font-semibold">B 2 B</h1>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>B2B Transaction</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(senderFormSubmit)}
            className="space-y-8"
            id="send-money"
          >
            <FormField
              control={form.control}
              name="receiverEmail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Agent Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="write agent email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="amount" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="senderPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Password</FormLabel>
                  <FormControl>
                    <Password {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>

          <div className="text-end">
            <Button form="send-money" type="submit">
              B2B Add
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default B2BTransaction;
