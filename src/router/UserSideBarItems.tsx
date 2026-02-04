import Dashboard from "@/pages/Dashboard/Dashboard";
import UpdatePassword from "@/pages/Dashboard/UpdatePassword";
import UpdateProfile from "@/pages/Dashboard/UpdateProfile";

export const UserSideBarItems = [
  {
    title: "Dashboard",
    items: [
      {
        title: "Dashboard Home",
        url: "/dashboard/user",
        component: Dashboard,
      },
      {
        title: "Update Profile",
        url: "/dashboard/user/update-profile",
        component: UpdateProfile,
      },
      {
        title: "Change Password",
        url: "/dashboard/user/update-password",
        component: UpdatePassword,
      },
    ],
  },
];
