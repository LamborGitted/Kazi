import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { headers } from "next/headers";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Switcher from "@/components/Switcher";
import ThemeProvider from "@/components/ThemeProvider";
import { LanguageProvider } from "@/components/LanguageProvider";
import SmoothScroll from "@/components/SmoothScroll";
import { defaultLocale } from "@/config/i18n/locales";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const headersList = await headers();
  const locale = headersList.get("x-locale") || defaultLocale;

  return {
    metadataBase: new URL("https://lantxx.com.cn"),
    title: "Lantxx Personal Homepage",
    description: locale === "zh" ? "`兴趣使然创造，热爱依旧坚持`" : "Interest-driven Creation, Passion-driven Persistence",
    openGraph: {
      title: "Lantxx Personal Homepage",
      description: locale === "zh" ? "`兴趣使然创造，热爱依旧坚持`" : "Interest-driven Creation, Passion-driven Persistence",
      url: "https://lantxx.com.cn",
      siteName: "Lantxx",
      locale: locale === "zh" ? "zh_CN" : "en_US",
      type: "website",
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersList = await headers();
  const locale = headersList.get("x-locale") || defaultLocale;

  return (
    <html
      lang={locale}
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
