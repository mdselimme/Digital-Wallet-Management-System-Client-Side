/* eslint-disable @typescript-eslint/no-explicit-any */
import { useUserGetMeQuery } from "@/redux/features/user/user.api";
import { BanknoteArrowUp, Mail, SmartphoneNfc, UserRound } from "lucide-react";
import TableComponents from "../TableComponents";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Password from "@/components/ui/password";
import { toast } from "sonner";
import { useUserCashOutAgentMutation } from "@/redux/features/transaction/transaction.api";
import { useEffect, useState } from "react";
import SendMoneyUser from "./SendMoneyUser";
import { type DriveStep } from "driver.js";
import "driver.js/dist/driver.css";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { checkAndStartTour } from "@/utils/ShowDriver";
import Loading from "@/components/Loading";

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

const UserDashboard = () => {
  const [paymentValue, setPaymentValue] = useState("");
  const { data: userData, isLoading: userDataLoading } = useUserGetMeQuery({});
  const [open, setOpen] = useState(false);

  const [cashOutMoneyAgent] = useUserCashOutAgentMutation();
  const paymentType = [
    "CASH_IN",
    "SEND_MONEY",
    "CASH_OUT",
    "BONUS",
    "ADD_MONEY",
  ];

  useEffect(() => {
    const steps: DriveStep[] = [
      {
        element: "#step-1",
        popover: {
          title: "Users Account Details",
          description:
            "Here you see your account balance an and account details.",
          side: "left",
          align: "start",
        },
      },
      {
        element: "#step-2",
        popover: {
          title: "Account Action",
          description:
            "In this section you can send money to users and cash out to agent.",
          side: "bottom",
          align: "start",
        },
      },
      {
        element: "#step-3",
        popover: {
          title: "Send Money",
          description: "Here You can Send Money Any Users Account.",
          side: "bottom",
          align: "start",
        },
      },
      {
        element: "#step-4",
        popover: {
          title: "Cash Out",
          description: "Here you can Cash Out From any agent account.",
          side: "left",
          align: "start",
        },
      },
      {
        element: "#step-5",
        popover: {
          title: "Transaction Details",
          description: "Here you can see your recent and all transaction.",
          side: "top",
          align: "start",
        },
      },
    ];
    checkAndStartTour(steps, userData?.email, userData?.role);
  }, [userData.email, userData.role]);

  const form = useForm<z.infer<typeof userMoneySentSchema>>({
    resolver: zodResolver(userMoneySentSchema) as any,
    defaultValues: {
      receiverEmail: "",
      senderPassword: "",
      amount: 0,
    },
  });

  // Cash Out Form
  const cashOutFormSubmit = async (
    data: z.infer<typeof userMoneySentSchema>
  ) => {
    const toastId = toast.loading("Cash Outing ......");

    const cashOutBody = {
      receiverEmail: data.receiverEmail,
      senderPassword: data.senderPassword,
      amount: data.amount,
    };

    try {
      const result = await cashOutMoneyAgent(cashOutBody).unwrap();
      if (result.success) {
        setOpen(false);
        form.reset();
        toast.success("Cash Out successfully..", { id: toastId });
      }
    } catch (error: any) {
      if (error) {
        toast.error(error?.data?.message, { id: toastId });
      }
    }
  };

  const paymentValueChange = (data: string) => {
    setPaymentValue(data);
  };

  if (userDataLoading) {
    return <Loading />;
  }

  return (
    <div className="p-6 md:p-14 bg-primary-foreground h-screen rounded-4xl">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-14">
        <div id="step-1" className="bg-[#1652EB] p-5 md:p-10 rounded-4xl">
          <h1 className="text-3xl font-bold text-white mb-4">
            Current Balance
          </h1>
          <h1 className="text-3xl font-bold text-white mb-4">
            <span>&#2547;</span> {userData?.walletId?.balance.toFixed(2)}
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
            <p className="text-[14px] md:text-base font-normal text-white flex items-center">
              <Mail /> <span className="ml-2">{userData?.email}</span>
            </p>
          </div>
        </div>
        <div
          id="step-2"
          className="bg-[rgba(11,121,73,061)] p-5 md:col-span-2 md:p-10 rounded-4xl"
        >
          <h1 className="text-3xl font-bold text-white mb-4">Account Action</h1>
          <div className="grid grid-cols-2 gap-10">
            <div
              id="step-3"
              className="bg-[#EBE7FF] dark:bg-amber-200 dark:text-black rounded-xl p-4 text-center"
            >
              <SendMoneyUser />
            </div>
            <div
              id="step-4"
              className="bg-[#EBE7FF] dark:bg-amber-200 dark:text-black rounded-xl p-4 text-center"
            >
              <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger className="w-full">
                  <BanknoteArrowUp className="mx-auto mb-2" size={70} />
                  <h1 className="text-lg font-semibold">Cash Out</h1>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Cash Out</DialogTitle>
                  </DialogHeader>
                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(cashOutFormSubmit)}
                      className="space-y-8"
                      id="cash-out"
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
                      <Button form="cash-out" type="submit">
                        Cash Out
                      </Button>
                    </div>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
        <div
          id="step-5"
          className="bg-white p-5 md:col-span-3 md:p-10 rounded-4xl"
        >
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

export default UserDashboard;
