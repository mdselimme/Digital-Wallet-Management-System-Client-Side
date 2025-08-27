import AllTransaction from "@/pages/Dashboard/Admin/AllTransaction";
import AllUsersManagement from "@/pages/Dashboard/Admin/AllUsersManagement";
import MakeAdmin from "@/pages/Dashboard/Admin/MakeAdmin";
import UserStatusChange from "@/pages/Dashboard/Admin/UserStatusChange";
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
        url: "/dashboard/admin/update-profile",
        component: UpdateProfile,
      },
      {
        title: "Update Profile Password",
        url: "/dashboard/admin/update-password",
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
        title: "Change Role",
        url: "role-change",
        component: MakeAdmin,
      },
      {
        title: "User Status",
        url: "change-status",
        component: UserStatusChange,
      },
    ],
  },
];
