import { type ComponentProps, type FC } from 'react';

import SidebarGroup from '@/components/Containers/Sidebar/SidebarGroup';
import { cn } from '@/util/cn';
import { Separator } from '@/components/ui/separator';
import SelectSitePath from './SelectSitePath';
import { Logo } from '@/components/Common/Logo';

interface SidebarProps {
  groups: ComponentProps<typeof SidebarGroup>[];
  className?: string;
}

const SideBar: FC<SidebarProps> = ({ groups, className }) => {
  return (
    <aside className={cn('mb-5', className)}>
      <Logo className="mb-12" />
      <SelectSitePath className="ml-1" />
      <Separator orientation="horizontal" className="my-6" />
      <ul role="list">
        {groups.map(({ groupName, items }) => (
          <SidebarGroup
            key={groupName.toString()}
            groupName={groupName}
            items={items}
          />
        ))}
      </ul>
    </aside>
  );
};

export default SideBar;

// export function SiteSidebar({ className, ...props }: SiteSidebarProps) {
//   const segment = useSelectedLayoutSegment();

//   return (
//     <nav className={cn('mb-5', className)} {...props}>
//       <ul role="list">
//         {docsConfig.mainNav?.map((item, index) => (
//           <li key={index} className="md:hidden">
//             <Link
//               key={index}
//               href={item.disabled ? '#' : item.href}
//               className={cn(
//                 'text-sm leading-5 transition hover:text-foreground/80',
//                 item.href.startsWith(`/${segment}`)
//                   ? 'text-foreground'
//                   : 'text-foreground/60',
//                 item.disabled && 'cursor-not-allowed opacity-80'
//               )}
//             >
//               {item.title}
//             </Link>
//           </li>
//         ))}
//         {docsConfig.sidebarNavDocs.map((group, groupIndex) => (
//           <NavigationGroup
//             key={group.title}
//             group={group}
//             className={groupIndex === 0 ? 'md:mt-0' : undefined}
//           />
//         ))}
//       </ul>
//     </nav>
//   );
// }
