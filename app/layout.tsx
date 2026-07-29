import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Camboriú Hotel | Hospedagem em Balneário Camboriú",
  description:
    "Hospedagem familiar no Centro de Balneário Camboriú, com quartos confortáveis, garagem, wi-fi e reserva direta pelo WhatsApp.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
  openGraph: {
    title: "Camboriú Hotel",
    description:
      "Hospedagem familiar, bem localizada e com reserva direta pelo WhatsApp em Balneário Camboriú.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
