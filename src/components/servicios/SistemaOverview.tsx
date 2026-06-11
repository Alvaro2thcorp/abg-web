"use client";

import { motion } from "framer-motion";

export default function SistemaOverview() {
    const ease = [0.16, 1, 0.3, 1] as any;

    const cards = [
        {
            num: "01",
            tag: "WEB PREMIUM",
            title: "Web Premium",
            desc: "La base del sistema. Diseñada para convertir, construida técnicamente para posicionarse.",
            stats: ["CORE WEB VITALS 100", "SEO TÉCNICO INTEGRADO"],
            href: "#web-premium"
        },
        {
            num: "02",
            tag: "SEO",
            title: "SEO Local Alicante",
            desc: "Aparece cuando tus clientes te buscan — en Alicante y en las búsquedas de mayor intención de tu sector.",
            stats: ["LOCAL", "+TRÁFICO ORGÁNICO"],
            href: "#seo-local"
        },
        {
            num: "03",
            tag: "GOOGLE ADS",
            title: "Google Ads",
            desc: "Campañas de búsqueda que capturan demanda activa en Alicante y provincia. Segmentación ES · EN · FR para negocios de alto ticket.",
            stats: ["ES · EN · FR", "RETARGETING INCLUIDO"],
            href: "#social-ads"
        }
    ];

    return (
        <section
            style={{
                backgroundColor: "#F2F0ED",
                padding: "5rem clamp(1.5rem, 5vw, 5rem)",
                position: "relative",
            }}
        >
            <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
                {/* Header */}
                <div style={{ maxWidth: "600px" }}>
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, ease }}
                        style={{
                            fontFamily: "var(--font-mono)",
                            fontSize: "0.6rem",
                            color: "#CC0000",
                            textTransform: "uppercase",
                            letterSpacing: "0.2em",
                            display: "block",
                        }}
                    >
                        POR QUÉ UN SISTEMA
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.1, ease }}
                        style={{
                            fontFamily: "var(--font-display)",
                            fontWeight: 800,
                            fontSize: "clamp(2rem, 4vw, 3.5rem)",
                            color: "#080808",
                            letterSpacing: "-0.03em",
                            marginTop: "1rem",
                        }}
                    >
                        Tres piezas. <span className="highlight-word">Un resultado.</span>
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
                            color: "rgba(8, 8, 8, 0.55)",
                            lineHeight: 1.9,
                            marginTop: "1.5rem",
                            maxWidth: "440px",
                        }}
                    >
                        No son parches sueltos. Es una ingeniería donde la web convierte el tráfico que trae el SEO, y los ads inyectan gasolina al motor desde el primer día. Separados son solo herramientas; juntos son un sistema de captación diseñado para negocios de alto ticket.
                    </motion.p>
                </div>

                {/* Diagrama Visual */}
                <div style={{ marginTop: "3rem", display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 0, border: "1px solid rgba(8, 8, 8, 0.08)", borderRadius: "20px", overflow: "hidden" }} className="overview-grid">
                    {cards.map((card, i) => (
                        <motion.a
                            href={card.href}
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                            className={`overview-card overview-card-${i}`}
                            style={{
                                padding: "2rem",
                                background: "transparent",
                                position: "relative",
                                overflow: "hidden",
                                borderRight: i === 2 ? "none" : "1px solid rgba(8, 8, 8, 0.08)",
                                textDecoration: "none",
                                display: "block"
                            }}
                        >
                            <div
                                style={{
                                    position: "absolute",
                                    bottom: "-1rem",
                                    right: "0.5rem",
                                    fontFamily: "var(--font-display)",
                                    fontWeight: 800,
                                    fontSize: "7rem",
                                    lineHeight: 1,
                                    color: "rgba(8, 8, 8, 0.04)",
                                    pointerEvents: "none",
                                    userSelect: "none",
                                    zIndex: 0
                                }}
                            >
                                {card.num}
                            </div>

                            <div style={{ position: "relative", zIndex: 1 }}>
                                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "2rem" }}>
                                    <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", color: "#CC0000", border: "1px solid rgba(204, 0, 0, 0.25)", borderRadius: "4px", padding: "0.2rem 0.5rem" }}>
                                        {card.num}
                                    </span>
                                    <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", color: "rgba(8, 8, 8, 0.35)", textTransform: "uppercase", letterSpacing: "0.12em" }}>
                                        {card.tag}
                                    </span>
                                </div>

                                <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.5rem", color: "#080808", lineHeight: 1.2, marginBottom: "0.75rem" }}>
                                    {card.title}
                                </h3>
                                <p style={{ fontFamily: "var(--font-body)", fontWeight: 300, fontSize: "0.875rem", color: "rgba(8, 8, 8, 0.5)", lineHeight: 1.75 }}>
                                    {card.desc}
                                </p>

                                <div style={{ margin: "1.5rem 0 0.75rem 0", height: "1px", background: "rgba(8, 8, 8, 0.06)" }} />

                                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "1rem" }}>
                                    {card.stats.map((s: string, si: number) => (
                                        <span key={si} style={{ fontFamily: "var(--font-mono)", fontSize: "0.5rem", color: "rgba(8, 8, 8, 0.4)", textTransform: "uppercase", border: "1px solid rgba(8, 8, 8, 0.1)", borderRadius: "4px", padding: "0.2rem 0.5rem" }}>{s}</span>
                                    ))}
                                </div>

                                <a
                                    href="/el-sistema"
                                    className="card-detail-link"
                                    style={{
                                        marginTop: "1.5rem",
                                        display: "inline-block",
                                        fontFamily: "var(--font-mono)",
                                        fontSize: "0.6rem",
                                        color: "#CC0000",
                                        textTransform: "uppercase",
                                        letterSpacing: "0.1em",
                                        textDecoration: "none",
                                        transition: "opacity 0.2s",
                                    }}
                                >
                                    Ver detalle →
                                </a>
                            </div>
                        </motion.a>
                    ))}
                </div>
            </div>

            {/* Bloque puente → El Sistema */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                style={{
                    background: "#080808",
                    padding: "3rem 2rem",
                    borderRadius: "16px",
                    marginTop: "2rem",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexWrap: "wrap" as const,
                    gap: "2rem",
                }}
            >
                <div>
                    <p
                        style={{
                            fontFamily: "var(--font-display)",
                            fontWeight: 700,
                            fontSize: "1.3rem",
                            color: "#F2F0ED",
                        }}
                    >
                        ¿Los quieres todos juntos?
                    </p>
                    <p
                        style={{
                            fontFamily: "var(--font-body)",
                            fontWeight: 300,
                            fontSize: "0.9rem",
                            color: "rgba(242,240,237,0.4)",
                            marginTop: "0.5rem",
                        }}
                    >
                        Web + SEO + Google Ads. Todo integrado en un solo sistema.
                    </p>
                </div>
                <a
                    href="/el-sistema"
                    className="sistema-bridge-btn"
                    style={{
                        background: "#CC0000",
                        color: "#080808",
                        fontFamily: "var(--font-display)",
                        fontWeight: 700,
                        fontSize: "0.95rem",
                        padding: "1rem 2rem",
                        borderRadius: "100px",
                        textDecoration: "none",
                        transition: "opacity 0.2s",
                        flexShrink: 0,
                    }}
                >
                    Ver El Sistema →
                </a>
            </motion.div>

            {/* Transición Blanco → Negro */}
            <div style={{height:'1px', background:'rgba(8,8,8,0.08)'}} />

            <style dangerouslySetInnerHTML={{
                __html: `
                .overview-card {
                    transition: background 0.3s ease;
                }
                .overview-card:hover {
                    background: rgba(8, 8, 8, 0.02) !important;
                }
                .card-link {
                    transition: gap 0.2s ease;
                }
                .card-detail-link:hover {
                    opacity: 0.7;
                }

                @media (max-width: 767px) {
                    .overview-grid { grid-template-columns: 1fr !important; }
                    .overview-card { border-right: none !important; border-bottom: 1px solid rgba(8, 8, 8, 0.08) !important; }
                    .overview-card-2 { border-bottom: none !important; }
                }
            `}} />
        </section>
    );
}
