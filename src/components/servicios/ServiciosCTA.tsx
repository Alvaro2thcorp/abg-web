"use client";

import React from "react";
import { motion } from "framer-motion";

export default function ServiciosCTA() {
    const ease = [0.16, 1, 0.3, 1] as any;

    return (
        <section
            style={{
                backgroundColor: "#080808",
                padding: "5rem clamp(1.5rem, 5vw, 5rem)",
                position: "relative",
                overflow: "hidden",
                textAlign: "center"
            }}
        >
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "1px", background: "#F04E23", opacity: 0.4 }} />

            {/* Elemento decorativo de fondo */}
            <div style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: "60vw",
                height: "60vw",
                background: "radial-gradient(circle, rgba(240, 78, 35, 0.05) 0%, transparent 70%)",
                pointerEvents: "none"
            }} />

            <div style={{ maxWidth: "900px", margin: "0 auto", position: "relative", zIndex: 1 }}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease }}
                    style={{
                        display: "inline-flex",
                        border: "1px solid rgba(242, 240, 237, 0.08)",
                        borderRadius: "12px",
                        margin: "0 auto 2.5rem",
                        overflow: "hidden"
                    }}
                >
                    <div style={{ padding: "1rem 2rem", textAlign: "center", borderRight: "1px solid rgba(242, 240, 237, 0.08)" }}>
                        <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.4rem", color: "#F2F0ED" }}>87%</div>
                        <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.52rem", color: "rgba(242, 240, 237, 0.25)", textTransform: "uppercase", letterSpacing: "0.1em", display: "block", marginTop: "0.3rem" }}>TRÁFICO DESDE SEO</span>
                    </div>
                    <div style={{ padding: "1rem 2rem", textAlign: "center", borderRight: "1px solid rgba(242, 240, 237, 0.08)" }}>
                        <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.4rem", color: "#F2F0ED" }}>4.8x</div>
                        <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.52rem", color: "rgba(242, 240, 237, 0.25)", textTransform: "uppercase", letterSpacing: "0.1em", display: "block", marginTop: "0.3rem" }}>RETORNO EN ADS</span>
                    </div>
                    <div style={{ padding: "1rem 2rem", textAlign: "center" }}>
                        <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.4rem", color: "#F2F0ED" }}>3-5 sem</div>
                        <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.52rem", color: "rgba(242, 240, 237, 0.25)", textTransform: "uppercase", letterSpacing: "0.1em", display: "block", marginTop: "0.3rem" }}>ENTREGA WEB</span>
                    </div>
                </motion.div>

                <motion.span
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease }}
                    style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.6rem",
                        color: "#F04E23",
                        textTransform: "uppercase",
                        letterSpacing: "0.2em",
                        display: "block"
                    }}
                >
                    EL MOMENTO ES AHORA
                </motion.span>

                <motion.h2
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease }}
                    style={{
                        fontFamily: "var(--font-display)",
                        fontWeight: 800,
                        fontSize: "clamp(2.2rem, 4.5vw, 4.5rem)",
                        color: "#F2F0ED",
                        letterSpacing: "-0.04em",
                        lineHeight: 1.0,
                        marginTop: "2rem"
                    }}
                >
                    Tu competencia ya está <br />
                    <span className="highlight-word">invirtiendo en esto.</span>
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2, ease }}
                    style={{
                        fontFamily: "var(--font-body)",
                        fontWeight: 300,
                        fontSize: "1.1rem",
                        color: "rgba(242, 240, 237, 0.45)",
                        lineHeight: 1.8,
                        marginTop: "1.5rem",
                        maxWidth: "600px",
                        marginInline: "auto"
                    }}
                >
                    Hablemos. Cuéntanos qué hace tu negocio y ABG Frame te dirá, con honestidad, si tiene sentido trabajar juntos y por dónde empezar. Sin compromiso.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.4, ease }}
                    style={{ marginTop: "2rem" }}
                >
                    <a
                        href="/contacto"
                        style={{
                            display: "inline-block",
                            background: "#F04E23",
                            color: "#080808",
                            fontFamily: "var(--font-display)",
                            fontWeight: 800,
                            fontSize: "1.1rem",
                            padding: "1.2rem 3.5rem",
                            borderRadius: "100px",
                            textDecoration: "none",
                            transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)"
                        }}
                        className="final-cta-btn"
                    >
                        Empezar ahora
                    </a>

                    <div>
                        <a
                            href="https://wa.me/34601058997"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                                display: "inline-flex",
                                alignItems: "center",
                                gap: "0.6rem",
                                marginTop: "1.5rem",
                                textDecoration: "none"
                            }}
                            className="wa-link-new"
                        >
                            <div style={{
                                width: "20px",
                                height: "20px",
                                borderRadius: "50%",
                                background: "rgba(37, 211, 102, 0.15)",
                                border: "1px solid rgba(37, 211, 102, 0.3)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center"
                            }}>
                                <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.5rem", color: "#25D366" }}>W</span>
                            </div>
                            <span className="wa-text" style={{ fontFamily: "Epilogue, sans-serif", fontWeight: 300, fontSize: "0.85rem", color: "rgba(242, 240, 237, 0.35)", transition: "color 0.2s" }}>
                                Escríbenos por WhatsApp
                            </span>
                        </a>
                    </div>
                </motion.div>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                .final-cta-btn:hover { 
                    transform: translateY(-4px) scale(1.02); 
                    box-shadow: 0 20px 40px rgba(240, 78, 35, 0.2);
                    filter: brightness(1.1);
                }
                .wa-link-new:hover .wa-text { color: rgba(242, 240, 237, 0.6) !important; }
            `}} />
        </section>
    );
}
