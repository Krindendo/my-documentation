"use client";

// import { getLanguageDisplayName } from "@/lib/getLanguageDisplayName";

import { Files } from "lucide-react";
import type { FC, PropsWithChildren, ReactNode } from "react";
import { Fragment, isValidElement, useRef } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";

// Transforms a code element with plain text content into a more structured
// format for rendering with line numbers
const transformCode = (code: ReactNode, language: string): ReactNode => {
  if (!isValidElement(code)) {
    // Early return when the `CodeBox` child is not a valid element since the
    // type is a ReactNode, and can assume any value
    return code;
  }

  const content = code.props?.children;

  if (code.type !== "code" || typeof content !== "string") {
    // There is no need to transform an element that is not a code element or
    // a content that is not a string
    return code;
  }

  // Note that since we use `.split` we will have an extra entry
  // being an empty string, so we need to remove it
  const lines = content.split("\n");

  const extraStyle = language.length === 0 ? { fontFamily: "monospace" } : {};

  return (
    <code style={extraStyle}>
      {lines
        .flatMap((line, lineIndex) => {
          const columns = line.split(" ");

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
            "\n",
          ];
        })
        // Here we remove that empty line from before and
        // the last flatMap entry which is an `\n`
        .slice(0, -2)}
    </code>
  );
};

interface CodeBoxProps {
  className?: string;
}

const CodeBox: FC<PropsWithChildren<CodeBoxProps>> = ({
  children,
  className,
}) => {
  const matches = className?.match(/language-(?<language>.*)/);

  console.log("matches", matches);
  const language = matches?.groups?.language ?? "";

  const ref = useRef<HTMLPreElement>(null);

  const [, copyToClipboard] = useCopyToClipboard();

  const onCopy = async () => {
    if (ref.current?.textContent) {
      copyToClipboard(ref.current.textContent);
      toast.success("Copied to clipboard");
    }
  };

  return (
    <div className="relative mb-4 mt-6 max-h-[650px] w-full overflow-x-auto rounded-lg border border-neutral-800 bg-zinc-900 py-4 dark:bg-zinc-900 scrollbar">
      <div className="sticky top-0 flex items-center justify-between border-t border-t-neutral-900 px-4 text-sm font-medium">
        <span className="rounded bg-neutral-800 p-1.5 text-neutral-300">
          {language}
        </span>

        <Button
          variant="secondary"
          className="gap-1 px-3 py-1.5 font-medium"
          onClick={onCopy}
        >
          <Files className="size-4" />
          Copy to clipboard
        </Button>
      </div>

      <pre ref={ref} className="m-0 p-4 pt-2 code-content" tabIndex={0}>
        {transformCode(children, language)}
      </pre>
    </div>
  );
};

export { CodeBox };
