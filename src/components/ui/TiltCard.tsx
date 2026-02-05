"use client";

import React, { useRef } from "react";
import {
    motion,
    useMotionTemplate,
    useMotionValue,
    useSpring,
} from "framer-motion";

interface TiltCardProps {
    title: string;
    image: string;
    className?: string;
}

const ROTATION_RANGE = 20; // Degrees
const HALF_ROTATION_RANGE = ROTATION_RANGE / 2;

export function TiltCard({ title, image, className }: TiltCardProps) {
    const ref = useRef<HTMLDivElement>(null);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const xSpring = useSpring(x, { stiffness: 300, damping: 30 });
    const ySpring = useSpring(y, { stiffness: 300, damping: 30 });

    const transform = useMotionTemplate`perspective(700px) rotateX(${xSpring}deg) rotateY(${ySpring}deg)`;

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;

        const rect = ref.current.getBoundingClientRect();

        const width = rect.width;
        const height = rect.height;

        const mouseX = (e.clientX - rect.left) * ROTATION_RANGE;
        const mouseY = (e.clientY - rect.top) * ROTATION_RANGE;

        const rX = (mouseY / height - HALF_ROTATION_RANGE) * -1;
        const rY = mouseX / width - HALF_ROTATION_RANGE;

        x.set(rX);
        y.set(rY);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                transformStyle: "preserve-3d",
                transform,
            }}
            className={`relative h-[320px] w-full rounded-xl bg-[#141414] border border-white/10 overflow-hidden group ${className}`}
        >
            <div
                style={{
                    transform: "translateZ(50px)",
                    transformStyle: "preserve-3d",
                }}
                className="absolute inset-4 grid place-content-end rounded-xl shadow-lg"
            >
                {/* Image Background (Full Card) */}
                <div
                    className="absolute inset-0 w-full h-full bg-cover bg-center rounded-xl"
                    style={{ backgroundImage: `url(${image})` }}
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent rounded-xl" />

                {/* Content */}
                <div className="relative z-10 p-4 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <div className="h-[3px] w-12 bg-neon mb-2 rounded-full shadow-[0_0_10px_#9AD600]" />
                    <h3 className="text-xl font-heading font-bold uppercase text-white tracking-wider leading-tight shadow-black drop-shadow-md">
                        {title}
                    </h3>
                    <p className="text-neon text-[5px] md:text-xs font-bold mt-2 uppercase tracking-widest opacity-80 group-hover:opacity-100 transition-all duration-300 translate-y-0 group-hover:translate-y-1">
                        + Dettagli
                    </p>
                </div>
            </div>
        </motion.div>
    );
}
