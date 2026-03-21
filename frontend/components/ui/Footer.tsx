import Link from "next/link";
import { Phone, Share2, Mail } from "lucide-react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function Footer({ t, lang }: { t: any; lang: string }) {
  return (
    <footer id="contact" className="bg-primary-container text-white w-full py-16">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-7xl mx-auto px-6">
        {/* Brand & CTA */}
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-tertiary-fixed rounded-md flex items-center justify-center">
              <span className="text-on-tertiary-fixed font-bold text-lg leading-none">M</span>
            </div>
            <div className="text-xl font-bold text-tertiary-fixed font-headline tracking-tight">
              MagMove
            </div>
          </div>
          <p className="text-on-primary-container font-body text-sm leading-relaxed max-w-xs">{t.footer.desc}</p>
          <Link href={`/${lang}/book`} className="bg-tertiary-fixed text-on-tertiary-fixed px-6 py-3 rounded-md font-bold text-sm focus:ring-2 focus:ring-[#D69E2E] transition-all inline-block w-max">
            {t.footer.getQuote}
          </Link>
        </div>
        
        {/* Links */}
        <div className="grid grid-cols-2 gap-8">
          <div className="space-y-4">
            <h5 className="font-bold text-sm uppercase tracking-widest text-on-primary-container font-label">{t.footer.servicesCol}</h5>
            <ul className="space-y-4 text-sm text-white font-body">
              <li><Link className="hover:text-tertiary-fixed transition-all" href={`/${lang}`}>{t.footer.svcs.res}</Link></li>
              <li><Link className="hover:text-tertiary-fixed transition-all" href={`/${lang}`}>{t.footer.svcs.off}</Link></li>
              <li><Link className="hover:text-tertiary-fixed transition-all" href={`/${lang}`}>{t.footer.svcs.veh}</Link></li>
              <li><Link className="hover:text-tertiary-fixed transition-all" href={`/${lang}`}>{t.footer.svcs.sto}</Link></li>
            </ul>
          </div>
          <div className="space-y-4">
            <h5 className="font-bold text-sm uppercase tracking-widest text-on-primary-container font-label">{t.footer.quickLinks}</h5>
            <ul className="space-y-4 text-sm text-white font-body">
              <li><Link className="hover:text-tertiary-fixed transition-all" href={`/${lang}`}>{t.footer.links.gps}</Link></li>
              <li><Link className="hover:text-tertiary-fixed transition-all" href={`/${lang}`}>{t.footer.links.ins}</Link></li>
              <li><Link className="hover:text-tertiary-fixed transition-all" href={`/${lang}`}>{t.footer.links.priv}</Link></li>
            </ul>
          </div>
        </div>
        
        {/* Contact */}
        <div className="space-y-4">
          <h5 className="font-bold text-sm uppercase tracking-widest text-on-primary-container font-label">{t.footer.headOffice}</h5>
          <p className="text-sm text-white leading-relaxed font-body">
            {t.footer.address1}<br/>{t.footer.address2}<br/>{t.footer.address3}
          </p>
          <div className="flex items-center gap-2 text-tertiary-fixed mt-4">
            <Phone className="w-5 h-5" />
            <span className="text-white text-sm font-semibold font-body">+66 (0) 76-XXX-XXX</span>
          </div>
          <div className="flex gap-4 pt-4">
            <div className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors cursor-pointer text-tertiary-fixed">
              <Share2 className="w-4 h-4" />
            </div>
            <div className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors cursor-pointer text-tertiary-fixed">
              <Mail className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 mt-16 pt-6 pb-2 text-center md:text-left">
        <p className="text-xs text-on-primary-container font-label uppercase tracking-widest">{t.footer.copyright}</p>
      </div>
    </footer>
  );
}
