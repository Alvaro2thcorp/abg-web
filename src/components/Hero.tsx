"use client";

import { motion } from "framer-motion";
import PlasmaWave from "./PlasmaWave";

export default function Hero() {
    const ease = [0.16, 1, 0.3, 1] as any;

    return (
        <section style={{
            minHeight: "100vh",
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            overflow: "hidden",
            background: "#F2F0ED",
            padding: "clamp(5rem, 12vh, 12rem) clamp(1.25rem, 5vw, 5rem) clamp(2.5rem, 6vw, 5rem)",
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
                    colors={["#CC0000", "#4A4A4A"]}
                    speed1={0.04}
                    speed2={0.03}
                    focalLength={0.8}
                    bend1={0.8}
                    bend2={0.4}
                    dir2={1}
                    rotationDeg={0}
                />
            </div>

            {/* Isotipo 3D de fondo — decorativo */}
            <div style={{
                position: "absolute",
                right: "-5vw",
                top: "50%",
                transform: "translateY(-50%)",
                width: "clamp(400px, 55vw, 900px)",
                height: "clamp(400px, 55vw, 900px)",
                zIndex: 1,
                pointerEvents: "none",
                opacity: 0.07,
                backgroundImage: "url('/images/isotipo-3d.png')",
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
            }} />

            {/* Contenido principal */}
            <div style={{ position: "relative", zIndex: 2 }}>

                {/* H1 — tipografía enorme */}
                <h1 style={{ margin: 0, padding: 0 }}>
                    <div style={{ overflow: "hidden" }}>
                        <motion.span
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
                            initial={{ y: 80, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 1, delay: 0.35, ease }}
                            style={{
                                display: "block",
                                fontFamily: "'DM Serif Display', serif",
                                fontStyle: "italic",
                                fontWeight: 400,
                                fontSize: "clamp(2.6rem, 8vw, 9rem)",
                                color: "#CC0000",
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
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.7 }}
                    style={{
                        marginTop: "clamp(1.75rem, 4vw, 3.5rem)",
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

                    <a
                        href="/contacto"
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
                            textDecoration: "none",
                            letterSpacing: "0.02em",
                            transition: "background 0.2s ease",
                            minHeight: "48px",
                        }}
                    >
                        Solicitar presupuesto →
                    </a>
                </motion.div>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                .hero-cta:hover { background: #CC0000 !important; }
                @media (max-width: 767px) {
                    .hero-cta { width: 100%; justify-content: center; min-height: 52px; }
                }
            `}} />
        </section>
    );
}
