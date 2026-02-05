import type { Metadata } from "next";
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import { LocaleProvider } from '@/contexts/LocaleContext';
import './globals.css';

export const metadata: Metadata = {
    title: "RIAVIZ Motorsport",
    description: "Performance. Precision. Passion.",
    icons: {
        icon: '/riaviz.ico',
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="it">
            <body
                className={`${GeistSans.variable} ${GeistMono.variable} antialiased bg-[#0B0B0B] text-white`}
            >
                <LocaleProvider>
                    {children}
                </LocaleProvider>
            </body>
        </html>
    );
}
