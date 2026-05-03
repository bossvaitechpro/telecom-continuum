import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Navbar } from "@/components/Navbar";
import { QuickJump } from "@/components/QuickJump";

export const metadata: Metadata = {
  title: {
    default: "Telecom Economy Continuum",
    template: "%s | Telecom Economy Continuum",
  },
  description: "The Laws of Network Observability — From Theory to Practice. A knowledge portal for MNO professionals.",
  openGraph: {
    siteName: "Telecom Economy Continuum",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <Navbar />
          <main className="min-h-screen">
            {children}
          </main>
          <QuickJump />
        </ThemeProvider>
      </body>
    </html>
  );
}
