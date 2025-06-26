"use client";

import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
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
import { usePathname } from "next/navigation";
import { useSelectPath } from "./select-path-provider";
import Link from "next/link";

export type NavigationKeys = "docs" | "guides" | "algorithms";

export function SiteSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();

  const { selectedNavigation } = useSelectPath();

  const sideNavigationSection = sideNavigation[selectedNavigation];

  return (
    <Sidebar {...props}>
      <SidebarHeader className="px-4">
        <SidebarMenu>
          <SidebarMenuItem className="flex items-center gap-2 p-2">
            <Logo className="text-black" />
          </SidebarMenuItem>
          <SidebarMenuItem className="px-3 py-2">
            <SidebarSelectSitePath />
          </SidebarMenuItem>
          <Separator />
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent className="scrollbar">
        {sideNavigationSection.items?.map((item) => (
          <SidebarGroup key={item.label}>
            <SidebarGroupLabel>{item.label}</SidebarGroupLabel>
            <SidebarMenu>
              <SidebarMenuItem>
                {item.items?.length ? (
                  <SidebarMenuSub>
                    {item.items.map((item) => (
                      <SidebarMenuSubItem key={item.label}>
                        <SidebarMenuSubButton
                          asChild
                          isActive={item.link === pathname}
                        >
                          <Link href={item.link ?? "#"} prefetch={true}>
                            {item.label}
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                ) : null}
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
