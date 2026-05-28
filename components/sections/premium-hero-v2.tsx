"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export function PremiumHeroV2() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-black">
      <Image src="/hero-palm.jpg" alt="Hero" fill priority className="object-cover opacity-40 scale-105" />

      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/60 to-black" />

      <motion.div
        animate={{
          opacity: [0.25, 0.55, 0.25],
          scale: [1, 1.08, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute left-1/2 top-1/2 h-[550px] w-[550px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400/10 blur-3xl"
      />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-6 py-24 lg:grid lg:grid-cols-2 lg:gap-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="max-w-2xl"
        >
          <div className="inline-flex rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm text-primary backdrop-blur-xl">
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
            <Link href="/upload" className="rounded-full bg-primary px-8 py-4 text-primary-foreground shadow-2xl transition hover:scale-[1.02]">
              Upload Your Palm
            </Link>

            <Link href="/results" className="rounded-full border border-white/10 bg-white/5 px-8 py-4 text-white backdrop-blur-xl transition hover:bg-white/10">
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

            <svg
              viewBox="0 0 400 700"
              className="absolute inset-0 h-full w-full"
            >
              {[
                "M110 170 C180 120, 250 120, 310 180",
                "M100 260 C170 220, 240 220, 320 270",
                "M160 90 C130 240, 145 420, 200 580",
                "M240 130 C200 260, 185 410, 210 560",
              ].map((path, index) => (
                <motion.path
                  key={index}
                  d={path}
                  fill="none"
                  stroke={index === 3 ? "#67e8f9" : "#facc15"}
                  strokeWidth={index === 3 ? 3 : 4}
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0.2 }}
                  animate={{
                    pathLength: [0.2, 1, 0.4],
                    opacity: [0.2, 1, 0.3],
                  }}
                  transition={{
                    duration: 4 + index,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: index * 0.4,
                  }}
                  style={{
                    filter: "drop-shadow(0 0 10px rgba(103,232,249,0.9))",
                  }}
                />
              ))}
            </svg>

            <motion.div
              animate={{ y: [-200, 420, -200] }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute left-0 right-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-300 to-transparent blur-[1px]"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
