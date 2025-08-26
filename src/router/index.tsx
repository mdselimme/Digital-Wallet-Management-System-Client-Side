import App from "@/App";
import AboutPage from "@/pages/AboutPage";
import ContactPage from "@/pages/ContactPage";
import FaqPage from "@/pages/FaqPage";
import FeaturePage from "@/pages/FeaturePage";
import HomePage from "@/pages/HomePage";
import PricingPage from "@/pages/PricingPage";
import { createBrowserRouter } from "react-router";
import ProtectedRoutes from "./ProtectedRoutes";
import UserDashboard from "@/pages/Dashboard/User/UserDashboard";
import AgentDashboard from "@/pages/Dashboard/Agent/AgentDashboard";
import AdminDashboard from "@/pages/Dashboard/Admin/AdminDashboard";
import PublicOnlyRoute from "./PublicRoute";
import Login from "@/pages/Authentication/Login";
import Register from "@/pages/Authentication/Register";
import { generateRoutes } from "@/utils/generatesRoutes";
import { AdminSideBarItems } from "./AdminSideBarItems";
import Dashboard from "@/pages/Dashboard/Dashboard";
export const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        index: true,
        Component: HomePage,
      },
      {
        path: "home",
        Component: HomePage,
      },
      {
        path: "about",
        Component: AboutPage,
      },
      {
        path: "feature",
        Component: FeaturePage,
      },
      {
        path: "pricing",
        Component: PricingPage,
      },
      {
        path: "contact",
        Component: ContactPage,
      },
      {
        path: "faq",
        Component: FaqPage,
      },
    ],
  },
  {
    path: "/login",
    element: (
      <PublicOnlyRoute>
        <Login />
      </PublicOnlyRoute>
    ),
  },
  {
    path: "/register",
    element: (
      <PublicOnlyRoute>
        <Register />
      </PublicOnlyRoute>
    ),
  },
  {
    path: "/dashboard/user",
    Component: ProtectedRoutes(Dashboard, { allowedRoles: ["User"] }),
    children: [
      {
        index: true,
        Component: UserDashboard,
      },
    ],
  },
  {
    path: "/dashboard/agent",
    Component: ProtectedRoutes(Dashboard, { allowedRoles: ["Agent"] }),
    children: [
      {
        index: true,
        Component: AgentDashboard,
      },
    ],
  },
  {
    path: "/dashboard/admin",
    Component: ProtectedRoutes(Dashboard, {
      allowedRoles: ["Admin", "Super_Admin"],
    }),
    children: [
      {
        index: true,
        Component: AdminDashboard,
      },
      ...generateRoutes(AdminSideBarItems),
    ],
  },
]);
