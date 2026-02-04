import Loading from "@/components/Loading";
import { useUserGetMeQuery } from "@/redux/features/user/user.api";
import { Navigate } from "react-router";

interface Props {
  children: React.ReactNode;
}

const PublicOnlyRoute = ({ children }: Props) => {
  const { data: userData, isLoading } = useUserGetMeQuery({});

  if (isLoading) {
    return <Loading />;
  }

  if (userData) {
    // redirect logged-in users based on role
    if (userData.role === "User")
      return <Navigate to="/dashboard/user" replace />;
    if (userData.role === "Agent")
      return <Navigate to="/dashboard/agent" replace />;
    if (userData.role === "Admin" || userData.role === "Super_Admin")
      return <Navigate to="/dashboard/admin" replace />;
  }

  return <>{children}</>;
};

export default PublicOnlyRoute;
