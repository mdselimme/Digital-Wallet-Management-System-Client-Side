import { useAppSelector } from "@/hooks/redux.hooks";
import type { RootState } from "@/redux/store/store";
import type React from "react";
import { Navigate } from "react-router";

interface IUserProps {
  allowedRoles: ("Admin" | "Super_Admin" | "User" | "Agent")[];
  children: React.ReactNode;
}

export const ProtectedRoutes = ({ allowedRoles, children }: IUserProps) => {
  const { isAuthenticate, role } = useAppSelector(
    (state: RootState) => state.auth
  );

  console.log(isAuthenticate, role);

  if (!isAuthenticate) {
    return <Navigate to={"/login"} replace />;
  }

  if (!role || !allowedRoles.includes(role)) {
    return <Navigate to={"/unauthorized"} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoutes;
