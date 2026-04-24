import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Switcher from "@/components/Switcher";
import ThemeProvider from "@/components/ThemeProvider";
import { LanguageProvider } from "@/components/LanguageProvider";
import SmoothScroll from "@/components/SmoothScroll";



const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Lantxx Personal Homepage",
  description: "Endless Curiosity, Boundless Creation",
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body   className="min-h-full flex flex-col overflow-x-hidden">

        <ThemeProvider>
          <LanguageProvider>
            <SmoothScroll>
              <Switcher>
                <Header />
                {children}
                <Footer />
              </Switcher>
            </SmoothScroll>
          </LanguageProvider>
        </ThemeProvider>

      </body>
    </html>
  );
}
