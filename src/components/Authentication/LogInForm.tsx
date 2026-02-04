"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { useForm } from "react-hook-form";
import AuthLogo from "@/assets/images/auth-logo.webp";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Link, useNavigate } from "react-router";
import Password from "@/components/ui/password";
import { useAuthLoginUserMutation } from "@/redux/features/auth/auth.api";
import { toast } from "sonner";
import { useAppDispatch } from "@/hooks/redux.hooks";
import { login } from "@/redux/slice/authSlice/authSlice";
import { dashboardRoutes } from "@/router/DashboardRoute";
import PageTitle from "@/utils/PageTitle";

import { motion } from "framer-motion";

/* ---------------- Schema ---------------- */
const logInAccountSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .length(5)
    .regex(/^[1-9][0-9]{4}$/, {
      message: "Password must be exactly 5 digits and cannot start with 0.",
    }),
});

/* ---------------- Demo Accounts ---------------- */
const DEMO_ACCOUNTS = {
  user: { email: "contact.mdselim.dev@gmail.com", password: "54321" },
  agent: { email: "mdusuf@gmail.com", password: "54321" },
  admin: { email: "mdmoin@gmail.com", password: "54321" },
};

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [logInAccount] = useAuthLoginUserMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof logInAccountSchema>>({
    resolver: zodResolver(logInAccountSchema),
    defaultValues: { email: "", password: "" },
  });

  /* ---------------- Login Handler ---------------- */
  const handleLogin = async (email: string, password: string) => {
    const toastId = toast.loading("Logging in...");
    try {
      const res = await logInAccount({ email, password }).unwrap();
      if (res.success) {
        const role = res.data.user.role;
        dispatch(login({ role }));

        const route = dashboardRoutes.find((r) => r.roles.includes(role));
        if (route) navigate(route.path);

        toast.success("Logged in successfully", { id: toastId });
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "Login failed", { id: toastId });
    }
  };

  const onSubmit = (data: z.infer<typeof logInAccountSchema>) => {
    handleLogin(data.email, data.password);
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <PageTitle title="Digipay | Login" />

      <Card className="overflow-hidden border bg-background shadow-xl">
        <CardContent className="grid p-0 md:grid-cols-2">
          {/* ---------------- FORM ---------------- */}
          <div className="p-6 md:p-8">
            <div className="flex flex-col gap-6">
              <div className="text-center text-sm text-muted-foreground underline">
                <Link to="/">Go to Home</Link>
              </div>

              <div className="text-center">
                <h1 className="text-2xl font-bold">Welcome to DigiPay</h1>
                <p className="text-muted-foreground">
                  Secure login to continue
                </p>
              </div>

              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="you@email.com" {...field} />
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
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Password {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button className="w-full" type="submit">
                    Login Account
                  </Button>
                </form>
              </Form>

              {/* Demo Login */}
              <div className="space-y-2">
                <p className="text-center text-xs text-muted-foreground">
                  Demo Accounts
                </p>

                <div className="grid grid-cols-3 gap-2">
                  {(["user", "agent", "admin"] as const).map((role) => (
                    <motion.div
                      key={role}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button
                        size="sm"
                        variant="outline"
                        className="w-full capitalize cursor-pointer"
                        onClick={() =>
                          handleLogin(
                            DEMO_ACCOUNTS[role].email,
                            DEMO_ACCOUNTS[role].password,
                          )
                        }
                      >
                        {role}
                      </Button>
                    </motion.div>
                  ))}
                </div>
              </div>

              <p className="text-center text-sm">
                Don&apos;t have an account?{" "}
                <Link to="/register" className="underline">
                  Sign Up
                </Link>
              </p>
            </div>
          </div>

          {/* ---------------- IMAGE ---------------- */}
          <div className="relative hidden bg-muted md:block">
            <img
              src={AuthLogo}
              alt="Authentication"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
