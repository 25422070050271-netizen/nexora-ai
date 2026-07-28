import Link from "next/link";

export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-5xl flex-col justify-center gap-8 px-6 py-16">
      <div className="inline-flex w-fit items-center rounded-full border border-emerald-600/30 bg-emerald-600/10 px-3 py-1 text-xs font-medium text-emerald-400">
        Lynk eSIM · Etapa 1
      </div>
      <h1 className="text-4xl font-semibold leading-tight md:text-6xl">
        Plataforma profesional para venta y gestión de planes eSIM.
      </h1>
      <p className="max-w-3xl text-zinc-300">
        Base inicial con Next.js, TypeScript estricto, Tailwind, Prisma y Auth.js para continuar la
        implementación por etapas sin exponer secretos ni acoplar la app a un proveedor único.
      </p>
      <div className="flex flex-wrap items-center gap-3">
        <Link
          href="/login"
          className="rounded-xl bg-emerald-500 px-5 py-3 text-sm font-semibold text-black hover:bg-emerald-400"
        >
          Iniciar sesión
        </Link>
        <Link
          href="/dashboard"
          className="rounded-xl border border-zinc-700 px-5 py-3 text-sm font-semibold hover:bg-zinc-900"
        >
          Ir al dashboard
        </Link>
      </div>
    </main>
  );
}
