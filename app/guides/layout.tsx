import { Suspense } from "react"

interface GuidesLayoutProps {
  children: React.ReactNode
}

export default function GuidesLayout({ children }: GuidesLayoutProps) {
  return (
    <Suspense>
      <div className="container max-w-5xl">{children}</div>
    </Suspense>
  )
}
