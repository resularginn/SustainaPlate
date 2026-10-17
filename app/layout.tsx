import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// Clean, highly legible sans with Turkish (latin-ext) and Russian (cyrillic) coverage;
// Arabic and Chinese fall back to the system fonts designed for those scripts
const inter = Inter({
  subsets: ["latin", "latin-ext", "cyrillic"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ZeroWaste Chef",
  description:
    "Minimalist domestic food rescue and 2-to-7 day spoilage-ordered meal planning powered by Google Gemini AI in support of UN SDG 12.3 and SDG 13.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={inter.variable}
    >
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
