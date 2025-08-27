/* eslint-disable @typescript-eslint/no-explicit-any */
import { useUserUpdateStatusMutation } from "@/redux/features/user/user.api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useNavigate } from "react-router";
const updateUserStatusSchema = z.object({
  email: z.email({ error: "Give email format here." }),
  userStatus: z.enum(["Approve", "Suspend"], {
    error: "Value must be from these (Approve | Suspend)",
  }),
});

const UserStatusChange = () => {
  const navigate = useNavigate();

  const [updateUserStatus] = useUserUpdateStatusMutation();
  const form = useForm<z.infer<typeof updateUserStatusSchema>>({
    resolver: zodResolver(updateUserStatusSchema),
    defaultValues: {
      email: "",
      userStatus: "Approve",
    },
  });

  const onSubmit = async (data: z.infer<typeof updateUserStatusSchema>) => {
    console.log(data);
    const toastId = toast.loading("Status Updating ......");

    const emailBody = {
      email: data.email,
      userStatus: data.userStatus,
    };
    try {
      const result = await updateUserStatus(emailBody).unwrap();
      if (result.success) {
        navigate("/dashboard/all-users");
        toast.success("Update Status Successfully.", { id: toastId });
      }
    } catch (error: any) {
      console.log(error);
      if (error) {
        console.log(error);
        toast.error(error?.data?.message, { id: toastId });
      }
    }
  };
  return (
    <Card className="w-full max-w-lg mx-auto mt-10">
      <CardHeader>
        <CardTitle className="text-center">Change User Status</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="mb-2">Enter Email</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="write email here" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="userStatus"
              render={({ field }) => (
                <FormItem className="flex flex-col flex-1">
                  <FormLabel>Status Value</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl className="w-full">
                      <SelectTrigger>
                        <SelectValue placeholder="Select Account Role" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Approve">Approve</SelectItem>
                      <SelectItem value="Suspend">Suspend</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="text-end">
              <Button type="submit">Update Status</Button>
            </div>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex-col gap-2"></CardFooter>
    </Card>
  );
};

export default UserStatusChange;
