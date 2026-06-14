"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const SERVICIOS = [
    {
        num: "01",
        tag: "Diseño y Desarrollo",
        titulo: "Web a medida",
        subtitulo: "Hecha pieza por pieza para tu negocio.",
        items: [
            "Diseño visual a medida (cero plantillas)",
            "Desarrollo en Astro + React + Tailwind",
            "Adaptada a móvil desde el primer día",
            "Velocidad técnica con Core Web Vitals altos",
            "Estructura preparada para Google",
            "Formularios conectados y operativos",
        ],
        precio: "Desde 2.000€",
        mantenimiento: "Mantenimiento mensual recomendado",
    },
    {
        num: "02",
        tag: "Visibilidad",
        titulo: "SEO + Contenido",
        subtitulo: "Para que te encuentren en tu zona.",
        items: [
            "Investigación de palabras clave reales",
            "Arquitectura SEO desde el primer commit",
            "Contenido editorial mensual",
            "Optimización Google Business Profile",
            "Schema markup y datos estructurados",
            "Informes mensuales claros",
        ],
        precio: "Desde 350€/mes",
        mantenimiento: "Servicio recurrente, sin permanencia",
    },
    {
        num: "03",
        tag: "Sistema completo",
        titulo: "Web + SEO + Redes",
        subtitulo: "Todo coordinado desde un solo equipo.",
        items: [
            "Web premium a medida",
            "SEO técnico y de contenido",
            "Redes sociales con estrategia editorial",
            "Meta Ads opcional cuando aplica",
            "Acompañamiento mensual continuo",
            "Un único responsable de todo",
        ],
        precio: "Desde 4.500€ + 450€/mes",
        mantenimiento: "Sin permanencia",
        destacado: true,
    },
];

export default function ServiciosBento() {
    const sectionRef = useRef<HTMLElement | null>(null);
    const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

    return (
        <section
            ref={sectionRef}
            style={{
                background: "#F2F0ED",
                padding: "clamp(5rem, 10vw, 8rem) 0",
                position: "relative",
                overflow: "hidden",
            }}
        >
            <div style={{
                width: "100%",
                maxWidth: "1400px",
                margin: "0 auto",
                padding: "0 clamp(1.5rem, 5vw, 5rem)",
                position: "relative",
            }}>
                {/* Header */}
                <div style={{ marginBottom: "4rem", maxWidth: "900px" }}>
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5 }}
                        style={{
                            fontFamily: "'Inter', sans-serif",
                            fontSize: "0.65rem",
                            fontWeight: 500,
                            color: "#D14124",
                            textTransform: "uppercase",
                            letterSpacing: "0.25em",
                            marginBottom: "1.5rem",
                        }}
                    >
                        Lo que hacemos
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
                            marginBottom: "1.5rem",
                        }}
                    >
                        Tres servicios. <span style={{ fontStyle: "italic", color: "rgba(8,8,8,0.3)" }}>Una sola dirección.</span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 15 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.7, delay: 0.2 }}
                        style={{
                            fontFamily: "'Inter', sans-serif",
                            fontWeight: 300,
                            fontSize: "clamp(1rem, 1.3vw, 1.1rem)",
                            color: "rgba(8,8,8,0.55)",
                            lineHeight: 1.65,
                            margin: 0,
                            maxWidth: "640px",
                        }}
                    >
                        Cada proyecto se valora en función del alcance, el sector y el nivel de detalle. Como referencia general, los proyectos arrancan desde 2.000€ y siempre incluyen una mensualidad de mantenimiento técnico.
                    </motion.p>
                </div>

                {/* Cards grid */}
                <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
                    gap: "1.5rem",
                }}>
                    {SERVICIOS.map((s, i) => (
                        <ServicioCard key={s.num} servicio={s} index={i} isInView={isInView} />
                    ))}
                </div>

                {/* Nota inferior */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    style={{
                        marginTop: "3rem",
                        padding: "1.5rem 2rem",
                        background: "rgba(8,8,8,0.03)",
                        borderRadius: "4px",
                        borderLeft: "2px solid #D14124",
                    }}
                >
                    <p style={{
                        fontFamily: "'Inter', sans-serif",
                        fontWeight: 300,
                        fontSize: "0.85rem",
                        color: "rgba(8,8,8,0.65)",
                        lineHeight: 1.6,
                        margin: 0,
                    }}>
                        <strong style={{ fontWeight: 500, color: "#080808" }}>Cómo funciona el precio:</strong> cada proyecto se cierra después de una conversación inicial. El precio final depende del número de páginas, integraciones, idiomas y nivel de personalización. La mensualidad de mantenimiento cubre actualizaciones, copias de seguridad, mejoras de rendimiento y pequeños cambios. Sin sorpresas, sin letra pequeña.
                    </p>
                </motion.div>
            </div>
        </section>
    );
}

