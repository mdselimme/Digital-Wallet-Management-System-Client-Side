import { useUserGetMeQuery } from "@/redux/features/user/user.api";
import type { ComponentType } from "react";
import { Navigate } from "react-router";

interface IUserProps {
  allowedRoles?: ("Admin" | "Super_Admin" | "User" | "Agent")[];
}

export const ProtectedRoutes = (
  Component: ComponentType,
  { allowedRoles }: IUserProps
) => {
  return function AuthWrapper() {
    const { data: userData } = useUserGetMeQuery({});

    if (!userData) {
      return <Navigate to={"/login"} replace />;
    }

    if (!userData || !allowedRoles?.includes(userData.role)) {
      return <Navigate to={"/unauthorized"} replace />;
    }

    return <Component />;
  };
};

export default ProtectedRoutes;
