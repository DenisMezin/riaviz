import React from "react";

export function LightDelimiter() {
    return (
        /* Il container ora è alto solo 2px (h-[2px]).
           'overflow-visible' permette alla luce sfocata di uscire dai bordi verticali
           senza occupare spazio fisico nel layout.
        */
        <div className="relative flex items-center justify-center w-full h-[3px] my-0 overflow-visible">

            {/* 1. Scia lunga (Atmosphere) - Sottilissima */}
            <div className="absolute w-full h-[3px] bg-gradient-to-r from-transparent via-[#9FCE32]/40 to-transparent" />
            {/* 2. Cuore di energia (Core) - Bianco e nitido al centro */}
            <div className="absolute w-3/4 h-[1px] bg-gradient-to-r from-transparent via-white/80 to-transparent" />

            {/* 3. Il Glow (Bagliore) - Sbava verticalmente grazie a overflow-visible */}
            <div className="absolute w-full h-[2px] bg-[#9FCE32] blur-[2px] rounded-full" />

        </div>
    );
}   