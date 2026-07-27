import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nexora AI",
  description: "Tu espacio inteligente para crear, organizar y avanzar.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
