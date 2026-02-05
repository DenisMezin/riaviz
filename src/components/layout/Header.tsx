"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useLocale } from '@/contexts/LocaleContext';
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { LocaleSwitcher } from "@/components/ui/LocaleSwitcher";

export function Header() {
    const { messages } = useLocale();
    const t = (key: string) => {
        const keys = key.split('.');
        let value: any = messages;
        for (const k of keys) {
            value = value?.[k];
        }
        return value || key;
    };

    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const navItems = [
        { name: t('header.home'), href: "#home" },
        { name: t('header.whoWeAre'), href: "#chi-siamo" },
        { name: t('header.services'), href: "#servizi" },
        { name: t('header.results'), href: "#risultati" },
        { name: t('header.contact'), href: "#contact" },
    ];

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300 h-[90px]",
                "bg-[#0B0B0B]/95 backdrop-blur-sm",
                isScrolled ? "shadow-lg shadow-black/50" : ""
            )}
        >
            <div className="container mx-auto px-4 h-full flex items-center justify-between max-w-[1320px]">
                {/* Logo */}
                <Link href="/" className="flex items-center hover:scale-105 transition-transform">
                    <div className="text-white font-heading text-2xl font-bold tracking-tighter">
                        RIAVIZ<span className="text-neon">MOTORSPORT</span>
                    </div>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-8">
                    <nav className="flex items-center gap-8">
                        {navItems.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="text-sm font-medium tracking-[1px] text-white hover:text-neon transition-colors relative group"
                            >
                                {item.name}
                                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-neon transition-all duration-300 group-hover:w-full" />
                            </Link>
                        ))}
                    </nav>

                    {/* Language Selector */}
                    <div className="flex items-center gap-3 border-l border-white/20 pl-6 h-6">
                        <LocaleSwitcher />
                    </div>
                </div>

                {/* Mobile Menu Toggle */}
                <button
                    className="md:hidden text-white"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="absolute top-[90px] left-0 w-full bg-[#151515] border-t border-white/10 p-6 md:hidden flex flex-col gap-6"
                    >
                        {navItems.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="text-white font-heading text-xl hover:text-neon"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                {item.name}
                            </Link>
                        ))}

                        <div className="flex gap-4 pt-4 border-t border-white/10">
                            <LocaleSwitcher />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
