import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { ChiSiamo } from "@/components/sections/ChiSiamo";
import { ServicesPreview } from "@/components/sections/ServicesPreview";
import { MethodRiaviz } from "@/components/sections/MethodRiaviz";
import { ContactSection } from "@/components/sections/ContactSection";
import { InstagramFeed } from "@/components/sections/InstagramFeed";
import { LightDelimiter } from "@/components/ui/LightDelimiter";

export default function Home() {
    return (
        <>
            <Header />
            <main className="min-h-screen">
                <Hero />
                <LightDelimiter />
                <ChiSiamo />
                <LightDelimiter />
                <ServicesPreview />
                <LightDelimiter />
                <MethodRiaviz />
                <LightDelimiter />
                <InstagramFeed />
                <LightDelimiter />
                <ContactSection />
            </main>
            <Footer />
        </>
    );
}
