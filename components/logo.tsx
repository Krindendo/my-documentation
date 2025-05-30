import Link from "next/link";

import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

import { Icons } from "./icons";

interface LogoProps {
  className?: string;
}

export function Logo({ className }: LogoProps) {
  return (
    <Link href="/" aria-label="Home" className={cn("flex gap-2", className)}>
      <Icons.logo className="dark:text-white" />
      <span className="hidden font-bold sm:inline-block dark:text-white">
        {siteConfig.name}
      </span>
    </Link>
  );
}
