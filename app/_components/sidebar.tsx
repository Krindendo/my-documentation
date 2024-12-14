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
// import { useLocalStorage } from "@uidotdev/usehooks";

export type NavigationKeys = "docs" | "guides" | "algorithms";

export function SiteSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();
  // const [sectionPath, setSectionPath] = useLocalStorage<NavigationKeys>(
  //   "section-path",
  //   "docs"
  // );
  const [sectionPath, setSectionPath] = React.useState<NavigationKeys>("docs");

  const handleChangeSitePath = (item: NavigationKeys) => {
    setSectionPath(item);
  };

  const sideNavigationSection = sideNavigation[sectionPath];

  return (
    <Sidebar {...props}>
      <SidebarHeader className="px-4">
        <SidebarMenu>
          <SidebarMenuItem className="flex items-center gap-2 p-2">
            <Logo className="text-black" />
          </SidebarMenuItem>
          <SidebarMenuItem className="px-3 py-2">
            <SidebarSelectSitePath
              sectionPath={sectionPath}
              handleChangeSitePath={handleChangeSitePath}
            />
          </SidebarMenuItem>
          <Separator />
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        {sideNavigationSection.items?.map((item) => (
          <SidebarGroup key={item.label}>
            <SidebarGroupLabel>{item.label}</SidebarGroupLabel>
            <SidebarMenu>
              <SidebarMenuItem key={item.label}>
                {item.items?.length ? (
                  <SidebarMenuSub>
                    {item.items.map((item) => (
                      <SidebarMenuSubItem key={item.label}>
                        <SidebarMenuSubButton
                          asChild
                          isActive={item.link === pathname}
                        >
                          <a href={item.link}>{item.label}</a>
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
