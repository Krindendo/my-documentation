'use client';

import { Files } from 'lucide-react';
import type { FC, PropsWithChildren, ReactNode } from 'react';
import { Fragment, isValidElement, useRef } from 'react';

import { Button } from '@/components/ui/button';
import { useCopyToClipboard } from '@/hooks';

import styles from './index.module.css';
import { cn } from '@/util/cn';

// Transforms a code element with plain text content into a more structured
// format for rendering with line numbers
const transformCode = (code: ReactNode, language: string): ReactNode => {
  if (!isValidElement(code)) {
    // Early return when the `CodeBox` child is not a valid element since the
    // type is a ReactNode, and can assume any value
    return code;
  }

  const content = code.props?.children;

  if (code.type !== 'code' || typeof content !== 'string') {
    // There is no need to transform an element that is not a code element or
    // a content that is not a string
    return code;
  }

  // Note that since we use `.split` we will have an extra entry
  // being an empty string, so we need to remove it
  const lines = content.split('\n');

  const extraStyle = language.length === 0 ? { fontFamily: 'monospace' } : {};

  return (
    <code style={extraStyle}>
      {lines
        .flatMap((line, lineIndex) => {
          const columns = line.split(' ');

          return [
            <span key={lineIndex} className="line">
              {columns.map((column, columnIndex) => (
                <Fragment key={columnIndex}>
                  <span>{column}</span>
                  {columnIndex < columns.length - 1 && <span> </span>}
                </Fragment>
              ))}
            </span>,
            // Add a break line so the text content is formatted correctly
            // when copying to clipboard
            '\n',
          ];
        })
        // Here we remove that empty line from before and
        // the last flatMap entry which is an `\n`
        .slice(0, -2)}
    </code>
  );
};

type CodeBoxProps = { language: string; showCopyButton?: boolean };

const CodeBox: FC<PropsWithChildren<CodeBoxProps>> = ({
  children,
  language,
  showCopyButton = true,
}) => {
  const ref = useRef<HTMLPreElement>(null);

  //const notify = useNotification();
  const [, copyToClipboard] = useCopyToClipboard();

  const onCopy = async () => {
    if (ref.current?.textContent) {
      copyToClipboard(ref.current.textContent);

      // notify({
      //   duration: 3000,
      //   message: (
      //     <div className={styles.notification}>
      //       <CodeBracketIcon className={styles.icon} />
      //       copied
      //     </div>
      //   ),
      // });
    }
  };

  return (
    <div className={cn(styles.root, 'scrollbar')}>
      {language && (
        <div className={styles.footer}>
          <span className={styles.language}>{language}</span>

          {showCopyButton && (
            <Button
              variant="secondary"
              className={styles.action}
              onClick={onCopy}
            >
              <Files className={styles.icon} />
              Copy to clipboard
            </Button>
          )}
        </div>
      )}
      <pre ref={ref} className={styles.content} tabIndex={0}>
        {transformCode(children, language)}
      </pre>
    </div>
  );
};

export { CodeBox };
