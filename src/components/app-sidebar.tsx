/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
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
import { getSideBarRoleItems } from "@/utils/getSidebarItems";
import { useUserGetMeQuery } from "@/redux/features/user/user.api";
import { LogOut, RotateCcw } from "lucide-react";
import { ModeToggle } from "./mode.toggle";
import Loading from "./Loading";
import { userSteps } from "@/utils/driverData/userSteps";
import { agentSteps } from "@/utils/driverData/agentSteps";
import { adminSteps } from "@/utils/driverData/adminSteps";
import { checkAndStartTour } from "@/utils/ShowDriver";
import type { DriveStep } from "driver.js";
import PageTitle from "@/utils/PageTitle";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: userData, isLoading: userMeLoading } = useUserGetMeQuery({});
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

  const data = {
    navMain: getSideBarRoleItems(userData?.role),
  };

  if (userMeLoading) {
    return <Loading />;
  }

  const restartTour = () => {
    localStorage.removeItem("tour_completed");
    let steps: DriveStep[] = [];
    if (userData?.role === "User") {
      steps = userSteps;
    }
    if (userData?.role === "Agent") {
      steps = agentSteps;
    }
    if (userData?.role === "Admin") {
      steps = adminSteps;
    }
    if (userData?.role === "Super_Admin") {
      steps = adminSteps;
    }
    checkAndStartTour(steps, userData?.email, userData?.role);
  };

  return (
    <Sidebar {...props}>
      <PageTitle title={`Dashboard || ${userData?.role}`} />
      <SidebarHeader>
        <div className="flex justify-between items-center">
          <Link to={"/"}>
            {" "}
            <DigiPayLogo className="mx-auto" width={150} />
          </Link>
          <ModeToggle />
        </div>
      </SidebarHeader>
      <SidebarContent className="gap-0">
        {/* We create a collapsible SidebarGroup for each parent. */}
        <div className="flex flex-col p-4 justify-between h-full">
          {data.navMain.map((item) => (
            <SidebarGroup key={item.title}>
              <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {item.items.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild>
                        <Link to={item.url}>{item.title}</Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          ))}
          <div>
            <Button onClick={restartTour} className="w-full mt-5">
              Restart Tour <RotateCcw />
            </Button>
            <Button onClick={handleLogOutUser} className="w-full mt-5">
              Log Out <LogOut />
            </Button>
          </div>
        </div>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
