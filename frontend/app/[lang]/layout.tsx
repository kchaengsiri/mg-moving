import type { Metadata } from "next";
import { Manrope, Inter, IBM_Plex_Sans_Thai } from "next/font/google";
import "../globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const ibmPlexSansThai = IBM_Plex_Sans_Thai({
  subsets: ["thai", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-ibm-plex-sans-thai",
  display: "swap",
});

export const metadata: Metadata = {
  title: "MG Moving - Premium White-Glove Logistics",
  description: "Phuket's leading premium moving and logistics service. White-glove handling, secure transport, and absolute peace of mind.",
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const { lang } = await params;
  return (
    <html
      lang={lang}
      className={`${manrope.variable} ${inter.variable} ${ibmPlexSansThai.variable} h-full antialiased scroll-smooth`}
    >
      <body className="font-body bg-surface text-on-background min-h-full flex flex-col">{children}</body>
    </html>
  );
}
