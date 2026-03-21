"use client";

import Image from "next/image";
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
  Mail
} from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Top Navigation Bar */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 dark:bg-slate-900/80 glass-nav h-20">
        <div className="flex justify-between items-center max-w-7xl mx-auto px-6 h-full">
          <div className="text-2xl font-black tracking-tighter text-[#1A365D] dark:text-white font-headline">
            MG Moving
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <a className="font-headline tracking-tight text-sm font-semibold uppercase text-tertiary-fixed-dim" href="#">Home</a>
            <a className="font-headline tracking-tight text-sm font-semibold uppercase text-slate-600 dark:text-slate-300 hover:text-primary transition-colors" href="#">Our Services</a>
            <a className="font-headline tracking-tight text-sm font-semibold uppercase text-slate-600 dark:text-slate-300 hover:text-primary transition-colors" href="#">MG Moving Fleet</a>
            <a className="font-headline tracking-tight text-sm font-semibold uppercase text-slate-600 dark:text-slate-300 hover:text-primary transition-colors" href="#">Why Choose MG Moving</a>
            <a className="font-headline tracking-tight text-sm font-semibold uppercase text-slate-600 dark:text-slate-300 hover:text-primary transition-colors" href="#">Contact Us</a>
          </div>
          <button className="bg-tertiary-fixed text-on-tertiary-fixed px-6 py-3 rounded-md font-semibold text-sm hover:opacity-90 transition-all duration-300 active:scale-95 gold-glow uppercase tracking-wider">
            Get a Premium Quote
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative pt-32 pb-20 md:pt-48 md:pb-32 hero-gradient overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10 grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <span className="inline-block text-tertiary-fixed-dim font-bold tracking-[0.2em] uppercase text-xs font-label">Phuket's Elite Logistics</span>
            <h1 className="font-headline text-5xl md:text-7xl font-extrabold text-white leading-[1.1] tracking-tight">
              Safe, Secure, &amp; <span className="text-tertiary-fixed">Premium</span> Moving in Phuket
            </h1>
            <p className="text-on-primary-container text-lg md:text-xl max-w-lg font-light leading-relaxed font-body">
              A premium moving experience tailored for you. From high-end villas to corporate offices, we handle your world with precision and white-glove care.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              {/* Primary Button */}
              <button className="bg-tertiary-fixed text-on-tertiary-fixed px-8 py-4 rounded-md font-bold font-body text-base hover:opacity-90 transition-all duration-300 active:scale-95 gold-glow shadow-lg shadow-black/10">
                Book a Premium Moving Experience
              </button>
              {/* Secondary Button */}
              <button className="bg-surface-container-highest text-primary px-8 py-4 rounded-md font-bold font-body text-base hover:bg-surface-container-high transition-all duration-300">
                View Our Fleet
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
                  <p className="text-sm font-bold text-primary font-headline">Fully Insured</p>
                  <p className="text-xs text-on-secondary-container font-label uppercase tracking-wider">Peace of mind guaranteed</p>
                </div>
              </div>
              <p className="text-sm text-secondary italic font-body">"The team handled our antiques with incredible care. Truly elite service."</p>
            </div>
          </div>
        </div>
        {/* Abstract Background Detail */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/20 skew-x-12 transform translate-x-32 pointer-events-none"></div>
      </header>

      {/* Services Section: Bento Grid */}
      <section className="py-24 bg-surface">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16">
            <span className="text-on-tertiary-container font-label font-bold tracking-[0.05em] uppercase text-xs mb-2 block">Comprehensive Solutions</span>
            <h2 className="font-headline text-4xl md:text-5xl font-extrabold text-primary tracking-tight">Our Premium Services</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-6 h-auto md:h-[600px]">
            {/* Major Card */}
            <div className="md:col-span-2 md:row-span-2 bg-surface-container-lowest rounded-xl p-8 flex flex-col justify-between group shadow-[0_4px_20px_rgba(24,28,30,0.03)] hover:shadow-[0_12px_40px_rgba(24,28,30,0.06)] transition-all duration-300">
              <div>
                <div className="w-14 h-14 bg-primary-container rounded-lg flex items-center justify-center text-tertiary-fixed mb-6 group-hover:scale-110 transition-transform">
                  <Building2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-primary mb-4 font-headline">House, Office &amp; Condo Moving</h3>
                <p className="text-secondary font-body leading-relaxed">End-to-end relocation services. From careful furniture disassembly to strategic office setup, our white-glove team manages every detail so you don't have to.</p>
              </div>
              <div className="mt-8 overflow-hidden rounded-lg h-48">
                <Image 
                  src="https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?q=80&w=1470&auto=format&fit=crop" 
                  alt="Professional movers carefully wrapping expensive furniture" 
                  width={800}
                  height={400}
                  className="w-full h-full object-cover rounded-md" 
                />
              </div>
            </div>
            
            {/* Horizontal Card */}
            <div className="md:col-span-2 bg-primary-container rounded-xl p-8 flex items-center gap-8 text-white group">
              <div className="flex-1">
                <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center text-tertiary-fixed mb-4">
                  <Truck className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-2 font-headline">Inter-provincial Transport</h3>
                <p className="text-on-primary-container font-body text-sm leading-relaxed">Dedicated logistics routes between Phuket and Bangkok. Scheduled weekly departures with full cargo tracking.</p>
              </div>
              <div className="w-1/3 hidden lg:block overflow-hidden rounded-lg">
                <Image 
                  src="https://images.unsplash.com/photo-1519003722824-194d4455a60c?q=80&w=1475&auto=format&fit=crop" 
                  alt="Logistics truck driving on a highway at sunset" 
                  width={400}
                  height={300}
                  className="w-full h-full object-cover rounded-md" 
                />
              </div>
            </div>

            {/* Square Card 1 */}
            <div className="bg-surface-container-high rounded-xl p-8 flex flex-col justify-between group">
              <div>
                <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center text-tertiary-fixed mb-4">
                  <Bike className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-primary mb-2 font-headline">Motorcycle Transport</h3>
                <p className="text-secondary font-body text-sm">Specialized ramps and securing systems for premium bikes and scooters.</p>
              </div>
              <a className="text-primary font-bold font-body text-sm flex items-center gap-2 group-hover:translate-x-1 transition-transform" href="#">
                Learn more <ArrowRight className="w-4 h-4 ml-1" />
              </a>
            </div>

            {/* Square Card 2 */}
            <div className="bg-surface-container-high rounded-xl p-8 flex flex-col justify-between group">
              <div>
                <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center text-tertiary-fixed mb-4">
                  <MapPin className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-primary mb-2 font-headline">Local Delivery</h3>
                <p className="text-secondary font-body text-sm">Prompt, reliable delivery services within Phuket for retail or private items.</p>
              </div>
              <a className="text-primary font-bold font-body text-sm flex items-center gap-2 group-hover:translate-x-1 transition-transform" href="#">
                Request quote <ArrowRight className="w-4 h-4 ml-1" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us: Tonal Layering */}
      <section className="py-24 bg-surface-container-low">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="aspect-square bg-surface-container-highest rounded-xl overflow-hidden shadow-sm">
                <Image 
                  src="https://images.unsplash.com/photo-1586528116311-ad8ed7c83a7f?q=80&w=1470&auto=format&fit=crop" 
                  alt="A clean warehouse facility with organized logistics equipment" 
                  width={800}
                  height={800}
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 rounded-md" 
                />
              </div>
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-tertiary-fixed-dim rounded-lg -z-10"></div>
            </div>
            <div className="space-y-8">
              <div>
                <span className="text-on-tertiary-container font-label font-bold tracking-[0.05em] uppercase text-xs mb-2 block">The MG Difference</span>
                <h2 className="font-headline text-4xl md:text-5xl font-extrabold text-primary tracking-tight">Why Choose MG Moving</h2>
              </div>
              <div className="space-y-6">
                <div className="flex gap-4 p-6 bg-surface-container-lowest rounded-lg shadow-[0_12px_40px_rgba(24,28,30,0.06)]">
                  <div className="text-[#D69E2E]">
                    <Award className="w-8 h-8" />
                  </div>
                  <div>
                    <h4 className="font-bold text-primary font-headline mb-1">Experienced Staff</h4>
                    <p className="text-sm text-secondary font-body">Our crew is professionally trained in white-glove handling and logistical precision.</p>
                  </div>
                </div>
                
                <div className="flex gap-4 p-6 bg-surface-container-lowest rounded-lg shadow-[0_12px_40px_rgba(24,28,30,0.06)]">
                  <div className="text-[#D69E2E]">
                    <Navigation className="w-8 h-8" />
                  </div>
                  <div>
                    <h4 className="font-bold text-primary font-headline mb-1">GPS Tracking</h4>
                    <p className="text-sm text-secondary font-body">Monitor your shipment in real-time. Full transparency from pickup to final delivery.</p>
                  </div>
                </div>
                
                <div className="flex gap-4 p-6 bg-surface-container-lowest rounded-lg shadow-[0_12px_40px_rgba(24,28,30,0.06)]">
                  <div className="text-[#D69E2E]">
                    <Sparkles className="w-8 h-8" />
                  </div>
                  <div>
                    <h4 className="font-bold text-primary font-headline mb-1">White-glove Service</h4>
                    <p className="text-sm text-secondary font-body">Premium packing materials and meticulous attention to detail for fragile items.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Fleet Showcase */}
      <section className="py-24 bg-surface">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-headline text-4xl md:text-5xl font-extrabold text-primary tracking-tight mb-4">The MG Moving Fleet</h2>
            <p className="text-secondary max-w-2xl mx-auto font-body">Modern, climate-controlled, and immaculately maintained vehicles designed for safe transport in Thailand's tropical climate.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Fleet Item */}
            <div className="bg-surface-container-lowest rounded-xl overflow-hidden group shadow-[0_4px_20px_rgba(24,28,30,0.03)] hover:shadow-[0_12px_40px_rgba(24,28,30,0.06)] transition-all">
              <div className="aspect-video overflow-hidden">
                <Image 
                  src="https://images.unsplash.com/photo-1621250552762-c38d1aefeadd?q=80&w=1470&auto=format&fit=crop" 
                  alt="A clean white professional moving truck parked in Phuket" 
                  width={600}
                  height={400}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 rounded-md" 
                />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-headline font-bold text-lg text-primary">6-Wheel Box Truck</h3>
                  <span className="text-[10px] bg-surface-container px-2 py-1 rounded-full text-secondary font-label uppercase tracking-wider">Heavy Load</span>
                </div>
                <p className="text-sm text-secondary mb-4 font-body">Perfect for full villa moves and commercial office relocations. Climate ventilation equipped.</p>
                <div className="flex items-center gap-2 text-primary text-xs font-label uppercase tracking-widest">
                  <CheckCircle2 className="w-4 h-4" /> Verified Safe
                </div>
              </div>
            </div>
            
            {/* Fleet Item */}
            <div className="bg-surface-container-low rounded-xl overflow-hidden group shadow-[0_4px_20px_rgba(24,28,30,0.03)] hover:shadow-[0_12px_40px_rgba(24,28,30,0.06)] transition-all">
              <div className="aspect-video overflow-hidden">
                <Image 
                  src="https://images.unsplash.com/photo-1519003722824-194d4455a60c?q=80&w=1475&auto=format&fit=crop" 
                  alt="Inside of a clean moving truck with cargo securing rails" 
                  width={600}
                  height={400}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 rounded-md" 
                />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-headline font-bold text-lg text-primary">4-Wheel Closed Van</h3>
                  <span className="text-[10px] bg-tertiary-fixed px-2 py-1 rounded-full text-on-tertiary-fixed font-label uppercase tracking-wider">Most Popular</span>
                </div>
                <p className="text-sm text-secondary mb-4 font-body">Ideal for condo moving and inter-provincial furniture transport to Bangkok.</p>
                <div className="flex items-center gap-2 text-primary text-xs font-label uppercase tracking-widest">
                  <CheckCircle2 className="w-4 h-4" /> Verified Safe
                </div>
              </div>
            </div>
            
            {/* Fleet Item */}
            <div className="bg-surface-container-lowest rounded-xl overflow-hidden group shadow-[0_4px_20px_rgba(24,28,30,0.03)] hover:shadow-[0_12px_40px_rgba(24,28,30,0.06)] transition-all">
              <div className="aspect-video overflow-hidden">
                <Image 
                  src="https://images.unsplash.com/photo-1558981403-c5f9899a28bc?q=80&w=1470&auto=format&fit=crop" 
                  alt="Professional logistics staff checking truck documents" 
                  width={600}
                  height={400}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 rounded-md" 
                />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-headline font-bold text-lg text-primary">Motorcycle Carrier</h3>
                  <span className="text-[10px] bg-surface-container px-2 py-1 rounded-full text-secondary font-label uppercase tracking-wider">Specialty</span>
                </div>
                <p className="text-sm text-secondary mb-4 font-body">Equipped with custom hydraulic lifts and soft-tie security straps for premium motorcycles.</p>
                <div className="flex items-center gap-2 text-primary text-xs font-label uppercase tracking-widest">
                  <CheckCircle2 className="w-4 h-4" /> Verified Safe
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary-container text-white w-full py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-7xl mx-auto px-6">
          {/* Brand & CTA */}
          <div className="space-y-6">
            <div className="text-xl font-bold text-tertiary-fixed font-headline">MG Moving</div>
            <p className="text-on-primary-container font-body text-sm leading-relaxed max-w-xs">
              Professional Logistics &amp; White-Glove Service in Phuket. We move your world with care and precision.
            </p>
            <button className="bg-tertiary-fixed text-on-tertiary-fixed px-6 py-3 rounded-md font-bold text-sm focus:ring-2 focus:ring-[#D69E2E] transition-all">
              Get a Quote Today
            </button>
          </div>
          
          {/* Links */}
          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-4">
              <h5 className="font-bold text-sm uppercase tracking-widest text-on-primary-container font-label">Services</h5>
              <ul className="space-y-4 text-sm text-white font-body">
                <li><a className="hover:text-tertiary-fixed transition-all" href="#">Residential Moving</a></li>
                <li><a className="hover:text-tertiary-fixed transition-all" href="#">Office Relocation</a></li>
                <li><a className="hover:text-tertiary-fixed transition-all" href="#">Vehicle Transport</a></li>
                <li><a className="hover:text-tertiary-fixed transition-all" href="#">Storage Solutions</a></li>
              </ul>
            </div>
            <div className="space-y-4">
              <h5 className="font-bold text-sm uppercase tracking-widest text-on-primary-container font-label">Quick Links</h5>
              <ul className="space-y-4 text-sm text-white font-body">
                <li><a className="hover:text-tertiary-fixed transition-all" href="#">GPS Tracking</a></li>
                <li><a className="hover:text-tertiary-fixed transition-all" href="#">Insurance Policy</a></li>
                <li><a className="hover:text-tertiary-fixed transition-all" href="#">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
          
          {/* Contact */}
          <div className="space-y-4">
            <h5 className="font-bold text-sm uppercase tracking-widest text-on-primary-container font-label">Head Office</h5>
            <p className="text-sm text-white leading-relaxed font-body">
              Si Sunthon Office, Phuket<br/>
              Thalang District, Phuket 83110<br/>
              Thailand
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
        
        <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 text-center md:text-left pt-6 pb-2">
          {/* Replaced border-t border-white/5 with spacing -> pt-6 */}
          <p className="text-xs text-on-primary-container font-label uppercase tracking-widest">© 2024 MG Moving Phuket. Professional Logistics &amp; White-Glove Service.</p>
        </div>
      </footer>
    </main>
  );
}
