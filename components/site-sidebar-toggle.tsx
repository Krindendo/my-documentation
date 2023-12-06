import { Switch } from "./ui/switch"

interface SiteSidebarToggleProps {
  toggleDocs: boolean
  handleToggleDocs: () => void
}

export default function SiteSidebarToggle({
  toggleDocs,
  handleToggleDocs,
}: SiteSidebarToggleProps) {
  return (
    <div className="mb-6 flex items-center justify-center gap-2 rounded-md bg-blue-50 p-2">
      <p className="text-sm">Docs</p>
      <Switch checked={toggleDocs} onCheckedChange={handleToggleDocs} />
      <p className="text-sm">Algorithms</p>
    </div>
  )
}
