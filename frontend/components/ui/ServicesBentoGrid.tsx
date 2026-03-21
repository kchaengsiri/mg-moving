"use client";

import { motion } from "framer-motion";
import { Home, Bike, MapPin, Package, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const services = [
  {
    title: "House & Condo Moving",
    description: "Full-service residential moving. We handle your furniture and belongings with the utmost care, ensuring a seamless transition to your new home.",
    icon: Home,
    className: "md:col-span-2 md:row-span-2 bg-white text-[#1A365D] border border-gray-100",
    iconClassName: "text-[#D69E2E] bg-[#D69E2E]/10 p-4 rounded-2xl",
  },
  {
    title: "Motorcycle Transport",
    description: "Specialized, secure transport for your motorcycle. Safely tied down in our closed-body trucks.",
    icon: Bike,
    className: "md:col-span-1 md:row-span-1 bg-[#1A365D] text-white",
    iconClassName: "text-white bg-white/10 p-3 rounded-xl",
  },
  {
    title: "Local Delivery",
    description: "Fast and reliable point-to-point delivery within Phuket. Perfect for businesses and individuals.",
    icon: Package,
    className: "md:col-span-1 md:row-span-1 bg-white text-[#1A365D] border border-gray-100",
    iconClassName: "text-[#1A365D] bg-[#1A365D]/10 p-3 rounded-xl",
  },
  {
    title: "Inter-provincial Transport",
    description: "Reliable logistics from Phuket to Phang Nga, Krabi, Bangkok, and beyond.",
    icon: MapPin,
    className: "md:col-span-2 md:row-span-1 bg-gradient-to-r from-[#1A365D] to-[#2a5089] text-white",
    iconClassName: "text-[#D69E2E] bg-[#D69E2E]/10 p-3 rounded-xl",
  },
];

export function ServicesBentoGrid() {
  return (
    <section id="services" className="py-24 bg-[#F7FAFC] sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-base font-semibold leading-7 text-[#D69E2E]">Comprehensive Logistics</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-[#1A365D] sm:text-4xl">
            Everything you need for a smooth move
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-3 gap-6 auto-rows-[220px]">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={cn(
                "rounded-3xl p-8 flex flex-col justify-between group overflow-hidden relative shadow-sm hover:shadow-md transition-shadow",
                service.className
              )}
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className={cn("w-fit", service.iconClassName)}>
                    <service.icon className="h-6 w-6" />
                  </div>
                  <ArrowRight className={cn(
                    "h-6 w-6 opacity-0 -translate-x-4 transition-all group-hover:opacity-100 group-hover:translate-x-0",
                    service.className.includes("text-white") ? "text-white" : "text-[#1A365D]"
                  )} />
                </div>
                <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                <p className={cn(
                  "text-base leading-relaxed",
                  service.className.includes("text-white") ? "text-gray-300" : "text-gray-600"
                )}>
                  {service.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
