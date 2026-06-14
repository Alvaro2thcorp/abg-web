"use client";

import { motion } from "framer-motion";

export default function SobreHero() {
    const ease = [0.16, 1, 0.3, 1] as any;

    return (
        <section style={{
            background: "#F2F0ED",
            minHeight: "auto",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            padding: "clamp(6rem, 14vh, 9rem) clamp(1.25rem, 5vw, 5rem) clamp(3rem, 6vw, 5rem)",
            position: "relative",
            overflow: "hidden",
        }}>
            {/* Texto decorativo de fondo */}
            <div style={{
                position: "absolute",
                bottom: "clamp(-2rem, -4vw, -4rem)",
                left: "50%",
                transform: "translateX(-50%)",
                fontFamily: "'DM Serif Display', serif",
                fontWeight: 400,
                fontSize: "clamp(8rem, 22vw, 24rem)",
                lineHeight: 1,
                color: "rgba(8,8,8,0.04)",
                pointerEvents: "none",
                userSelect: "none",
                whiteSpace: "nowrap",
                zIndex: 0,
            }}>
                NOSOTROS
            </div>

            <div style={{
                maxWidth: "1400px",
                width: "100%",
                margin: "0 auto",
                position: "relative",
                zIndex: 1,
            }}>
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease }}
                    style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "0.65rem",
                        fontWeight: 500,
                        color: "#D14124",
                        textTransform: "uppercase",
                        letterSpacing: "0.25em",
                        marginBottom: "2rem",
                    }}
                >
                    Sobre nosotros
                </motion.div>

                <h1 style={{ margin: 0 }}>
                    <div style={{ overflow: "hidden" }}>
                        <motion.span
                            initial={{ y: 80, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 1, delay: 0.1, ease }}
                            style={{
                                display: "block",
                                fontFamily: "'DM Serif Display', serif",
                                fontWeight: 400,
                                fontSize: "clamp(2.2rem, 6vw, 5.5rem)",
                                color: "#080808",
                                lineHeight: 0.95,
                                letterSpacing: "-0.03em",
                            }}
                        >
                            No trabajamos para todos.
                        </motion.span>
                    </div>
                    <div style={{ overflow: "hidden" }}>
                        <motion.span
                            initial={{ y: 80, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 1, delay: 0.2, ease }}
                            style={{
                                display: "block",
                                fontFamily: "'DM Serif Display', serif",
                                fontStyle: "italic",
                                fontWeight: 400,
                                fontSize: "clamp(2.2rem, 6vw, 5.5rem)",
                                color: "#D14124",
                                lineHeight: 0.95,
                                letterSpacing: "-0.03em",
                            }}
                        >
                            Solo para los que lo merecen.
                        </motion.span>
                    </div>
                </h1>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    style={{
                        marginTop: "clamp(2rem, 4vw, 3rem)",
                        paddingTop: "clamp(1.5rem, 3vw, 2rem)",
                        borderTop: "1px solid rgba(8,8,8,0.1)",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        flexWrap: "wrap",
                        gap: "1.5rem",
                    }}
                >
                    <p style={{
                        fontFamily: "'Inter', sans-serif",
                        fontWeight: 300,
                        fontSize: "clamp(0.9rem, 1.4vw, 1.05rem)",
                        color: "rgba(8,8,8,0.45)",
                        margin: 0,
                        maxWidth: "480px",
                        lineHeight: 1.6,
                    }}>
                        ABG Frame es el proyecto de Álvaro Bergillos. Sin comerciales, sin intermediarios. El que diseña es el que habla contigo.
                    </p>
                    <a
                        href="/contacto"
                        style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "0.5rem",
                            fontFamily: "'Inter', sans-serif",
                            fontWeight: 500,
                            fontSize: "0.85rem",
                            color: "#080808",
                            textDecoration: "none",
                            borderBottom: "1px solid rgba(8,8,8,0.3)",
                            paddingBottom: "2px",
                            letterSpacing: "0.02em",
                            transition: "color 0.2s, border-color 0.2s",
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.color = "#D14124";
                            e.currentTarget.style.borderColor = "#D14124";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.color = "#080808";
                            e.currentTarget.style.borderColor = "rgba(8,8,8,0.3)";
                        }}
                    >
                        Hablemos →
                    </a>
                </motion.div>
            </div>
        </section>
    );
}
