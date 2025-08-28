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
import { BanknoteArrowDown } from "lucide-react";
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
import { useAgentCashInUserMutation } from "@/redux/features/transaction/transaction.api";
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

const AgentCashIn = () => {
  const [open, setOpen] = useState(false);

  const [cashInAgent] = useAgentCashInUserMutation();

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
    const toastId = toast.loading("Cash In Processing ......");

    const cashInBody = {
      receiverEmail: data.receiverEmail,
      senderPassword: data.senderPassword,
      amount: data.amount,
    };

    try {
      const result = await cashInAgent(cashInBody).unwrap();
      if (result.success) {
        setOpen(false);
        form.reset();
        toast.success("Cash In successfully..", { id: toastId });
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
        <BanknoteArrowDown className="mx-auto mb-2" size={70} />
        <h1 className="text-lg font-semibold w-full">Cash In</h1>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Cash In</DialogTitle>
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
                  <FormLabel>Receiver Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="write receiver email"
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
              Cash In
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AgentCashIn;
