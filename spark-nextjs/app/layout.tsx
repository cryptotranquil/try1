import type { Metadata, Viewport } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { MotionProvider, ScrollProgress } from "@/components/motion";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://spark-group-brown.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Spark Holdings | Security, cleaning and supplies in Malawi",
    template: "%s | Spark Holdings",
  },
  description:
    "Spark Holdings runs Spark Security Solutions, Spark Cleaning Solutions and a general supplies business from offices in Lilongwe and Blantyre, Malawi.",
  openGraph: {
    type: "website",
    siteName: "Spark Holdings",
    images: ["/img/security/lineup.jpg"],
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#e8eeed" },
    { media: "(prefers-color-scheme: dark)", color: "#0b1a1f" },
  ],
};

// Sets the saved or system theme before the page paints, so there is no flash.
const themeScript = `try{var t=localStorage.getItem('theme');if(t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme: dark)').matches)){document.documentElement.classList.add('dark')}}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@62..125,500..900&family=Public+Sans:wght@400;500;600&display=swap"
        />
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        {/* Without JavaScript, nothing waits for an animation before it shows. */}
        <noscript>
          <style>{`[style*="opacity: 0"]{opacity:1!important;transform:none!important}[style*="clip-path"]{clip-path:none!important}`}</style>
        </noscript>
      </head>
      <body>
        <MotionProvider>
          <ScrollProgress />
          <a
            href="#main"
            className="absolute left-[-999px] top-0 z-[100] rounded-full bg-surface px-4 py-3 text-ink focus:left-2 focus:top-2"
          >
            Skip to main content
          </a>
          <Header />
          <main id="main" className="canvas space-y-4 pb-4 sm:space-y-6 sm:pb-6">
            {children}
          </main>
          <Footer />
        </MotionProvider>
      </body>
    </html>
  );
}
