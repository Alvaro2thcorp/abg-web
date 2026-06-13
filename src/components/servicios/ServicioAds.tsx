"use client";

import React from "react";
import { motion } from "framer-motion";

export default function ServicioAds() {
    const ease = [0.16, 1, 0.3, 1] as any;

    const items = [
        "Auditoría de demanda y palabras clave",
        "Campañas de búsqueda Meta Ads (Instagram, Facebook)",
        "Segmentación geográfica por zona",
        "Landing pages optimizadas para conversión",
        "Seguimiento de conversiones configurado",
        "Retargeting en Display y YouTube",
        "Optimización continua de pujas y anuncios",
        "Informe mensual de ROI real"
    ];

    const bars = [
        { h: "40%", d: "L" },
        { h: "55%", d: "M" },
        { h: "35%", d: "X" },
        { h: "70%", d: "J" },
        { h: "60%", d: "V" },
        { h: "85%", d: "S" },
        { h: "100%", d: "D", current: true }
    ];

    return (
        <section
            style={{
                backgroundColor: "#080808",
                padding: "5rem clamp(1.5rem, 5vw, 5rem)",
                borderTop: "1px solid rgba(242, 240, 237, 0.06)",
                position: "relative",
            }}
        >
            <div style={{ maxWidth: "1400px", margin: "0 auto", display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: "4rem" }} className="ads-service-grid">

                {/* Columna Izquierda: Texto */}
                <div>
                    <motion.span
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, ease }}
                        style={{
                            fontFamily: "var(--font-mono)",
                            fontSize: "0.6rem",
                            color: "#CC0000",
                            textTransform: "uppercase",
                            letterSpacing: "0.15em",
                            display: "block",
                        }}
                    >
                        03 — GOOGLE ADS
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.1, ease }}
                        style={{
                            fontFamily: "var(--font-display)",
                            fontWeight: 800,
                            fontSize: "clamp(2.2rem, 4vw, 4rem)",
                            color: "#F2F0ED",
                            lineHeight: 1.0,
                            letterSpacing: "-0.03em",
                            marginTop: "1.5rem",
                        }}
                    >
                        Anuncios para <br />
                        <span className="highlight-word">quien ya busca.</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2, ease }}
                        style={{
                            fontFamily: "var(--font-body)",
                            fontWeight: 300,
                            fontSize: "0.9rem",
                            color: "rgba(242, 240, 237, 0.45)",
                            lineHeight: 1.85,
                            marginTop: "2rem",
                            maxWidth: "480px",
                        }}
                    >
                        El SEO tarda en llegar. Meta Ads no. Mientras el orgánico escala, los anuncios capturan demanda activa — personas que ya están buscando lo que tú ofreces. No usamos Meta Ads para generar conciencia de marca ni para llenar métricas vacías. Lo usamos con un objetivo: conseguir leads que se conviertan en clientes de <strong>alto ticket</strong>.
                    </motion.p>

                    <div style={{ marginTop: "3rem" }}>
                        <div style={{ display: "flex", flexDirection: "column" }}>
                            {items.map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -10 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: 0.3 + (i * 0.05), ease }}
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "1rem",
                                        padding: "1rem 0",
                                        borderBottom: i === items.length - 1 ? "none" : "1px solid rgba(242, 240, 237, 0.06)",
                                    }}
                                >
                                    <div style={{ width: "5px", height: "5px", background: "#CC0000", borderRadius: "50%" }} />
                                    <span style={{ fontFamily: "var(--font-body)", fontWeight: 300, fontSize: "0.9rem", color: "rgba(242, 240, 237, 0.55)" }}>
                                        {item}
                                    </span>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    <a
                        href="/el-sistema"
                        style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "0.5rem",
                            marginTop: "2.5rem",
                            fontFamily: "var(--font-mono)",
                            fontSize: "0.65rem",
                            color: "rgba(242, 240, 237, 0.25)",
                            textTransform: "uppercase",
                            letterSpacing: "0.12em",
                            textDecoration: "none",
                            transition: "color 0.2s"
                        }}
                        className="service-sistema-link-dark"
                    >
                        Ver qué incluye El Sistema →
                    </a>
                </div>

                {/* Columna Derecha: Dashboard Ads */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.4, ease }}
                    style={{ alignSelf: "center" }}
                    className="ads-mockup-col"
                >
                    <div style={{
                        background: "#0D0D0D",
                        border: "1px solid rgba(242, 240, 237, 0.08)",
                        borderRadius: "20px",
                        overflow: "hidden",
                        maxHeight: "320px"
                    }}>
                        {/* Dashboard Header */}
                        <div style={{
                            padding: "1rem 1.5rem",
                            borderBottom: "1px solid rgba(242, 240, 237, 0.06)",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center"
                        }}>
                            <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", color: "rgba(242, 240, 237, 0.3)" }}>google_ads_dashboard.live</span>
                            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                                <div className="pulse-dot-green" style={{ width: "6px", height: "6px", backgroundColor: "#4CAF50", borderRadius: "50%" }} />
                                <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", color: "#4CAF50" }}>LIVE</span>
                            </div>
                        </div>

                        {/* Contenido Dashboard */}
                        <div style={{ padding: "1.5rem", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                            {/* Grid Métricas */}
                            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "0.75rem" }}>
                                {[
                                    { val: "A medida", label: "COSTE POR LEAD" },
                                    { val: "4.8x", label: "ROAS" },
                                    { val: "23", label: "LEADS HOY" }
                                ].map((m, i) => (
                                    <div key={i} style={{ background: "rgba(242, 240, 237, 0.03)", border: "1px solid rgba(242, 240, 237, 0.06)", borderRadius: "10px", padding: "1rem 0.5rem", textAlign: "center" }}>
                                        <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.4rem", color: "#F2F0ED" }}>{m.val}</div>
                                        <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.45rem", color: "rgba(242, 240, 237, 0.3)", marginTop: "0.2rem" }}>{m.label}</div>
                                    </div>
                                ))}
                            </div>

                            {/* Gráfica de Barras */}
                            <div style={{ marginTop: "0.5rem" }}>
                                <h5 style={{ fontFamily: "var(--font-mono)", fontSize: "0.5rem", color: "rgba(242, 240, 237, 0.2)", marginBottom: "1.5rem", textTransform: "uppercase" }}>LEADS ÚLTIMOS 7 DÍAS</h5>
                                <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", height: "80px", gap: "6px" }}>
                                    {bars.map((bar, i) => (
                                        <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem" }}>
                                            <motion.div
                                                initial={{ height: 0 }}
                                                whileInView={{ height: bar.h }}
                                                viewport={{ once: true }}
                                                transition={{ duration: 1, delay: 0.6 + (i * 0.1), ease }}
                                                style={{
                                                    width: "100%",
                                                    background: bar.current ? "#CC0000" : "rgba(204, 0, 0, 0.3)",
                                                    borderRadius: "3px 3px 0 0"
                                                }}
                                            />
                                            <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.45rem", color: "rgba(242, 240, 237, 0.2)" }}>{bar.d}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Transición Negro → Blanco */}
            <div style={{height:'1px', background:'rgba(242,240,237,0.06)'}} />

            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes pulse-green {
                    0%, 100% { opacity: 1; transform: scale(1); }
                    50% { opacity: 0.5; transform: scale(0.8); }
                }
                .pulse-dot-green { animation: pulse-green 2s infinite; }
                .service-sistema-link-dark:hover { color: #CC0000 !important; }
                
                @media (max-width: 1024px) {
                    .ads-service-grid { grid-template-columns: 1fr !important; gap: 4rem !important; }
                }
            `}} />
        </section>
    );
}
