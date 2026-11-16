import type { Metadata, Viewport } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  display: "swap",
});

const ARM_MOTION = `(function(){try{var d=document.documentElement;if(window.matchMedia("(prefers-reduced-motion: reduce)").matches)return;d.classList.add("motion-armed");setTimeout(function(){if(!d.classList.contains("motion-live"))d.classList.remove("motion-armed")},6000)}catch(e){}})();`;

export const metadata: Metadata = {
  title: "Luma — Build skills that actually move you forward",
  description:
    "Practical courses taught by people who do the work every day. Learn design, technology, business and more — one focused lesson at a time.",
  openGraph: {
    title: "Luma — Practical learning for curious people",
    description:
      "Short, practical courses designed around skills you can put to work immediately.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#f9f8f3",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jakarta.variable}`} suppressHydrationWarning>
      <head>
        {/* Arms the entrance animations before first paint (never with reduced motion).
            If the motion runtime does not start within 6s, the page is disarmed and shows as is. */}
        <script dangerouslySetInnerHTML={{ __html: ARM_MOTION }} />
      </head>
      <body className="bg-white text-ink antialiased">{children}</body>
    </html>
  );
}
