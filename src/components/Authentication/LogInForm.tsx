/* eslint-disable @typescript-eslint/no-explicit-any */
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Input } from "../ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { useForm } from "react-hook-form";
import AuthLogo from "../../assets/images/auth-logo.webp";
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
import { useAuthLoginUserMutation } from "@/redux/features/auth/auth.api";
import { toast } from "sonner";
import { useAppDispatch } from "@/hooks/redux.hooks";
import { login } from "@/redux/slice/authSlice/authSlice";
import { dashboardRoutes } from "@/router/DashboardRoute";

const logInAccountSchema = z.object({
  email: z.email({ error: "Must be a valid email." }),
  password: z
    .string({ error: "Password must be string type." })
    .min(5, { error: "Password minimum 5 characters long." })
    .max(5, { error: "Password maximum 5 characters long." })
    .regex(/^[1-9][0-9]{4}$/, {
      message: "Password must be exactly 5 digits and cannot start with 0.",
    }),
});

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [logInAccount] = useAuthLoginUserMutation();
  const form = useForm<z.infer<typeof logInAccountSchema>>({
    resolver: zodResolver(logInAccountSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const onSubmit = async (data: z.infer<typeof logInAccountSchema>) => {
    const toastId = toast.loading("Log in Account ......");

    const userBody = {
      email: data.email,
      password: data.password,
    };

    try {
      const result = await logInAccount(userBody).unwrap();
      if (result.success) {
        const role = result?.data?.user.role;
        dispatch(login({ role }));
        const route = dashboardRoutes.find((r) => r.roles.includes(role));
        if (route) {
          navigate(route.path);
        }
        toast.success("Logged In Successfully.", { id: toastId });
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
          <div className="p-6 md:p-8">
            <div className="flex flex-col gap-6">
              <div className="text-center underline text-muted-foreground font-semibold">
                <Link to={"/"}>Go to Home</Link>
              </div>
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold mb-5">Welcome to Digipay</h1>
                <p className="text-muted-foreground text-balance">
                  Let's start Digipay
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

                    <div className="text-end">
                      <Button type="submit">Login Account</Button>
                    </div>
                  </form>
                </Form>
              </div>

              <div className="text-center text-sm">
                Don't have an account ?{" "}
                <Link to={"/register"} className="underline underline-offset-4">
                  Sign In
                </Link>
              </div>
            </div>
          </div>
          <div className="bg-muted dark:bg-amber-50 relative hidden md:block">
            <img
              src={AuthLogo}
              alt="Image"
              className="absolute inset-0 h-full w-full object-center dark:brightness-[0.8]"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
