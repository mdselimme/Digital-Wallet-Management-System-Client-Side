import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import DigiPayLogo from "@/assets/images/Logo";
import { Link } from "react-router";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <Link to={"/"}>
          {" "}
          <DigiPayLogo className="mx-auto" width={150} />
        </Link>
      </SidebarHeader>
      <SidebarContent className="gap-0">
        {/* We create a collapsible SidebarGroup for each parent. */}
        <h1>heelo</h1>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
