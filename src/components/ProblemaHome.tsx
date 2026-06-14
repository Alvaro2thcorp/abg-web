"use client";

import React from "react";
import { motion } from "framer-motion";

export default function ProblemaHome() {
    return (
        <section style={{
            background: "#F2F0ED",
            padding: "clamp(6rem, 12vw, 10rem) 0",
            position: "relative",
            overflow: "hidden",
        }}>
            <div style={{
                maxWidth: "1400px",
                width: "100%",
                margin: "0 auto",
                padding: "0 clamp(1.5rem, 5vw, 5rem)",
            }}>
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.5 }}
                    style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "0.7rem",
                        fontWeight: 500,
                        color: "#CC0000",
                        textTransform: "uppercase",
                        letterSpacing: "0.25em",
                        marginBottom: "3rem",
                    }}
                >
                    01 — La diferencia
                </motion.div>

                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                    style={{
                        fontFamily: "'DM Serif Display', serif",
                        fontWeight: 400,
                        fontSize: "clamp(2.5rem, 6vw, 5.5rem)",
                        color: "#080808",
                        lineHeight: 1.05,
                        letterSpacing: "-0.03em",
                        margin: 0,
                        maxWidth: "1100px",
                    }}
                >
                    Tu web no es un escaparate.
                    <br />
                    <span style={{ fontStyle: "italic", color: "#CC0000" }}>
                        Es tu mejor comercial.
                    </span>
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    style={{
                        fontFamily: "'Inter', sans-serif",
                        fontWeight: 300,
                        fontSize: "clamp(1rem, 1.4vw, 1.15rem)",
                        color: "rgba(8,8,8,0.55)",
                        lineHeight: 1.6,
                        marginTop: "3rem",
                        maxWidth: "560px",
                    }}
                >
                    Trabaja para ti las 24 horas. Atrae a la gente correcta, transmite lo que tu negocio vale y convierte visitas en clientes reales — sin que tengas que estar encima.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.9, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    style={{
                        marginTop: "clamp(4rem, 8vw, 6rem)",
                        maxWidth: "640px",
                        background: "#080808",
                        borderRadius: "6px",
                        padding: "clamp(2rem, 4vw, 3rem)",
                        position: "relative",
                        overflow: "hidden",
                        boxShadow: "0 24px 60px rgba(8,8,8,0.15)",
                    }}
                >
                    {/* Línea decorativa superior tipo recibo */}
                    <div style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        height: "4px",
                        background: "linear-gradient(90deg, transparent 0%, #CC0000 50%, transparent 100%)",
                    }} />

                    <div style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "0.6rem",
                        fontWeight: 500,
                        color: "#CC0000",
                        textTransform: "uppercase",
                        letterSpacing: "0.3em",
                        marginBottom: "2rem",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}>
                        <span>Ticket nº 001</span>
                        <span style={{ color: "rgba(242,240,237,0.3)" }}>ABG FRAME</span>
                    </div>

                    <div style={{
                        fontFamily: "'DM Serif Display', serif",
                        fontWeight: 400,
                        fontSize: "clamp(1.4rem, 2.5vw, 1.9rem)",
                        color: "#F2F0ED",
                        lineHeight: 1.25,
                        letterSpacing: "-0.02em",
                        marginBottom: "2rem",
                    }}>
                        Coste de no tener una web a la altura:
                    </div>

                    <div style={{
                        fontFamily: "'DM Serif Display', serif",
                        fontStyle: "italic",
                        fontWeight: 400,
                        fontSize: "clamp(2rem, 4vw, 3rem)",
                        color: "#CC0000",
                        lineHeight: 1,
                        letterSpacing: "-0.03em",
                        marginBottom: "2.5rem",
                    }}>
                        Incalculable.
                    </div>

                    <div style={{
                        borderTop: "1px dashed rgba(242,240,237,0.15)",
                        paddingTop: "1.5rem",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        flexWrap: "wrap",
                        gap: "1rem",
                    }}>
                        <div>
                            <div style={{
                                fontFamily: "'Inter', sans-serif",
                                fontSize: "0.65rem",
                                fontWeight: 500,
                                color: "rgba(242,240,237,0.4)",
                                textTransform: "uppercase",
                                letterSpacing: "0.2em",
                                marginBottom: "0.4rem",
                            }}>
                                Coste de tenerla
                            </div>
                            <div style={{
                                fontFamily: "'DM Serif Display', serif",
                                fontWeight: 400,
                                fontSize: "1.4rem",
                                color: "#F2F0ED",
                                letterSpacing: "-0.01em",
                            }}>
                                Pregúntanos.
                            </div>
                        </div>

                        <a
                            href="/contacto"
                            style={{
                                display: "inline-flex",
                                alignItems: "center",
                                gap: "0.5rem",
                                background: "#F2F0ED",
                                color: "#080808",
                                fontFamily: "'Inter', sans-serif",
                                fontWeight: 500,
                                fontSize: "0.8rem",
                                padding: "0.8rem 1.6rem",
                                borderRadius: "4px",
                                textDecoration: "none",
                                letterSpacing: "0.05em",
                                textTransform: "uppercase",
                                transition: "background 0.2s, color 0.2s",
                            }}
                            onMouseEnter={(e) => { e.currentTarget.style.background = "#CC0000"; e.currentTarget.style.color = "#F2F0ED"; }}
                            onMouseLeave={(e) => { e.currentTarget.style.background = "#F2F0ED"; e.currentTarget.style.color = "#080808"; }}
                        >
                            Solicitar presupuesto →
                        </a>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
