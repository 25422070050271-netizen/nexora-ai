import { signIn } from "@/auth";

export default function LoginPage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-md items-center px-6 py-16">
      <div className="w-full rounded-2xl border border-zinc-800 bg-zinc-900/50 p-8">
        <h1 className="text-2xl font-semibold">Acceso</h1>
        <p className="mt-2 text-sm text-zinc-400">Autenticación inicial con Auth.js (Credentials).</p>
        <form
          action={async (formData) => {
            "use server";
            await signIn("credentials", formData);
          }}
          className="mt-6 space-y-4"
        >
          <label className="block text-sm">
            Correo
            <input
              required
              type="email"
              name="email"
              className="mt-2 w-full rounded-xl border border-zinc-700 bg-zinc-950 px-3 py-2"
            />
          </label>
          <label className="block text-sm">
            Contraseña
            <input
              required
              minLength={8}
              type="password"
              name="password"
              className="mt-2 w-full rounded-xl border border-zinc-700 bg-zinc-950 px-3 py-2"
            />
          </label>
          <input type="hidden" name="redirectTo" value="/dashboard" />
          <button
            type="submit"
            className="w-full rounded-xl bg-emerald-500 px-4 py-2.5 font-medium text-black hover:bg-emerald-400"
          >
            Entrar
          </button>
        </form>
      </div>
    </main>
  );
}
