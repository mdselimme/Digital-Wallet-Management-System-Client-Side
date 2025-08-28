import { useUserGetMeQuery } from "@/redux/features/user/user.api";
import { BanknoteArrowUp, Mail, SmartphoneNfc, UserRound } from "lucide-react";
import TableComponents from "../TableComponents";
import AddMoneySelfAccount from "./AddMoneySelfAccount";
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
import z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useSuperAdminTransferOtherMutation } from "@/redux/features/transaction/transaction.api";
import { Input } from "@/components/ui/input";
import Password from "@/components/ui/password";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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

const paymentType = ["BONUS", "ADD_MONEY"];

const AdminDashboard = () => {
  const [paymentValue, setPaymentValue] = useState("");
  const { data: userData } = useUserGetMeQuery({});
  const [superAdminTransferOther] = useSuperAdminTransferOtherMutation();
  const [open, setOpen] = useState(false);
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
    console.log(data);
    const toastId = toast.loading("Money is Adding ......");

    const addMoneyData = {
      receiverEmail: data.receiverEmail,
      amount: data.amount,
      senderPassword: data.senderPassword,
    };
    try {
      const result = await superAdminTransferOther(addMoneyData).unwrap();
      if (result.success) {
        setOpen(false);
        form.reset();
        toast.success("Add money successfully..", { id: toastId });
      }
    } catch (error: any) {
      console.log(error);
      if (error) {
        toast.error(error?.data?.message, { id: toastId });
      }
    }
  };

  const paymentValueChange = (data: string) => {
    setPaymentValue(data);
  };

  return (
    <div className="p-6 md:p-14 bg-primary-foreground h-screen rounded-4xl">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-14">
        <div className="bg-[#1652EB] p-5 md:p-10 rounded-4xl">
          <h1 className="text-3xl font-bold text-white mb-4">
            Current Balance
          </h1>
          <h1 className="text-3xl font-bold text-white mb-4">
            <span>&#2547;</span> {userData?.walletId?.balance}
          </h1>
          <div className="flex flex-col gap-y-3">
            <h3 className="text-lg font-normal text-white flex items-center">
              <UserRound />{" "}
              <span className="ml-2">
                {userData?.name}-({userData?.role})
              </span>
            </h3>
            <p className="text-base font-normal text-white flex items-center">
              <SmartphoneNfc /> <span className="ml-2">{userData?.phone}</span>
            </p>
            <p className="text-base font-normal text-white flex items-center">
              <Mail /> <span className="ml-2">{userData?.email}</span>
            </p>
          </div>
        </div>
        <div className="bg-[rgba(11,121,73,061)] p-5 md:col-span-2 md:p-10 rounded-4xl">
          <h1 className="text-3xl font-bold text-white mb-4">Account Action</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="bg-[#EBE7FF] dark:bg-amber-200 dark:text-black rounded-xl p-4 text-center">
              {userData?.role === "Super_Admin" ? (
                <AddMoneySelfAccount />
              ) : (
                <h1 className="text-2xl font-bold">Feature Coming Soon</h1>
              )}
            </div>
            <div className="bg-[#EBE7FF] dark:bg-amber-200 dark:text-black rounded-xl p-4 text-center">
              <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger className="w-full">
                  <BanknoteArrowUp className="mx-auto mb-2" size={70} />
                  <h1 className="text-lg font-semibold w-full">
                    Add Money To Other
                  </h1>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Add Money</DialogTitle>
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
                              <Input
                                type="number"
                                placeholder="amount"
                                {...field}
                              />
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
                        Add Money
                      </Button>
                    </div>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
        <div className="bg-white p-5 md:col-span-3 md:p-10 rounded-4xl">
          <div className=" flex items-center justify-between flex-col md:flex-row">
            <h1 className="text-lg md:text-3xl font-bold text-accent-foreground dark:text-black mb-5">
              Transaction history
            </h1>
            <Select onValueChange={paymentValueChange}>
              <SelectTrigger className="w-full mb-2 md:w-auto">
                <SelectValue placeholder="Payment Type Filter" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Filter Transaction Type</SelectLabel>
                  {paymentType.map((item: string) => (
                    <SelectItem key={item} value={item}>
                      {item}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div>
            <TableComponents paymentValue={paymentValue} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
