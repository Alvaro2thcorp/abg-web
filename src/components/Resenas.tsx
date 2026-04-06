"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

// ── Data ──────────────────────────────────────────────────────────────────────
const reviews = [
    {
        num: "01",
        name: "Ernesto",
        company: "Mavicpack",
        sector: "Ecommerce",
        text: "Álvaro transformó nuestra tienda online por completo. El diseño es premium, la experiencia de compra fluida y los resultados en ventas se notaron desde el primer mes. Profesionalidad total.",
    },
    {
        num: "02",
        name: "Fernando",
        company: "Carabibas, Bodega Sierra de Cabreras",
        sector: "Ecommerce",
        text: "Queríamos una web que transmitiera la esencia de nuestros vinos. ABG Frame lo consiguió con creces. Elegante, rápida y perfectamente optimizada. Superó nuestras expectativas.",
    },
    {
        num: "03",
        name: "David",
        company: "Sacos González",
        sector: "Web Catálogo",
        text: "Necesitábamos modernizar nuestra presencia online y ABG Frame entendió exactamente lo que buscábamos. Entrega rápida, comunicación impecable y resultado muy por encima de lo esperado.",
    },
    {
        num: "04",
        name: "Pablo Lizón",
        company: "Marketing Digital",
        sector: "Landing",
        text: "Trabajar con Álvaro es fácil. Sabe lo que hace, ejecuta rápido y el resultado final es limpio y efectivo. Mi landing convierte bien desde el día uno.",
    },
    {
        num: "05",
        name: "Cristina",
        company: "Abogada",
        sector: "Landing",
        text: "Tenía claro que quería algo serio y profesional. ABG Frame me entregó exactamente eso. La web transmite confianza y desde que la lancé he recibido más consultas que nunca.",
    },
];

// ── Stars ─────────────────────────────────────────────────────────────────────
function Stars() {
    return (
        <div style={{ display: "flex", gap: "0.3rem", marginBottom: "1.5rem" }}>
            {[...Array(5)].map((_, i) => (
                <svg key={i} width="13" height="13" viewBox="0 0 24 24" fill="#F04E23">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
            ))}
        </div>
    );
}

// ── Card ──────────────────────────────────────────────────────────────────────
function ReviewCard({ review, index }: { review: typeof reviews[0]; index: number }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.15 });
    const [hovered, setHovered] = useState(false);

    return (
        <motion.article
            ref={ref}
            initial={{ opacity: 0, y: 36 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 36 }}
            transition={{ duration: 0.75, delay: index * 0.09, ease: [0.16, 1, 0.3, 1] }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                background: hovered ? "rgba(242,240,237,0.04)" : "rgba(242,240,237,0.02)",
                border: hovered
                    ? "1px solid rgba(240,78,35,0.18)"
                    : "1px solid rgba(242,240,237,0.06)",
                borderRadius: "2px",
                padding: "2rem",
                display: "flex",
                flexDirection: "column",
                position: "relative",
                transition: "border-color 0.35s ease, background 0.35s ease",
                cursor: "default",
            }}
        >
            {/* Accent line on hover */}
            <div
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: hovered ? "100%" : "0%",
                    height: "1px",
                    background: "#F04E23",
                    transition: "width 0.45s cubic-bezier(0.16,1,0.3,1)",
                }}
            />

            {/* Number tag */}
            <span
                style={{
                    fontFamily: "'Syne Mono', monospace",
                    fontSize: "0.58rem",
                    color: "#F04E23",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    marginBottom: "1.5rem",
                }}
            >
                {review.num} ——
            </span>

            {/* Stars */}
            <Stars />

            {/* Quote */}
            <p
                style={{
                    fontFamily: "Epilogue, sans-serif",
                    fontWeight: 300,
                    fontSize: "0.9rem",
                    color: "rgba(242,240,237,0.5)",
                    lineHeight: 1.75,
                    margin: 0,
                    marginBottom: "1.75rem",
                    flex: 1,
                }}
            >
                "{review.text}"
            </p>

            {/* Author */}
            <div
                style={{
                    borderTop: "1px solid rgba(242,240,237,0.06)",
                    paddingTop: "1.25rem",
                }}
            >
                <div
                    style={{
                        fontFamily: "var(--font-display)",
                        fontWeight: 700,
                        fontSize: "0.95rem",
                        color: "#F2F0ED",
                        letterSpacing: "-0.01em",
                    }}
                >
                    {review.name}
                </div>
                <div
                    style={{
                        fontFamily: "'Syne Mono', monospace",
                        fontSize: "0.56rem",
                        color: "rgba(242,240,237,0.22)",
                        textTransform: "uppercase",
                        letterSpacing: "0.13em",
                        marginTop: "0.35rem",
                    }}
                >
                    {review.company} · {review.sector}
                </div>
            </div>
        </motion.article>
    );
}

