"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const STEPS = [
    { num: "01", title: "Análisis y estrategia", desc: "Estudio del negocio, competencia y keywords. Arquitectura de la web definida antes de escribir una línea de código.", time: "Días 1–2" },
    { num: "02", title: "Diseño y wireframes", desc: "Estructura visual completa. Cada sección tiene un propósito claro antes de pasar al desarrollo.", time: "Días 3–5" },
    { num: "03", title: "Desarrollo", desc: "Construcción con Astro + React. SEO técnico integrado desde el primer commit, no añadido al final.", time: "Semana 2" },
    { num: "04", title: "Optimización y revisiones", desc: "Core Web Vitals, ajustes visuales, revisión conjunta. Máximo dos rondas de cambios.", time: "Semana 3" },
    { num: "05", title: "Lanzamiento", desc: "Deploy en producción, verificación en Google Search Console, entrega de accesos.", time: "Semana 4" },
];

function StepRow({ step, index, isInView }: { step: typeof STEPS[0]; index: number; isInView: boolean }) {
    const [hovered, setHovered] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 + index * 0.08, ease: [0.16, 1, 0.3, 1] }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className="step-row"
            style={{
                display: "grid",
                gridTemplateColumns: "80px 1fr auto",
                alignItems: "center",
                gap: "2rem",
                padding: "1.75rem 0",
                borderBottom: "1px solid rgba(8,8,8,0.08)",
                cursor: "default",
            }}
        >
            <span style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.7rem",
                color: hovered ? "#CC0000" : "rgba(8,8,8,0.2)",
                letterSpacing: "0.15em",
                transition: "color 0.3s",
                fontWeight: 500,
            }}>
                {step.num}
            </span>

            <div>
                <div style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 400,
                    fontSize: "clamp(1.1rem, 2vw, 1.4rem)",
                    color: "#080808",
                    letterSpacing: "-0.02em",
                    marginBottom: "0.4rem",
                }}>
                    {step.title}
                </div>
                <div style={{
                    fontFamily: "var(--font-body)",
                    fontWeight: 300,
                    fontSize: "0.875rem",
                    color: "rgba(8,8,8,0.45)",
                    lineHeight: 1.6,
                }}>
                    {step.desc}
                </div>
            </div>

            <span className="step-time" style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.65rem",
                color: "rgba(8,8,8,0.3)",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                whiteSpace: "nowrap",
                fontWeight: 500,
            }}>
                {step.time}
            </span>
        </motion.div>
    );
}

export default function ElTimeline() {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, amount: 0.15 });

    return (
        <section
            id="el-proceso"
            ref={sectionRef}
            aria-label="Proceso de trabajo ABG Frame"
            style={{ background: "#F2F0ED", padding: "6rem 0 7rem" }}
        >
            <div style={{ width: "100%", maxWidth: "1400px", margin: "0 auto", padding: "0 clamp(1.5rem, 5vw, 5rem)" }}>

                <div style={{ marginBottom: "4rem" }}>
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5 }}
                        style={{ fontFamily: "var(--font-body)", fontSize: "0.62rem", color: "#CC0000", textTransform: "uppercase", letterSpacing: "0.25em", marginBottom: "1.25rem", fontWeight: 500 }}
                    >
                        EL PROCESO
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.75, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                        style={{ fontFamily: "var(--font-display)", fontWeight: 400, fontSize: "clamp(2.5rem, 5vw, 4.5rem)", color: "#080808", letterSpacing: "-0.03em", lineHeight: 1, margin: 0 }}
                    >
                        De cero a visible.<br />
                        <span style={{ color: "rgba(8,8,8,0.25)", fontStyle: "italic" }}>Cuatro semanas.</span>
                    </motion.h2>
                </div>

                <div style={{ display: "flex", flexDirection: "column" }}>
                    {STEPS.map((step, i) => (
                        <StepRow key={step.num} step={step} index={i} isInView={isInView} />
                    ))}
                </div>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                @media (max-width: 767px) {
                    .step-row { grid-template-columns: 48px 1fr !important; }
                    .step-time { display: none !important; }
                }
                `
            }} />
        </section>
    );
}
