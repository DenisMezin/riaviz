"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Instagram, ExternalLink } from "lucide-react";
import { useLocale } from '@/contexts/LocaleContext';

const INSTAGRAM_POSTS = [
    { id: 1, image: "/images/post1.jpeg", link: "https://www.instagram.com/riaviz_motorsport/" },
    { id: 2, image: "/images/post2.jpeg", link: "https://www.instagram.com/riaviz_motorsport/" },
    { id: 3, image: "/images/post3.jpeg", link: "https://www.instagram.com/riaviz_motorsport/" },
    { id: 4, image: "/images/post4.jpeg", link: "https://www.instagram.com/riaviz_motorsport/" },
    { id: 5, image: "/images/post5.jpeg", link: "https://www.instagram.com/riaviz_motorsport/" },
    { id: 6, image: "/images/post6.png", link: "https://www.instagram.com/riaviz_motorsport/" },
];

export function InstagramFeed() {
    const { messages } = useLocale();
    const t = (key: string) => (messages.instagram as any)[key];

    return (
        <section className="py-16 bg-[#0B0B0B] border-t border-white/5 relative overflow-hidden">
            <div className="container mx-auto px-4 max-w-[1320px]">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-heading font-bold uppercase italic tracking-wider text-white mb-2">
                            {t('title1')} <span className="text-neon">{t('title2')}</span>
                        </h2>
                        <Link
                            href="https://www.instagram.com/riaviz_motorsport/"
                            target="_blank"
                            className="text-light-grey hover:text-white transition-colors flex items-center gap-2 text-lg"
                        >
                            @riaviz_motorsport <ExternalLink size={16} />
                        </Link>
                    </div>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    {INSTAGRAM_POSTS.map((post, index) => (
                        <motion.div
                            key={post.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="relative aspect-square group overflow-hidden rounded-xl border border-white/10"
                        >
                            <Link href={post.link} target="_blank" className="block w-full h-full">
                                <Image
                                    src={post.image}
                                    alt="Instagram Post"
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                                    unoptimized
                                />
                                {/* Overlay */}
                                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                    <Instagram className="text-neon w-8 h-8" />
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
