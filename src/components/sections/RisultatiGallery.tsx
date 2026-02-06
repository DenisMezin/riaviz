"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useLocale } from '@/contexts/LocaleContext';

export function RisultatiGallery() {
    const { messages } = useLocale();
    const t = (key: string) => (messages.risultati as any)[key];
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    const images = [
        // Riga 1: 3 foto verticali
        { id: 1, src: "/risultati/foto1.jpeg", aspectRatio: "9/9", gridSpan: "" },
        { id: 2, src: "/risultati/foto2.jpeg", aspectRatio: "9/9", gridSpan: "" },
        { id: 3, src: "/risultati/foto3.jpeg", aspectRatio: "9/9", gridSpan: "" },

        // Riga 2: 1 foto orizzontale (span 2) + 1 verticale
        { id: 4, src: "/risultati/foto9.jpeg", aspectRatio: "18/9", gridSpan: "lg:col-span-2" },
        { id: 5, src: "/risultati/foto4.jpeg", aspectRatio: "9/9", gridSpan: "" },

        // Riga 3: 3 foto verticali
        { id: 6, src: "/risultati/foto5.jpeg", aspectRatio: "9/9", gridSpan: "" },
        { id: 7, src: "/risultati/foto6.jpeg", aspectRatio: "9/9", gridSpan: "" },
        { id: 8, src: "/risultati/foto7.jpeg", aspectRatio: "9/9", gridSpan: "" },

        // Riga 4: 1 verticale + 1 foto orizzontale (span 2)
        { id: 9, src: "/risultati/foto8.jpeg", aspectRatio: "9/9", gridSpan: "" },
        { id: 10, src: "/risultati/foto10.jpeg", aspectRatio: "18/9", gridSpan: "lg:col-span-2" },
    ];

    return (
        <section id="risultati" className="relative py-16 overflow-hidden bg-[#0B0B0B]">
            {/* Background */}
            <div
                className="absolute inset-0 z-0 opacity-40"
                style={{
                    backgroundImage: "radial-gradient(#333 1.5px, transparent 1.5px)",
                    backgroundSize: "24px 24px"
                }}
            />
            {/* Spotlight */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-[1000px] bg-[radial-gradient(circle_at_center,rgba(154,214,0,0.08),transparent_70%)] pointer-events-none z-0" />

            <div className="container mx-auto px-4 max-w-[1100px] relative z-10">
                {/* Section Title */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-heading font-bold italic uppercase tracking-wider text-white mb-4">
                        {t('title1')} <span className="text-neon">{t('title2')}</span>
                    </h2>
                    <p className="text-[#D1D1D1] text-lg max-w-2xl mx-auto">
                        {t('subtitle')}
                    </p>
                </div>

                {/* Custom 4-Row Grid Layout */}
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-2">
                    {images.map((image, index) => (
                        <motion.div
                            key={image.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.05 }}
                            className={`${image.gridSpan} aspect-square lg:!aspect-[var(--aspect)] relative group cursor-pointer overflow-hidden rounded-xl border border-white/10 hover:border-neon/50 transition-all duration-300`}
                            style={{
                                // @ts-ignore
                                "--aspect": image.aspectRatio
                            }}
                            onClick={() => setSelectedImage(image.src)}
                        >
                            {/* Image with lazy loading */}
                            <img
                                src={image.src}
                                alt={`Risultato ${image.id}`}
                                loading="lazy"
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />

                            {/* Overlay on Hover */}
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300" />

                            {/* Neon Glow Effect */}
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                                <div className="absolute inset-0 bg-gradient-to-t from-neon/20 to-transparent" />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Lightbox Modal */}
            {selectedImage && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
                    onClick={() => setSelectedImage(null)}
                >
                    <motion.div
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        className="relative max-w-5xl max-h-[90vh] w-full"
                    >
                        <img
                            src={selectedImage}
                            alt="Risultato"
                            className="w-full h-full object-contain rounded-lg"
                        />
                        <button
                            className="absolute top-4 right-4 text-white bg-black/50 hover:bg-neon/20 rounded-full p-3 transition-all"
                            onClick={() => setSelectedImage(null)}
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </motion.div>
                </motion.div>
            )}
        </section>
    );
}
