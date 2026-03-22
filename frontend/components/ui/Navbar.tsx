import Link from "next/link";
import { Globe } from "lucide-react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function Navbar({ t, lang }: { t: any; lang: string }) {
  return (
    <nav className="fixed top-0 w-full z-50 h-20 shadow-[0_4px_24px_rgba(10,20,40,0.18)]"
         style={{ backgroundColor: "#1A365D" }}>
      <div className="flex justify-between items-center max-w-7xl mx-auto px-6 h-full">

        {/* Brand Logo */}
        <Link href={`/${lang}`} className="flex items-center gap-3 group">
          <div className="w-8 h-8 bg-[#D69E2E] rounded-md flex items-center justify-center transition-transform group-hover:scale-105 shadow-sm">
            <span className="text-white font-bold text-lg leading-none">M</span>
          </div>
          <div className="text-xl font-bold text-white font-headline tracking-tight group-hover:text-[#D69E2E] transition-colors duration-200">
            MagMove
          </div>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-8">
          {[
            { label: t.nav.home,        href: `/${lang}` },
            { label: t.nav.services,    href: `/${lang}#services` },
            { label: t.nav.fleet,       href: `/${lang}#fleet` },
            { label: t.nav.whyChooseUs, href: `/${lang}#why-us` },
            { label: t.nav.contact,     href: `/${lang}#contact` },
          ].map(({ label, href }) => (
            <a
              key={href}
              href={href}
              className="font-headline tracking-tight text-sm font-semibold uppercase text-white/80 hover:text-[#D69E2E] transition-colors duration-200"
            >
              {label}
            </a>
          ))}
        </div>

        {/* CTA & Lang Switcher */}
        <div className="flex items-center gap-6">
          <Link
            href={lang === "en" ? "/th" : "/en"}
            className="flex items-center gap-2 text-white/70 hover:text-[#D69E2E] transition-colors duration-200 font-label font-bold text-sm tracking-wider"
            aria-label="Toggle language"
          >
            <Globe className="w-4 h-4" />
            {lang === "en" ? "TH" : "EN"}
          </Link>
          <Link
            href={`/${lang}/book`}
            className="bg-[#D69E2E] text-white px-6 py-3 rounded-md font-semibold text-sm hover:bg-[#B7851E] transition-all duration-300 active:scale-95 uppercase tracking-wider hidden sm:block shadow-[0_2px_12px_rgba(214,158,46,0.35)]"
          >
            {t.nav.getQuote}
          </Link>
        </div>
      </div>
    </nav>
  );
}
