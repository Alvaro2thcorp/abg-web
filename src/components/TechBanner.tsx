"use client";

import { LogoLoop } from "./reactbits/LogoLoop";
import { SiAstro, SiReact, SiWordpress, SiWoocommerce, SiShopify, SiTailwindcss } from "react-icons/si";

const iconColor = "#080808";
const iconStyle = { color: iconColor, opacity: 0.55 } as const;

const techs = [
    { node: <SiAstro style={iconStyle} />, title: "Astro" },
    { node: <SiReact style={iconStyle} />, title: "React" },
    { node: <SiWordpress style={iconStyle} />, title: "WordPress" },
    { node: <SiWoocommerce style={{ color: "#CC0000", opacity: 0.7 }} />, title: "WooCommerce" },
    { node: <SiShopify style={iconStyle} />, title: "Shopify" },
    { node: <SiTailwindcss style={iconStyle} />, title: "Tailwind CSS" },
];

export default function TechBanner() {
    return (
        <section
            aria-label="Tecnologías con las que trabajamos"
            style={{
                background: "transparent",
                padding: "3.5rem 0",
                overflow: "hidden",
                position: "relative",
            }}
        >
            <LogoLoop
                logos={techs}
                speed={50}
                direction="left"
                logoHeight={48}
                gap={80}
                hoverSpeed={0}
                scaleOnHover={false}
                fadeOut={true}
                fadeOutColor="#F2F0ED"
                ariaLabel="Tecnologías con las que trabajamos"
            />
        </section>
    );
}
