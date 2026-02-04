import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useGetSingleUserQuery } from "@/redux/features/user/user.api";

const SeeAccountDetails = ({ userId }: { userId: string }) => {
  const { data: userData } = useGetSingleUserQuery({ id: userId });
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Account Details</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="mb-2">Account Details</DialogTitle>
          <DialogDescription className="flex flex-col gap-y-2">
            <span>userId: {userData?._id}</span>
            <span>Name: {userData?.name}</span>
            <span>Wallet Id: {userData?.walletId?._id}</span>
            <span>
              Balance: {userData?.walletId?.balance.toFixed(2)}{" "}
              <span>&#2547;</span>{" "}
            </span>
            <span>Email: {userData?.email}</span>
            <span>Phone: {userData?.phone}</span>
            <span>Account Type: {userData?.role}</span>
            <span>
              Active:{" "}
              {userData?.isActive !== "Active" ? (
                <span className="font-bold text-red-700">
                  {userData?.isActive}
                </span>
              ) : (
                <span className="font-bold text-green-700">
                  {" "}
                  {userData?.isActive}
                </span>
              )}
            </span>
            <span>Status: {userData?.userStatus}</span>
            <span>
              Verified:{" "}
              {userData?.isVerified ? (
                <span className="font-bold text-green-700">Verified</span>
              ) : (
                <span className="font-bold text-red-700">Not Verified</span>
              )}
            </span>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SeeAccountDetails;
