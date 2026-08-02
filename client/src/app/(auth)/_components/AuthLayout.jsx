"use client";

import Link from "next/link";
import { BookOpen } from "lucide-react";
import { motion } from "framer-motion";

export default function AuthLayout({ title, description, children }) {
  return (
    <section className="min-h-screen">
      <div className="grid min-h-screen lg:grid-cols-2">
        {/* this is left */}
        <div className="flex items-center justify-center p-8">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="w-full max-w-md"
          >
            <Link href="/" className="mb-10 inline-flex items-center gap-2">
              <BookOpen className="size-6" />
              <span className="text-lg font-semibold">
                Personal Book Manager
              </span>
            </Link>
            <h1 className="text-4xl font-bold">{title}</h1>
            <p className="mt-3 text-muted-foreground">{description}</p>
            <div className="mt-8">{children}</div>
          </motion.div>
        </div>
        {/* Thius is right */}
        <div className="hidden border-l bg-muted lg:flex">
          <div className="mx-auto flex max-w-md flex-col justify-center">
            <BookOpen className="mb-8 size-20" />
            <h2 className="text-3xl font-bold">
              Build your digital bookshelf.
            </h2>
            <p className="mt-4 leading-7 text-muted-foreground">
              Keep every book organized. Track your reading journey. Rediscover
              your favorite authors.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
