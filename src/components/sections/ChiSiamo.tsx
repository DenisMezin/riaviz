"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useLocale } from '@/contexts/LocaleContext';
import { useRef } from "react"; // Added useRef import

export function ChiSiamo() {
    const { messages } = useLocale();
    const t = (key: string) => {
        const keys = key.split('.');
        let value: any = messages.chiSiamo;
        for (const k of keys) {
            value = value?.[k];
        }
        return value || key;
    };
    const targetRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["start 0.8", "start 0.25"],
    });

    const opacity = useTransform(scrollYProgress, [0, 1], [0.1, 1]);

    return (
        <section id="chi-siamo" className="relative py-24 bg-[#0B0B0B] text-white overflow-hidden">
            <div className="container mx-auto px-4 max-w-[1320px]">
                {/* Background */}
                <div
                    className="absolute inset-0 z-0 opacity-40"
                    style={{
                        backgroundImage: "radial-gradient(#333 1.5px, transparent 1.5px)",
                        backgroundSize: "24px 24px"
                    }}
                />
                {/* 1. Headline - Full Width Top */}
                <div ref={targetRef} className="mb-16 md:mb-24">
                    <motion.h2
                        style={{ opacity }}
                        className="text-4xl md:text-6xl lg:text-[70px] font-heading font-bold italic uppercase leading-[0.9] tracking-tighter"
                    >
                        Officina specializzata in <span className="text-neon">{t('headingElettron')}</span> e <span className="text-white">{t('headingMotori')}</span>
                    </motion.h2>
                </div>

                {/* 2. Content Row - Image Left, Text Right */}
                <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">

                    {/* Left: Image */}
                    <div className="w-full lg:w-1/2 relative">
                        <div className="relative w-full aspect-square md:aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-neon/5 group">
                            <Image
                                src="/images/chisiamo-poster.jpeg"
                                alt="RIAVIZ Motorsport Workshop"
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                                priority
                            />
                        </div>
                        {/* Decorative Neon */}
                        <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-neon/10 rounded-full blur-3xl" />
                    </div>

                    {/* Right: Text Description */}
                    <div className="w-full lg:w-1/2 pt-4">
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <h3 className="text-neon font-bold tracking-widest uppercase text-sm mb-8">
                                {t('title')}
                            </h3>
                            <p className="text-[#B5B5B5] text-lg md:text-xl leading-relaxed font-light">
                                {t('text1')}
                                <br /><br />
                                {t('text2')}
                            </p>
                        </motion.div>
                    </div>

                </div>
            </div>
        </section>
    );
}
