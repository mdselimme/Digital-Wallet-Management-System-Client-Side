import { AdminSideBarItems } from "@/router/AdminSideBarItems";
import { AgentSideBarItems } from "@/router/AgentSideBarItems";
import { UserSideBarItems } from "@/router/UserSideBarItems";

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
    case role.User:
      return [...UserSideBarItems];
    case role.Agent:
      return [...AgentSideBarItems];
    default:
      return [];
  }
};
