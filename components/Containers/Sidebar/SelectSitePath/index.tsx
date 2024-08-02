'use client';

import { FC } from 'react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { cn } from '@/util/cn';
import { useSectionStore } from '@/providers/sidebarProvider';
import { useStore } from 'zustand';
import { NavigationKeys } from '@/types';

interface SelectSitePathProps {
  className: string;
}

const SelectSitePath: FC<SelectSitePathProps> = ({ className }) => {
  const store = useSectionStore();
  const setSectionPath = useStore(store, s => s.setSectionPath);

  const handleChangeSitePath = (item: NavigationKeys) => {
    setSectionPath(item);
  };

  return (
    <RadioGroup
      className={cn('', className)}
      defaultValue="docs"
      onValueChange={handleChangeSitePath}
    >
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="docs" id="r1" />
        <Label htmlFor="r1">Docs</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="guides" id="r2" />
        <Label htmlFor="r2">Guides</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="algorithms" id="r3" />
        <Label htmlFor="r3">Algorithms</Label>
      </div>
    </RadioGroup>
  );
};

export default SelectSitePath;
