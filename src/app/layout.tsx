import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Navbar } from "@/components/Navbar";
import { QuickJump } from "@/components/QuickJump";

export const metadata: Metadata = {
  title: {
    default: "Observe. Resolve. Automate.",
    template: "%s | Observe. Resolve. Automate.",
  },
  description: "The complete observability framework for autonomous networks. Ten functions. Six economic laws. One standard.",
  openGraph: {
    siteName: "Observe. Resolve. Automate.",
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
