"use client";

import { motion } from "framer-motion";
import { ArrowRight, Truck, Star } from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#1A365D] text-white py-24 sm:py-32">
      <div className="absolute inset-0 bg-black/10 mix-blend-overlay"></div>
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#D69E2E] rounded-full mix-blend-multiply filter blur-[100px] opacity-30"></div>
      <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-[#D69E2E] rounded-full mix-blend-multiply filter blur-[100px] opacity-30"></div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8 z-10">
        <div className="mx-auto max-w-2xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8 flex justify-center"
          >
            <span className="relative rounded-full px-3 py-1 text-sm leading-6 text-[#D69E2E] ring-1 ring-[#D69E2E]/50 hover:ring-[#D69E2E]">
              Phuket&#39;s Most Trusted Logistics Partner
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl font-bold tracking-tight text-white sm:text-6xl"
          >
            Premium Moving Services in <span className="text-[#D69E2E]">Phuket</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-6 text-lg leading-8 text-gray-300"
          >
            Whether you&apos;re moving homes, transporting your motorcycle, or needing inter-provincial logistics, MG Moving delivers excellence and peace of mind every step of the way.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-10 flex items-center justify-center gap-x-6"
          >
            <a
              href="#book"
              className="rounded-full bg-[#D69E2E] px-8 py-4 text-sm font-semibold text-[#1A365D] shadow-sm hover:bg-[#c28f28] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D69E2E] transition-all flex items-center gap-2 group"
            >
              Book a Premium Experience
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a href="#services" className="text-sm font-semibold leading-6 text-white hover:text-gray-300 flex items-center gap-2">
              Our Services <Truck className="h-4 w-4" />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
