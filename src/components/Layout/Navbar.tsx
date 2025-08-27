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
import { Button } from "../ui/button";
import DigiPayLogo from "@/assets/images/Logo";
import { Link, NavLink, useNavigate } from "react-router";
import { useUserGetMeQuery } from "@/redux/features/user/user.api";
import {
  authApi,
  useAuthLogOutUserMutation,
} from "@/redux/features/auth/auth.api";
import { toast } from "sonner";
import { useAppDispatch } from "@/hooks/redux.hooks";
import { ModeToggle } from "../mode.toggle";
import { logout } from "@/redux/slice/authSlice/authSlice";
import { role } from "@/utils/getSidebarItems";

// Navigation links array to be used in both desktop and mobile menus
const navigationLinks = [
  { path: "/", label: "Home", role: "Public" },
  { path: "/about", label: "About", role: "Public" },
  { path: "/feature", label: "Feature", role: "Public" },
  { path: "/pricing", label: "Pricing", role: "Public" },
  { path: "/faq", label: "Faq", role: "Public" },
  { path: "/contact", label: "Contact" },
  { path: "/dashboard/admin", label: "Dashboard", role: role.Super_Admin },
  { path: "/dashboard/admin", label: "Dashboard", role: role.Admin },
  { path: "/dashboard/agent", label: "Dashboard", role: role.Agent },
  { path: "/dashboard/user", label: "Dashboard", role: role.User },
];

export default function Navbar() {
  const { data: userData } = useUserGetMeQuery({});
  const [userLogOut] = useAuthLogOutUserMutation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleLogOutUser = async () => {
    try {
      const result = await userLogOut({}).unwrap();
      if (result?.success) {
        navigate("/login");
        dispatch(logout());
        toast.success("Logged Out Successfully.");
        dispatch(authApi.util.resetApiState());
      }
    } catch (error: any) {
      if (error) {
        toast.error(error?.data?.message);
      }
    }
  };

  return (
    <header className="border-b px-4 md:px-6 py-5 sticky top-0">
      <div className="container mx-auto">
        <div className="flex h-16 justify-between gap-4">
          {/* Left side */}
          <div className="flex gap-2">
            <div className="flex items-center md:hidden">
              {/* Mobile menu trigger */}
              <Popover>
                <PopoverTrigger asChild>
                  <Button className="group size-8" variant="ghost" size="icon">
                    <svg
                      className="pointer-events-none"
                      width={16}
                      height={16}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M4 12L20 12"
                        className="origin-center -translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-x-0 group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[315deg]"
                      />
                      <path
                        d="M4 12H20"
                        className="origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.8)] group-aria-expanded:rotate-45"
                      />
                      <path
                        d="M4 12H20"
                        className="origin-center translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[135deg]"
                      />
                    </svg>
                  </Button>
                </PopoverTrigger>
                <PopoverContent align="start" className="w-36 p-1 md:hidden">
                  <NavigationMenu className="max-w-none *:w-full">
                    <NavigationMenuList className="flex-col items-start gap-0 md:gap-2">
                      {navigationLinks.map((link, index) => (
                        <NavigationMenuItem key={index} className="w-full">
                          {!userData && link.role === "Public" && (
                            <NavigationMenuLink asChild className="py-1.5">
                              <NavLink to={link.path}>{link.label}</NavLink>
                            </NavigationMenuLink>
                          )}
                          {link.role === userData?.role && (
                            <NavigationMenuLink asChild className="py-1.5">
                              <NavLink to={link.path}>{link.label}</NavLink>
                            </NavigationMenuLink>
                          )}
                        </NavigationMenuItem>
                      ))}
                    </NavigationMenuList>
                  </NavigationMenu>
                </PopoverContent>
              </Popover>
            </div>
            {/* Main nav */}
            <div className="flex items-center gap-6">
              <Link to={"/"} className="text-primary hover:text-primary/90">
                <DigiPayLogo
                  style={{ color: "white" }}
                  width={120}
                  height={50}
                />
              </Link>
              {/* Navigation menu */}
              <NavigationMenu className="h-full *:h-full max-md:hidden">
                <NavigationMenuList className="h-full gap-2">
                  {navigationLinks.map((link, index) => (
                    <NavigationMenuItem key={index} className="h-full">
                      {!userData && link.role === "Public" && (
                        <NavigationMenuLink
                          asChild
                          className="text-secondary-foreground hover:text-primary border-b-primary hover:border-b-primary data-[active]:border-b-primary h-full justify-center rounded-none border-y-2 border-transparent py-1.5 font-medium hover:bg-transparent data-[active]:bg-transparent!"
                        >
                          <NavLink to={link.path}>{link.label}</NavLink>
                        </NavigationMenuLink>
                      )}
                      {link.role === userData?.role && (
                        <NavigationMenuLink
                          asChild
                          className="text-secondary-foreground hover:text-primary border-b-primary hover:border-b-primary data-[active]:border-b-primary h-full justify-center rounded-none border-y-2 border-transparent py-1.5 font-medium hover:bg-transparent data-[active]:bg-transparent!"
                        >
                          <NavLink to={link.path}>{link.label}</NavLink>
                        </NavigationMenuLink>
                      )}
                    </NavigationMenuItem>
                  ))}
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          </div>
          {/* Right side */}
          <div className="flex items-center gap-2">
            {userData?.email ? (
              <Button
                onClick={handleLogOutUser}
                size={"lg"}
                className="text-sm text-[#ffffff] bg-[#C53678]"
              >
                Log Out
              </Button>
            ) : (
              <Button
                asChild
                variant="ghost"
                size="lg"
                className="text-sm text-[#ffffff] bg-[#C53678]"
              >
                <Link to={"/login"}>Sign In</Link>
              </Button>
            )}
            <div>
              <ModeToggle />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
