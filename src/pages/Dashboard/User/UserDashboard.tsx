/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";

import {
  BanknoteArrowUp,
  Mail,
  SmartphoneNfc,
  UserRound,
} from "lucide-react";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import Password from "@/components/ui/password";
import Loading from "@/components/Loading";
import TableComponents from "../TableComponents";
import SendMoneyUser from "./SendMoneyUser";

import { toast } from "sonner";

import { useUserGetMeQuery } from "@/redux/features/user/user.api";
import { useUserCashOutAgentMutation } from "@/redux/features/transaction/transaction.api";

import { checkAndStartTour } from "@/utils/ShowDriver";
import { userSteps } from "@/utils/driverData/userSteps";

import "driver.js/dist/driver.css";

/* ---------------------- Schema ---------------------- */
const userMoneySentSchema = z.object({
  receiverEmail: z.email({ error: "Invalid email address" }),
  senderPassword: z
    .string()
    .length(5, "Password must be exactly 5 digits")
    .regex(/^[1-9][0-9]{4}$/, "Cannot start with 0"),
  amount: z.coerce.number().min(1, "Amount must be greater than 0"),
});

/* ---------------------- Component ---------------------- */
const UserDashboard = () => {
  const [paymentValue, setPaymentValue] = useState("");
  const [open, setOpen] = useState(false);

  const { data: userData, isLoading } = useUserGetMeQuery({});
  const [cashOutMoneyAgent] = useUserCashOutAgentMutation();

  const form = useForm<z.infer<typeof userMoneySentSchema>>({
    resolver: zodResolver(userMoneySentSchema) as any,
    defaultValues: {
      receiverEmail: "",
      senderPassword: "",
      amount: 0,
    },
  });

  const paymentType = [
    "CASH_IN",
    "SEND_MONEY",
    "CASH_OUT",
    "BONUS",
    "ADD_MONEY",
  ];

  useEffect(() => {
    if (userData?.email && userData?.role) {
      checkAndStartTour(userSteps, userData.email, userData.role);
    }
  }, [userData]);

  const cashOutFormSubmit = async (
    data: z.infer<typeof userMoneySentSchema>
  ) => {
    const toastId = toast.loading("Processing cash out...");

    try {
      const result = await cashOutMoneyAgent(data).unwrap();
      if (result.success) {
        toast.success("Cash out successful", { id: toastId });
        form.reset();
        setOpen(false);
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "Something went wrong", {
        id: toastId,
      });
    }
  };

  if (isLoading) return <Loading />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-slate-900 to-black p-6 md:p-14">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 backdrop-blur-xl bg-white/10 border border-white/20 rounded-4xl p-6 md:p-10 shadow-[0_30px_80px_rgba(0,0,0,0.4)]">

        {/* -------- Balance Card -------- */}
        <div
          id="step-1"
          className="relative rounded-3xl p-8 bg-gradient-to-br from-blue-600 to-indigo-700 text-white shadow-xl overflow-hidden"
        >
          <div className="absolute inset-0 bg-white/10 blur-2xl" />
          <h1 className="text-sm uppercase tracking-widest opacity-80">
            Current Balance
          </h1>
          <h2 className="text-4xl font-extrabold mt-2">
            ৳ {userData?.walletId?.balance.toFixed(2)}
          </h2>

          <div className="mt-6 space-y-3 text-sm opacity-90">
            <p className="flex items-center gap-2">
              <UserRound size={18} /> {userData?.name} ({userData?.role})
            </p>
            <p className="flex items-center gap-2">
              <SmartphoneNfc size={18} /> {userData?.phone}
            </p>
            <p className="flex items-center gap-2">
              <Mail size={18} /> {userData?.email}
            </p>
          </div>
        </div>

        {/* -------- Actions -------- */}
        <div
          id="step-2"
          className="md:col-span-2 rounded-3xl p-8 bg-white/10 backdrop-blur-xl border border-white/20 shadow-lg"
        >
          <h1 className="text-2xl font-bold text-white mb-6">
            Account Actions
          </h1>

          <div className="grid grid-cols-2 gap-8">
            {/* Send Money */}
            <div
              id="step-3"
              className="rounded-2xl p-6 bg-white/90 shadow-md hover:shadow-xl transition"
            >
              <SendMoneyUser />
            </div>

            {/* Cash Out */}
            <div
              id="step-4"
              className="rounded-2xl p-6 bg-white/90 shadow-md hover:shadow-xl transition"
            >
              <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger className="w-full text-center">
                  <BanknoteArrowUp
                    size={64}
                    className="mx-auto mb-3 text-indigo-600"
                  />
                  <h2 className="font-semibold text-lg">Cash Out</h2>
                </DialogTrigger>

                <DialogContent className="backdrop-blur-xl bg-white/90 border border-white/40 rounded-3xl shadow-2xl">
                  <DialogHeader>
                    <DialogTitle>Cash Out</DialogTitle>
                  </DialogHeader>

                  <Form {...form}>
                    <form
                      id="cash-out"
                      onSubmit={form.handleSubmit(cashOutFormSubmit)}
                      className="space-y-5"
                    >
                      <FormField
                        control={form.control}
                        name="receiverEmail"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Agent Email</FormLabel>
                            <FormControl>
                              <Input {...field} type="email" />
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
                              <Input {...field} type="number" />
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
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                              <Password {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </form>
                  </Form>

                  <DialogFooter className="mt-4">
                    <DialogClose asChild>
                      <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button
                      type="submit"
                      form="cash-out"
                      className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white"
                    >
                      Cash Out
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>

        {/* -------- Transactions -------- */}
        <div
          id="step-5"
          className="md:col-span-3 rounded-3xl p-8 bg-white shadow-xl"
        >
          <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
            <h1 className="text-2xl font-bold">Transaction History</h1>

            <Select onValueChange={setPaymentValue}>
              <SelectTrigger className="md:w-64">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Payment Type</SelectLabel>
                  {paymentType.map((item) => (
                    <SelectItem key={item} value={item}>
                      {item}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <TableComponents paymentValue={paymentValue} />
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
