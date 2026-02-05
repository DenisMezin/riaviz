"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useLocale } from '@/contexts/LocaleContext';

const HERO_IMAGES = [
    "/hero_gallery/gallery1.png",
    "/hero_gallery/gallery2.png",
    "/hero_gallery/gallery3.png",
    "/hero_gallery/gallery4.png",
    "/hero_gallery/gallery5.png",
    "/hero_gallery/gallery6.png",
];

export function Hero() {
    const { messages } = useLocale();
    const t = (key: string) => (messages.hero as any)[key];
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prev) => (prev + 1) % HERO_IMAGES.length);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section id="home" className="relative h-screen min-h-[600px] w-full overflow-hidden flex items-center">
            {/* Background Gallery Loop */}
            <div className="absolute inset-0 z-0 bg-black">
                <AnimatePresence mode="popLayout">
                    <motion.div
                        key={currentImageIndex}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.6 }} // Slight opacity for text readability
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1 }}
                        className="absolute inset-0"
                    >
                        <Image
                            src={HERO_IMAGES[currentImageIndex]}
                            alt="Riaviz Motorsport Hero"
                            fill
                            priority={currentImageIndex === 0}
                            className="object-cover object-center"
                            unoptimized={true}
                        />
                    </motion.div>
                </AnimatePresence>
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/90 z-10" />
            </div>

            {/* Content - Directly on top, no background styling on container */}
            <div className="container mx-auto px-4 z-10 relative max-w-[1320px]">
                <div className="max-w-[900px]">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                        className="text-white font-heading text-3xl sm:text-4xl md:text-5xl lg:text-[64px] leading-[1.1] md:leading-[1] font-bold uppercase italic tracking-tighter"
                    >
                        {t('title1')} <span className="text-neon">{t('title2')}</span> <br />
                        {t('title3')} <span className="text-neon">{t('title4')}</span> {t('title5')}
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.1 }}
                        className="mt-4 md:mt-6 text-white text-sm sm:text-base md:text-lg lg:text-xl font-medium tracking-wide uppercase max-w-[90%]"
                    >
                        {t('subtitle')}
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.2 }}
                        className="mt-6 md:mt-10"
                    >
                        <Link
                            href="#contact"
                            className="inline-flex items-center justify-center h-[48px] px-8 text-sm md:h-[56px] md:px-10 md:text-lg bg-neon text-black font-bold tracking-widest uppercase hover:bg-neon-hover transition-all transform hover:skew-x-[-10deg] skew-x-[-10deg]"
                        >
                            <span className="skew-x-[10deg]">{t('cta')}</span>
                        </Link>
                    </motion.div>
                </div>
            </div>

            {/* Progress Bars */}
            <div className="absolute bottom-10 left-0 right-0 z-30 flex justify-center gap-2 md:gap-3 px-4">
                {HERO_IMAGES.map((_, index) => (
                    <div
                        key={index}
                        className="h-[3px] md:h-[4px] flex-1 max-w-[60px] bg-white/20 rounded-full overflow-hidden relative"
                    >
                        {/* Completed State */}
                        {index < currentImageIndex && (
                            <div className="absolute inset-0 bg-neon/50" />
                        )}

                        {/* Active Progress State */}
                        {index === currentImageIndex && (
                            <motion.div
                                className="absolute inset-y-0 left-0 bg-neon shadow-[0_0_10px_rgba(154,214,0,0.8)]"
                                initial={{ width: "0%" }}
                                animate={{ width: "100%" }}
                                transition={{ duration: 4, ease: "linear" }}
                            />
                        )}
                    </div>
                ))}
            </div>
        </section>
    );
}