// ── Main ──────────────────────────────────────────────────────────────────────
export default function Resenas() {
    const headerRef = useRef(null);
    const isHeaderInView = useInView(headerRef, { once: true, amount: 0.3 });

    return (
        <section
            id="resenas"
            aria-label="Reseñas de clientes ABG Frame diseño web Alicante"
            style={{
                background: "#080808",
                padding: "5rem 0 6rem",
                borderTop: "1px solid rgba(242,240,237,0.06)",
            }}
        >
            <div
                style={{
                    width: "100%",
                    maxWidth: "1400px",
                    margin: "0 auto",
                    padding: "0 clamp(1.5rem, 5vw, 5rem)",
                }}
            >
                {/* ── Header ── */}
                <header
                    ref={headerRef}
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        position: "relative",
                        marginBottom: "3.5rem",
                        paddingBottom: "2rem",
                        borderBottom: "1px solid rgba(242,240,237,0.06)",
                    }}
                >
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={isHeaderInView ? { opacity: 1 } : { opacity: 0 }}
                        transition={{ duration: 0.6 }}
                        style={{
                            fontFamily: "'Syne Mono', monospace",
                            fontSize: "0.62rem",
                            color: "#F04E23",
                            letterSpacing: "0.25em",
                            textTransform: "uppercase",
                        }}
                    >
                        CLIENTES
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 14 }}
                        animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
                        transition={{ duration: 0.7, delay: 0.1 }}
                        className="resenas-heading"
                        style={{
                            position: "absolute",
                            left: "50%",
                            transform: "translateX(-50%)",
                            fontFamily: "var(--font-display)",
                            fontWeight: 800,
                            fontSize: "clamp(1.4rem, 2.8vw, 2.5rem)",
                            color: "#F2F0ED",
                            letterSpacing: "-0.02em",
                            margin: 0,
                            whiteSpace: "nowrap",
                        }}
                    >
                        Lo que dicen{" "}
                        <span style={{ color: "#F04E23" }}>de nosotros.</span>
                    </motion.h2>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={isHeaderInView ? { opacity: 1 } : { opacity: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        style={{
                            fontFamily: "'Syne Mono', monospace",
                            fontSize: "0.62rem",
                            color: "rgba(242,240,237,0.15)",
                            letterSpacing: "0.2em",
                            textTransform: "uppercase",
                        }}
                    >
                        05 RESEÑAS
                    </motion.div>
                </header>

                {/* ── Grid ── */}
                <div className="resenas-grid">
                    {reviews.map((review, i) => (
                        <ReviewCard key={review.num} review={review} index={i} />
                    ))}
                </div>

                {/* ── Rating summary ── */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    style={{
                        marginTop: "3rem",
                        paddingTop: "2rem",
                        borderTop: "1px solid rgba(242,240,237,0.06)",
                        display: "flex",
                        alignItems: "center",
                        gap: "1.5rem",
                        flexWrap: "wrap",
                    }}
                >
                    <div style={{ display: "flex", gap: "0.3rem" }}>
                        {[...Array(5)].map((_, i) => (
                            <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="#F04E23">
                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                            </svg>
                        ))}
                    </div>
                    <span
                        style={{
                            fontFamily: "'Syne Mono', monospace",
                            fontSize: "0.62rem",
                            color: "rgba(242,240,237,0.25)",
                            textTransform: "uppercase",
                            letterSpacing: "0.15em",
                        }}
                    >
                        5.0 · 5 clientes satisfechos · Alicante
                    </span>
                </motion.div>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                .resenas-grid {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 1.25rem;
                }
                /* Last 2 cards: center them in a 3-col grid */
                .resenas-grid > article:nth-child(4) {
                    grid-column: 1 / 2;
                }
                .resenas-grid > article:nth-child(5) {
                    grid-column: 2 / 3;
                }
                @media (max-width: 1023px) {
                    .resenas-grid {
                        grid-template-columns: repeat(2, 1fr) !important;
                    }
                    .resenas-grid > article:nth-child(4),
                    .resenas-grid > article:nth-child(5) {
                        grid-column: auto !important;
                    }
                }
                @media (max-width: 767px) {
                    .resenas-grid {
                        grid-template-columns: 1fr !important;
                        gap: 1rem !important;
                    }
                    .resenas-heading {
                        position: relative !important;
                        left: auto !important;
                        transform: none !important;
                        white-space: normal !important;
                        font-size: 1.4rem !important;
                    }
                    #resenas header {
                        flex-direction: column !important;
                        align-items: flex-start !important;
                        gap: 0.75rem !important;
                    }
                }
                `,
            }} />
        </section>
    );
}
