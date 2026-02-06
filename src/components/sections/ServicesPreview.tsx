"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Info } from "lucide-react";
import { TiltCard } from "@/components/ui/TiltCard";
import { useLocale } from '@/contexts/LocaleContext';

export function ServicesPreview() {
    const { messages } = useLocale();
    const t = (key: string) => {
        const keys = key.split('.');
        let value: any = messages.services;
        for (const k of keys) {
            value = value?.[k];
        }
        return value || key;
    };
    const [activeId, setActiveId] = useState<number | null>(null);

    const services = [
        {
            id: 1,
            title: t('maintenance.title'),
            image: "/images/motor.jpeg",
            detailImage: "/images/tagliando.webp",
            description: t('maintenance.description')
        },
        {
            id: 2,
            title: t('software.title'),
            image: "/images/software.jpeg",
            detailImage: "/images/mappe.webp",
            description: t('software.description')
        },
        {
            id: 3,
            title: t('keys.title'),
            image: "/images/taglio.jpeg",
            detailImage: "/images/chiavi.png",
            description: t('keys.description')
        },
        {
            id: 4,
            title: t('dyno.title'),
            image: "/images/4x4.jpeg",
            detailImage: "/images/bancoprova1.webp",
            description: t('dyno.description')
        },
    ];

    return (
        <section id="servizi" className="relative py-24 overflow-hidden bg-[#0B0B0B]">
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

            <div className="container mx-auto px-4 max-w-[1320px] relative z-10 transition-all duration-500">
                {/* Section Title */}
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-heading font-bold italic uppercase tracking-wider text-white mb-6">
                        {t('heading1')} <span className="text-neon">{t('heading2')}</span> {t('heading3')} <span className="text-white">{t('heading4')}</span>
                    </h2>

                    <div className="flex items-center justify-center gap-2 mt-2 opacity-80 group-hover:opacity-100 transition-all duration-300 translate-y-0 group-hover:translate-y-1">
                        <Info className="w-4 h-4 text-neon" />
                        <p className="text-neon text-[15px] md:text-l font-bold uppercase tracking-widest">
                            {t('clickInfo')}
                        </p>
                    </div>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
                    {services.map((service) => (
                        <div
                            key={service.id}
                            className={`w-full transition-all duration-500 ${activeId && activeId !== service.id ? "opacity-30 blur-[2px] scale-95" : "opacity-100 scale-100"}`}
                            onClick={() => setActiveId(activeId === service.id ? null : service.id)}
                        >
                            {/* Standard Card (Desktop: Always visible. Mobile: Hidden if active) */}
                            <div className={activeId === service.id ? "hidden md:block" : "block"}>
                                <TiltCard
                                    title={service.title}
                                    image={service.image}
                                    className="w-full h-[360px]"
                                />
                            </div>

                            {/* Mobile In-Place Active State */}
                            {activeId === service.id && (
                                <motion.div
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="md:hidden flex flex-col p-6 bg-[#141414] border border-white/10 rounded-xl shadow-lg relative z-10"
                                >
                                    {/* Full Width Description */}
                                    <div className="flex flex-col justify-center">
                                        <h3 className="text-neon font-bold uppercase text-lg mb-4 leading-tight tracking-wider">{service.title}</h3>
                                        <p className="text-[#D1D1D1] text-base leading-relaxed">{service.description}</p>
                                    </div>
                                </motion.div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Dropdown Detail Section (Full Width - Desktop Only) */}
                <AnimatePresence>
                    {activeId && (
                        <motion.div
                            initial={{ opacity: 0, height: 0, marginTop: 0 }}
                            animate={{ opacity: 1, height: "auto", marginTop: 40 }}
                            exit={{ opacity: 0, height: 0, marginTop: 0 }}
                            transition={{ duration: 0.5, ease: "easeInOut" }}
                            className="w-full overflow-hidden hidden md:block"
                        >
                            {services.map((service) => (
                                service.id === activeId && (
                                    <div key={service.id} className="relative w-full bg-[#141414] border border-white/10 rounded-2xl p-8 md:p-12 flex flex-col md:flex-row gap-12 items-center shadow-2xl shadow-neon/10">
                                        {/* Text Content */}
                                        <div className="md:w-1/2">
                                            <h3 className="text-3xl font-heading font-bold text-neon mb-6 uppercase italic">
                                                {service.title}
                                            </h3>
                                            <p className="text-[#D1D1D1] text-lg leading-relaxed font-light">
                                                {service.description}
                                            </p>
                                        </div>

                                        {/* Image Box */}
                                        <div className="md:w-1/2 w-full h-[300px] md:h-[400px] relative rounded-xl overflow-hidden border border-white/20">
                                            <div
                                                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-110"
                                                style={{ backgroundImage: `url(${service.detailImage})` }}
                                            />
                                        </div>
                                    </div>
                                )
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
}
