/* eslint-disable @typescript-eslint/no-explicit-any */
import { useUserUpdateRoleMutation } from "@/redux/features/user/user.api";
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
const updatePasswordSchema = z.object({
  email: z.email({ error: "Give email format here." }),
});

const MakeAdmin = () => {
  const [updateUserRole] = useUserUpdateRoleMutation();

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
      role: "Admin",
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
        <CardTitle className="text-center">Change Password</CardTitle>
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
