"use client";

import { Icons } from "./icons";
import { useTheme } from "next-themes";
import { Button } from "../components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export const ModeToggle = () => {
  const { setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="h-8 w-8 px-0">
          <Icons.sun className="rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 !size-5" />
          <Icons.moon className="absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 !size-5" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          className="text-muted-foreground hover:text-foreground"
          onClick={() => setTheme("light")}
        >
          <Icons.sun className="mr-2 h-4 w-4 " />
          <span>Light</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="text-muted-foreground hover:text-foreground"
          onClick={() => setTheme("dark")}
        >
          <Icons.moon className="mr-2 h-4 w-4" />
          <span>Dark</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="text-muted-foreground hover:text-foreground"
          onClick={() => setTheme("system")}
        >
          <Icons.laptop className="mr-2 h-4 w-4" />
          <span>System</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
