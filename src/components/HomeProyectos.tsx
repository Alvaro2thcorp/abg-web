"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const PROYECTOS = [
    {
        num: "01",
        sector: "Náutica · Lujo",
        titulo: "Yates Alicante",
        descripcion: "Plataforma de charter náutico premium. Web diseñada para captar clientes de alto ticket desde el primer día.",
        url: "/proyectos/yates-alicante",
        disponible: true,
        imagen: null,
    },
    {
        num: "02",
        sector: "Arquitectura · Interiorismo",
        titulo: "Estudio de Arquitectura",
        descripcion: "Web de presentación para estudio especializado en proyectos residenciales de lujo. Portfolio visual y narrativa de autor.",
        url: "/proyectos/arquitectura",
        disponible: false,
        imagen: null,
    },
    {
        num: "03",
        sector: "Legal · Servicios Premium",
        titulo: "Despacho Jurídico",
        descripcion: "Web corporativa para abogada especialista. Posicionamiento de autoridad y captación de clientes de alto valor.",
        url: "/proyectos/abogada",
        disponible: false,
        imagen: null,
    },
];

export default function HomeProyectos() {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

    return (
        <section
            ref={sectionRef}
            aria-label="Proyectos seleccionados"
            style={{ background: "#F2F0ED", padding: "clamp(5rem, 10vw, 8rem) 0" }}
        >
            <div style={{
                width: "100%",
                maxWidth: "1400px",
                margin: "0 auto",
                padding: "0 clamp(1.5rem, 5vw, 5rem)",
            }}>
                <div style={{
                    marginBottom: "4rem",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-end",
                    flexWrap: "wrap",
                    gap: "2rem",
                }}>
                    <div>
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.5 }}
                            style={{
                                fontFamily: "'Inter', sans-serif",
                                fontSize: "0.7rem",
                                fontWeight: 500,
                                color: "#CC0000",
                                textTransform: "uppercase",
                                letterSpacing: "0.25em",
                                marginBottom: "1.5rem",
                            }}
                        >
                            03 — Trabajo reciente
                        </motion.div>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                            style={{
                                fontFamily: "'DM Serif Display', serif",
                                fontWeight: 400,
                                fontSize: "clamp(2.2rem, 5vw, 4.5rem)",
                                color: "#080808",
                                lineHeight: 1,
                                letterSpacing: "-0.03em",
                                margin: 0,
                            }}
                        >
                            Algunos <span style={{ fontStyle: "italic", color: "rgba(8,8,8,0.3)" }}>de los nuestros.</span>
                        </motion.h2>
                    </div>
                </div>

                <div style={{ display: "flex", flexDirection: "column" }}>
                    {PROYECTOS.map((p, i) => (
                        <motion.a
                            key={p.num}
                            href={p.disponible ? p.url : "#"}
                            initial={{ opacity: 0, y: 24 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.7, delay: 0.1 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                            onClick={(e) => { if (!p.disponible) e.preventDefault(); }}
                            className="proyecto-row"
                            style={{
                                display: "grid",
                                gridTemplateColumns: "80px 1.2fr 2fr auto",
                                alignItems: "center",
                                gap: "2rem",
                                padding: "2rem 0",
                                borderTop: i === 0 ? "1px solid rgba(8,8,8,0.1)" : "none",
                                borderBottom: "1px solid rgba(8,8,8,0.1)",
                                textDecoration: "none",
                                cursor: p.disponible ? "pointer" : "default",
                                opacity: p.disponible ? 1 : 0.6,
                                transition: "opacity 0.2s",
                            }}
                        >
                            <span style={{
                                fontFamily: "'Inter', sans-serif",
                                fontSize: "0.7rem",
                                fontWeight: 500,
                                color: "rgba(8,8,8,0.3)",
                                letterSpacing: "0.15em",
                            }}>
                                {p.num}
                            </span>

                            <div>
                                <div style={{
                                    fontFamily: "'Inter', sans-serif",
                                    fontSize: "0.65rem",
                                    fontWeight: 500,
                                    color: "rgba(8,8,8,0.45)",
                                    textTransform: "uppercase",
                                    letterSpacing: "0.2em",
                                    marginBottom: "0.5rem",
                                }}>
                                    {p.sector}
                                </div>
                                <div style={{
                                    fontFamily: "'DM Serif Display', serif",
                                    fontWeight: 400,
                                    fontSize: "clamp(1.4rem, 2.5vw, 2rem)",
                                    color: "#080808",
                                    letterSpacing: "-0.02em",
                                    lineHeight: 1.1,
                                }}>
                                    {p.titulo}
                                </div>
                            </div>

                            <p style={{
                                fontFamily: "'Inter', sans-serif",
                                fontWeight: 300,
                                fontSize: "0.95rem",
                                color: "rgba(8,8,8,0.55)",
                                lineHeight: 1.55,
                                margin: 0,
                            }}>
                                {p.descripcion}
                            </p>

                            <span style={{
                                fontFamily: "'Inter', sans-serif",
                                fontSize: "0.75rem",
                                fontWeight: 500,
                                color: p.disponible ? "#CC0000" : "rgba(8,8,8,0.35)",
                                textTransform: "uppercase",
                                letterSpacing: "0.15em",
                                whiteSpace: "nowrap",
                            }}>
                                {p.disponible ? "Ver →" : "Próximamente"}
                            </span>
                        </motion.a>
                    ))}
                </div>
            </div>

            <style dangerouslySetInnerHTML={{ __html: `
                .proyecto-row:hover { background: rgba(8,8,8,0.02); }
                @media (max-width: 767px) {
                    .proyecto-row {
                        grid-template-columns: 1fr !important;
                        gap: 1rem !important;
                    }
                }
            `}} />
        </section>
    );
}
