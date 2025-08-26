/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { Textarea } from "@/components/ui/textarea";
import {
  useUserGetMeQuery,
  useUserUpdateMutation,
} from "@/redux/features/user/user.api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import z from "zod";

const updateProfileSchema = z.object({
  name: z
    .string("Name must be string")
    .min(2, { message: "Name too short. Minimum 2 character long" })
    .max(50, { message: "Name too long. Max 50 characters" })
    .optional(),
  email: z
    .email("Email must be string.")
    .min(5, "Email must be 5 character long.")
    .max(100, { message: "Email cannot exceed 100 character." })
    .optional(),
  address: z
    .string({ error: "address must be string." })
    .min(5, { error: "Address value must be need." })
    .optional(),
  phone: z
    .string()
    .length(11, { message: "Phone number must be exactly 11 digits" })
    .regex(/^01\d{9}$/, {
      message:
        "Invalid Bangladeshi phone number. It must start with '01' and be exactly 11 digits long.",
    }),
});

export default function UpdateProfile() {
  const navigate = useNavigate();
  const [updateUser] = useUserUpdateMutation();
  const { data: userData } = useUserGetMeQuery({});
  const form = useForm<z.infer<typeof updateProfileSchema>>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      name: userData?.name,
      email: userData?.email,
      address: userData?.address,
      phone: userData?.phone,
    },
  });

  const onSubmit = async (data: z.infer<typeof updateProfileSchema>) => {
    console.log(data);
    const toastId = toast.loading("Profile Updating ......");

    const userBody = {
      name: data.name,
      address: data.address,
      phone: data.phone,
    };
    try {
      const result = await updateUser(userBody).unwrap();
      if (result.success) {
        toast.success("Profile Updated Successfully.", { id: toastId });
      }
    } catch (error: any) {
      if (error) {
        console.log(error);
        toast.error(error?.data?.message, { id: toastId });
      }
    }
  };
  return (
    <Card className="w-full max-w-lg mx-auto">
      <CardHeader>
        <CardTitle className="text-center">Update Profile Data</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Name</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="your name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              disabled={true}
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Your Email{" "}
                    <span className="text-red-600">Can't Changed</span>
                  </FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="your email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Phone</FormLabel>
                  <FormControl>
                    <Input type="phone" placeholder="your phone" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Address</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Your address" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="text-end">
              <Button type="submit">Update Profile</Button>
            </div>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex-col gap-2"></CardFooter>
    </Card>
  );
}
