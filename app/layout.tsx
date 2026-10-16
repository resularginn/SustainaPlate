import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ZeroWaste Chef | SDG 12.3 & SDG 13 Culinary Planning Engine",
  description:
    "Minimalist domestic food rescue and 2-to-7 day spoilage-ordered meal planning powered by Google Gemini AI in support of UN SDG 12.3 and SDG 13.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
