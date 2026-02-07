"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Mail, Phone } from "lucide-react";

export function CTABlock() {
    return (
        <section className="py-16 bg-[#0B0B0B] relative">
            {/* Subtle texture overlay */}
            <div
                className="absolute inset-0 opacity-20 pointer-events-none"
                style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/carbon-fibre.png')" }}
            />

            <div className="container mx-auto px-4 relative z-10 text-center max-w-[1320px]">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-2xl md:text-[28px] font-bold mb-8 uppercase"
                >
                    Pronto a trasformare la tua auto?
                </motion.h2>

                <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-8">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <Link
                            href="#contact"
                            className="inline-flex items-center justify-center h-[48px] w-[200px] bg-neon text-black font-bold text-sm rounded-[3px] hover:bg-neon-hover transition-all uppercase tracking-wider"
                        >
                            Inizia il progetto
                        </Link>
                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="flex flex-col md:flex-row items-center justify-center gap-6 text-sm text-light-grey"
                >
                    <span className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer">
                        <Phone className="w-4 h-4 text-neon" /> +39 000 000 0000
                    </span>
                    <span className="hidden md:inline text-white/20">|</span>
                    <span className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer">
                        <Mail className="w-4 h-4 text-neon" /> riavizluca@gmail.com
                    </span>
                </motion.div>
            </div>
        </section>
    );
}
