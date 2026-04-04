"use client";

import React from "react";
import { motion } from "framer-motion";

export default function ServicioSEO() {
    const ease = [0.16, 1, 0.3, 1] as any;

    const items = [
        "Auditoría técnica inicial",
        "Investigación de keywords ES/EN",
        "Arquitectura de URLs semántica",
        "SEO on-page continuo",
        "Schema markup y datos estructurados",
        "Google Business Profile optimizado",
        "Informes mensuales de posicionamiento",
        "Contenido optimizado mensual"
    ];

    return (
        <section
            style={{
                backgroundColor: "#F2F0ED",
                padding: "5rem clamp(1.5rem, 5vw, 5rem)",
                borderTop: "1px solid rgba(8, 8, 8, 0.06)",
                position: "relative",
            }}
        >
            <div style={{ maxWidth: "1400px", margin: "0 auto", display: "grid", gridTemplateColumns: "0.9fr 1.1fr", gap: "4rem" }} className="seo-service-grid">

                {/* Columna Izquierda: Mockup SERP */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease }}
                    style={{ alignSelf: "center", maxWidth: "480px" }}
                    className="seo-mockup-col"
                >
                    <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", color: "rgba(8, 8, 8, 0.3)", textTransform: "uppercase", marginBottom: "1.5rem" }}>
                        serp_preview.live
                    </div>

                    {/* Google Card 1 */}
                    <div style={{
                        background: "#FFFFFF",
                        borderRadius: "12px",
                        padding: "1.2rem 1.5rem",
                        boxShadow: "0 4px 20px rgba(8, 8, 8, 0.08)",
                        borderLeft: "3px solid #F04E23"
                    }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                            <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", color: "#4CAF50" }}>abgframe.com/cliente-nautica</div>
                            <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.55rem", color: "#F04E23", textTransform: "uppercase", fontWeight: "bold" }}>Posición #1</span>
                        </div>
                        <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1rem", color: "#080808", marginTop: "0.3rem" }}>
                            Alquiler Yates Lujo Alicante | Charter Premium Mediterráneo
                        </h3>
                        <p style={{ fontFamily: "var(--font-body)", fontWeight: 300, fontSize: "0.8rem", color: "rgba(8, 8, 8, 0.5)", marginTop: "0.3rem" }}>
                            Charter náutico premium en el Mediterráneo. Flota exclusiva de yates y barcos con patrón. Reserva online 100% segura.
                        </p>
                    </div>

                    {/* Google Card 2 (Blur/Fade) */}
                    <div style={{
                        background: "#FFFFFF",
                        borderRadius: "12px",
                        padding: "1.2rem 1.5rem",
                        marginTop: "0.75rem",
                        opacity: 0.35,
                        filter: "blur(0.5px)"
                    }}>
                        <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", color: "#888" }}>empresa-competencia.es</div>
                        <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1rem", color: "#444", marginTop: "0.3rem" }}>
                            Alquiler barcos Alicante - Empresa X
                        </h3>
                    </div>

                    {/* Google Card 3 (More Blur/Fade) */}
                    <div style={{
                        background: "#FFFFFF",
                        borderRadius: "12px",
                        padding: "1.2rem 1.5rem",
                        marginTop: "0.75rem",
                        opacity: 0.15,
                        filter: "blur(1px)"
                    }}>
                        <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", color: "#999" }}>otro-negocio.com</div>
                    </div>

                    {/* Métricas Inferiores */}
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginTop: "2rem" }}>
                        <div style={{ background: "rgba(8, 8, 8, 0.03)", border: "1px solid rgba(8, 8, 8, 0.08)", borderRadius: "10px", padding: "1.2rem" }}>
                            <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.8rem", color: "#080808", lineHeight: 1 }}>+340%</div>
                            <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.55rem", color: "rgba(8, 8, 8, 0.4)", textTransform: "uppercase", marginTop: "0.2rem" }}>TRÁFICO ORGÁNICO</div>
                        </div>
                        <div style={{ background: "rgba(8, 8, 8, 0.03)", border: "1px solid rgba(8, 8, 8, 0.08)", borderRadius: "10px", padding: "1.2rem" }}>
                            <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.8rem", color: "#080808", lineHeight: 1 }}>Local + EN</div>
                            <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.55rem", color: "rgba(8, 8, 8, 0.4)", textTransform: "uppercase", marginTop: "0.2rem" }}>ES · EN</div>
                        </div>
                    </div>
                </motion.div>

                {/* Columna Derecha: Texto */}
                <div>
                    <motion.span
                        initial={{ opacity: 0, x: 10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, ease }}
                        style={{
                            fontFamily: "var(--font-mono)",
                            fontSize: "0.6rem",
                            color: "#F04E23",
                            textTransform: "uppercase",
                            letterSpacing: "0.15em",
                            display: "block",
                        }}
                    >
                        02 — SEO LOCAL + EN
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
                            color: "#080808",
                            lineHeight: 1.0,
                            letterSpacing: "-0.03em",
                            marginTop: "1.5rem",
                        }}
                    >
                        Visibles donde <br />
                        <span className="highlight-word">están tus clientes.</span>
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
                            color: "rgba(8, 8, 8, 0.5)",
                            lineHeight: 1.85,
                            marginTop: "2rem",
                            maxWidth: "480px",
                        }}
                    >
                        El SEO local en Alicante tiene sus particularidades. No es lo mismo posicionar para búsquedas de turistas que llegan por la N-332 que para clientes locales que buscan un servicio de proximidad. ABG Frame conoce esa diferencia. El trabajo de <strong>posicionamiento web en Alicante</strong> va desde la arquitectura técnica hasta el contenido, con Google Business integrado desde el inicio. Sin trucos de corto plazo que quemen el dominio en seis meses.
                    </motion.p>

                    <div style={{ marginTop: "3rem" }}>
                        <h4 style={{ fontFamily: "var(--font-mono)", fontSize: "0.58rem", color: "rgba(8, 8, 8, 0.3)", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: "1.5rem" }}>
                            QUÉ INCLUYE
                        </h4>
                        <div style={{ display: "flex", flexDirection: "column" }}>
                            {items.map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: 10 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: 0.3 + (i * 0.05), ease }}
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "1rem",
                                        padding: "1rem 0",
                                        borderBottom: i === items.length - 1 ? "none" : "1px solid rgba(8, 8, 8, 0.06)",
                                    }}
                                >
                                    <div style={{ width: "5px", height: "5px", background: "#F04E23", borderRadius: "50%" }} />
                                    <span style={{ fontFamily: "var(--font-body)", fontWeight: 300, fontSize: "0.9rem", color: "rgba(8, 8, 8, 0.55)" }}>
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
                            color: "rgba(8, 8, 8, 0.25)",
                            textTransform: "uppercase",
                            letterSpacing: "0.12em",
                            textDecoration: "none",
                            transition: "color 0.2s"
                        }}
                        className="service-sistema-link-light"
                    >
                        Ver qué incluye El Sistema →
                    </a>
                </div>
            </div>

            {/* Transición Blanco → Negro */}
            <div style={{height:'1px', background:'rgba(8,8,8,0.08)'}} />

            <style dangerouslySetInnerHTML={{
                __html: `
                .service-sistema-link-light:hover { color: #F04E23 !important; }

                @media (min-width: 1025px) {
                    .seo-mockup-col { transform: scale(0.85); transform-origin: top left; }
                }

                @media (max-width: 1024px) {
                    .seo-service-grid { grid-template-columns: 1fr !important; gap: 4rem !important; }
                    .seo-mockup-col { order: 2; }
                }
            `}} />
        </section>
    );
}
