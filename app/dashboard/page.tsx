import { redirect } from "next/navigation";
import { logout } from "@/app/auth/actions";
import { createClient } from "@/lib/supabase/server";

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  return (
    <main className="min-h-screen bg-zinc-950 px-6 py-10 text-white">
      <div className="mx-auto max-w-5xl">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-emerald-400">Nexora AI</p>
            <h1 className="mt-1 text-3xl font-semibold">Tu dashboard</h1>
            <p className="mt-2 text-zinc-400">Sesión iniciada como {user.email}</p>
          </div>
          <form action={logout}>
            <button className="rounded-xl border border-white/10 px-4 py-2 text-sm hover:bg-white/5">Cerrar sesión</button>
          </form>
        </div>

        <section className="mt-10 grid gap-4 md:grid-cols-3">
          {[
            ["Nuevo chat", "Empieza una conversación con Nexora."],
            ["Espacios", "Organiza proyectos, tareas y documentos."],
            ["Memoria", "Personaliza lo que Nexora recuerda de ti."],
          ].map(([title, description]) => (
            <article key={title} className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <h2 className="font-medium">{title}</h2>
              <p className="mt-2 text-sm text-zinc-400">{description}</p>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}
