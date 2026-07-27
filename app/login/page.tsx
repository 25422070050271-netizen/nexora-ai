import { login, signup } from "@/app/auth/actions";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; message?: string }>;
}) {
  const params = await searchParams;

  return (
    <main className="min-h-screen bg-zinc-950 px-6 py-16 text-white">
      <div className="mx-auto max-w-md rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl">
        <p className="mb-2 text-sm font-medium text-emerald-400">Nexora AI</p>
        <h1 className="text-3xl font-semibold">Entra a tu espacio</h1>
        <p className="mt-2 text-sm text-zinc-400">Crea tu cuenta o inicia sesión para guardar chats y memoria.</p>

        {params.error ? (
          <p className="mt-5 rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-200">{params.error}</p>
        ) : null}
        {params.message ? (
          <p className="mt-5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3 text-sm text-emerald-200">{params.message}</p>
        ) : null}

        <form className="mt-7 space-y-4">
          <label className="block text-sm text-zinc-300">
            Nombre
            <input name="fullName" className="mt-2 w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 outline-none focus:border-emerald-500" placeholder="Tu nombre" />
          </label>
          <label className="block text-sm text-zinc-300">
            Correo
            <input required type="email" name="email" className="mt-2 w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 outline-none focus:border-emerald-500" placeholder="tu@correo.com" />
          </label>
          <label className="block text-sm text-zinc-300">
            Contraseña
            <input required minLength={8} type="password" name="password" className="mt-2 w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 outline-none focus:border-emerald-500" placeholder="Mínimo 8 caracteres" />
          </label>

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button formAction={login} className="rounded-xl bg-white px-4 py-3 font-medium text-black hover:bg-zinc-200">Iniciar sesión</button>
            <button formAction={signup} className="rounded-xl bg-emerald-500 px-4 py-3 font-medium text-black hover:bg-emerald-400">Crear cuenta</button>
          </div>
        </form>
      </div>
    </main>
  );
}
