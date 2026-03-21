import { Metadata } from "next";
import { en } from "../../../locales/en";
import { th } from "../../../locales/th";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import BookingForm from "./BookingForm";
import Navbar from "../../../components/ui/Navbar";
import Footer from "../../../components/ui/Footer";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  return {
    title: lang === 'th' ? "จองการขนย้าย | MagMove Phuket" : "Book a Move | MagMove Phuket",
    description: lang === 'th' 
      ? "ขอใบเสนอราคาบริการขนย้ายฟรี จากทีมงานมืออาชีพในภูเก็ต"
      : "Request a free premium moving quote from the leading logistics experts in Phuket.",
    alternates: {
      canonical: `https://magmove.com/${lang}/book`
    }
  };
}

export default async function BookPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const t = lang === "th" ? th : en;

  return (
    <main className="min-h-screen bg-surface">
      {/* Universal Header */}
      <Navbar t={t} lang={lang} />

      <div className="max-w-5xl mx-auto px-6 pt-32 pb-20 md:pt-40 md:pb-32">
        <Link 
          href={`/${lang}`} 
          className="inline-flex items-center gap-2 text-primary hover:text-tertiary-fixed-dim transition-colors font-label font-bold text-sm tracking-wider mb-12"
        >
          <ArrowLeft className="w-4 h-4" />
          {t.booking.returnHome}
        </Link>
        
        <div className="mb-16">
          <h1 className="font-headline text-5xl md:text-6xl font-extrabold text-primary tracking-tight mb-6">
            {t.booking.heroTitle}
          </h1>
          <p className="text-secondary font-body text-xl max-w-2xl leading-relaxed">
            {t.booking.heroDesc}
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-[0_12px_40px_rgba(24,28,30,0.06)] p-8 md:p-12 border border-surface-container">
          {/* Server Component passes the translated dictionary heavily to the interactive Client UI */}
          <BookingForm t={t} />
        </div>
      </div>

      {/* Universal Footer */}
      <Footer t={t} lang={lang} />

      {/* Explicit ContactPage/Service AIEO Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ContactPage",
            "name": lang === 'th' ? "ติดต่อรับใบเสนอราคา MagMove" : "Get a MagMove Quote",
            "description": lang === 'th' 
              ? "แบบฟอร์มขอใบเสนอราคาและจองการขนย้ายแบบ White-Glove ในภูเก็ต"
              : "Booking and quotation form for White-Glove moving services in Phuket.",
            "url": `https://magmove.com/${lang}/book`,
            "mainEntity": {
              "@type": "Service",
              "provider": {
                "@type": "MovingCompany",
                "name": "MagMove"
              },
              "serviceType": "Premium Moving and Relocation Services",
              "areaServed": "Phuket, Thailand"
            }
          })
        }}
      />
    </main>
  );
}
