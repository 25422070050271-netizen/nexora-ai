import { auth } from "@/auth";

export default async function DashboardPage() {
  const session = await auth();

  return (
    <main className="mx-auto min-h-screen max-w-6xl px-6 py-10">
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6">
        <p className="text-xs font-medium uppercase tracking-wide text-emerald-400">Dashboard</p>
        <h1 className="mt-2 text-3xl font-semibold">Lynk eSIM</h1>
        <p className="mt-3 text-zinc-300">
          Sesión actual: {session?.user?.email ?? "Sin sesión"}.
        </p>
      </div>
    </main>
  );
}
