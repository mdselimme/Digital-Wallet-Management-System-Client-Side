import Dashboard from "@/pages/Dashboard/Dashboard";
import UpdatePassword from "@/pages/Dashboard/UpdatePassword";
import UpdateProfile from "@/pages/Dashboard/UpdateProfile";

export const AgentSideBarItems = [
  {
    title: "Dashboard",
    items: [
      {
        title: "Dashboard Home",
        url: "/dashboard/agent",
        component: Dashboard,
      },
      {
        title: "Update Profile",
        url: "/dashboard/agent/update-profile",
        component: UpdateProfile,
      },
      {
        title: "Change Password",
        url: "/dashboard/agent/update-password",
        component: UpdatePassword,
      },
    ],
  },
];
