"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

const ANTES = [
    "Una web heredada de hace años",
    "Frases genéricas que no dicen nada",
    "Cliente que entra y se va",
    "Invisible donde está tu cliente",
    "Dependes del boca a boca",
];

const DESPUES = [
    "Una web hecha a tu medida",
    "Cada palabra cuenta tu historia",
    "Cliente que entra y contacta",
    "Te encuentran cuando buscan",
    "Trabaja para ti cada día",
];

export default function ElTimeline() {
    const sectionRef = useRef<HTMLElement | null>(null);
    const isInView = useInView(sectionRef, { once: true, amount: 0.15 });

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"],
    });

    const dividerY = useTransform(scrollYProgress, [0.15, 0.55], [-30, 0]);
    const dividerOpacity = useTransform(scrollYProgress, [0.15, 0.45], [0, 1]);
    const glowOpacity = useTransform(scrollYProgress, [0.2, 0.5, 0.8], [0, 0.6, 0.3]);

    return (
        <section
            id="antes-despues"
            ref={sectionRef}
            aria-label="La diferencia ABG Frame"
            style={{
                background: "#F2F0ED",
                padding: "clamp(5rem, 10vw, 8rem) 0",
                position: "relative",
                overflow: "hidden",
            }}
        >
            {/* Glow rojo decorativo de fondo */}
            <motion.div
                style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: "60vw",
                    height: "60vw",
                    maxWidth: "900px",
                    maxHeight: "900px",
                    background: "radial-gradient(circle, rgba(209,65,36,0.06) 0%, transparent 60%)",
                    pointerEvents: "none",
                    opacity: glowOpacity,
                    zIndex: 0,
                }}
            />

            <div style={{
                width: "100%",
                maxWidth: "1400px",
                margin: "0 auto",
                padding: "0 clamp(1.5rem, 5vw, 5rem)",
                position: "relative",
                zIndex: 1,
            }}>
                <div style={{ marginBottom: "4rem" }}>
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5 }}
                        style={{
                            fontFamily: "'Inter', sans-serif",
                            fontSize: "0.7rem",
                            fontWeight: 500,
                            color: "#D14124",
                            textTransform: "uppercase",
                            letterSpacing: "0.25em",
                            marginBottom: "1.5rem",
                        }}
                    >
                        02 — El cambio
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                        style={{
                            fontFamily: "'DM Serif Display', serif",
                            fontWeight: 400,
                            fontSize: "clamp(2.2rem, 5vw, 4.5rem)",
                            color: "#080808",
                            lineHeight: 1,
                            letterSpacing: "-0.03em",
                            margin: 0,
                        }}
                    >
                        Lo que cambia <span style={{ fontStyle: "italic", color: "rgba(8,8,8,0.3)" }}>cuando trabajamos juntos.</span>
                    </motion.h2>
                </div>

                {/* Grid Antes/Después */}
                <div className="ad-grid" style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "0",
                    border: "1px solid rgba(8,8,8,0.1)",
                    borderRadius: "4px",
                    overflow: "hidden",
                    position: "relative",
                    background: "#F2F0ED",
                }}>
                    {/* Divisor vertical animado */}
                    <motion.div
                        className="ad-divider"
                        style={{
                            position: "absolute",
                            top: 0,
                            bottom: 0,
                            left: "50%",
                            width: "1px",
                            background: "linear-gradient(to bottom, transparent 0%, #D14124 50%, transparent 100%)",
                            opacity: dividerOpacity,
                            y: dividerY,
                            pointerEvents: "none",
                            zIndex: 2,
                        }}
                    />

                    {/* ANTES */}
                    <div style={{
                        padding: "clamp(2rem, 4vw, 3.5rem)",
                        background: "rgba(8,8,8,0.02)",
                        position: "relative",
                    }}>
                        <div style={{
                            fontFamily: "'Inter', sans-serif",
                            fontSize: "0.7rem",
                            fontWeight: 500,
                            color: "rgba(8,8,8,0.4)",
                            textTransform: "uppercase",
                            letterSpacing: "0.2em",
                            marginBottom: "2rem",
                        }}>
                            Antes
                        </div>
                        <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                            {ANTES.map((item, i) => (
                                <motion.li
                                    key={i}
                                    initial={{ opacity: 0, x: -20, filter: "blur(4px)" }}
                                    animate={isInView ? { opacity: 1, x: 0, filter: "blur(0px)" } : {}}
                                    transition={{ duration: 0.7, delay: 0.2 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                                    style={{
                                        fontFamily: "'DM Serif Display', serif",
                                        fontWeight: 400,
                                        fontSize: "clamp(1.1rem, 1.8vw, 1.5rem)",
                                        color: "rgba(8,8,8,0.4)",
                                        lineHeight: 1.3,
                                        letterSpacing: "-0.02em",
                                        textDecoration: "line-through",
                                        textDecorationColor: "rgba(209,65,36,0.5)",
                                        textDecorationThickness: "1.5px",
                                    }}
                                >
                                    {item}
                                </motion.li>
                            ))}
                        </ul>
                    </div>

                    {/* DESPUÉS */}
                    <div style={{
                        padding: "clamp(2rem, 4vw, 3.5rem)",
                        background: "#080808",
                        position: "relative",
                        overflow: "hidden",
                    }}>
                        {/* Shimmer decorativo */}
                        <motion.div
                            initial={{ x: "-100%" }}
                            animate={isInView ? { x: "200%" } : {}}
                            transition={{ duration: 2.5, delay: 0.6, ease: "easeOut" }}
                            style={{
                                position: "absolute",
                                top: 0,
                                left: 0,
                                width: "60%",
                                height: "100%",
                                background: "linear-gradient(90deg, transparent 0%, rgba(209,65,36,0.06) 50%, transparent 100%)",
                                pointerEvents: "none",
                            }}
                        />

                        <div style={{
                            fontFamily: "'Inter', sans-serif",
                            fontSize: "0.7rem",
                            fontWeight: 500,
                            color: "#D14124",
                            textTransform: "uppercase",
                            letterSpacing: "0.2em",
                            marginBottom: "2rem",
                            position: "relative",
                            zIndex: 1,
                        }}>
                            Después
                        </div>
                        <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "1.5rem", position: "relative", zIndex: 1 }}>
                            {DESPUES.map((item, i) => (
                                <motion.li
                                    key={i}
                                    initial={{ opacity: 0, x: 20, filter: "blur(4px)" }}
                                    animate={isInView ? { opacity: 1, x: 0, filter: "blur(0px)" } : {}}
                                    transition={{ duration: 0.8, delay: 0.5 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                                    style={{
                                        fontFamily: "'DM Serif Display', serif",
                                        fontWeight: 400,
                                        fontSize: "clamp(1.1rem, 1.8vw, 1.5rem)",
                                        color: "#F2F0ED",
                                        lineHeight: 1.3,
                                        letterSpacing: "-0.02em",
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "0.75rem",
                                    }}
                                >
                                    <motion.span
                                        initial={{ scale: 0 }}
                                        animate={isInView ? { scale: 1 } : {}}
                                        transition={{ duration: 0.5, delay: 0.7 + i * 0.12 }}
                                        style={{
                                            display: "inline-block",
                                            width: "6px",
                                            height: "6px",
                                            borderRadius: "50%",
                                            background: "#D14124",
                                            flexShrink: 0,
                                        }}
                                    />
                                    {item}
                                </motion.li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            <style dangerouslySetInnerHTML={{ __html: `
                @media (max-width: 767px) {
                    .ad-grid {
                        grid-template-columns: 1fr !important;
                    }
                    .ad-divider {
                        display: none !important;
                    }
                }
            `}} />
        </section>
    );
}
