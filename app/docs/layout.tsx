interface DocsLayoutProps {
  children: React.ReactNode
}

export default function DocsLayout({ children }: DocsLayoutProps) {
  return <div className="container flex flex-1 items-start">{children}</div>
}
