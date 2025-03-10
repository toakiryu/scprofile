import { cn } from "@/lib/utils";

export function TabsTrigger({
  tab,
  setTab,
  children,
  value,
}: {
  tab: string;
  setTab: React.Dispatch<React.SetStateAction<string>>;
  children: React.ReactNode;
  value: string;
}) {
  return (
    <button
      className={cn(
        "inline-flex items-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 text-accent-foreground h-9 px-4 py-2 justify-start",
        tab === value
          ? "bg-muted hover:bg-muted"
          : "bg-transparent hover:underline"
      )}
      onClick={() => setTab(value)}
    >
      {children}
    </button>
  );
}

export function TabsContent({
  tab,
  children,
  value,
}: {
  tab: string;
  children: React.ReactNode;
  value: string;
}) {
  if (tab !== value) return null;
  return <div className="p-2 sm:ml-10">{children}</div>;
}

export function TabContentHeader({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return (
    <>
      <div>
        <h3 className="text-lg font-medium">{title}</h3>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </div>
      <hr className="my-5" />
    </>
  );
}

export function ItemGroup({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-col gap-3">{children}</div>;
}

export function ItemLabel({ children }: { children: React.ReactNode }) {
  return (
    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
      {children}
    </label>
  );
}

export function ItemDescription({ children }: { children: React.ReactNode }) {
  return <p className="text-[0.8rem] text-muted-foreground">{children}</p>;
}
