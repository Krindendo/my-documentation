"use client";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useSelectPath } from "./select-path-provider";

const SidebarSelectSitePath = () => {
  const { selectedNavigation, setSelectedNavigation } = useSelectPath();

  return (
    <RadioGroup
      className="gap-2"
      onValueChange={setSelectedNavigation}
      value={selectedNavigation}
    >
      <div className="flex items-center gap-2 py-1">
        <RadioGroupItem value="docs" id="r1" className="border-gray-400" />
        <Label className="cursor-pointer" htmlFor="r1">
          Docs
        </Label>
      </div>
      <div className="flex items-center gap-2 py-1">
        <RadioGroupItem value="guides" id="r2" className="border-gray-400" />
        <Label className="cursor-pointer" htmlFor="r2">
          Guides
        </Label>
      </div>
      <div className="flex items-center gap-2 py-1">
        <RadioGroupItem
          value="algorithms"
          id="r3"
          className="border-gray-400"
        />
        <Label className="cursor-pointer" htmlFor="r3">
          Algorithms
        </Label>
      </div>
    </RadioGroup>
  );
};

export { SidebarSelectSitePath };
