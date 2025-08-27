/* eslint-disable @typescript-eslint/no-explicit-any */
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Input } from "../ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { useForm } from "react-hook-form";
import AuthLogo from "../../assets/images/register.webp";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Link, useNavigate } from "react-router";
import Password from "../ui/password";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { toast } from "sonner";
import { useUserRegisterMutation } from "@/redux/features/user/user.api";

const registerAccountSchema = z.object({
  name: z
    .string({ error: "Name is required." })
    .min(3, { message: "Name too short. Minimum 3 character long" })
    .max(50, { message: "Name too long. Max 50 characters" }),
  email: z.email({ error: "Must be a valid email." }),
  phone: z
    .string()
    .length(11, { message: "Phone number must be exactly 11 digits" })
    .regex(/^01\d{9}$/, {
      message:
        "Invalid Bangladeshi phone number. It must start with '01' and be exactly 11 digits long.",
    }),
  role: z
    .enum(["User", "Agent"], {
      error: "Select account type (User | Agent)",
    })
    .optional(),
  password: z
    .string({ error: "Password must be string type." })
    .min(5, { error: "Password minimum 5 characters long." })
    .max(5, { error: "Password maximum 5 characters long." })
    .regex(/^[1-9][0-9]{4}$/, {
      message: "Password must be exactly 5 digits and cannot start with 0.",
    }),
});

export function RegisterForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [createAccount] = useUserRegisterMutation();
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof registerAccountSchema>>({
    resolver: zodResolver(registerAccountSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      role: "User",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof registerAccountSchema>) => {
    const toastId = toast.loading("Account Creating ......");
    const userBody = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      role: data.role,
      password: data.password,
    };
    try {
      const result = await createAccount(userBody).unwrap();
      if (result.success) {
        navigate("/login");
        toast.success("Account Registered Successfully.", { id: toastId });
      }
    } catch (error: any) {
      if (error) {
        toast.error(error?.data?.message, { id: toastId });
      }
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <div className="bg-muted relative hidden md:block">
            <img
              src={AuthLogo}
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
          <div className="p-6 md:p-8">
            <div className="flex flex-col gap-6">
              <div className="text-center underline text-muted-foreground font-semibold">
                <Link to={"/"}>Go to Home</Link>
              </div>
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Welcome to Digipay</h1>
                <p className="text-muted-foreground text-balance">
                  Start your journey with Digipay
                </p>
              </div>
              <div>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8"
                  >
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Your name</FormLabel>
                          <FormControl>
                            <Input
                              type="text"
                              placeholder="write your name"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Your Email</FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="write your email"
                              {...field}
                            />
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
                            <Input
                              type="number"
                              placeholder="write your number"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="password"
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
                    <div className="flex">
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
                                  <SelectValue placeholder="Select your account type" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="User">User</SelectItem>
                                <SelectItem value="Agent">Agent</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="text-end">
                      <Button type="submit">Register Account</Button>
                    </div>
                  </form>
                </Form>
              </div>

              <div className="text-center text-sm">
                Already have an account ?{" "}
                <Link to={"/login"} className="underline underline-offset-4">
                  Log in
                </Link>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
