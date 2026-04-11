import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Switcher from "@/components/Switcher";
import Image from "next/image";
import { title , description } from "@/config/base.data";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: title,
  description: description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col overflow-x-hidden">
        <Switcher>
          <Header />
          {children}
          <Footer />
        </Switcher>

        <Image src="/background.jpg" alt="background" fill className="fixed top-0 left-0 w-full h-full object-cover opacity-10 -z-10" />
      </body>
    </html>
  );
}
