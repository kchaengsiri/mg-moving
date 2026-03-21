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

const ibmPlexThai = IBM_Plex_Sans_Thai({
  subsets: ["thai", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-ibm-plex-sans-thai",
  display: "swap",
});

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  return {
    title: lang === 'th' ? "MagMove - บริการขนย้ายระดับพรีเมียมในภูเก็ต" : "MagMove - Premium Moving in Phuket",
    description: lang === 'th'
      ? "บริการโลจิสติกส์และขนย้ายระดับ White-Glove ในภูเก็ต ปลอดภัย มั่นใจได้ด้วยทีมงานมืออาชีพ ไม่ว่าจะเป็นย้ายบ้านหรือคอนโด"
      : "White-Glove logistics and premium moving services in Phuket. Safe, secure, and professional relocation for your home or business.",
    keywords: ["MagMove", "moving company Phuket", "premium moving", "white-glove moving", "ย้ายบ้านภูเก็ต", "รับจ้างขนย้าย"],
    openGraph: {
      title: lang === 'th' ? "MagMove - บริการขนย้ายระดับพรีเมียมในภูเก็ต" : "MagMove - Premium Moving in Phuket",
      description: lang === 'th' ? "บริการโลจิสติกส์ระดับพรีเมียมในภูเก็ต" : "Premium White-Glove logistics in Phuket.",
      type: "website",
      siteName: "MagMove",
    }
  };
}

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
      className={`${manrope.variable} ${inter.variable} ${ibmPlexThai.variable} h-full antialiased scroll-smooth`}
    >
      <body className="font-body bg-surface text-on-background min-h-full flex flex-col">{children}</body>
    </html>
  );
}
