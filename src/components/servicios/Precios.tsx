"use client";

import { motion } from "framer-motion";

export default function Precios() {
    const ease = [0.16, 1, 0.3, 1] as any;

    const tiers = [
        {
            name: "Solo Web Premium",
            desc: "Necesitas una web que convierta y posicione. Sin gestión mensual.",
            features: [
                "Diseño UX/UI exclusivo",
                "Desarrollo con Astro 5",
                "Performance 100/100",
                "Arquitectura SEO técnica",
                "Copywriting persuasivo"
            ],
            cta: "Hablar del proyecto →",
            href: "/contacto",
            accent: false
        },
        {
            name: "El Sistema Completo",
            desc: "Web + SEO + Social Ads. La forma en que trabajamos por defecto.",
            features: [
                "Web premium a medida incluida",
                "SEO local + posicionamiento EN",
                "Gestión de redes sociales",
                "Campañas Meta Ads ES/EN/FR",
                "Dashboard en tiempo real",
                "Soporte prioritario",
                "Sin permanencia"
            ],
            cta: "Ver El Sistema →",
            href: "/el-sistema",
            accent: true
        },
        {
            name: "SEO + Social Ads",
            desc: "Ya tienes web. Quieres escalar el tráfico y la captación.",
            features: [
                "SEO local + EN continuo",
                "Gestión de redes sociales",
                "Campañas Meta Ads activas",
                "Optimización mensual",
                "Informes de ROI"
            ],
            cta: "Hablar del proyecto →",
            href: "/contacto",
            accent: false
        }
    ];

    return (
        <section
            id="precios"
            style={{
                backgroundColor: "#F2F0ED",
                padding: "5rem clamp(1.5rem, 5vw, 5rem)",
                borderTop: "1px solid rgba(8, 8, 8, 0.06)",
                position: "relative",
            }}
        >
            <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
                <div style={{ textAlign: "center", maxWidth: "700px", margin: "0 auto 3rem" }}>
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
                        }}
                    >
                        ¿POR DÓNDE EMPEZAR?
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.1, ease }}
                        style={{
                            fontFamily: "var(--font-display)",
                            fontWeight: 800,
                            fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
                            color: "#080808",
                            letterSpacing: "-0.03em",
                            marginTop: "1.5rem",
                            lineHeight: 1.0,
                        }}
                    >
                        Elige tu punto
                        <br />
                        <span className="highlight-word">de entrada.</span>
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
                            marginTop: "1.5rem",
                            maxWidth: "560px",
                            margin: "1.5rem auto 0",
                        }}
                    >
                        Puedes empezar con el sistema completo
                        o con una pieza concreta. En ambos casos,
                        el objetivo es el mismo: más clientes de alto ticket.
                    </motion.p>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "2rem" }} className="pricing-grid">
                    {tiers.map((tier, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: i * 0.15, ease }}
                            style={{
                                background: tier.accent ? "#080808" : "#FFFFFF",
                                border: tier.accent ? "1px solid rgba(240, 78, 35, 0.3)" : "1px solid rgba(8, 8, 8, 0.08)",
                                borderRadius: "20px",
                                padding: "2rem",
                                display: "flex",
                                flexDirection: "column",
                                position: "relative",
                                overflow: "hidden",
                                transform: tier.accent ? "translateY(-8px)" : "none",
                                boxShadow: tier.accent ? "0 30px 60px rgba(8, 8, 8, 0.12)" : "none",
                                zIndex: tier.accent ? 2 : 1
                            }}
                            className={tier.accent ? "pricing-card-accent" : "pricing-card-normal"}
                        >
                            {tier.accent && (
                                <div className="recommend-badge" style={{
                                    position: "absolute",
                                    top: "1.5rem",
                                    right: "1.5rem",
                                    background: "#F04E23",
                                    color: "#080808",
                                    fontFamily: "var(--font-mono)",
                                    fontSize: "0.58rem",
                                    fontWeight: "bold",
                                    padding: "0.4rem 0.8rem",
                                    borderRadius: "100px",
                                    textTransform: "uppercase",
                                    letterSpacing: "0.1em"
                                }}>
                                    RECOMENDADO
                                </div>
                            )}

                            <div>
                                <h3 style={{
                                    fontFamily: "var(--font-display)",
                                    fontWeight: 700,
                                    fontSize: "1.5rem",
                                    color: tier.accent ? "#F2F0ED" : "#080808"
                                }}>
                                    {tier.name}
                                </h3>
                                <p style={{
                                    fontFamily: "var(--font-body)",
                                    fontWeight: 300,
                                    fontSize: "0.82rem",
                                    color: tier.accent ? "rgba(242, 240, 237, 0.45)" : "rgba(8, 8, 8, 0.45)",
                                    lineHeight: 1.6,
                                    marginTop: "0.5rem",
                                    marginBottom: "2rem",
                                    minHeight: "2.5rem"
                                }}>
                                    {tier.desc}
                                </p>
                            </div>

                            <div style={{ flexGrow: 1 }}>
                                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                                    {tier.features.map((feature, idx) => (
                                        <li key={idx} style={{
                                            display: "flex",
                                            alignItems: "flex-start",
                                            gap: "0.75rem",
                                            fontFamily: "var(--font-body)",
                                            fontSize: "0.9rem",
                                            fontWeight: 300,
                                            color: tier.accent ? "rgba(242, 240, 237, 0.55)" : "rgba(8, 8, 8, 0.55)"
                                        }}>
                                            <div style={{ width: "5px", height: "5px", background: "#F04E23", borderRadius: "50%", flexShrink: 0, marginTop: "6px" }} />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <a
                                href={tier.href}
                                style={{
                                    marginTop: "3rem",
                                    display: "block",
                                    width: "100%",
                                    textAlign: "center",
                                    padding: tier.accent ? "1rem 0" : "0.9rem 0",
                                    background: tier.accent ? "#F04E23" : "transparent",
                                    border: tier.accent ? "none" : "1.5px solid rgba(8, 8, 8, 0.15)",
                                    color: tier.accent ? "#080808" : "rgba(8, 8, 8, 0.6)",
                                    borderRadius: "100px",
                                    textDecoration: "none",
                                    fontFamily: "var(--font-display)",
                                    fontWeight: 700,
                                    fontSize: tier.accent ? "0.95rem" : "0.875rem",
                                    transition: "all 0.25s"
                                }}
                                className={tier.accent ? "pricing-btn-accent" : "pricing-btn-normal"}
                            >
                                {tier.cta}
                            </a>
                        </motion.div>
                    ))}
                </div>

                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.8 }}
                    style={{
                        textAlign: "center",
                        marginTop: "2.5rem",
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.55rem",
                        color: "rgba(8, 8, 8, 0.25)",
                        textTransform: "uppercase",
                        letterSpacing: "0.1em",
                    }}
                >
                    Consultoría inicial gratuita · Respuesta en 48h
                </motion.p>
            </div>

            {/* Transición Claro → Oscuro */}
            <div style={{ height: "1px", background: "rgba(8, 8, 8, 0.08)" }} />

            <style dangerouslySetInnerHTML={{
                __html: `
                .pricing-btn-normal:hover {
                    border-color: #F04E23 !important;
                    color: #F04E23 !important;
                }
                .pricing-btn-accent:hover {
                    opacity: 0.88;
                    transform: translateY(-2px);
                }

                @media (max-width: 1024px) {
                    .pricing-grid { grid-template-columns: 1fr !important; gap: 2rem !important; }
                    .pricing-card-accent { transform: none !important; }
                }

                @media (max-width: 767px) {
                    .pricing-grid {
                        gap: 1.2rem !important;
                    }
                    .pricing-card-accent {
                        border: 2px solid #F04E23 !important;
                        box-shadow: none !important;
                    }
                    .recommend-badge {
                        top: -1px !important;
                        right: 1.5rem !important;
                        font-size: 0.55rem !important;
                        padding: 0.3rem 0.8rem !important;
                    }
                }
            `}} />
        </section>
    );
}
