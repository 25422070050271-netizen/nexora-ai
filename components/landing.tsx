"use client";

import { FormEvent, useState } from "react";
import { ArrowRight, BrainCircuit, LayoutDashboard, MessageSquareText, Sparkles } from "lucide-react";

const features = [
  { icon: MessageSquareText, title: "Chat inteligente", text: "Conversa, crea y resuelve tareas desde un solo lugar." },
  { icon: BrainCircuit, title: "Memoria personal", text: "Nexora podrá adaptar sus respuestas a tus preferencias." },
  { icon: LayoutDashboard, title: "Espacios de trabajo", text: "Organiza proyectos, ideas y herramientas en paneles claros." },
];

export function Landing() {
  const [message, setMessage] = useState("");
  const [reply, setReply] = useState("Cuéntame qué quieres crear y armaremos el plan paso a paso.");
  const [loading, setLoading] = useState(false);

  async function submit(event: FormEvent) {
    event.preventDefault();
    if (!message.trim()) return;
    setLoading(true);
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });
      const data = await response.json();
      setReply(data.reply ?? "No pude responder en este momento.");
      setMessage("");
    } catch {
      setReply("No se pudo conectar con el asistente. Revisa la configuración del servidor.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="mx-auto min-h-screen max-w-7xl px-5 py-6 md:px-10">
      <nav className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-5 py-4 backdrop-blur-xl">
        <div className="flex items-center gap-2 font-bold"><Sparkles className="h-5 w-5" /> Nexora AI</div>
        <a href="#demo" className="rounded-full border border-white/15 px-4 py-2 text-sm hover:bg-white/10">Probar demo</a>
      </nav>

      <section className="grid items-center gap-12 py-20 lg:grid-cols-[1.1fr_.9fr]">
        <div>
          <span className="inline-flex rounded-full border border-indigo-400/30 bg-indigo-400/10 px-3 py-1 text-sm text-indigo-200">Tu espacio inteligente</span>
          <h1 className="mt-6 max-w-3xl text-5xl font-black tracking-tight md:text-7xl">Piensa, crea y avanza con una IA que se adapta a ti.</h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">Nexora AI reúne conversación, memoria, proyectos y herramientas en una experiencia limpia y personal.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#demo" className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 font-semibold text-black hover:bg-slate-200">Comenzar ahora <ArrowRight className="h-4 w-4" /></a>
            <a href="#features" className="rounded-full border border-white/15 px-5 py-3 font-semibold hover:bg-white/10">Ver funciones</a>
          </div>
        </div>

        <div id="demo" className="rounded-3xl border border-white/10 bg-white/[.07] p-4 shadow-glow backdrop-blur-xl">
          <div className="rounded-2xl border border-white/10 bg-black/30 p-5">
            <p className="text-xs uppercase tracking-[.25em] text-slate-400">Nexora Assistant</p>
            <div className="mt-5 min-h-40 rounded-2xl bg-white/5 p-4 leading-7 text-slate-200">{loading ? "Pensando…" : reply}</div>
            <form onSubmit={submit} className="mt-4 flex gap-2">
              <input value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Escribe una idea…" className="min-w-0 flex-1 rounded-xl border border-white/10 bg-white/5 px-4 py-3 outline-none focus:border-indigo-400" />
              <button disabled={loading} className="rounded-xl bg-indigo-500 px-4 py-3 font-semibold hover:bg-indigo-400 disabled:opacity-50">Enviar</button>
            </form>
          </div>
        </div>
      </section>

      <section id="features" className="grid gap-4 pb-20 md:grid-cols-3">
        {features.map(({ icon: Icon, title, text }) => (
          <article key={title} className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
            <Icon className="h-7 w-7 text-indigo-300" />
            <h2 className="mt-5 text-xl font-bold">{title}</h2>
            <p className="mt-3 leading-7 text-slate-400">{text}</p>
          </article>
        ))}
      </section>
    </main>
  );
}
