"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

const FinalCTA = () => {
    const textRef = useRef(null);
    const isInView = useInView(textRef, { once: true, amount: 0.3 });

    const navLinks = [
        { name: "Servicios", href: "/servicios" },
        { name: "El Sistema", href: "/el-sistema" },
        { name: "Blog", href: "/blog" },
        { name: "Sobre nosotros", href: "/sobre-nosotros" },
        { name: "Contacto", href: "/contacto" }
    ];

    return (
        <section
            style={{
                background: "#F2F0ED",
                minHeight: "60vh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                position: "relative",
                overflow: "hidden"
            }}
        >
            {/* ── PARTE SUPERIOR ── */}
            <div className="cta-top-row" style={{ padding: "4rem clamp(1.5rem, 5vw, 5rem) 2rem", display: "flex", justifyContent: "space-between", alignItems: "flex-start", position: "relative", zIndex: 10 }}>
                <div>
                    <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "2rem", color: "#080808" }}>
                        ABG
                    </div>
                    <div style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.65rem",
                        color: "rgba(8,8,8,0.3)",
                        textTransform: "uppercase",
                        letterSpacing: "0.15em",
                        marginTop: "0.2rem"
                    }}>
                        Desde 2025
                    </div>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", textAlign: "right" }}>
                    {navLinks.map((link, i) => (
                        <a
                            key={i}
                            href={link.href}
                            className="footer-nav-link"
                            style={{
                                fontFamily: "var(--font-body)",
                                fontWeight: 300,
                                fontSize: "0.9rem",
                                color: "rgba(8,8,8,0.4)",
                                textDecoration: "none",
                                transition: "color 0.2s ease"
                            }}
                        >
                            {link.name}
                        </a>
                    ))}
                </div>
            </div>

            {/* ── PARTE CENTRAL ── */}
            <div style={{ padding: "0 clamp(1.5rem, 5vw, 5rem)", flexGrow: 1, display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
                {/* Elemento Decorativo de Fondo */}
                <div style={{
                    position: "absolute",
                    left: "50%",
                    top: "50%",
                    transform: "translate(-50%, -50%)",
                    fontFamily: "var(--font-display)",
                    fontWeight: 800,
                    fontSize: "28vw",
                    color: "rgba(8,8,8,0.018)",
                    lineHeight: 1,
                    pointerEvents: "none",
                    userSelect: "none",
                    zIndex: 0
                }}>
                    ABG
                </div>

                <div style={{ textAlign: "center", zIndex: 1 }}>
                    <div style={{
                        fontFamily: "var(--font-display)",
                        fontWeight: 800,
                        fontSize: "clamp(2rem, 4.5vw, 3rem)",
                        color: "rgba(8,8,8,0.12)",
                        letterSpacing: "-0.02em"
                    }}>
                        Webs hechas a medida
                    </div>

                    <div ref={textRef} style={{ position: "relative" }}>
                        <motion.h2
                            initial={{ clipPath: "inset(0 100% 0 0)" }}
                            animate={isInView ? { clipPath: "inset(0 0% 0 0)" } : { clipPath: "inset(0 100% 0 0)" }}
                            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                            style={{
                                fontFamily: "var(--font-display)",
                                fontWeight: 800,
                                fontSize: "clamp(2rem, 5vw, 4.5rem)",
                                color: "#080808",
                                letterSpacing: "-0.04em",
                                lineHeight: 0.95,
                                margin: 0
                            }}
                        >
                            <span style={{ fontStyle: "italic", color: "#D14124" }}>para negocios que no se conforman.</span>
                        </motion.h2>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                    >
                        <a
                            href="/contacto"
                            className="cta-final-button"
                            style={{
                                display: "inline-block",
                                marginTop: "2rem",
                                background: "#080808",
                                color: "#F2F0ED",
                                borderRadius: "4px",
                                fontFamily: "var(--font-body)",
                                fontWeight: 500,
                                fontSize: "1rem",
                                padding: "1.2rem 3rem",
                                textDecoration: "none",
                                transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)"
                            }}
                        >
                            Hablemos →
                        </a>
                    </motion.div>
                </div>
            </div>

            <div
                className="cta-bottom-row"
                style={{
                    padding: "2.5rem clamp(1.5rem, 5vw, 5rem)",
                    borderTop: "1px solid rgba(8,8,8,0.08)",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexWrap: "wrap",
                    gap: "1rem",
                    position: "relative",
                    zIndex: 10
                }}
            >
                <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.58rem", color: "rgba(8,8,8,0.25)", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                    © 2026 ABG Frame · San Juan de Alicante
                </div>

                <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.58rem", color: "rgba(8,8,8,0.2)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                    Diseño Web Premium · España · Internacional
                </div>

                <div style={{ display: "flex", gap: "1.5rem" }}>
                    <a
                        href="https://instagram.com/abgframe"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="ABG Frame en Instagram"
                        className="footer-social-link"
                    >Instagram</a>
                    <a
                        href="https://linkedin.com/company/abgframe"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="ABG Frame en LinkedIn"
                        className="footer-social-link"
                    >LinkedIn</a>
                </div>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                .footer-nav-link:hover { color: #080808 !important; }
                .cta-final-button:hover { background: #D14124 !important; color: #080808 !important; }
                .footer-social-link {
                    font-family: var(--font-mono);
                    font-size: 0.58rem;
                    color: rgba(8,8,8,0.3);
                    text-transform: uppercase;
                    text-decoration: none;
                    transition: color 0.2s ease;
                    letter-spacing: 0.1em;
                }
                .footer-social-link:hover { color: #D14124 !important; }
                @media (max-width: 767px) {
                    .cta-top-row {
                        flex-direction: column !important;
                        gap: 2rem !important;
                        text-align: left !important;
                    }
                    .cta-top-row div:last-child {
                        text-align: left !important;
                        align-items: flex-start !important;
                    }
                    .cta-final-button {
                        width: 100% !important;
                        display: flex !important;
                        justify-content: center !important;
                        padding: 1.2rem 1.5rem !important;
                    }
                    .cta-bottom-row {
                        flex-direction: column !important;
                        align-items: flex-start !important;
                        gap: 1.5rem !important;
                    }
                }
            `}} />
        </section>
    );
};

export default FinalCTA;
