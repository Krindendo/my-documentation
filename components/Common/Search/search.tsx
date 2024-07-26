'use client';

import { Search } from 'lucide-react';
import { useState, type FC } from 'react';

// import { WithSearchBox } from '@/components/Common/Search/States/WithSearchBox';
import { useDetectOS } from '@/hooks';
import { useKeyboardCommands } from '@/hooks/react-client';
import { cn } from '@/util/cn';

interface SearchButtonProps {
  className?: string;
}

export const SearchButton: FC<SearchButtonProps> = className => {
  const [isOpen, setIsOpen] = useState(false);
  const openSearchBox = () => setIsOpen(true);
  const closeSearchBox = () => setIsOpen(false);

  useKeyboardCommands(cmd => {
    switch (cmd) {
      case 'cmd-k':
        openSearchBox();
        break;
      case 'escape':
        closeSearchBox();
        break;
      default:
    }
  });

  const { os } = useDetectOS();

  const osCommandKey = os === 'MAC' ? '⌘' : 'Ctrl';
  const isOSLoading = os === 'LOADING';

  return (
    <>
      <button
        type="button"
        onClick={openSearchBox}
        className={cn(
          className,
          'flex h-8 w-full flex-row items-center gap-2 rounded-full bg-white pl-2 pr-3 text-sm text-zinc-500 ring-1 ring-zinc-900/10 transition hover:ring-zinc-900/20 dark:bg-white/5 dark:text-zinc-400 dark:ring-inset dark:ring-white/10 dark:hover:ring-white/20 lg:flex focus:[&:not(:focus-visible)]:outline-none'
        )}
      >
        <Search className="h-4 w-4 stroke-current" />
        Start typing...
        <kbd
          title={`${osCommandKey} K`}
          className={cn('ml-auto text-xs text-zinc-400 dark:text-zinc-500', {
            'opacity-0': isOSLoading,
          })}
        >
          <abbr>{osCommandKey} K</abbr>
        </kbd>
      </button>

      {/* {isOpen ? <WithSearchBox onClose={closeSearchBox} /> : null} */}
    </>
  );
};
