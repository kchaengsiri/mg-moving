import Image from "next/image";
import Link from "next/link";
import { 
  ShieldCheck, 
  Building2, 
  Truck, 
  Bike, 
  MapPin, 
  ArrowRight,
  Award,
  Navigation,
  Sparkles,
  CheckCircle2,
  Phone,
  Share2,
  Mail,
  Globe
} from "lucide-react";
import { en } from "../../locales/en";
import { th } from "../../locales/th";

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const t = lang === "th" ? th : en;

  return (
    <main className="min-h-screen">
      {/* Top Navigation Bar */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 dark:bg-slate-900/80 glass-nav h-20">
        <div className="flex justify-between items-center max-w-7xl mx-auto px-6 h-full">
          <div className="text-2xl font-black tracking-tighter text-[#1A365D] dark:text-white font-headline">
            MG Moving
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <a className="font-headline tracking-tight text-sm font-semibold uppercase text-tertiary-fixed-dim" href="#">{t.nav.home}</a>
            <a className="font-headline tracking-tight text-sm font-semibold uppercase text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-tertiary-fixed-dim transition-colors" href="#services">{t.nav.services}</a>
            <a className="font-headline tracking-tight text-sm font-semibold uppercase text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-tertiary-fixed-dim transition-colors" href="#fleet">{t.nav.fleet}</a>
            <a className="font-headline tracking-tight text-sm font-semibold uppercase text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-tertiary-fixed-dim transition-colors" href="#why-us">{t.nav.whyChooseUs}</a>
            <a className="font-headline tracking-tight text-sm font-semibold uppercase text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-tertiary-fixed-dim transition-colors" href="#contact">{t.nav.contact}</a>
          </div>
          <div className="flex items-center gap-6">
            <Link 
              href={lang === "en" ? "/th" : "/en"}
              className="flex items-center gap-2 text-primary dark:text-slate-300 hover:text-tertiary-fixed-dim transition-colors font-label font-bold text-sm tracking-wider"
              aria-label="Toggle language"
            >
              <Globe className="w-4 h-4" />
              {lang === "en" ? "TH" : "EN"}
            </Link>
            <button className="bg-tertiary-fixed text-on-tertiary-fixed px-6 py-3 rounded-md font-semibold text-sm hover:opacity-90 transition-all duration-300 active:scale-95 gold-glow uppercase tracking-wider hidden sm:block">
              {t.nav.getQuote}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative pt-32 pb-20 md:pt-48 md:pb-32 hero-gradient overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10 grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <span className="inline-block text-tertiary-fixed-dim font-bold tracking-[0.2em] uppercase text-xs font-label">{t.hero.subtitle}</span>
            <h1 className="font-headline text-5xl md:text-7xl font-extrabold text-white leading-[1.1] tracking-tight">
              {t.hero.titleStart}<span className="text-tertiary-fixed">{t.hero.titleHighlight}</span>{t.hero.titleEnd}
            </h1>
            <p className="text-on-primary-container text-lg md:text-xl max-w-lg font-light leading-relaxed font-body">
              {t.hero.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              {/* Primary Button */}
              <button className="bg-tertiary-fixed text-on-tertiary-fixed px-8 py-4 rounded-md font-bold font-body text-base hover:opacity-90 transition-all duration-300 active:scale-95 gold-glow shadow-lg shadow-black/10">
                {t.hero.primaryButton}
              </button>
              {/* Secondary Button */}
              <button className="bg-surface-container-highest text-primary px-8 py-4 rounded-md font-bold font-body text-base hover:bg-surface-container-high transition-all duration-300">
                {t.hero.secondaryButton}
              </button>
            </div>
          </div>
          
          <div className="relative hidden md:block">
            <div className="rounded-xl overflow-hidden shadow-[0_12px_40px_rgba(24,28,30,0.06)] transform rotate-2">
              <Image 
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1470&auto=format&fit=crop" 
                alt="Modern luxury villa interior being prepared for move"
                width={800}
                height={500}
                className="w-full h-[500px] object-cover" 
                priority
              />
            </div>
            <div className="absolute -bottom-10 -left-10 bg-white p-6 rounded-xl shadow-[0_12px_40px_rgba(24,28,30,0.06)] max-w-xs transform -rotate-2">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-primary-container rounded-full flex items-center justify-center text-tertiary-fixed">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm font-bold text-primary font-headline">{t.hero.insurance}</p>
                  <p className="text-xs text-on-secondary-container font-label uppercase tracking-wider">{t.hero.peaceOfMind}</p>
                </div>
              </div>
              <p className="text-sm text-secondary italic font-body">{t.hero.testimonial}</p>
            </div>
          </div>
        </div>
        {/* Abstract Background Detail */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/20 skew-x-12 transform translate-x-32 pointer-events-none"></div>
      </header>

      {/* About Us Section */}
      <section id="about" className="py-24 bg-surface overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1 relative">
              <div className="relative z-10 rounded-2xl overflow-hidden shadow-[0_12px_40px_rgba(24,28,30,0.06)]">
                <Image 
                  src="https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=1470&auto=format&fit=crop" 
                  alt="Professional logistics team meticulously packing items"
                  width={800}
                  height={450}
                  className="w-full h-[450px] object-cover bg-surface-container" 
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-64 h-64 bg-primary-fixed -z-10 rounded-full blur-3xl opacity-30"></div>
              <div className="absolute -top-6 -left-6 w-32 h-32 bg-tertiary-fixed-dim rounded-lg -z-10 opacity-20"></div>
            </div>
            <div className="order-1 lg:order-2 space-y-6">
              <span className="text-on-tertiary-container font-label font-bold tracking-[0.2em] uppercase text-xs block">{t.about.label}</span>
              <h2 className="font-headline text-4xl md:text-5xl font-extrabold text-primary tracking-tight leading-tight">
                {t.about.titleStart}<span className="text-tertiary-container">{t.about.titleHighlight}</span>{t.about.titleEnd}
              </h2>
              <div className="space-y-4">
                <p className="text-secondary font-body text-lg leading-relaxed">
                  {t.about.p1}
                </p>
                <p className="text-secondary font-body text-lg leading-relaxed">
                  {t.about.p2}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-6 pt-6">
                <div className="border-l-4 border-tertiary-fixed pl-4">
                  <p className="text-3xl font-extrabold font-headline text-primary">{t.about.stat1Val}</p>
                  <p className="text-sm font-semibold font-label text-secondary uppercase tracking-wider">{t.about.stat1Label}</p>
                </div>
                <div className="border-l-4 border-tertiary-fixed pl-4">
                  <p className="text-3xl font-extrabold font-headline text-primary">{t.about.stat2Val}</p>
                  <p className="text-sm font-semibold font-label text-secondary uppercase tracking-wider">{t.about.stat2Label}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section: Bento Grid */}
      <section id="services" className="py-24 bg-surface">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16">
            <span className="text-on-tertiary-container font-label font-bold tracking-[0.05em] uppercase text-xs mb-2 block">{t.services.label}</span>
            <h2 className="font-headline text-4xl md:text-5xl font-extrabold text-primary tracking-tight">{t.services.title}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-6 h-auto md:h-[600px]">
            {/* Major Card */}
            <div className="md:col-span-2 md:row-span-2 bg-surface-container-lowest rounded-xl p-8 flex flex-col justify-between group shadow-[0_4px_20px_rgba(24,28,30,0.03)] hover:shadow-[0_12px_40px_rgba(24,28,30,0.06)] transition-all duration-300">
              <div>
                <div className="w-14 h-14 bg-primary-container rounded-lg flex items-center justify-center text-tertiary-fixed mb-6 group-hover:scale-110 transition-transform">
                  <Building2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-primary mb-4 font-headline">{t.services.houseProps.title}</h3>
                <p className="text-secondary font-body leading-relaxed">{t.services.houseProps.desc}</p>
              </div>
              <div className="mt-8 overflow-hidden rounded-lg h-48">
                <Image 
                  src="https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?q=80&w=1470&auto=format&fit=crop" 
                  alt="Professional movers carefully wrapping expensive furniture" 
                  width={800}
                  height={400}
                  className="w-full h-full object-cover rounded-md bg-surface-container" 
                />
              </div>
            </div>
            
            {/* Horizontal Card */}
            <div className="md:col-span-2 bg-primary-container rounded-xl p-8 flex items-center gap-8 text-white group cursor-pointer hover:bg-primary transition-colors duration-300">
              <div className="flex-1">
                <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center text-tertiary-fixed mb-4">
                  <Truck className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-2 font-headline">{t.services.transportProps.title}</h3>
                <p className="text-on-primary-container font-body text-sm leading-relaxed">{t.services.transportProps.desc}</p>
              </div>
              <div className="w-1/3 hidden lg:block overflow-hidden rounded-lg">
                <Image 
                  src="https://images.unsplash.com/photo-1519003722824-194d4455a60c?q=80&w=1475&auto=format&fit=crop" 
                  alt="Logistics truck driving on a highway at sunset" 
                  width={400}
                  height={300}
                  className="w-full h-full object-cover rounded-md bg-surface-container" 
                />
              </div>
            </div>

            {/* Square Card 1 */}
            <div className="bg-surface-container-high rounded-xl p-8 flex flex-col justify-between group cursor-pointer hover:bg-surface-container-highest transition-colors duration-300">
              <div>
                <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center text-tertiary-fixed mb-4">
                  <Bike className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-primary mb-2 font-headline">{t.services.motorcycleProps.title}</h3>
                <p className="text-secondary font-body text-sm">{t.services.motorcycleProps.desc}</p>
              </div>
              <span className="text-primary font-bold font-body text-sm flex items-center gap-2 group-hover:translate-x-1 transition-transform">
                {t.services.motorcycleProps.action} <ArrowRight className="w-4 h-4 ml-1" />
              </span>
            </div>

            {/* Square Card 2 */}
            <div className="bg-surface-container-high rounded-xl p-8 flex flex-col justify-between group cursor-pointer hover:bg-surface-container-highest transition-colors duration-300">
              <div>
                <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center text-tertiary-fixed mb-4">
                  <MapPin className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-primary mb-2 font-headline">{t.services.localProps.title}</h3>
                <p className="text-secondary font-body text-sm">{t.services.localProps.desc}</p>
              </div>
              <span className="text-primary font-bold font-body text-sm flex items-center gap-2 group-hover:translate-x-1 transition-transform">
                {t.services.localProps.action} <ArrowRight className="w-4 h-4 ml-1" />
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us: Tonal Layering */}
      <section id="why-us" className="py-24 bg-surface-container-low">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="aspect-square bg-surface-container-highest rounded-xl overflow-hidden shadow-sm">
                <Image 
                  src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1470&auto=format&fit=crop" 
                  alt="A clean warehouse facility with organized logistics equipment" 
                  width={800}
                  height={800}
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 rounded-md bg-surface-container" 
                />
              </div>
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-tertiary-fixed-dim rounded-lg -z-10"></div>
            </div>
            <div className="space-y-8">
              <div>
                <span className="text-on-tertiary-container font-label font-bold tracking-[0.05em] uppercase text-xs mb-2 block">{t.why.label}</span>
                <h2 className="font-headline text-4xl md:text-5xl font-extrabold text-primary tracking-tight">{t.why.title}</h2>
              </div>
              <div className="space-y-6">
                <div className="flex gap-4 p-6 bg-surface-container-lowest rounded-lg shadow-[0_12px_40px_rgba(24,28,30,0.06)] hover:bg-surface-container-low transition-colors duration-300 cursor-pointer">
                  <div className="text-[#D69E2E]">
                    <Award className="w-8 h-8" />
                  </div>
                  <div>
                    <h4 className="font-bold text-primary font-headline mb-1">{t.why.staff.title}</h4>
                    <p className="text-sm text-secondary font-body">{t.why.staff.desc}</p>
                  </div>
                </div>
                
                <div className="flex gap-4 p-6 bg-surface-container-lowest rounded-lg shadow-[0_12px_40px_rgba(24,28,30,0.06)] hover:bg-surface-container-low transition-colors duration-300 cursor-pointer">
                  <div className="text-[#D69E2E]">
                    <Navigation className="w-8 h-8" />
                  </div>
                  <div>
                    <h4 className="font-bold text-primary font-headline mb-1">{t.why.gps.title}</h4>
                    <p className="text-sm text-secondary font-body">{t.why.gps.desc}</p>
                  </div>
                </div>
                
                <div className="flex gap-4 p-6 bg-surface-container-lowest rounded-lg shadow-[0_12px_40px_rgba(24,28,30,0.06)] hover:bg-surface-container-low transition-colors duration-300 cursor-pointer">
                  <div className="text-[#D69E2E]">
                    <Sparkles className="w-8 h-8" />
                  </div>
                  <div>
                    <h4 className="font-bold text-primary font-headline mb-1">{t.why.service.title}</h4>
                    <p className="text-sm text-secondary font-body">{t.why.service.desc}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Fleet Showcase */}
      <section id="fleet" className="py-24 bg-surface">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-headline text-4xl md:text-5xl font-extrabold text-primary tracking-tight mb-4">{t.fleet.title}</h2>
            <p className="text-secondary max-w-2xl mx-auto font-body">{t.fleet.desc}</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Fleet Item */}
            <div className="bg-surface-container-lowest rounded-xl overflow-hidden group shadow-[0_4px_20px_rgba(24,28,30,0.03)] hover:shadow-[0_12px_40px_rgba(24,28,30,0.06)] transition-all cursor-pointer">
              <div className="aspect-video overflow-hidden">
                <Image 
                  src="https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?q=80&w=1470&auto=format&fit=crop" 
                  alt="A clean white professional moving truck parked in a modern setting" 
                  width={600}
                  height={400}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 rounded-md bg-surface-container" 
                />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-headline font-bold text-lg text-primary">{t.fleet.sixWheel.title}</h3>
                  <span className="text-[10px] bg-surface-container px-2 py-1 rounded-full text-secondary font-label uppercase tracking-wider">{t.fleet.sixWheel.badge}</span>
                </div>
                <p className="text-sm text-secondary mb-4 font-body">{t.fleet.sixWheel.desc}</p>
                <div className="flex items-center gap-2 text-primary text-xs font-label uppercase tracking-widest">
                  <CheckCircle2 className="w-4 h-4" /> {t.fleet.verified}
                </div>
              </div>
            </div>
            
            {/* Fleet Item */}
            <div className="bg-surface-container-low rounded-xl overflow-hidden group shadow-[0_4px_20px_rgba(24,28,30,0.03)] hover:shadow-[0_12px_40px_rgba(24,28,30,0.06)] transition-all cursor-pointer">
              <div className="aspect-video overflow-hidden">
                <Image 
                  src="https://images.unsplash.com/photo-1519003722824-194d4455a60c?q=80&w=1475&auto=format&fit=crop" 
                  alt="Inside of a clean moving truck with cargo securing rails" 
                  width={600}
                  height={400}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 rounded-md bg-surface-container" 
                />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-headline font-bold text-lg text-primary">{t.fleet.fourWheel.title}</h3>
                  <span className="text-[10px] bg-tertiary-fixed px-2 py-1 rounded-full text-on-tertiary-fixed font-label uppercase tracking-wider">{t.fleet.fourWheel.badge}</span>
                </div>
                <p className="text-sm text-secondary mb-4 font-body">{t.fleet.fourWheel.desc}</p>
                <div className="flex items-center gap-2 text-primary text-xs font-label uppercase tracking-widest">
                  <CheckCircle2 className="w-4 h-4" /> {t.fleet.verified}
                </div>
              </div>
            </div>
            
            {/* Fleet Item */}
            <div className="bg-surface-container-lowest rounded-xl overflow-hidden group shadow-[0_4px_20px_rgba(24,28,30,0.03)] hover:shadow-[0_12px_40px_rgba(24,28,30,0.06)] transition-all cursor-pointer">
              <div className="aspect-video overflow-hidden">
                <Image 
                  src="https://images.unsplash.com/photo-1558981403-c5f9899a28bc?q=80&w=1470&auto=format&fit=crop" 
                  alt="Professional logistics staff checking truck documents" 
                  width={600}
                  height={400}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 rounded-md bg-surface-container" 
                />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-headline font-bold text-lg text-primary">{t.fleet.moto.title}</h3>
                  <span className="text-[10px] bg-surface-container px-2 py-1 rounded-full text-secondary font-label uppercase tracking-wider">{t.fleet.moto.badge}</span>
                </div>
                <p className="text-sm text-secondary mb-4 font-body">{t.fleet.moto.desc}</p>
                <div className="flex items-center gap-2 text-primary text-xs font-label uppercase tracking-widest">
                  <CheckCircle2 className="w-4 h-4" /> {t.fleet.verified}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-primary-container text-white w-full py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-7xl mx-auto px-6">
          {/* Brand & CTA */}
          <div className="space-y-6">
            <div className="text-xl font-bold text-tertiary-fixed font-headline">MG Moving</div>
            <p className="text-on-primary-container font-body text-sm leading-relaxed max-w-xs">
              {t.footer.desc}
            </p>
            <button className="bg-tertiary-fixed text-on-tertiary-fixed px-6 py-3 rounded-md font-bold text-sm focus:ring-2 focus:ring-[#D69E2E] transition-all">
              {t.footer.getQuote}
            </button>
          </div>
          
          {/* Links */}
          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-4">
              <h5 className="font-bold text-sm uppercase tracking-widest text-on-primary-container font-label">{t.footer.servicesCol}</h5>
              <ul className="space-y-4 text-sm text-white font-body">
                <li><a className="hover:text-tertiary-fixed transition-all" href="#">{t.footer.svcs.res}</a></li>
                <li><a className="hover:text-tertiary-fixed transition-all" href="#">{t.footer.svcs.off}</a></li>
                <li><a className="hover:text-tertiary-fixed transition-all" href="#">{t.footer.svcs.veh}</a></li>
                <li><a className="hover:text-tertiary-fixed transition-all" href="#">{t.footer.svcs.sto}</a></li>
              </ul>
            </div>
            <div className="space-y-4">
              <h5 className="font-bold text-sm uppercase tracking-widest text-on-primary-container font-label">{t.footer.quickLinks}</h5>
              <ul className="space-y-4 text-sm text-white font-body">
                <li><a className="hover:text-tertiary-fixed transition-all" href="#">{t.footer.links.gps}</a></li>
                <li><a className="hover:text-tertiary-fixed transition-all" href="#">{t.footer.links.ins}</a></li>
                <li><a className="hover:text-tertiary-fixed transition-all" href="#">{t.footer.links.priv}</a></li>
              </ul>
            </div>
          </div>
          
          {/* Contact */}
          <div className="space-y-4">
            <h5 className="font-bold text-sm uppercase tracking-widest text-on-primary-container font-label">{t.footer.headOffice}</h5>
            <p className="text-sm text-white leading-relaxed font-body">
              {t.footer.address1}<br/>
              {t.footer.address2}<br/>
              {t.footer.address3}
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
    </main>
  );
}
