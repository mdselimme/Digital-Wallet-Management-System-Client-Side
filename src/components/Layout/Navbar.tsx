/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import DigiPayLogo from "@/assets/images/Logo";
import { Link, NavLink, useNavigate } from "react-router";
import { useUserGetMeQuery } from "@/redux/features/user/user.api";
import {
  authApi,
  useAuthLogOutUserMutation,
} from "@/redux/features/auth/auth.api";
import { toast } from "sonner";
import { useAppDispatch } from "@/hooks/redux.hooks";
import { ModeToggle } from "@/components/mode.toggle";
import { logout } from "@/redux/slice/authSlice/authSlice";
import { role } from "@/utils/getSidebarItems";

/* ---------------------------Navigation config --------------------------------------- */
const navigationLinks = [
  { path: "/", label: "Home", role: "Public" },
  { path: "/about", label: "About", role: "Public" },
  { path: "/feature", label: "Feature", role: "Public" },
  { path: "/pricing", label: "Pricing", role: "Public" },
  { path: "/faq", label: "FAQ", role: "Public" },
  { path: "/contact", label: "Contact", role: "Public" },

  { path: "/dashboard/admin", label: "Dashboard", role: role.Super_Admin },
  { path: "/dashboard/admin", label: "Dashboard", role: role.Admin },
  { path: "/dashboard/agent", label: "Dashboard", role: role.Agent },
  { path: "/dashboard/user", label: "Dashboard", role: role.User },
];

export default function Navbar() {
  const { data: userData } = useUserGetMeQuery({});
  const [logoutUser] = useAuthLogOutUserMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  /* ---------------------------- Logout ----------------------------- */
  const handleLogout = async () => {
    try {
      const res = await logoutUser({}).unwrap();
      if (res?.success) {
        dispatch(logout());
        dispatch(authApi.util.resetApiState());
        toast.success("Logged out successfully");
        navigate("/login");
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "Logout failed");
    }
  };

  /* ------------------------ Route visibility ------------------------ */
  const canShowLink = (linkRole?: string) => {
    // Public routes → always visible
    if (linkRole === "Public") return true;

    // Role-based routes → require login + role match
    if (!userData) return false;

    return linkRole === userData.role;
  };

  return (
    <header className="sticky top-0 z-50 border-b bg-background py-2">
      <div className="container relative mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-6">
        {/* -------------------------- Left -------------------------- */}
        <Link to="/" className="flex items-center">
          <DigiPayLogo width={120} height={40} />
        </Link>

        {/* ------------------------- Center ------------------------- */}
        <NavigationMenu className="absolute left-1/2 hidden -translate-x-1/2 md:flex">
          <NavigationMenuList className="gap-6">
            {navigationLinks.map(
              (link, idx) =>
                canShowLink(link.role) && (
                  <NavigationMenuItem key={idx}>
                    <NavigationMenuLink
                      asChild
                      className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary data-[active]:text-primary"
                    >
                      <NavLink to={link.path}>{link.label}</NavLink>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ),
            )}
          </NavigationMenuList>
        </NavigationMenu>

        {/* -------------------------- Right ------------------------- */}
        <div className="flex items-center gap-2">
          {userData?.email ? (
            <Button className="cursor-pointer" onClick={handleLogout} size="sm">
              Log Out
            </Button>
          ) : (
            <Button asChild size="sm">
              <Link to="/login">Sign In</Link>
            </Button>
          )}

          <ModeToggle />

          {/* ---------------------- Mobile Menu ---------------------- */}
          <div className="md:hidden">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Open menu">
                  ☰
                </Button>
              </PopoverTrigger>
              <PopoverContent align="end" className="w-44 p-2">
                <nav className="flex flex-col gap-2">
                  {navigationLinks.map(
                    (link, idx) =>
                      canShowLink(link.role) && (
                        <NavLink
                          key={idx}
                          to={link.path}
                          className="rounded-md px-3 py-2 text-sm transition-colors hover:bg-muted"
                        >
                          {link.label}
                        </NavLink>
                      ),
                  )}
                </nav>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>
    </header>
  );
}
