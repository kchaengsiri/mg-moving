import type { Metadata } from "next";
import { Manrope, Inter } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MG Moving | Premium Logistics & White-Glove Service Phuket",
  description: "A premium moving experience tailored for you. From high-end villas to corporate offices, we handle your world with precision and white-glove care.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="font-body bg-surface text-on-background min-h-full flex flex-col">{children}</body>
    </html>
  );
}
