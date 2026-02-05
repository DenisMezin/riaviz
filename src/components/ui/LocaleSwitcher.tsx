"use client";

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useLocale } from '@/contexts/LocaleContext';

const languages = [
    { code: 'it', flag: '/flags/it.svg', name: 'Italiano' },
    { code: 'en', flag: '/flags/gb.svg', name: 'English' },
    { code: 'sl', flag: '/flags/si.svg', name: 'Slovenščina' },
];

export function LocaleSwitcher() {
    const { locale: currentLocale, setLocale } = useLocale();

    return (
        <div className="flex items-center gap-2">
            {languages.map((lang) => (
                <motion.button
                    key={lang.code}
                    onClick={() => setLocale(lang.code)}
                    className={`
            relative w-6 h-4 transition-all duration-300 rounded-sm overflow-hidden
            ${currentLocale === lang.code ? 'opacity-100 scale-110 ring-2 ring-neon' : 'opacity-60 hover:opacity-100'}
          `}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    title={lang.name}
                >
                    <Image
                        src={lang.flag}
                        alt={lang.name}
                        fill
                        className="object-cover"
                    />
                </motion.button>
            ))}
        </div>
    );
}
