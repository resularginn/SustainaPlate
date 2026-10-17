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
  title: "SustainaPlate",
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
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var k="sustainaplate_prefs_v1",kOld="zerowaste_chef_prefs_v1",r=localStorage.getItem(k)||localStorage.getItem(kOld),t=null;if(r){try{t=JSON.parse(r).theme}catch(e){}}if(!t){t=window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}var cl=document.documentElement.classList;if(t==="dark"){cl.add("dark");document.documentElement.style.colorScheme="dark"}else{cl.remove("dark");document.documentElement.style.colorScheme="light"}}catch(e){}})();`,
          }}
        />
      </head>
      <body className="min-h-screen antialiased bg-[var(--bg-canvas)] text-[var(--text-primary)]">
        {children}
      </body>
    </html>
  );
}
