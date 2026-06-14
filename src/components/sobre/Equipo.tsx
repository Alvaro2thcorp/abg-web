"use client";

import { motion } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as any;
const vp = { once: true, margin: "-60px" } as const;

export default function Equipo() {
    return (
        <section style={{
            background: "#080808",
            padding: "clamp(5rem, 10vw, 8rem) clamp(1.5rem, 5vw, 5rem)",
        }}>
            <div style={{ maxWidth: "1400px", margin: "0 auto" }}>

                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={vp}
                    transition={{ duration: 0.5, ease }}
                    style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "0.65rem",
                        fontWeight: 500,
                        color: "#D14124",
                        textTransform: "uppercase",
                        letterSpacing: "0.25em",
                        marginBottom: "4rem",
                    }}
                >
                    Quién hay detrás
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={vp}
                    transition={{ duration: 0.8, ease }}
                    style={{
                        display: "grid",
                        gridTemplateColumns: "auto 1fr",
                        gap: "clamp(3rem, 6vw, 6rem)",
                        alignItems: "start",
                    }}
                    className="equipo-grid"
                >
                    {/* Foto placeholder */}
                    <div style={{
                        width: "clamp(160px, 20vw, 260px)",
                        aspectRatio: "3/4",
                        background: "rgba(242,240,237,0.04)",
                        border: "1px solid rgba(242,240,237,0.08)",
                        borderRadius: "4px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                        overflow: "hidden",
                    }}>
                        {/* Cuando tengas la foto: <img src="/images/alvaro.jpg" alt="Álvaro Bergillos" style={{ width: "100%", height: "100%", objectFit: "cover" }} /> */}
                        <span style={{
                            fontFamily: "'Inter', sans-serif",
                            fontSize: "0.6rem",
                            fontWeight: 400,
                            color: "rgba(242,240,237,0.2)",
                            textTransform: "uppercase",
                            letterSpacing: "0.15em",
                            textAlign: "center",
                            padding: "1rem",
                        }}>
                            Foto próximamente
                        </span>
                    </div>

                    {/* Contenido */}
                    <div>
                        <h2 style={{
                            fontFamily: "'DM Serif Display', serif",
                            fontWeight: 400,
                            fontSize: "clamp(2rem, 4vw, 3.5rem)",
                            color: "#F2F0ED",
                            letterSpacing: "-0.02em",
                            lineHeight: 1.05,
                            margin: 0,
                            marginBottom: "0.5rem",
                        }}>
                            Álvaro Bergillos
                        </h2>

                        <div style={{
                            fontFamily: "'Inter', sans-serif",
                            fontSize: "0.7rem",
                            fontWeight: 500,
                            color: "rgba(242,240,237,0.4)",
                            textTransform: "uppercase",
                            letterSpacing: "0.2em",
                            marginBottom: "2.5rem",
                        }}>
                            Fundador y Desarrollador
                        </div>

                        <p style={{
                            fontFamily: "'Inter', sans-serif",
                            fontWeight: 300,
                            fontSize: "clamp(1rem, 1.3vw, 1.1rem)",
                            color: "rgba(242,240,237,0.55)",
                            lineHeight: 1.7,
                            margin: 0,
                            marginBottom: "1.5rem",
                            maxWidth: "560px",
                        }}>
                            Diseño cada proyecto de principio a fin. Desde la primera conversación hasta el lanzamiento. Sin intermediarios, sin equipos de cuenta, sin perder la visión por el camino.
                        </p>

                        <p style={{
                            fontFamily: "'Inter', sans-serif",
                            fontWeight: 300,
                            fontSize: "clamp(1rem, 1.3vw, 1.1rem)",
                            color: "rgba(242,240,237,0.55)",
                            lineHeight: 1.7,
                            margin: 0,
                            maxWidth: "560px",
                        }}>
                            ABG Frame nació de ver negocios increíbles de Alicante perder clientes por tener webs que no estaban a su altura. Eso tiene solución.
                        </p>

                        <div style={{
                            marginTop: "2rem",
                            display: "flex",
                            gap: "1.5rem",
                            alignItems: "center",
                        }}>
                            <span style={{
                                fontFamily: "'Inter', sans-serif",
                                fontSize: "0.65rem",
                                fontWeight: 500,
                                color: "rgba(242,240,237,0.35)",
                                textTransform: "uppercase",
                                letterSpacing: "0.2em",
                            }}>
                                Sígueme
                            </span>
                            <a
                                href="https://instagram.com/alvarobergillos"
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                    fontFamily: "'Inter', sans-serif",
                                    fontSize: "0.85rem",
                                    fontWeight: 500,
                                    color: "#F2F0ED",
                                    textDecoration: "none",
                                    borderBottom: "1px solid rgba(242,240,237,0.2)",
                                    paddingBottom: "2px",
                                    transition: "color 0.2s, border-color 0.2s",
                                }}
                                onMouseEnter={(e) => { e.currentTarget.style.color = "#D14124"; e.currentTarget.style.borderColor = "#D14124"; }}
                                onMouseLeave={(e) => { e.currentTarget.style.color = "#F2F0ED"; e.currentTarget.style.borderColor = "rgba(242,240,237,0.2)"; }}
                            >
                                @alvarobergillos
                            </a>
                        </div>

                        <div style={{
                            marginTop: "3rem",
                            paddingTop: "2rem",
                            borderTop: "1px solid rgba(242,240,237,0.06)",
                            display: "flex",
                            gap: "1rem",
                            flexWrap: "wrap",
                        }}>
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
                                    fontSize: "0.85rem",
                                    padding: "0.8rem 1.8rem",
                                    borderRadius: "4px",
                                    textDecoration: "none",
                                    transition: "background 0.2s",
                                }}
                                onMouseEnter={(e) => { e.currentTarget.style.background = "#D14124"; e.currentTarget.style.color = "#F2F0ED"; }}
                                onMouseLeave={(e) => { e.currentTarget.style.background = "#F2F0ED"; e.currentTarget.style.color = "#080808"; }}
                            >
                                Hablemos →
                            </a>
                            <a
                                href="/el-sistema"
                                style={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    fontFamily: "'Inter', sans-serif",
                                    fontWeight: 500,
                                    fontSize: "0.85rem",
                                    color: "rgba(242,240,237,0.4)",
                                    textDecoration: "none",
                                    padding: "0.8rem 1.8rem",
                                    border: "1px solid rgba(242,240,237,0.1)",
                                    borderRadius: "4px",
                                    transition: "all 0.2s",
                                }}
                                onMouseEnter={(e) => { e.currentTarget.style.color = "#F2F0ED"; e.currentTarget.style.borderColor = "rgba(242,240,237,0.3)"; }}
                                onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(242,240,237,0.4)"; e.currentTarget.style.borderColor = "rgba(242,240,237,0.1)"; }}
                            >
                                Ver cómo trabajo →
                            </a>
                        </div>
                    </div>
                </motion.div>
            </div>

            <style dangerouslySetInnerHTML={{ __html: `
                @media (max-width: 767px) {
                    .equipo-grid {
                        grid-template-columns: 1fr !important;
                    }
                }
            `}} />
        </section>
    );
}
