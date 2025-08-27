/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  useUserGetMeQuery,
  useUserUpdateRoleMutation,
} from "@/redux/features/user/user.api";
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
const updatePasswordSchema = z.object({
  email: z.email({ error: "Give email format here." }),
  role: z.enum(["User", "Admin", "Agent"], {
    error: "Value must be from these (User | Admin | Agent)",
  }),
});

const MakeAdmin = () => {
  const [updateUserRole] = useUserUpdateRoleMutation();
  const { data: userData } = useUserGetMeQuery({});
  const form = useForm<z.infer<typeof updatePasswordSchema>>({
    resolver: zodResolver(updatePasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof updatePasswordSchema>) => {
    console.log(data);
    const toastId = toast.loading("Role Updating ......");

    const emailBody = {
      email: data.email,
      role: data.role,
    };
    try {
      const result = await updateUserRole(emailBody).unwrap();
      if (result.success) {
        toast.success("Update role successfully.", { id: toastId });
      }
    } catch (error: any) {
      if (error) {
        console.log(error);
        toast.error(error?.data?.message, { id: toastId });
      }
    }
  };
  return (
    <Card className="w-full max-w-lg mx-auto mt-10">
      <CardHeader>
        <CardTitle className="text-center">Change User Role</CardTitle>
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
              name="role"
              render={({ field }) => (
                <FormItem className="flex flex-col flex-1">
                  <FormLabel>Account Type</FormLabel>
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
                      <SelectItem value="User">User</SelectItem>
                      <SelectItem value="Agent">Agent</SelectItem>
                      {userData?.role !== "Super_Admin" || (
                        <SelectItem value="Admin">Admin</SelectItem>
                      )}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="text-end">
              <Button type="submit">Update Role</Button>
            </div>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex-col gap-2"></CardFooter>
    </Card>
  );
};

export default MakeAdmin;
