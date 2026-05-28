"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export function PremiumHeroV2() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-black">
      <Image src="/hero-palm.jpg" alt="Hero" fill priority className="object-cover opacity-40" />

      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/60 to-black" />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-6 py-24 lg:grid lg:grid-cols-2 lg:gap-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="max-w-2xl"
        >
          <div className="inline-flex rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm text-primary">
            AI Palm Intelligence
          </div>

          <h1 className="mt-8 text-5xl font-semibold leading-[0.95] text-white sm:text-6xl md:text-7xl xl:text-8xl">
            Your Palm Reveals
            <span className="block text-primary">
              Hidden Patterns.
            </span>
          </h1>

          <p className="mt-8 max-w-xl text-lg leading-8 text-white/70">
            Discover emotional tendencies and personality insights through cinematic AI palm analysis.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link href="/upload" className="rounded-full bg-primary px-8 py-4 text-primary-foreground">
              Upload Your Palm
            </Link>

            <Link href="/results" className="rounded-full border border-white/10 bg-white/5 px-8 py-4 text-white">
              Continue Reading
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2 }}
          className="relative mx-auto mt-20 hidden aspect-[0.72] w-full max-w-[440px] lg:block"
        >
          <div className="absolute inset-0 rounded-[2.5rem] border border-white/10 bg-white/[0.03] backdrop-blur-2xl" />

          <div className="absolute inset-6 overflow-hidden rounded-[2rem]">
            <Image src="/hero-palm.jpg" alt="Palm" fill className="object-cover opacity-80" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
