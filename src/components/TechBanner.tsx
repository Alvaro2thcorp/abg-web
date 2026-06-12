"use client";

import React from "react";

const phrases = [
    "Más clientes",
    "Webs que venden",
    "Resultados en 4 semanas",
    "Diseño a medida",
    "Cero plantillas",
    "Hecho en Alicante",
    "Sin permanencia",
    "Acompañamiento real",
];

export default function TechBanner() {
    const items = [...phrases, ...phrases, ...phrases];

    return (
        <section
            aria-label="Lo que entrega ABG Frame"
            style={{
                background: "#F2F0ED",
                borderTop: "1px solid rgba(8,8,8,0.08)",
                borderBottom: "1px solid rgba(8,8,8,0.08)",
                padding: "1.5rem 0",
                overflow: "hidden",
                position: "relative",
            }}
        >
            <div className="phrases-marquee">
                {items.map((text, i) => (
                    <div key={i} style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "2rem",
                        padding: "0 2rem",
                        flexShrink: 0,
                    }}>
                        <span style={{
                            fontFamily: "'DM Serif Display', serif",
                            fontStyle: "italic",
                            fontWeight: 400,
                            fontSize: "clamp(1.5rem, 3vw, 2.2rem)",
                            color: "#080808",
                            whiteSpace: "nowrap",
                            letterSpacing: "-0.02em",
                        }}>
                            {text}
                        </span>
                        <span style={{
                            display: "inline-block",
                            width: "8px",
                            height: "8px",
                            borderRadius: "50%",
                            background: "#CC0000",
                            flexShrink: 0,
                        }} />
                    </div>
                ))}
            </div>
            <style dangerouslySetInnerHTML={{ __html: `
                @keyframes phrasesMarquee {
                    0%   { transform: translateX(0); }
                    100% { transform: translateX(-33.333%); }
                }
                .phrases-marquee {
                    display: flex;
                    width: max-content;
                    animation: phrasesMarquee 45s linear infinite;
                    will-change: transform;
                }
            `}} />
        </section>
    );
}
