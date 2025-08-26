import { AdminSideBarItems } from "@/router/AdminSideBarItems";

export const role = {
  Super_Admin: "Super_Admin",
  Admin: "Admin",
  User: "User",
  Agent: "Agent",
};

export type TRole = "Super_Admin" | "Admin" | "User" | "Agent";

export const getSideBarRoleItems = (userRole: TRole) => {
  switch (userRole) {
    case role.Super_Admin:
      return [...AdminSideBarItems];
    case role.Admin:
      return [...AdminSideBarItems];
    // case role.User:
    //   return [...UserSidebarItems];
    // case role.Agent:
    //   return [...UserSidebarItems];
    default:
      return [];
  }
};
