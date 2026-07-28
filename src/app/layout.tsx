import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Lynk eSIM",
  description: "Compra y administra planes eSIM legales desde una sola plataforma.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
