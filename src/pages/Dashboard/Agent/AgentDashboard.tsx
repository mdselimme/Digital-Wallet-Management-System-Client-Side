import { useUserGetMeQuery } from "@/redux/features/user/user.api";
import { Mail, SmartphoneNfc, UserRound } from "lucide-react";
import TableComponents from "../TableComponents";
import AgentCashIn from "./AgentCashIn";
import B2BTransaction from "./B2BTransfer";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
const AgentDashboard = () => {
  const [paymentValue, setPaymentValue] = useState<string>("");
  const { data: userData } = useUserGetMeQuery({});
  const paymentType = ["CASH_IN", "CASH_OUT", "BONUS", "ADD_MONEY"];
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
            <span>&#2547;</span> {userData?.walletId?.balance.toFixed(2)}
          </h1>
          <div className="flex flex-col gap-y-3">
            <h3 className="text-lg font-normal text-white flex items-center">
              <UserRound />{" "}
              <span className="ml-2">
                {userData?.name}({userData?.role})
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
        <div className="bg-[rgba(11,121,73,061)] p-5 md:col-span-2 md:p-10 rounded-4xl">
          <h1 className="text-3xl font-bold text-white mb-4">Account Action</h1>
          <div className="grid grid-cols-2 gap-10">
            <div className="bg-[#EBE7FF] dark:bg-amber-200 dark:text-black rounded-xl p-4 text-center">
              <AgentCashIn />
            </div>
            <div className="bg-[#EBE7FF] dark:bg-amber-200 dark:text-black rounded-xl p-4 text-center">
              <B2BTransaction />
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

export default AgentDashboard;
