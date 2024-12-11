"use client";

import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { sideNavigation } from "@/config/navigation";
import { Logo } from "@/components/logo";
import { Separator } from "@/components/ui/separator";
import { SidebarSelectSitePath } from "./sidebar-select-site-path";

export type NavigationKeys = "docs" | "guides" | "algorithms";

export function SiteSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const [sectionPath, setSectionPath] = React.useState<NavigationKeys>("docs");

  const handleChangeSitePath = (item: NavigationKeys) => {
    setSectionPath(item);
  };

  return (
    <Sidebar {...props}>
      <SidebarHeader className="px-4">
        <SidebarMenu>
          <SidebarMenuItem className="flex items-center gap-2 p-2">
            <Logo className="text-black" />
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarSelectSitePath
              handleChangeSitePath={handleChangeSitePath}
            />
          </SidebarMenuItem>
          <Separator />
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {sideNavigation.docs.items?.map((item) => (
              <SidebarMenuItem key={item.label}>
                <SidebarMenuButton asChild>
                  <a href={item.link} className="font-medium">
                    {item.label}
                  </a>
                </SidebarMenuButton>
                {item.items?.length ? (
                  <SidebarMenuSub>
                    {item.items.map((item) => (
                      <SidebarMenuSubItem key={item.label}>
                        <SidebarMenuSubButton asChild isActive={item.isActive}>
                          <a href={item.link}>{item.label}</a>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                ) : null}
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
