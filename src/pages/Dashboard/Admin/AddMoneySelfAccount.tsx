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
import z from "zod";
import { toast } from "sonner";
import { useAddMoneyToSuperMutation } from "@/redux/features/wallet/wallet.api";
import { useUserGetMeQuery } from "@/redux/features/user/user.api";

const userMoneySentSchema = z.object({
  receiverEmail: z.email({ error: "Must be a valid email." }),
  amount: z.coerce
    .number({ error: "Amount must be a number." })
    .min(1, { error: "Must be greater than 0." }),
});

const AddMoneySelfAccount = () => {
  const [open, setOpen] = useState(false);
  const [addMoneySelfAccount] = useAddMoneyToSuperMutation();
  const { data: userData } = useUserGetMeQuery({});
  const form = useForm<z.infer<typeof userMoneySentSchema>>({
    resolver: zodResolver(userMoneySentSchema) as any,
    defaultValues: {
      receiverEmail: userData?.email,
      amount: 0,
    },
  });
  // Send Money Form
  const senderFormSubmit = async (
    data: z.infer<typeof userMoneySentSchema>
  ) => {
    const toastId = toast.loading("Money is Adding ......");

    const addMoneyData = {
      receiverEmail: data.receiverEmail,
      amount: data.amount,
    };
    try {
      const result = await addMoneySelfAccount(addMoneyData).unwrap();
      if (result.success) {
        setOpen(false);
        form.reset();
        toast.success("Add money successfully..", { id: toastId });
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
        <h1 className="text-lg font-semibold w-full">Add Money Self Account</h1>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Money</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(senderFormSubmit)}
            className="space-y-8"
            id="add-money-admin"
          >
            <FormField
              disabled={true}
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
          </form>
        </Form>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>

          <div className="text-end">
            <Button form="add-money-admin" type="submit">
              Add Money
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddMoneySelfAccount;
