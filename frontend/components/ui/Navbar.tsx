import Link from "next/link";
import { Globe } from "lucide-react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function Navbar({ t, lang }: { t: any; lang: string }) {
  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 dark:bg-slate-900/80 glass-nav h-20 shadow-sm border-b border-surface-container">
      <div className="flex justify-between items-center max-w-7xl mx-auto px-6 h-full">
        {/* Brand Logo */}
        <Link href={`/${lang}`} className="flex items-center gap-3 group">
          <div className="w-8 h-8 bg-tertiary-fixed rounded-md flex items-center justify-center transition-transform group-hover:scale-105">
            <span className="text-on-tertiary-fixed font-bold text-lg leading-none">M</span>
          </div>
          <div className="text-xl font-bold text-tertiary-fixed font-headline tracking-tight group-hover:text-tertiary-fixed-dim transition-colors">
            MagMove
          </div>
        </Link>
        
        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-8">
          <Link className="font-headline tracking-tight text-sm font-semibold uppercase text-tertiary-fixed-dim" href={`/${lang}`}>{t.nav.home}</Link>
          <a className="font-headline tracking-tight text-sm font-semibold uppercase text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-tertiary-fixed-dim transition-colors" href={`/${lang}#services`}>{t.nav.services}</a>
          <a className="font-headline tracking-tight text-sm font-semibold uppercase text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-tertiary-fixed-dim transition-colors" href={`/${lang}#fleet`}>{t.nav.fleet}</a>
          <a className="font-headline tracking-tight text-sm font-semibold uppercase text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-tertiary-fixed-dim transition-colors" href={`/${lang}#why-us`}>{t.nav.whyChooseUs}</a>
          <a className="font-headline tracking-tight text-sm font-semibold uppercase text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-tertiary-fixed-dim transition-colors" href={`/${lang}#contact`}>{t.nav.contact}</a>
        </div>
        
        {/* CTA & Lang */}
        <div className="flex items-center gap-6">
          <Link 
            href={lang === "en" ? "/th" : "/en"}
            className="flex items-center gap-2 text-primary dark:text-slate-300 hover:text-tertiary-fixed-dim transition-colors font-label font-bold text-sm tracking-wider"
            aria-label="Toggle language"
          >
            <Globe className="w-4 h-4" />
            {lang === "en" ? "TH" : "EN"}
          </Link>
          <Link href={`/${lang}/book`} className="bg-tertiary-fixed text-on-tertiary-fixed px-6 py-3 rounded-md font-semibold text-sm hover:opacity-90 transition-all duration-300 active:scale-95 gold-glow uppercase tracking-wider hidden sm:block">
            {t.nav.getQuote}
          </Link>
        </div>
      </div>
    </nav>
  );
}
