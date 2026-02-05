"use client";

import { motion } from "framer-motion";
import { Search, Wrench, ShieldCheck, Flag } from "lucide-react";
import { useLocale } from '@/contexts/LocaleContext';

export function MethodRiaviz() {
    const { messages } = useLocale();
    const t = (key: string) => (messages.method as any)[key];

    const steps = [
        { id: 1, title: t('step1'), icon: Search },
        { id: 2, title: t('step2'), icon: Wrench },
        { id: 3, title: t('step3'), icon: ShieldCheck },
        { id: 4, title: t('step4'), icon: Flag },
    ];
    return (
        <section id="risultati" className="relative py-24 bg-[#0B0B0B] text-white overflow-hidden bg-gradient-to-r from-[#0B0B0B] via-[#141414] to-[#0B0B0B]">
            {/* Decorative neon line */}
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-neon/20 to-transparent" />

            <div className="container mx-auto px-4 text-center max-w-[1320px]">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-3xl md:text-[32px] font-bold mb-4"
                >
                    {t('title1')} <span className="text-neon">{t('title2')}</span>
                </motion.h2>

                <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="h-[2px] w-[120px] bg-neon mx-auto mb-16"
                />

                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
                    {steps.map((step, index) => (
                        <motion.div
                            key={step.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.15 }}
                            className="flex flex-col items-center group cursor-default"
                        >
                            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full border border-white/10 flex items-center justify-center mb-6 group-hover:border-neon transition-colors duration-300 bg-[#0B0B0B]">
                                <step.icon className="w-8 h-8 md:w-10 md:h-10 text-white group-hover:text-neon transition-colors duration-300" strokeWidth={1.5} />
                            </div>
                            <h3 className="text-sm md:text-base font-bold tracking-widest text-light-grey group-hover:text-white transition-colors">
                                {step.title}
                            </h3>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
