"use client";

import Link from "next/link";
import Image from "next/image";
import { Facebook, Instagram, Linkedin } from "lucide-react";
import { useLocale } from '@/contexts/LocaleContext';

export function Footer() {
    const { messages } = useLocale();
    const t = (key: string) => {
        const keys = key.split('.');
        let value: any = messages;
        for (const k of keys) {
            value = value?.[k];
        }
        return value || key;
    };

    return (
        <footer id="contact" className="bg-charcoal border-t border-white/10 pt-16 pb-8">
            <div className="container mx-auto px-4 max-w-[1320px]">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    {/* Brand */}
                    <div className="col-span-1 md:col-span-1">
                        <Link href="/" className="block mb-6">
                            <Image
                                src="/riaviz.ico"
                                alt="Riaviz Motorsport"
                                width={180}
                                height={40}
                                className="h-10 w-auto object-contain"
                            />
                        </Link>
                        <p className="text-light-grey text-sm leading-relaxed">
                            Opatje selo 43, 5291 Miren, Slovenia<br />
                            riavizluca@gmail.com<br />
                            +39 393 406 2502
                        </p>
                    </div>

                    {/* Navigation */}
                    <div>
                        <h4 className="text-white font-bold mb-6">MENU</h4>
                        <ul className="space-y-4">
                            <li><Link href="#hero" className="text-light-grey hover:text-neon transition-colors text-sm">{t('header.home')}</Link></li>
                            <li><Link href="#chi-siamo" className="text-light-grey hover:text-neon transition-colors text-sm">{t('header.whoWeAre')}</Link></li>
                            <li><Link href="#servizi" className="text-light-grey hover:text-neon transition-colors text-sm">{t('header.services')}</Link></li>
                            <li><Link href="#metodo" className="text-light-grey hover:text-neon transition-colors text-sm">{t('header.results')}</Link></li>
                            <li><Link href="#contact" className="text-light-grey hover:text-neon transition-colors text-sm">{t('header.contact')}</Link></li>
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h4 className="text-white font-bold mb-6">SERVIZI</h4>
                        <ul className="space-y-4">
                            <li><Link href="#servizi" className="text-light-grey hover:text-neon transition-colors text-sm">Manutenzione</Link></li>
                            <li><Link href="#servizi" className="text-light-grey hover:text-neon transition-colors text-sm">Software</Link></li>
                            <li><Link href="#servizi" className="text-light-grey hover:text-neon transition-colors text-sm">Chiavi</Link></li>
                            <li><Link href="#servizi" className="text-light-grey hover:text-neon transition-colors text-sm">Banco Prova</Link></li>
                        </ul>
                    </div>

                    {/* Social */}
                    <div>
                        <h4 className="text-white font-bold mb-6">SOCIAL</h4>
                        <div className="flex gap-4">
                            <Link href="https://www.instagram.com/riaviz_motorsport" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-neon hover:text-black transition-all">
                                <Instagram size={20} />
                            </Link>
                            <Link href="https://www.facebook.com/profile.php?id=61581759428197#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-neon hover:text-black transition-all">
                                <Facebook size={20} />
                            </Link>

                        </div>
                    </div>
                </div>

                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-white/40 text-xs">
                        © {new Date().getFullYear()} Riaviz Motorsport. All rights reserved.
                    </p>
                    <div className="flex gap-6">
                        <Link href="#" className="text-white/40 text-xs hover:text-white">Privacy Policy</Link>
                        <Link href="#" className="text-white/40 text-xs hover:text-white">Cookie Policy</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
