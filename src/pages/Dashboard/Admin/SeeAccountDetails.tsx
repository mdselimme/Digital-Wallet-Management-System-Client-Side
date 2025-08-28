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
  console.log(userId);
  const { data: userData } = useGetSingleUserQuery({ id: userId });
  console.log(userData);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Account Details</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Account Details</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SeeAccountDetails;
