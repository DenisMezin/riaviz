"use client";

import { motion } from "framer-motion";
import { MapPin, Mail, Phone, Clock } from "lucide-react";
import { useLocale } from '@/contexts/LocaleContext';

export function ContactSection() {
    const { messages } = useLocale();
    const t = (key: string) => (messages.contact as any)[key];
    return (
        <section id="contact" className="py-24 bg-[#0B0B0B] text-white relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-neon/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="container mx-auto px-4 max-w-[1320px] relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-16 text-center"
                >
                    <h2 className="text-4xl md:text-5xl font-heading font-bold italic uppercase tracking-tighter mb-4">
                        {t('title1')} <span className="text-neon">{t('title2')}</span>
                    </h2>
                    <p className="text-light-grey text-lg max-w-2xl mx-auto">
                        {t('subtitle')}
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-stretch">

                    {/* Left: Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="flex flex-col justify-center gap-10"
                    >
                        {/* Address */}
                        <div className="flex items-start gap-6 group">
                            <div className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0 group-hover:bg-neon group-hover:text-black transition-colors">
                                <MapPin size={24} />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold uppercase mb-2 tracking-wide">{t('address')}</h3>
                                <p className="text-[#D1D1D1] leading-relaxed text-lg">
                                    Opatje selo 43<br />
                                    5291 Miren, Slovenia
                                </p>
                            </div>
                        </div>

                        {/* Phone */}
                        <div className="flex items-start gap-6 group">
                            <div className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0 group-hover:bg-neon group-hover:text-black transition-colors">
                                <Phone size={24} />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold uppercase mb-2 tracking-wide">{t('phone')}</h3>
                                <p className="text-[#D1D1D1] leading-relaxed text-lg font-mono">
                                    <a href="tel:+393934062502" className="hover:text-neon transition-colors">
                                        +39 393 406 2502
                                    </a>
                                </p>
                            </div>
                        </div>


                        {/* Mail */}
                        <div className="flex items-start gap-6 group">
                            <div className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0 group-hover:bg-neon group-hover:text-black transition-colors">
                                <Mail size={24} />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold uppercase mb-2 tracking-wide">Email</h3>
                                <p className="text-[#D1D1D1] leading-relaxed text-lg">
                                    <a href="mailto:riavizluca@gmail.com" className="hover:text-neon transition-colors">
                                        riavizluca@gmail.com
                                    </a>
                                </p>
                            </div>
                        </div>

                        {/* Hours */}
                        <div className="flex items-start gap-6 group">
                            <div className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0 group-hover:bg-neon group-hover:text-black transition-colors">
                                <Clock size={24} />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold uppercase mb-2 tracking-wide">{t('hours')}</h3>
                                <div className="text-[#D1D1D1] leading-relaxed text-base font-light space-y-1">
                                    <div className="flex justify-between gap-8"><span className="w-24 font-medium">{t('monday')}:</span> <span>08:30–18:00</span></div>
                                    <div className="flex justify-between gap-8"><span className="w-24 font-medium">{t('tuesday')}:</span> <span>08:30–18:00</span></div>
                                    <div className="flex justify-between gap-8"><span className="w-24 font-medium">{t('wednesday')}:</span> <span>08:30–18:00</span></div>
                                    <div className="flex justify-between gap-8"><span className="w-24 font-medium">{t('thursday')}:</span> <span>08:30–18:00</span></div>
                                    <div className="flex justify-between gap-8"><span className="w-24 font-medium">{t('friday')}:</span> <span>08:30–18:00</span></div>
                                    <div className="flex justify-between gap-8"><span className="w-24 font-medium">{t('saturday')}:</span> <span className="text-neon font-bold">{t('closed')}</span></div>
                                    <div className="flex justify-between gap-8"><span className="w-24 font-medium">{t('sunday')}:</span> <span className="text-neon font-bold">{t('closed')}</span></div>
                                </div>
                            </div>
                        </div>

                    </motion.div>

                    {/* Right: Map */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 }}
                        className="h-[400px] lg:h-auto min-h-[400px] rounded-2xl overflow-hidden border border-white/10 shadow-2xl relative"
                    >
                        <iframe
                            src="https://maps.google.com/maps?q=Opatje+selo+43,5291+Miren,Slovenia&t=&z=15&ie=UTF8&iwloc=&output=embed"
                            width="100%"
                            height="100%"
                            style={{ border: 1 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            className="absolute inset-0"
                        />
                        {/* Overlay to darken map slightly for theme consistency if needed, but grayscale invert usually looks cool/dark map like */}
                        {/* Using CSS filter on iframe for 'Dark Mode Map' effect (invert 100% makes light map dark) */}
                    </motion.div>

                </div>
            </div>
        </section >
    );
}
