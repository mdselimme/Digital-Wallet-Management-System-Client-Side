import AllTransaction from "@/pages/Dashboard/Admin/AllTransaction";
import AllUsersManagement from "@/pages/Dashboard/Admin/AllUsersManagement";
import MakeAdmin from "@/pages/Dashboard/Admin/MakeAdmin";
import Dashboard from "@/pages/Dashboard/Dashboard";
import UpdatePassword from "@/pages/Dashboard/UpdatePassword";
import UpdateProfile from "@/pages/Dashboard/UpdateProfile";

export const AdminSideBarItems = [
  {
    title: "Dashboard",
    items: [
      {
        title: "Dashboard Home",
        url: "/dashboard/admin",
        component: Dashboard,
      },
      {
        title: "Update Admin Profile",
        url: "update-profile",
        component: UpdateProfile,
      },
      {
        title: "Update Profile Password",
        url: "update-password",
        component: UpdatePassword,
      },
    ],
  },
  {
    title: "Users Management",
    items: [
      {
        title: "All Users",
        url: "all-users",
        component: AllUsersManagement,
      },
      {
        title: "All Transaction",
        url: "all-transaction",
        component: AllTransaction,
      },
      {
        title: "Make Admin",
        url: "make-admin",
        component: MakeAdmin,
      },
    ],
  },
];
