"use client";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { NavigationKeys } from "./sidebar";

interface SidebarSelectSitePathProps {
  sectionPath: NavigationKeys;
  handleChangeSitePath: (item: NavigationKeys) => void;
}

const SidebarSelectSitePath = ({
  sectionPath,
  handleChangeSitePath,
}: SidebarSelectSitePathProps) => {
  return (
    <RadioGroup
      className="gap-2"
      defaultValue="docs"
      onValueChange={handleChangeSitePath}
      value={sectionPath}
    >
      <div className="flex items-center space-x-2 py-1">
        <RadioGroupItem value="docs" id="r1" />
        <Label className="cursor-pointer" htmlFor="r1">
          Docs
        </Label>
      </div>
      <div className="flex items-center space-x-2 py-1">
        <RadioGroupItem value="guides" id="r2" />
        <Label className="cursor-pointer" htmlFor="r2">
          Guides
        </Label>
      </div>
      <div className="flex items-center space-x-2 py-1">
        <RadioGroupItem value="algorithms" id="r3" />
        <Label className="cursor-pointer" htmlFor="r3">
          Algorithms
        </Label>
      </div>
    </RadioGroup>
  );
};

export { SidebarSelectSitePath };