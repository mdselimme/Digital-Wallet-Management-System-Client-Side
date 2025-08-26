/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import DigiPayLogo from "@/assets/images/Logo";
import { Link, useNavigate } from "react-router";
import { Button } from "./ui/button";
import {
  authApi,
  useAuthLogOutUserMutation,
} from "@/redux/features/auth/auth.api";
import { useAppDispatch } from "@/hooks/redux.hooks";
import { toast } from "sonner";
import { logout } from "@/redux/slice/authSlice/authSlice";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [userLogOut] = useAuthLogOutUserMutation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleLogOutUser = async () => {
    try {
      const result = await userLogOut({}).unwrap();
      if (result?.success) {
        navigate("/login");
        dispatch(logout());
        toast.success("Logged Out Successfully.");
        dispatch(authApi.util.resetApiState());
      }
    } catch (error: any) {
      if (error) {
        toast.error(error?.data?.message);
      }
    }
  };

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <Link to={"/"}>
          {" "}
          <DigiPayLogo className="mx-auto" width={150} />
        </Link>
      </SidebarHeader>
      <SidebarContent className="gap-0">
        {/* We create a collapsible SidebarGroup for each parent. */}
        <div className="flex flex-col p-4 justify-between h-full">
          <div>
            <h1>heelo</h1>
          </div>
          <div>
            <Button onClick={handleLogOutUser} className="w-full">
              Log Out
            </Button>
          </div>
        </div>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
