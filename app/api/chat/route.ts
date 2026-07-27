import OpenAI from "openai";
import { NextResponse } from "next/server";
import { z } from "zod";

const bodySchema = z.object({
  message: z.string().trim().min(1).max(2000),
});

export async function POST(request: Request) {
  try {
    const body = bodySchema.parse(await request.json());
    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      return NextResponse.json({
        reply: `Demo activa: recibí “${body.message}”. Agrega la variable OPENAI_API_KEY en el servidor para obtener respuestas reales.`,
      });
    }

    const client = new OpenAI({ apiKey });
    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "Eres Nexora, un asistente claro, útil y creativo. Responde en el idioma del usuario.",
        },
        { role: "user", content: body.message },
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    return NextResponse.json({
      reply: completion.choices[0]?.message.content ?? "No se generó una respuesta.",
    });
  } catch (error) {
    const message = error instanceof z.ZodError ? "Mensaje inválido." : "Error interno del asistente.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
