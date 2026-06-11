"use client";

import { motion } from "framer-motion";

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
            padding: "clamp(6rem, 18vh, 12rem) clamp(1.5rem, 5vw, 5rem) clamp(3rem, 6vw, 5rem)",
        }}>
            {/* Isotipo 3D de fondo — decorativo */}
            <div style={{
                position: "absolute",
                right: "-5vw",
                top: "50%",
                transform: "translateY(-50%)",
                width: "clamp(400px, 55vw, 900px)",
                height: "clamp(400px, 55vw, 900px)",
                zIndex: 0,
                pointerEvents: "none",
                opacity: 0.07,
                backgroundImage: "url('/images/isotipo-3d.png')",
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
            }} />

            {/* Línea superior — eyebrow */}
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1, ease }}
                style={{
                    position: "absolute",
                    top: "clamp(1.5rem, 3vw, 2.5rem)",
                    left: "clamp(1.5rem, 5vw, 5rem)",
                    right: "clamp(1.5rem, 5vw, 5rem)",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    zIndex: 2,
                }}
            >
                <span style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.65rem",
                    fontWeight: 500,
                    color: "rgba(8,8,8,0.35)",
                    textTransform: "uppercase",
                    letterSpacing: "0.2em",
                }}>
                    ABG Frame · San Juan de Alicante
                </span>
                <span style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.65rem",
                    fontWeight: 500,
                    color: "rgba(8,8,8,0.35)",
                    textTransform: "uppercase",
                    letterSpacing: "0.2em",
                }}>
                    Est. 2025
                </span>
            </motion.div>

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
                                fontSize: "clamp(3.5rem, 8vw, 9rem)",
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
                                fontSize: "clamp(3.5rem, 8vw, 9rem)",
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
                                fontSize: "clamp(3.5rem, 8vw, 9rem)",
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
                        marginTop: "clamp(2rem, 4vw, 3.5rem)",
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
                        fontSize: "clamp(0.9rem, 1.5vw, 1.05rem)",
                        color: "rgba(8,8,8,0.45)",
                        margin: 0,
                        maxWidth: "420px",
                        lineHeight: 1.6,
                    }}>
                        Diseño web premium + SEO local para negocios de alto ticket en Alicante y Costa Blanca.
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
                        }}
                    >
                        Solicitar presupuesto →
                    </a>
                </motion.div>
            </div>

            <style dangerouslySetInnerHTML={{ __html: `
                .hero-cta:hover { background: #CC0000 !important; }
                @media (max-width: 767px) {
                    .hero-cta { width: 100%; justify-content: center; }
                }
            `}} />
        </section>
    );
}
