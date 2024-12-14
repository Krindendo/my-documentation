import { Separator } from "@/components/ui/separator";

export default function NotFoundPage() {
  return (
    <div className="flex flex-row items-center justify-center h-full gap-5 flex-1">
      <h1 className="text-2xl font-medium m-0">404</h1>
      <Separator orientation="vertical" className="h-12" />
      <h2 className="text-sm font-normal m-0 p-0">
        This page could not be found.
      </h2>
    </div>
  );
}
