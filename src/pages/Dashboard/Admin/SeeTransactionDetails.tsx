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
import { useGetSingleTransactionQuery } from "@/redux/features/transaction/transaction.api";

const SeeTransactionDetails = ({ tranId }: { tranId: string }) => {
  const { data: tranData } = useGetSingleTransactionQuery({ id: tranId });
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Transaction Details</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="mb-2">Transaction Details</DialogTitle>
          <DialogDescription className="flex flex-col gap-y-2">
            <span>TransactionId: {tranData?._id}</span>
            <span>Payment Type: {tranData?.type}</span>
            <span>Payment Amount: {tranData?.amount}</span>
            <span>Payment Fee: {tranData?.fee}</span>
            <span>Payment Commission: {tranData?.commission}</span>
            <DialogTitle>Sender Details</DialogTitle>
            <span>Name: {tranData?.send?.name}</span>
            <span>Email: {tranData?.send?.email}</span>
            <span>Phone: {tranData?.send?.phone}</span>
            <span>Acc Type: {tranData?.send?.role}</span>
            <DialogTitle>Receiver Details</DialogTitle>
            <span>Name: {tranData?.to?.name}</span>
            <span>Email: {tranData?.to?.email}</span>
            <span>Phone: {tranData?.to?.phone}</span>
            <span>Acc Type: {tranData?.to?.role}</span>
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

export default SeeTransactionDetails;
