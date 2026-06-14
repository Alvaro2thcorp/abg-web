"use client";

import { LogoLoop } from "./reactbits/LogoLoop";
import { SiAstro, SiReact, SiWordpress, SiWoocommerce, SiShopify, SiTailwindcss } from "react-icons/si";

const iconColor = "#F2F0ED";
const iconStyle = { color: iconColor, opacity: 0.6 } as const;

const techs = [
    { node: <SiAstro style={iconStyle} />, title: "Astro" },
    { node: <SiReact style={iconStyle} />, title: "React" },
    { node: <SiWordpress style={iconStyle} />, title: "WordPress" },
    { node: <SiWoocommerce style={{ color: "#D14124", opacity: 0.85 }} />, title: "WooCommerce" },
    { node: <SiShopify style={iconStyle} />, title: "Shopify" },
    { node: <SiTailwindcss style={iconStyle} />, title: "Tailwind CSS" },
];

export default function TechBannerServicios() {
    return (
        <section
            aria-label="Tecnologías con las que trabajamos"
            style={{
                background: "#080808",
                padding: "3.5rem 0",
                overflow: "hidden",
                borderTop: "1px solid rgba(242,240,237,0.06)",
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
                fadeOutColor="#080808"
                ariaLabel="Tecnologías con las que trabajamos"
            />
        </section>
    );
}
