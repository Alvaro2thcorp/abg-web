"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const ANTES = [
    "Una web heredada de hace años",
    "Frases genéricas que no dicen nada",
    "Cliente que entra y se va",
    "Invisible en Google",
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
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, amount: 0.15 });

    return (
        <section
            id="antes-despues"
            ref={sectionRef}
            aria-label="La diferencia ABG Frame"
            style={{ background: "#F2F0ED", padding: "clamp(5rem, 10vw, 8rem) 0" }}
        >
            <div style={{
                width: "100%",
                maxWidth: "1400px",
                margin: "0 auto",
                padding: "0 clamp(1.5rem, 5vw, 5rem)",
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
                            color: "#CC0000",
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

                <div className="ad-grid" style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "0",
                    border: "1px solid rgba(8,8,8,0.1)",
                }}>
                    <div style={{
                        padding: "clamp(2rem, 4vw, 3.5rem)",
                        borderRight: "1px solid rgba(8,8,8,0.1)",
                        background: "rgba(8,8,8,0.02)",
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
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                                    transition={{ duration: 0.6, delay: 0.2 + i * 0.08 }}
                                    style={{
                                        fontFamily: "'DM Serif Display', serif",
                                        fontWeight: 400,
                                        fontSize: "clamp(1.1rem, 1.8vw, 1.5rem)",
                                        color: "rgba(8,8,8,0.4)",
                                        lineHeight: 1.3,
                                        letterSpacing: "-0.02em",
                                        textDecoration: "line-through",
                                        textDecorationColor: "rgba(204,0,0,0.4)",
                                        textDecorationThickness: "1px",
                                    }}
                                >
                                    {item}
                                </motion.li>
                            ))}
                        </ul>
                    </div>

                    <div style={{
                        padding: "clamp(2rem, 4vw, 3.5rem)",
                        background: "#080808",
                    }}>
                        <div style={{
                            fontFamily: "'Inter', sans-serif",
                            fontSize: "0.7rem",
                            fontWeight: 500,
                            color: "#CC0000",
                            textTransform: "uppercase",
                            letterSpacing: "0.2em",
                            marginBottom: "2rem",
                        }}>
                            Después
                        </div>
                        <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                            {DESPUES.map((item, i) => (
                                <motion.li
                                    key={i}
                                    initial={{ opacity: 0, x: 10 }}
                                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                                    transition={{ duration: 0.6, delay: 0.4 + i * 0.08 }}
                                    style={{
                                        fontFamily: "'DM Serif Display', serif",
                                        fontWeight: 400,
                                        fontSize: "clamp(1.1rem, 1.8vw, 1.5rem)",
                                        color: "#F2F0ED",
                                        lineHeight: 1.3,
                                        letterSpacing: "-0.02em",
                                    }}
                                >
                                    {item}
                                </motion.li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            <style dangerouslySetInnerHTML={{ __html: `
                @media (max-width: 767px) {
                    .ad-grid { grid-template-columns: 1fr !important; }
                    .ad-grid > div:first-child {
                        border-right: none !important;
                        border-bottom: 1px solid rgba(8,8,8,0.1) !important;
                    }
                }
            `}} />
        </section>
    );
}
