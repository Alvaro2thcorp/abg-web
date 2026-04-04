"use client";

import React from "react";
import { motion } from "framer-motion";

export default function ServicioWeb() {
    const ease = [0.16, 1, 0.3, 1] as any;

    const items = [
        "Diseño personalizado a medida",
        "Arquitectura SEO desde la estructura",
        "Core Web Vitals 100/100",
        "Schema markup completo",
        "Responsive y accesible",
        "Integración con analytics y CRM",
        "Entrega en 3-5 semanas"
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
            <div style={{ maxWidth: "1400px", margin: "0 auto", display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "4rem" }} className="web-service-grid">
                {/* Columna Izquierda */}
                <div>
                    <motion.span
                        initial={{ opacity: 0, x: -10 }}
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
                        01 — WEB PREMIUM
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
                        Una web que <br />
                        <span className="highlight-word">trabaja sola.</span>
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
                        Lo que la mayoría de agencias llaman "diseño a medida" es un template con el logo encima. Funciona. Hasta cierto punto. Cuando un cliente potencial compara tu web con la de un competidor que sí tiene una web real, tú pierdes. ABG Frame construye cada web desde cero, con la tecnología adecuada para cada proyecto, y el SEO no entra al final — entra en el primer commit. Si buscas una <strong>empresa de diseño web en Alicante</strong> que construya algo que dure, estás en el sitio correcto.
                    </motion.p>

                    <div style={{ marginTop: "2rem" }}>
                        <h4 style={{ fontFamily: "var(--font-mono)", fontSize: "0.58rem", color: "rgba(242, 240, 237, 0.3)", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: "1.5rem" }}>
                            QUÉ INCLUYE
                        </h4>
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
                                    <div style={{ width: "5px", height: "5px", background: "#F04E23", borderRadius: "50%" }} />
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
                            marginTop: "1.5rem",
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

                {/* Columna Derecha: Mockup Browser */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.4, ease }}
                    style={{ alignSelf: "center" }}
                >
                    <div style={{
                        background: "#0D0D0D",
                        border: "1px solid rgba(242, 240, 237, 0.08)",
                        borderRadius: "20px",
                        overflow: "hidden",
                        boxShadow: "0 40px 80px rgba(0,0,0,0.4)",
                        maxHeight: "380px"
                    }}>
                        {/* Browser Bar */}
                        <div style={{
                            height: "44px",
                            background: "#111111",
                            borderBottom: "1px solid rgba(242, 240, 237, 0.06)",
                            display: "flex",
                            alignItems: "center",
                            padding: "0 1.2rem",
                            gap: "0.5rem"
                        }}>
                            <div style={{ display: "flex", gap: "6px" }}>
                                <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#FF5F57" }} />
                                <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#FEBC2E" }} />
                                <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#28C840" }} />
                            </div>
                            <div style={{ flexGrow: 1, height: "22px", background: "rgba(242, 240, 237, 0.04)", borderRadius: "100px", margin: "0 1rem", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.55rem", color: "rgba(242, 240, 237, 0.2)" }}>abgframe.com/cliente</span>
                            </div>
                        </div>

                        {/* Contenido Mockup */}
                        <div style={{ padding: "1.5rem" }}>
                            <div style={{
                                background: "rgba(240, 78, 35, 0.08)",
                                border: "1px solid rgba(240, 78, 35, 0.1)",
                                borderRadius: "12px",
                                padding: "1.5rem"
                            }}>
                                <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.1rem", color: "#F2F0ED", maxWidth: "200px" }}>El sistema digital que convierte</div>
                                <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.55rem", color: "rgba(242, 240, 237, 0.3)", marginTop: "0.5rem" }}>Náutica de lujo · Mediterráneo</div>
                                <div style={{
                                    display: "inline-block",
                                    padding: "0.4rem 1.2rem",
                                    background: "#F04E23",
                                    color: "#080808",
                                    fontFamily: "var(--font-display)",
                                    fontWeight: 700,
                                    fontSize: "0.7rem",
                                    borderRadius: "100px",
                                    marginTop: "0.8rem"
                                }}>
                                    Contactar →
                                </div>
                            </div>

                            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "0.75rem", marginTop: "1rem" }}>
                                {[
                                    { val: "98", label: "PERFORMANCE" },
                                    { val: "100", label: "SEO SCORE" },
                                    { val: "100", label: "ACCESIBILIDAD" }
                                ].map((m, i) => (
                                    <div key={i} style={{ background: "rgba(242, 240, 237, 0.03)", border: "1px solid rgba(242, 240, 237, 0.06)", borderRadius: "8px", padding: "1rem 0.5rem", textAlign: "center" }}>
                                        <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.4rem", color: "#F04E23" }}>{m.val}</div>
                                        <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.45rem", color: "rgba(242, 240, 237, 0.3)", marginTop: "0.2rem" }}>{m.label}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Transición Negro → Blanco */}
            <div style={{height:'1px', background:'rgba(242,240,237,0.06)'}} />

            <style dangerouslySetInnerHTML={{
                __html: `
                .service-sistema-link-dark:hover { color: #F04E23 !important; }
                
                @media (max-width: 1024px) {
                    .web-service-grid { grid-template-columns: 1fr !important; gap: 4rem !important; }
                }
            `}} />
        </section>
    );
}
