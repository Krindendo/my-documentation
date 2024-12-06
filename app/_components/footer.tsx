import * as React from "react";

import Link from "next/link";
import { Icons } from "@/components/icons";

export function SiteFooter() {
  return (
    <footer className="flex flex-col items-center gap-6 border-t border-zinc-900/10 px-8 py-4 dark:border-white/10 md:flex-row md:justify-between md:py-5">
      <div></div>
      <div className="flex items-center gap-1">
        <Link
          href="https://github.com/krindendo"
          target="_blank"
          className="inline-flex items-center gap-0.5 rounded-sm p-3 hover:bg-gray-100"
        >
          <Icons.gitHub width={20} height={20} />
        </Link>
        <Link
          href="https://rs.linkedin.com/in/marko-samek"
          target="_blank"
          className="inline-flex items-center gap-0.5 rounded-sm p-3 hover:bg-gray-100"
        >
          <Icons.moon width={20} height={20} />
        </Link>
      </div>
    </footer>
  );
}
