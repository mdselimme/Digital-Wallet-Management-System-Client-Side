import { useUserGetMeQuery } from "@/redux/features/user/user.api";
import {
  BanknoteArrowDown,
  BanknoteArrowUp,
  Mail,
  SmartphoneNfc,
  UserRound,
} from "lucide-react";
import TableComponents from "../TableComponents";

const AgentDashboard = () => {
  const { data: userData } = useUserGetMeQuery({});

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
              <UserRound /> <span className="ml-2">{userData?.name}</span>
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
          <div className="grid grid-cols-2 gap-10">
            <div className="bg-[#EBE7FF] rounded-xl p-4 text-center">
              <BanknoteArrowDown className="mx-auto mb-2" size={70} />
              <h1 className="text-lg font-semibold">Cash In</h1>
            </div>
            <div className="bg-[#EBE7FF] rounded-xl p-4 text-center">
              <BanknoteArrowUp className="mx-auto mb-2" size={70} />
              <h1 className="text-lg font-semibold">B 2 B</h1>
            </div>
          </div>
        </div>
        <div className="bg-white p-5 md:col-span-3 md:p-10 rounded-4xl">
          <h1 className="text-3xl font-bold text-accent-foreground mb-5">
            Transaction history
          </h1>
          <div>
            <TableComponents />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentDashboard;
