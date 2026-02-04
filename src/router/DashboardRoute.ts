import AdminDashboard from "@/pages/Dashboard/Admin/AdminDashboard";
import AgentDashboard from "@/pages/Dashboard/Agent/AgentDashboard";
import UserDashboard from "@/pages/Dashboard/User/UserDashboard";



export const dashboardRoutes = [
    { path: "/dashboard/user", component: UserDashboard, roles: ["User"] },
    { path: "/dashboard/agent", component: AgentDashboard, roles: ["Agent"] },
    { path: "/dashboard/admin", component: AdminDashboard, roles: ["Admin", "Super_Admin"] },
];