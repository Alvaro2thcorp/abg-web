"use client";

import React from "react";
import { motion } from "framer-motion";

export default function ServiciosHero() {
    const ease = [0.16, 1, 0.3, 1] as any;

    return (
        <section
            style={{
                backgroundColor: "#080808",
                minHeight: "70vh",
                display: "flex",
                flexDirection: "column",
                position: "relative",
                overflow: "hidden",
            }}
        >
            {/* ELEMENTO DE FONDO decorativo */}
            <div
                style={{
                    position: "absolute",
                    bottom: "-2rem",
                    right: "-2rem",
                    fontFamily: "var(--font-display)",
                    fontWeight: 800,
                    fontSize: "22vw",
                    lineHeight: 1,
                    color: "rgba(242, 240, 237, 0.025)",
                    pointerEvents: "none",
                    userSelect: "none",
                    zIndex: 0,
                }}
            >
                SERVICIOS
            </div>

            <div style={{ position: "relative", zIndex: 1, width: "100%", maxWidth: "1400px", margin: "0 auto", padding: "2rem clamp(1.5rem, 5vw, 5rem) 0" }}>
                {/* Breadcrumb */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease }}
                    style={{
                        marginBottom: "1rem",
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.6rem",
                        color: "rgba(242, 240, 237, 0.25)",
                        textTransform: "uppercase",
                        letterSpacing: "0.15em",
                    }}
                >
                    <a href="/" style={{ color: "inherit", textDecoration: "none", transition: "color 0.2s" }} className="breadcrumb-link">ABG</a> / Servicios
                </motion.div>
            </div>

            <div 
                className="hero-grid"
                style={{ 
                    position: "relative", 
                    zIndex: 1, 
                    width: "100%", 
                    maxWidth: "1400px", 
                    margin: "0 auto",
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "4rem",
                    alignItems: "end",
                    padding: "0 clamp(1.5rem, 5vw, 5rem) 5rem",
                    height: "100%",
                    flexGrow: 1
                }}
            >
                {/* COLUMNA IZQUIERDA — titular */}
                <div className="hero-left-col">
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1, ease }}
                        style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "0.6rem",
                            marginBottom: "2.5rem"
                        }}
                    >
                        <div className="pulse-dot-orange" style={{ width: "6px", height: "6px", backgroundColor: "#CC0000", borderRadius: "50%" }} />
                        <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", color: "rgba(242, 240, 237, 0.4)", textTransform: "uppercase", letterSpacing: "0.15em" }}>
                            SERVICIOS · ABG FRAME
                        </span>
                    </motion.div>

                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2, ease }}
                        >
                            <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(3rem, 9vw, 4rem)", color: "#F2F0ED", lineHeight: 0.95, letterSpacing: "-0.03em", margin: 0 }} className="hero-title">
                                Diseño web y SEO
                            </h1>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.3, ease }}
                        >
                            <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(3rem, 9vw, 4rem)", color: "#CC0000", lineHeight: 0.95, letterSpacing: "-0.03em", margin: 0 }} className="hero-title">
                                en Alicante.
                            </h1>
                        </motion.div>
                    </div>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.5, ease }}
                        style={{
                            fontFamily: "var(--font-body)",
                            fontWeight: 300,
                            fontSize: "1rem",
                            color: "rgba(242, 240, 237, 0.4)",
                            lineHeight: 1.85,
                            marginTop: "2.5rem",
                            maxWidth: "460px",
                            marginRight: "auto",
                            marginBottom: 0
                        }}
                    >
                        Hay agencias que te ofrecen veinte servicios. ABG Frame hace tres, bien hechos y conectados entre sí: <strong>diseño web premium</strong>, visibilidad orgánica con intención de compra real, y Meta Ads opcional para acelerar cuando el orgánico todavía está madurando.
                    </motion.p>
                </div>

                {/* COLUMNA DERECHA — 3 bloques verticales */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.4, ease }}
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 0,
                        border: "1px solid rgba(242, 240, 237, 0.08)",
                        borderRadius: "16px",
                        overflow: "hidden",
                        alignSelf: "end",
                        width: "100%"
                    }}
                    className="hero-right-col"
                >
                    {[
                        { tag: "01 — WEB PREMIUM", text: "Construida con la tecnología adecuada para cada proyecto. Sin atajos. Core Web Vitals > 95 desde el lanzamiento.", link: "#web-premium" },
                        { tag: "02 — SEO LOCAL", text: "Posicionamiento en Alicante y comarca. Google Business, arquitectura semántica, contenido local.", link: "#seo-local" },
                        { tag: "03 — GOOGLE ADS", text: "Campañas de búsqueda para captar demanda activa. Solo cuando tiene sentido para tu negocio.", link: "#social-ads" }
                    ].map((item, i) => (
                        <a 
                            key={i} 
                            href={item.link}
                            className="hero-service-block"
                            style={{
                                padding: "1.8rem 2rem",
                                borderBottom: i === 2 ? "none" : "1px solid rgba(242, 240, 237, 0.06)",
                                display: "flex",
                                flexDirection: "column",
                                gap: "0.4rem",
                                position: "relative",
                                textDecoration: "none",
                                background: "transparent",
                                transition: "background 0.25s"
                            }}
                        >
                            <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.55rem", color: "rgba(242, 240, 237, 0.25)", textTransform: "uppercase" }}>
                                {item.tag}
                            </span>
                            <span style={{ fontFamily: "var(--font-body)", fontWeight: 300, fontSize: "0.875rem", color: "rgba(242, 240, 237, 0.45)", lineHeight: 1.6, paddingRight: "1.5rem", marginTop: "0.1rem" }}>
                                {item.text}
                            </span>
                            <span 
                                className="hero-service-arrow"
                                style={{
                                    position: "absolute",
                                    right: "1.5rem",
                                    top: "50%",
                                    transform: "translateY(-50%)",
                                    fontFamily: "var(--font-display)",
                                    fontWeight: 300,
                                    fontSize: "0.9rem",
                                    color: "rgba(242, 240, 237, 0.15)",
                                    transition: "color 0.25s"
                                }}
                            >
                                →
                            </span>
                        </a>
                    ))}
                </motion.div>
            </div>

            {/* BARRA INFERIOR */}
            <div style={{ position: "relative", zIndex: 1, width: "100%", maxWidth: "1400px", margin: "0 auto", padding: "0 clamp(1.5rem, 5vw, 5rem) 3rem" }}>
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.6, ease }}
                    style={{
                        marginTop: "3rem",
                        paddingTop: "2rem",
                        borderTop: "1px solid rgba(242, 240, 237, 0.08)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        flexWrap: "wrap",
                        gap: "2rem"
                    }}
                    className="hero-bottom-bar"
                >
                    <div style={{ display: "flex", alignItems: "center", gap: "2rem", flexWrap: "wrap" }} className="bottom-bar-left">
                        <div style={{ display: "flex", flexDirection: "column", gap: "0.3rem" }}>
                            <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1rem", color: "#F2F0ED", lineHeight: "1" }}>Sistema unificado</span>
                            <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.52rem", color: "rgba(242, 240, 237, 0.25)", textTransform: "uppercase" }}>WEB · SEO · ADS</span>
                        </div>
                        
                        <div className="bottom-bar-separator" style={{ borderRight: "1px solid rgba(242, 240, 237, 0.08)", height: "2rem" }} />
                        
                        <div style={{ display: "flex", flexDirection: "column", gap: "0.3rem" }}>
                            <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1rem", color: "#F2F0ED", lineHeight: "1" }}>Sin permanencia</span>
                            <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.52rem", color: "rgba(242, 240, 237, 0.25)", textTransform: "uppercase" }}>SIN CONTRATOS</span>
                        </div>
                        
                        <div className="bottom-bar-separator" style={{ borderRight: "1px solid rgba(242, 240, 237, 0.08)", height: "2rem" }} />
                        
                        <div style={{ display: "flex", flexDirection: "column", gap: "0.3rem" }}>
                            <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1rem", color: "#F2F0ED", lineHeight: "1" }}>3 idiomas</span>
                            <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.52rem", color: "rgba(242, 240, 237, 0.25)", textTransform: "uppercase" }}>ES · EN · FR</span>
                        </div>

                        <div className="bottom-bar-separator" style={{ borderRight: "1px solid rgba(242, 240, 237, 0.08)", height: "2rem" }} />

                        <div style={{ display: "flex", flexDirection: "column", gap: "0.3rem" }}>
                            <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1rem", color: "#F2F0ED", lineHeight: "1" }}>Plataformas</span>
                            <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.52rem", color: "rgba(242, 240, 237, 0.25)", textTransform: "uppercase" }}>ASTRO · WP · SHOPIFY · WOO</span>
                        </div>
                    </div>

                    <a
                        href="/el-sistema"
                        style={{
                            border: "1px solid rgba(242, 240, 237, 0.12)",
                            borderRadius: "100px",
                            fontFamily: "var(--font-display)",
                            fontWeight: 700,
                            fontSize: "0.875rem",
                            color: "rgba(242, 240, 237, 0.5)",
                            padding: "0.8rem 1.8rem",
                            textDecoration: "none",
                            transition: "all 0.3s"
                        }}
                        className="hero-bottom-cta"
                    >
                        Ver El Sistema →
                    </a>
                </motion.div>
            </div>

            {/* Transición Negro → Blanco */}
            <div style={{ height: '1px', background: 'rgba(242,240,237,0.06)' }} />

            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes pulse-orange {
                    0%, 100% { opacity: 1; transform: scale(1); }
                    50% { opacity: 0.5; transform: scale(0.8); }
                }
                .pulse-dot-orange { animation: pulse-orange 2s infinite; }
                
                .breadcrumb-link:hover { color: #CC0000 !important; }
                
                .hero-service-block:hover {
                    background: rgba(242, 240, 237, 0.03) !important;
                }
                .hero-service-block:hover .hero-service-arrow {
                    color: #CC0000 !important;
                }
                
                .hero-bottom-cta:hover {
                    border-color: #CC0000 !important;
                    color: #CC0000 !important;
                }

                @media (min-width: 768px) {
                    .hero-title {
                        font-size: clamp(2.5rem, 4.5vw, 4.5rem) !important;
                    }
                }

                @media (max-width: 767px) {
                    .hero-grid {
                        grid-template-columns: 1fr !important;
                        gap: 0 !important;
                        padding-bottom: 3rem !important;
                    }
                    .hero-title {
                        font-size: clamp(2rem, 7vw, 2.5rem) !important;
                    }
                    .hero-right-col {
                        margin-top: 2.5rem !important;
                        order: 2;
                        align-self: flex-start !important;
                    }
                    .hero-left-col {
                        order: 1;
                    }
                    .hero-bottom-bar {
                        flex-wrap: wrap !important;
                        gap: 1rem !important;
                        align-items: center !important;
                        justify-content: flex-start !important;
                    }
                    .bottom-bar-left {
                        flex-direction: row !important;
                        flex-wrap: wrap !important;
                        gap: 1rem !important;
                        align-items: center !important;
                    }
                    .bottom-bar-separator {
                        display: block !important;
                        height: 1.5rem !important;
                    }
                    .hero-bottom-cta {
                        margin-top: 0;
                        width: 100%;
                        text-align: center;
                    }
                }
            `}} />
        </section>
    );
}
