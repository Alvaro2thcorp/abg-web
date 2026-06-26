"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import PlasmaWave from "./PlasmaWave";
import FormularioPresupuestoModal from "./FormularioPresupuestoModal";

export default function Hero() {
    const ease = [0.16, 1, 0.3, 1] as any;
    const [modalOpen, setModalOpen] = useState(false);
    const isMobile = typeof window !== "undefined" && window.innerWidth <= 767;

    return (
        <section className="hero-section" style={{
            minHeight: isMobile ? "90vh" : "auto",
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: isMobile ? "center" : "flex-start",
            overflow: "hidden",
            background: "#F2F0ED",
            padding: isMobile
                ? "100px 1.4rem 36px"
                : "clamp(5.5rem, 11vh, 8rem) clamp(1.25rem, 5vw, 5rem) clamp(2rem, 5vw, 4rem)",
        }}>
            {/* PlasmaWave background */}
            <div style={{
                position: "absolute",
                inset: 0,
                zIndex: 0,
                pointerEvents: "none",
                opacity: 0.18,
            }}>
                <PlasmaWave
                    colors={["#D14124", "#4A4A4A"]}
                    speed1={0.04}
                    speed2={0.03}
                    focalLength={0.8}
                    bend1={0.8}
                    bend2={0.4}
                    dir2={1}
                    rotationDeg={0}
                />
            </div>


            {/* Contenido principal */}
            <div style={{ position: "relative", zIndex: 2 }}>

                {/* Badge */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.05, ease }}
                    style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "0.4rem",
                        background: "rgba(209,65,36,0.10)",
                        border: "1px solid rgba(209,65,36,0.25)",
                        borderRadius: "9999px",
                        padding: "0.3rem 0.9rem",
                        marginBottom: "1.2rem",
                        fontFamily: "'Inter', sans-serif",
                        fontWeight: 500,
                        fontSize: "0.7rem",
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                        color: "#D14124",
                    }}
                >
                    <span style={{
                        width: "6px",
                        height: "6px",
                        borderRadius: "50%",
                        background: "#D14124",
                        display: "inline-block",
                    }} />
                    Agencia premium · Alicante
                </motion.div>

                {/* H1 — tipografía enorme */}
                <h1 style={{ margin: 0, padding: 0 }}>
                    <div style={{ overflow: "hidden" }}>
                        <motion.span
                            className="hero-title-line"
                            initial={{ y: 80, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 1, delay: 0.15, ease }}
                            style={{
                                display: "block",
                                fontFamily: "'DM Serif Display', serif",
                                fontWeight: 400,
                                fontSize: "clamp(2.6rem, 8vw, 9rem)",
                                color: "#080808",
                                lineHeight: 0.9,
                                letterSpacing: "-0.03em",
                            }}
                        >
                            Tu negocio
                        </motion.span>
                    </div>
                    <div style={{ overflow: "hidden" }}>
                        <motion.span
                            className="hero-title-line"
                            initial={{ y: 80, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 1, delay: 0.25, ease }}
                            style={{
                                display: "block",
                                fontFamily: "'DM Serif Display', serif",
                                fontWeight: 400,
                                fontSize: "clamp(2.6rem, 8vw, 9rem)",
                                color: "#080808",
                                lineHeight: 0.9,
                                letterSpacing: "-0.03em",
                            }}
                        >
                            merece una web
                        </motion.span>
                    </div>
                    <div style={{ overflow: "hidden" }}>
                        <motion.span
                            className="hero-title-line"
                            initial={{ y: 80, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 1, delay: 0.35, ease }}
                            style={{
                                display: "block",
                                fontFamily: "'DM Serif Display', serif",
                                fontStyle: "italic",
                                fontWeight: 400,
                                fontSize: "clamp(2.6rem, 8vw, 9rem)",
                                color: "#D14124",
                                lineHeight: 0.9,
                                letterSpacing: "-0.03em",
                            }}
                        >
                            a su altura.
                        </motion.span>
                    </div>
                </h1>

                {/* Línea divisoria + CTA */}
                <motion.div
                    className="hero-bottom-row"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.7 }}
                    style={{
                        marginTop: "clamp(2.5rem, 6vw, 3.5rem)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        flexWrap: "wrap",
                        gap: "1.5rem",
                        borderTop: "1px solid rgba(8,8,8,0.12)",
                        paddingTop: "clamp(1.5rem, 3vw, 2rem)",
                    }}
                >
                    <p style={{
                        fontFamily: "'Inter', sans-serif",
                        fontWeight: 300,
                        fontSize: "clamp(0.85rem, 1.5vw, 1.05rem)",
                        color: "rgba(8,8,8,0.45)",
                        margin: 0,
                        maxWidth: "420px",
                        lineHeight: 1.6,
                    }}>
                        Diseño web premium para negocios de alto ticket en Alicante y Costa Blanca.
                    </p>

                    <button
                        onClick={() => setModalOpen(true)}
                        className="hero-cta"
                        style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "0.75rem",
                            background: "#080808",
                            color: "#F2F0ED",
                            fontFamily: "'Inter', sans-serif",
                            fontWeight: 500,
                            fontSize: "0.9rem",
                            padding: "0.9rem 2rem",
                            borderRadius: "4px",
                            border: "none",
                            cursor: "pointer",
                            textDecoration: "none",
                            letterSpacing: "0.02em",
                            transition: "background 0.2s ease",
                            minHeight: "48px",
                        }}
                    >
                        Solicitar presupuesto →
                    </button>
                </motion.div>
            </div>

            <FormularioPresupuestoModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />

            <style dangerouslySetInnerHTML={{
                __html: `
                .hero-cta:hover { background: #D14124 !important; }
                @media (max-width: 767px) {
                    .hero-title-line {
                        font-size: clamp(3.2rem, 13vw, 5rem) !important;
                        line-height: 0.92 !important;
                        letter-spacing: -0.04em !important;
                    }
                    .hero-bottom-row {
                        flex-direction: column !important;
                        align-items: flex-start !important;
                        gap: 1.2rem !important;
                    }
                    .hero-cta, .hero-cta-btn {
                        width: 100%;
                        justify-content: center;
                        min-height: 52px;
                    }
                }
            `}} />
        </section>
    );
}
