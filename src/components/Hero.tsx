"use client";

import { motion } from "framer-motion";
import LightPillar from "./LightPillar";

export default function Hero() {
    const ease = [0.16, 1, 0.3, 1] as any;

    return (
        <section
            style={{
                minHeight: "100vh",
                position: "relative",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                overflow: "hidden",
                background: "#080808",
                padding: "5rem clamp(1.5rem, 5vw, 5rem) 0",
                marginBottom: 0,
            }}
        >
            {/* ── BACKGROUND LAYERS (DO NOT TOUCH) ── */}
            <div style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none', overflow: 'hidden' }}>
                <LightPillar
                    topColor="#F04E23"
                    bottomColor="#080808"
                    pillarWidth={2.5}
                    rotationSpeed={0.8}
                    intensity={0.8}
                    glowAmount={0.01}
                />
            </div>

            {/* ── ZONA SUPERIOR ── */}
            <div
                className="hero-upper-zone"
                style={{
                    display: "flex",
                    alignItems: "flex-start",
                    padding: "0 0 2rem",
                    position: "relative",
                    zIndex: 2
                }}
            >
                <div style={{ maxWidth: "820px", width: "100%" }}>
                    {/* TAG PILL */}
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1, ease }}
                        className="hero-badge"
                        style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "0.6rem",
                            border: "1px solid rgba(242,240,237,0.1)",
                            borderRadius: "100px",
                            padding: "0.4rem 1rem",
                            background: "rgba(242,240,237,0.03)",
                            marginBottom: "1.5rem"
                        }}
                    >
                        <div className="pulse-dot" style={{ width: "6px", height: "6px", background: "#F04E23", borderRadius: "50%" }} />
                        <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", color: "rgba(242,240,237,0.5)", textTransform: "uppercase", letterSpacing: "0.15em" }}>
                            ABG FRAME · SAN JUAN DE ALICANTE
                        </span>
                    </motion.div>

                    {/* H1 */}
                    <h1 style={{ display: "flex", flexDirection: "column", margin: 0 }}>
                        <div style={{ overflow: "hidden" }}>
                            <motion.span
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.9, delay: 0.1, ease }}
                                style={{
                                    fontFamily: "var(--font-display)",
                                    fontWeight: 800,
                                    fontSize: "clamp(3rem, 5.5vw, 7rem)",
                                    color: "#F2F0ED",
                                    lineHeight: 0.92,
                                    letterSpacing: "-0.04em",
                                    display: "block"
                                }}
                                className="hero-title-main"
                            >
                                Diseño web premium
                            </motion.span>
                        </div>

                        <div style={{ overflow: "hidden" }}>
                            <motion.span
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.9, delay: 0.2, ease }}
                                style={{
                                    fontFamily: "var(--font-display)",
                                    fontWeight: 800,
                                    fontSize: "clamp(3rem, 5.5vw, 7rem)",
                                    color: "#F2F0ED",
                                    lineHeight: 0.92,
                                    letterSpacing: "-0.04em",
                                    display: "block"
                                }}
                                className="hero-title-main"
                            >
                                que atrae clientes
                            </motion.span>
                        </div>

                        <div style={{ overflow: "hidden" }}>
                            <motion.span
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.9, delay: 0.3, ease }}
                                style={{
                                    fontFamily: "var(--font-display)",
                                    fontWeight: 800,
                                    fontStyle: "normal",
                                    fontSize: "clamp(3rem, 5.5vw, 7rem)",
                                    color: "transparent",
                                    WebkitTextStroke: "2px rgba(242,240,237,0.4)",
                                    lineHeight: 0.92,
                                    letterSpacing: "-0.04em",
                                    display: "block"
                                }}
                                className="hero-title-outline"
                            >
                                de alto ticket.
                            </motion.span>
                        </div>
                    </h1>
                </div>
            </div>

            {/* ── LÍNEA DIVISORIA ── */}
            <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1, delay: 0.7, ease }}
                style={{ width: "100%", height: "1px", background: "rgba(242,240,237,0.08)", position: "relative", zIndex: 2, originX: 0 }}
            />

            {/* ── ZONA INFERIOR ── */}
            <div
                style={{
                    padding: "2rem 0 0",
                    position: "relative",
                    zIndex: 2
                }}
            >
                <motion.a
                    href="/contacto"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.8, ease }}
                    className="hero-cta-btn"
                    style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "0.75rem",
                        background: "#F04E23",
                        borderRadius: "100px",
                        padding: "0.85rem 2rem",
                        fontFamily: "var(--font-display)",
                        fontWeight: 700,
                        fontSize: "0.95rem",
                        color: "#080808",
                        textDecoration: "none",
                        transition: "background 0.25s ease, transform 0.25s ease"
                    }}
                >
                    Contacta con nosotros
                    <span style={{ fontSize: "1rem" }}>→</span>
                </motion.a>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes pulse {
                    0%, 100% { opacity: 1; transform: scale(1); }
                    50% { opacity: 0.5; transform: scale(0.8); }
                }
                .pulse-dot { animation: pulse 2s infinite; }
                .hero-cta-btn:hover { background: #d93d1a !important; transform: translateY(-2px); }

                @media (max-width: 767px) {
                    .hero-upper-zone {
                        padding-top: 90px !important;
                        align-items: flex-start !important;
                    }
                    .hero-badge {
                        margin-bottom: 1.5rem !important;
                    }
                    .hero-title-main,
                    .hero-title-outline {
                        font-size: clamp(2.8rem, 10vw, 4rem) !important;
                    }
                }
            `}} />
        </section>
    );
}
