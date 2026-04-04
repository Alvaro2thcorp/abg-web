"use client";

import { motion } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as any;
const vp = { once: true, margin: "-60px" } as const;

export default function Equipo() {
    return (
        <section
            style={{
                backgroundColor: "#F2F0ED",
                padding: "4rem clamp(1.5rem, 5vw, 5rem)",
                borderTop: "1px solid rgba(8, 8, 8, 0.06)",
            }}
        >
            <div style={{ maxWidth: "1000px", margin: "0 auto" }}>

                {/* ── CABECERA ── */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={vp}
                    transition={{ duration: 0.7, ease }}
                    style={{ marginBottom: "4rem" }}
                >
                    <span style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.6rem",
                        color: "#F04E23",
                        textTransform: "uppercase",
                        letterSpacing: "0.15em",
                        display: "block",
                        marginBottom: "1.5rem"
                    }}>
                        QUIÉN HAY DETRÁS
                    </span>

                    <h2 style={{
                        fontFamily: "var(--font-display)",
                        fontWeight: 800,
                        fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
                        color: "#080808",
                        lineHeight: 0.95,
                        letterSpacing: "-0.03em",
                        margin: 0
                    }}>
                        Álvaro Bergillos
                        <span style={{
                            display: "block",
                            fontWeight: 300,
                            fontStyle: "italic",
                            fontSize: "0.5em",
                            color: "rgba(8, 8, 8, 0.25)",
                            letterSpacing: "-0.01em",
                            marginTop: "0.4rem"
                        }}>
                            Fundador · ABG Frame · San Juan de Alicante
                        </span>
                    </h2>
                </motion.div>

                {/* ── CITA GRANDE ── */}
                <motion.blockquote
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={vp}
                    transition={{ duration: 0.8, delay: 0.1, ease }}
                    style={{
                        borderLeft: "3px solid #F04E23",
                        paddingLeft: "2rem",
                        margin: "0 0 4rem 0",
                    }}
                >
                    <p style={{
                        fontFamily: "var(--font-display)",
                        fontWeight: 700,
                        fontSize: "clamp(1.2rem, 2.5vw, 1.6rem)",
                        color: "#080808",
                        lineHeight: 1.4,
                        letterSpacing: "-0.02em",
                        fontStyle: "italic",
                        margin: 0,
                        opacity: 0.75
                    }}>
                        "ABG Frame nació de ver negocios increíbles de Alicante perder clientes por tener webs lentas y ninguna estrategia de captación."
                    </p>
                </motion.blockquote>

                {/* ── 3 CREDENCIALES ── */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={vp}
                    transition={{ duration: 0.7, delay: 0.15, ease }}
                    className="credenciales-grid"
                    style={{ marginBottom: "4rem" }}
                >
                    {[
                        { val: "2021", label: "Fundación de ABG Frame" },
                        { val: "San Juan", label: "Base en San Juan de Alicante" },
                        { val: "Alto ticket", label: "Única especialización" },
                    ].map((item, i) => (
                        <div
                            key={i}
                            style={{
                                padding: "1.5rem 2rem",
                                border: "1px solid rgba(8, 8, 8, 0.08)",
                                borderRadius: "16px",
                                background: "#fff",
                            }}
                        >
                            <div style={{
                                fontFamily: "var(--font-display)",
                                fontWeight: 800,
                                fontSize: "1.4rem",
                                color: "#080808",
                                letterSpacing: "-0.02em",
                                marginBottom: "0.3rem"
                            }}>
                                {item.val}
                            </div>
                            <div style={{
                                fontFamily: "var(--font-mono)",
                                fontSize: "0.55rem",
                                color: "rgba(8, 8, 8, 0.35)",
                                textTransform: "uppercase",
                                letterSpacing: "0.08em"
                            }}>
                                {item.label}
                            </div>
                        </div>
                    ))}
                </motion.div>

                {/* ── BIO ── */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={vp}
                    transition={{ duration: 0.7, delay: 0.2, ease }}
                    className="bio-grid"
                    style={{ marginBottom: "4rem" }}
                >
                    <p style={{
                        fontFamily: "var(--font-body)",
                        fontWeight: 300,
                        fontSize: "1rem",
                        color: "rgba(8, 8, 8, 0.55)",
                        lineHeight: 1.85,
                        margin: 0
                    }}>
                        Álvaro Bergillos fundó ABG Frame en San Juan de Alicante con una convicción clara: las empresas con un producto excelente —náutica de lujo, inmobiliarias premium, clínicas— no deberían perder clientes frente a competidores con peor producto pero mejor presencia digital.
                    </p>
                    <p style={{
                        fontFamily: "var(--font-body)",
                        fontWeight: 300,
                        fontSize: "1rem",
                        color: "rgba(8, 8, 8, 0.55)",
                        lineHeight: 1.85,
                        margin: 0
                    }}>
                        En ABG Frame no hay comerciales. El cliente habla directamente con Álvaro o con Pablo — los que ejecutan el trabajo. El Sistema que han construido es el que hubieran querido encontrar: transparente, sin permanencias y enfocado 100% en el retorno de inversión. ABG Frame no cobra por horas — cobra porque genera resultados.
                    </p>
                </motion.div>

                {/* ── SEPARADOR + CTA ── */}
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={vp}
                    transition={{ duration: 0.6, delay: 0.25, ease }}
                    style={{
                        paddingTop: "2.5rem",
                        borderTop: "1px solid rgba(8, 8, 8, 0.08)",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        flexWrap: "wrap",
                        gap: "1.5rem"
                    }}
                >
                    <div style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.55rem",
                        color: "rgba(8, 8, 8, 0.3)",
                        textTransform: "uppercase",
                        letterSpacing: "0.1em"
                    }}>
                        Alicante, España · Desde 2021
                    </div>

                    <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
                        <a
                            href="/el-sistema"
                            className="equipo-cta-outline"
                            style={{
                                display: "inline-block",
                                border: "1px solid rgba(8, 8, 8, 0.12)",
                                color: "rgba(8, 8, 8, 0.5)",
                                fontFamily: "var(--font-display)",
                                fontWeight: 600,
                                fontSize: "0.875rem",
                                padding: "0.8rem 1.8rem",
                                borderRadius: "100px",
                                textDecoration: "none",
                                transition: "all 0.3s ease"
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.borderColor = "#080808";
                                e.currentTarget.style.color = "#080808";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.borderColor = "rgba(8, 8, 8, 0.12)";
                                e.currentTarget.style.color = "rgba(8, 8, 8, 0.5)";
                            }}
                        >
                            Ver El Sistema →
                        </a>
                        <a
                            href="/contacto"
                            className="equipo-cta"
                            style={{
                                display: "inline-block",
                                background: "#080808",
                                color: "#F2F0ED",
                                fontFamily: "var(--font-display)",
                                fontWeight: 700,
                                fontSize: "0.875rem",
                                padding: "0.8rem 1.8rem",
                                borderRadius: "100px",
                                textDecoration: "none",
                                transition: "background 0.3s ease, color 0.3s ease"
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.background = "#F04E23";
                                e.currentTarget.style.color = "#080808";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.background = "#080808";
                                e.currentTarget.style.color = "#F2F0ED";
                            }}
                        >
                            Hablemos →
                        </a>
                    </div>
                </motion.div>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                .credenciales-grid {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 1rem;
                }
                .bio-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 2.5rem;
                }
                @media (max-width: 767px) {
                    .credenciales-grid {
                        grid-template-columns: 1fr !important;
                    }
                    .bio-grid {
                        grid-template-columns: 1fr !important;
                        gap: 1.5rem !important;
                    }
                }
            `}} />
        </section>
    );
}