function ServicioCard({ servicio, index, isInView }: { servicio: typeof SERVICIOS[0]; index: number; isInView: boolean }) {
    const [hovered, setHovered] = useState(false);
    const destacado = servicio.destacado;

    return (
        <motion.article
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 + index * 0.1, ease: [0.16, 1, 0.3, 1] }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                position: "relative",
                background: destacado ? "#080808" : "#FFFFFF",
                border: destacado ? "1px solid rgba(242,240,237,0.08)" : "1px solid rgba(8,8,8,0.08)",
                borderRadius: "6px",
                padding: "clamp(1.75rem, 2.5vw, 2.5rem)",
                display: "flex",
                flexDirection: "column",
                overflow: "hidden",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                transform: hovered ? "translateY(-4px)" : "translateY(0)",
                boxShadow: hovered ? "0 24px 50px rgba(8,8,8,0.12)" : "0 0 0 rgba(0,0,0,0)",
                cursor: "default",
            }}
        >
            {/* Glow effect */}
            <div
                style={{
                    position: "absolute",
                    top: hovered ? "-30%" : "-60%",
                    left: hovered ? "-30%" : "-60%",
                    width: "180%",
                    height: "180%",
                    background: `radial-gradient(circle at top left, rgba(209,65,36,${hovered ? 0.18 : 0.06}) 0%, transparent 50%)`,
                    transition: "all 0.6s ease",
                    pointerEvents: "none",
                    zIndex: 0,
                }}
            />

            <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", height: "100%" }}>
                <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    marginBottom: "1.5rem",
                }}>
                    <span style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "0.62rem",
                        fontWeight: 500,
                        color: "#D14124",
                        textTransform: "uppercase",
                        letterSpacing: "0.25em",
                    }}>
                        {servicio.tag}
                    </span>
                    <span style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "0.62rem",
                        fontWeight: 500,
                        color: destacado ? "rgba(242,240,237,0.25)" : "rgba(8,8,8,0.25)",
                        letterSpacing: "0.15em",
                    }}>
                        {servicio.num}
                    </span>
                </div>

                <h3 style={{
                    fontFamily: "'DM Serif Display', serif",
                    fontWeight: 400,
                    fontSize: "clamp(1.6rem, 2.2vw, 2rem)",
                    color: destacado ? "#F2F0ED" : "#080808",
                    letterSpacing: "-0.02em",
                    lineHeight: 1.1,
                    margin: 0,
                    marginBottom: "0.5rem",
                }}>
                    {servicio.titulo}
                </h3>

                <p style={{
                    fontFamily: "'DM Serif Display', serif",
                    fontStyle: "italic",
                    fontWeight: 400,
                    fontSize: "1rem",
                    color: destacado ? "rgba(242,240,237,0.5)" : "rgba(8,8,8,0.45)",
                    lineHeight: 1.35,
                    margin: 0,
                    marginBottom: "2rem",
                }}>
                    {servicio.subtitulo}
                </p>

                <ul style={{
                    listStyle: "none",
                    margin: 0,
                    padding: 0,
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.75rem",
                    marginBottom: "2rem",
                    flexGrow: 1,
                }}>
                    {servicio.items.map((item, i) => (
                        <li key={i} style={{
                            fontFamily: "'Inter', sans-serif",
                            fontWeight: 300,
                            fontSize: "0.88rem",
                            color: destacado ? "rgba(242,240,237,0.65)" : "rgba(8,8,8,0.65)",
                            lineHeight: 1.5,
                            display: "flex",
                            gap: "0.6rem",
                            alignItems: "flex-start",
                        }}>
                            <span style={{
                                color: "#D14124",
                                flexShrink: 0,
                                fontSize: "0.7rem",
                                marginTop: "0.4rem",
                            }}>●</span>
                            <span>{item}</span>
                        </li>
                    ))}
                </ul>

                <div style={{
                    paddingTop: "1.5rem",
                    borderTop: destacado ? "1px solid rgba(242,240,237,0.08)" : "1px solid rgba(8,8,8,0.08)",
                }}>
                    <div style={{
                        fontFamily: "'DM Serif Display', serif",
                        fontWeight: 400,
                        fontSize: "1.4rem",
                        color: destacado ? "#F2F0ED" : "#080808",
                        letterSpacing: "-0.01em",
                        marginBottom: "0.25rem",
                    }}>
                        {servicio.precio}
                    </div>
                    <div style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "0.7rem",
                        fontWeight: 400,
                        color: destacado ? "rgba(242,240,237,0.4)" : "rgba(8,8,8,0.4)",
                        letterSpacing: "0.02em",
                    }}>
                        {servicio.mantenimiento}
                    </div>
                </div>
            </div>
        </motion.article>
    );
}
