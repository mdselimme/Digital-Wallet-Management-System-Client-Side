import { useUserGetMeQuery } from "@/redux/features/user/user.api";
import type React from "react";
import { Navigate } from "react-router";

interface IUserProps {
  allowedRoles: ("Admin" | "Super_Admin" | "User" | "Agent")[];
  children: React.ReactNode;
}

export const ProtectedRoutes = ({ allowedRoles, children }: IUserProps) => {
  const { data: userData } = useUserGetMeQuery({});

  if (!userData) {
    return <Navigate to={"/login"} replace />;
  }

  if (!userData || !allowedRoles.includes(userData.role)) {
    return <Navigate to={"/unauthorized"} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoutes;
