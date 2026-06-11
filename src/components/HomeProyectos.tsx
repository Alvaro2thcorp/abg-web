"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;
const vp = { once: true, margin: "-80px" } as const;

const stats = [
    { val: "100/100", label: "CORE WEB VITALS" },
    { val: "< 1.5s", label: "TIEMPO DE CARGA" },
    { val: "Top 3", label: "POSICIÓN EN GOOGLE" },
    { val: "3", label: "IDIOMAS ES · EN · FR" },
];

export default function HomeProyectos() {
    const ref = useRef(null);
    const inView = useInView(ref, vp);

    return (
        <section
            ref={ref}
            style={{
                background: "#080808",
                padding: "4rem clamp(1.5rem,5vw,5rem)",
                position: "relative",
                overflow: "hidden",
            }}
        >
            {/* Decorativo fondo */}
            <div
                aria-hidden="true"
                style={{
                    position: "absolute",
                    right: "-2rem",
                    bottom: "-4rem",
                    fontFamily: "var(--font-display)",
                    fontWeight: 800,
                    fontSize: "30vw",
                    lineHeight: 1,
                    color: "rgba(242,240,237,0.02)",
                    pointerEvents: "none",
                    userSelect: "none",
                }}
            >
                →
            </div>

            <div
                className="hp-grid"
                style={{
                    maxWidth: "1400px",
                    margin: "0 auto",
                    display: "grid",
                    gridTemplateColumns: "60fr 40fr",
                    gap: "5rem",
                    alignItems: "center",
                    position: "relative",
                    zIndex: 1,
                }}
            >
                {/* ── Columna izquierda ──────────────────────────── */}
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.8, ease }}
                >
                    <span
                        style={{
                            display: "block",
                            fontFamily: "var(--font-mono)",
                            fontSize: "0.6rem",
                            color: "#CC0000",
                            textTransform: "uppercase",
                            letterSpacing: "0.15em",
                            marginBottom: "1.5rem",
                        }}
                    >
                        PROYECTOS
                    </span>

                    <h2
                        style={{
                            fontFamily: "var(--font-display)",
                            fontWeight: 800,
                            fontSize: "clamp(2rem,3.5vw,3.2rem)",
                            color: "#F2F0ED",
                            lineHeight: 0.95,
                            letterSpacing: "-0.04em",
                            marginBottom: "2rem",
                        }}
                        className="hp-h2"
                    >
                        De la sombra a
                        <br />
                        liderar tu sector
                        <br />
                        <span className="highlight-word">en Alicante.</span>
                    </h2>

                    <p
                        style={{
                            fontFamily: "var(--font-body)",
                            fontWeight: 300,
                            fontSize: "1rem",
                            color: "rgba(242,240,237,0.4)",
                            lineHeight: 1.85,
                            marginBottom: "2rem",
                            maxWidth: "400px",
                        }}
                    >
                        Caso Yates Alicante. Rediseñamos su plataforma desde cero con una estrategia agresiva de posicionamiento web. Resultados: captación multiplicada.
                    </p>

                    <div
                        className="hp-btns"
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            gap: "1rem",
                            flexWrap: "wrap",
                        }}
                    >
                        {/* <a
                            href="/proyectos"
                            className="hp-btn-primary"
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
                                display: "inline-block",
                            }}
                        >
                            Ver proyectos →
                        </a> */}
                        <a
                            href="/contacto"
                            className="hp-btn-secondary"
                            style={{
                                border: "1px solid rgba(242,240,237,0.12)",
                                color: "rgba(242,240,237,0.5)",
                                fontFamily: "var(--font-display)",
                                fontWeight: 600,
                                fontSize: "0.95rem",
                                padding: "1rem 2rem",
                                borderRadius: "100px",
                                textDecoration: "none",
                                transition: "border-color 0.3s, color 0.3s",
                                display: "inline-block",
                            }}
                        >
                            Empieza el tuyo
                        </a>
                    </div>
                </motion.div>

                {/* ── Columna derecha — grid 2x2 stats ──────────── */}
                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.15, ease }}
                    style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: "1rem",
                    }}
                >
                    {stats.map((s, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.25 + i * 0.08, ease }}
                            className="hp-stat-cell"
                            style={{
                                padding: "1.8rem",
                                border: "1px solid rgba(242,240,237,0.06)",
                                borderRadius: "16px",
                                background: "rgba(242,240,237,0.02)",
                                transition: "background 0.3s",
                            }}
                        >
                            <div
                                style={{
                                    fontFamily: "var(--font-display)",
                                    fontWeight: 800,
                                    fontSize: "2rem",
                                    color: "#F2F0ED",
                                    lineHeight: 1,
                                    marginBottom: "0.5rem",
                                }}
                            >
                                {s.val}
                            </div>
                            <div
                                style={{
                                    fontFamily: "var(--font-mono)",
                                    fontSize: "0.52rem",
                                    color: "rgba(242,240,237,0.25)",
                                    textTransform: "uppercase",
                                    letterSpacing: "0.08em",
                                }}
                            >
                                {s.label}
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                .hp-btn-primary:hover { opacity: 0.85; }
                .hp-btn-secondary:hover {
                    border-color: #CC0000 !important;
                    color: #CC0000 !important;
                }
                .hp-stat-cell:hover {
                    background: rgba(242,240,237,0.04) !important;
                }

                @media (max-width: 767px) {
                    .hp-grid {
                        grid-template-columns: 1fr !important;
                        gap: 3rem !important;
                    }
                    .hp-h2 {
                        font-size: clamp(2.2rem,8vw,3rem) !important;
                    }
                    .hp-btns {
                        flex-direction: column !important;
                    }
                    .hp-btns a {
                        width: 100% !important;
                        text-align: center !important;
                    }
                }
            `}} />
        </section>
    );
}
