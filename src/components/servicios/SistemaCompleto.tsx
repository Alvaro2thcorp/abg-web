"use client";

import React from "react";
import { motion } from "framer-motion";

export default function SistemaCompleto() {
    const ease = [0.16, 1, 0.3, 1] as any;

    return (
        <section
            style={{
                backgroundColor: "#F2F0ED",
                padding: "5rem clamp(1.5rem, 5vw, 5rem)",
                borderTop: "1px solid rgba(8, 8, 8, 0.06)",
                position: "relative",
                overflow: "hidden"
            }}
        >
            {/* ELEMENTO DECORATIVO de fondo */}
            <div
                style={{
                    position: "absolute",
                    right: "-2rem",
                    bottom: "-3rem",
                    fontFamily: "var(--font-display)",
                    fontWeight: 800,
                    fontSize: "22vw",
                    lineHeight: 1,
                    color: "rgba(8, 8, 8, 0.03)",
                    pointerEvents: "none",
                    userSelect: "none"
                }}
            >
                SISTEMA
            </div>

            <div style={{ maxWidth: "1400px", margin: "0 auto", position: "relative", zIndex: 1 }}>
                {/* HEADER */}
                <div style={{ maxWidth: "700px", marginBottom: "3rem" }}>
                    <motion.span
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease }}
                        style={{
                            fontFamily: "var(--font-mono)",
                            fontSize: "0.6rem",
                            color: "#CC0000",
                            textTransform: "uppercase",
                            letterSpacing: "0.2em",
                            marginBottom: "1.2rem",
                            display: "block"
                        }}
                    >
                        EL SISTEMA COMPLETO
                    </motion.span>

                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease }}
                        style={{
                            fontFamily: "var(--font-display)",
                            fontWeight: 800,
                            fontSize: "clamp(2.2rem, 4.5vw, 4.5rem)",
                            color: "#080808",
                            lineHeight: 1.0,
                            letterSpacing: "-0.03em"
                        }}
                    >
                        Tres servicios. <br />
                        <span className="highlight-word">Una máquina.</span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease }}
                        style={{
                            fontFamily: "var(--font-body)",
                            fontWeight: 300,
                            fontSize: "0.9rem",
                            color: "rgba(8, 8, 8, 0.5)",
                            lineHeight: 1.9,
                            marginTop: "1.2rem",
                            maxWidth: "520px"
                        }}
                    >
                        Una web rápida mejora el SEO. El SEO trae tráfico que la web convierte. Los Ads aceleran mientras el orgánico madura. No son tres piezas sueltas — funcionan porque están construidas para encajar.
                    </motion.p>
                </div>

                {/* BLOQUE CENTRAL: diagrama de flujo horizontal */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2, ease }}
                    style={{
                        marginTop: "2.5rem",
                        display: "flex",
                        alignItems: "stretch",
                        gap: 0,
                        border: "1px solid rgba(8, 8, 8, 0.08)",
                        borderRadius: "16px",
                        overflow: "hidden",
                    }}
                    className="flow-diagram-container"
                >
                    {/* BLOQUE 1 — WEB */}
                    <div style={{ flex: 1, padding: "1.5rem", borderRight: "1px solid rgba(8, 8, 8, 0.08)", background: "#FFFFFF" }}>
                        <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", color: "#CC0000", border: "1px solid rgba(204, 0, 0, 0.25)", borderRadius: "4px", padding: "0.2rem 0.5rem", display: "inline-block" }}>
                            01
                        </span>
                        <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.1rem", color: "#080808", marginTop: "1rem" }}>
                            Web Premium
                        </h3>
                        <p style={{ fontFamily: "var(--font-body)", fontWeight: 300, fontSize: "0.85rem", color: "rgba(8, 8, 8, 0.45)", marginTop: "0.5rem", lineHeight: 1.6 }}>
                            Convierte el tráfico en clientes.
                        </p>
                        <div style={{ marginTop: "1.5rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontFamily: "var(--font-mono)", fontSize: "0.55rem", color: "rgba(8, 8, 8, 0.35)", textTransform: "uppercase" }}>
                                <span style={{ color: "#CC0000" }}>·</span> Core Web Vitals 100
                            </div>
                            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontFamily: "var(--font-mono)", fontSize: "0.55rem", color: "rgba(8, 8, 8, 0.35)", textTransform: "uppercase" }}>
                                <span style={{ color: "#CC0000" }}>·</span> SEO técnico integrado
                            </div>
                        </div>
                    </div>

                    {/* FLECHA 1-2 */}
                    <div className="flow-arrow" style={{ width: "40px", flexShrink: 0, background: "rgba(8, 8, 8, 0.02)", borderRight: "1px solid rgba(8, 8, 8, 0.08)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <span style={{ fontFamily: "var(--font-display)", fontWeight: 300, fontSize: "1rem", color: "rgba(8, 8, 8, 0.2)" }}>→</span>
                    </div>

                    {/* BLOQUE 2 — SEO */}
                    <div style={{ flex: 1, padding: "1.5rem", borderRight: "1px solid rgba(8, 8, 8, 0.08)", background: "#FFFFFF" }}>
                        <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", color: "#CC0000", border: "1px solid rgba(204, 0, 0, 0.25)", borderRadius: "4px", padding: "0.2rem 0.5rem", display: "inline-block" }}>
                            02
                        </span>
                        <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.1rem", color: "#080808", marginTop: "1rem" }}>
                            SEO Local Alicante
                        </h3>
                        <p style={{ fontFamily: "var(--font-body)", fontWeight: 300, fontSize: "0.85rem", color: "rgba(8, 8, 8, 0.45)", marginTop: "0.5rem", lineHeight: 1.6 }}>
                            Trae tráfico cualificado 24/7.
                        </p>
                        <div style={{ marginTop: "1.5rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontFamily: "var(--font-mono)", fontSize: "0.55rem", color: "rgba(8, 8, 8, 0.35)", textTransform: "uppercase" }}>
                                <span style={{ color: "#CC0000" }}>·</span> LOCAL · EN
                            </div>
                            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontFamily: "var(--font-mono)", fontSize: "0.55rem", color: "rgba(8, 8, 8, 0.35)", textTransform: "uppercase" }}>
                                <span style={{ color: "#CC0000" }}>·</span> +TRÁFICO ORGÁNICO
                            </div>
                        </div>
                    </div>

                    {/* FLECHA 2-3 */}
                    <div className="flow-arrow" style={{ width: "40px", flexShrink: 0, background: "rgba(8, 8, 8, 0.02)", borderRight: "1px solid rgba(8, 8, 8, 0.08)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <span style={{ fontFamily: "var(--font-display)", fontWeight: 300, fontSize: "1rem", color: "rgba(8, 8, 8, 0.2)" }}>→</span>
                    </div>

                    {/* BLOQUE 3 — ADS */}
                    <div style={{ flex: 1, padding: "1.5rem", background: "#FFFFFF" }}>
                        <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", color: "#CC0000", border: "1px solid rgba(204, 0, 0, 0.25)", borderRadius: "4px", padding: "0.2rem 0.5rem", display: "inline-block" }}>
                            03
                        </span>
                        <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.1rem", color: "#080808", marginTop: "1rem" }}>
                            Google Ads
                        </h3>
                        <p style={{ fontFamily: "var(--font-body)", fontWeight: 300, fontSize: "0.85rem", color: "rgba(8, 8, 8, 0.45)", marginTop: "0.5rem", lineHeight: 1.6 }}>
                            Captura demanda activa en Alicante.
                        </p>
                        <div style={{ marginTop: "1.5rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontFamily: "var(--font-mono)", fontSize: "0.55rem", color: "rgba(8, 8, 8, 0.35)", textTransform: "uppercase" }}>
                                <span style={{ color: "#CC0000" }}>·</span> BÚSQUEDA + DISPLAY
                            </div>
                            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontFamily: "var(--font-mono)", fontSize: "0.55rem", color: "rgba(8, 8, 8, 0.35)", textTransform: "uppercase" }}>
                                <span style={{ color: "#CC0000" }}>·</span> RETARGETING INCLUIDO
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* CTA BLOQUE */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.35, ease }}
                    style={{
                        marginTop: "2.5rem",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        flexWrap: "wrap",
                        gap: "2rem",
                        padding: "2rem",
                        background: "#080808",
                        borderRadius: "16px"
                    }}
                >
                    <p style={{
                        fontFamily: "var(--font-display)",
                        fontWeight: 600,
                        fontSize: "1.1rem",
                        color: "#F2F0ED",
                    }}>
                        Web + SEO + Google Ads. Todo integrado desde el día uno.
                    </p>

                    <div className="sistema-cta-wrapper" style={{ marginLeft: "auto" }}>
                        <a
                            href="/el-sistema"
                            style={{
                                display: "inline-block",
                                background: "#CC0000",
                                color: "#080808",
                                fontFamily: "var(--font-display)",
                                fontWeight: 700,
                                fontSize: "0.95rem",
                                padding: "1rem 2.2rem",
                                borderRadius: "100px",
                                textDecoration: "none",
                                transition: "opacity 0.2s"
                            }}
                            className="sistema-cta-btn"
                        >
                            Descubrir El Sistema →
                        </a>
                    </div>
                </motion.div>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                .sistema-cta-btn:hover {
                    opacity: 0.85;
                }
                
                @media (max-width: 1024px) {
                    .flow-diagram-container {
                        flex-direction: column;
                    }
                    .flow-arrow {
                        width: 100% !important;
                        height: 40px;
                        border-right: none !important;
                        border-bottom: 1px solid rgba(8, 8, 8, 0.08);
                    }
                    .flow-arrow span {
                        transform: rotate(90deg);
                    }
                    .sistema-cta-wrapper {
                        margin-left: 0 !important;
                        width: 100%;
                    }
                    .sistema-cta-wrapper a {
                        width: 100%;
                        text-align: center;
                    }
                }
            `}} />
        </section>
    );
}
