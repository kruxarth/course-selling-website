export function Dashboard() {
  return (
    <div className="flex min-h-svh flex-col">
      <header className="border-b p-4">
        <h1 className="text-lg font-semibold">Dashboard</h1>
      </header>
      <main className="flex-1 p-6">
        <p className="text-sm text-muted-foreground">
          This route is rendered inside the sidebar layout.
        </p>
      </main>
    </div>
  );
}
