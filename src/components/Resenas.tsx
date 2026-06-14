"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";

const reviews = [
    {
        num: "01",
        name: "Ernesto",
        company: "Mavicpack",
        sector: "Ecommerce",
        text: "Álvaro transformó nuestra tienda online por completo. El diseño es premium, la experiencia de compra fluida y los resultados en ventas se notaron desde el primer mes. Profesionalidad total.",
    },
    {
        num: "02",
        name: "Fernando",
        company: "Carabibas, Bodega Sierra de Cabreras",
        sector: "Ecommerce",
        text: "Queríamos una web que transmitiera la esencia de nuestros vinos. ABG Frame lo consiguió con creces. Elegante, rápida y perfectamente optimizada. Superó nuestras expectativas.",
    },
    {
        num: "03",
        name: "David",
        company: "Sacos González",
        sector: "Web Catálogo",
        text: "Necesitábamos modernizar nuestra presencia online y ABG Frame entendió exactamente lo que buscábamos. Entrega rápida, comunicación impecable y resultado muy por encima de lo esperado.",
    },
    {
        num: "04",
        name: "Cristina",
        company: "Despacho Jurídico",
        sector: "Web Corporativa",
        text: "Tenía claro que quería algo serio y profesional. ABG Frame me entregó exactamente eso. La web transmite confianza y desde que la lancé he recibido más consultas que nunca.",
    },
    {
        num: "05",
        name: "Carlos",
        company: "Yates Alicante",
        sector: "Náutica Premium",
        text: "Queríamos una web que estuviera a la altura de nuestros clientes. ABG Frame entendió desde el primer momento que el lujo no se grita, se transmite. El resultado habla por sí solo.",
    },
];

export default function Resenas() {
    const [current, setCurrent] = useState(0);
    const [direction, setDirection] = useState(1);
    const headerRef = useRef(null);
    const isInView = useInView(headerRef, { once: true, amount: 0.3 });

    const prev = () => {
        setDirection(-1);
        setCurrent((c) => (c - 1 + reviews.length) % reviews.length);
    };

    const next = () => {
        setDirection(1);
        setCurrent((c) => (c + 1) % reviews.length);
    };

    const review = reviews[current];

    return (
        <section
            id="resenas"
            aria-label="Reseñas de clientes ABG Frame"
            style={{
                background: "#080808",
                padding: "clamp(3.5rem, 7vw, 6rem) 0",
                borderTop: "1px solid rgba(242,240,237,0.06)",
            }}
        >
            <div style={{
                width: "100%",
                maxWidth: "1400px",
                margin: "0 auto",
                padding: "0 clamp(1.5rem, 5vw, 5rem)",
            }}>
                {/* Header */}
                <header
                    ref={headerRef}
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: "4rem",
                        paddingBottom: "2rem",
                        borderBottom: "1px solid rgba(242,240,237,0.06)",
                    }}
                >
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : {}}
                        transition={{ duration: 0.6 }}
                        style={{
                            fontFamily: "'Inter', sans-serif",
                            fontSize: "0.65rem",
                            fontWeight: 500,
                            color: "#CC0000",
                            letterSpacing: "0.25em",
                            textTransform: "uppercase",
                        }}
                    >
                        Clientes
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 14 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.7, delay: 0.1 }}
                        style={{
                            fontFamily: "'DM Serif Display', serif",
                            fontWeight: 400,
                            fontSize: "clamp(1.4rem, 2.8vw, 2.5rem)",
                            color: "#F2F0ED",
                            letterSpacing: "-0.02em",
                            margin: 0,
                        }}
                    >
                        Lo que dicen{" "}
                        <span style={{ fontStyle: "italic", color: "#CC0000" }}>de nosotros.</span>
                    </motion.h2>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : {}}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        style={{
                            fontFamily: "'Inter', sans-serif",
                            fontSize: "0.65rem",
                            fontWeight: 500,
                            color: "rgba(242,240,237,0.15)",
                            letterSpacing: "0.2em",
                            textTransform: "uppercase",
                        }}
                    >
                        0{reviews.length} Reseñas
                    </motion.div>
                </header>

                {/* Carrusel */}
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "1fr auto",
                        gap: "4rem",
                        alignItems: "center",
                        minHeight: "200px",
                    }}
                    className="resenas-carousel-grid"
                >
                    {/* Reseña activa */}
                    <div style={{ overflow: "hidden", position: "relative" }}>
                        <AnimatePresence mode="wait" custom={direction}>
                            <motion.div
                                key={current}
                                custom={direction}
                                initial={{ opacity: 0, x: direction * 40 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: direction * -40 }}
                                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                            >
                                {/* Número */}
                                <div style={{
                                    fontFamily: "'Inter', sans-serif",
                                    fontSize: "0.65rem",
                                    fontWeight: 500,
                                    color: "#CC0000",
                                    letterSpacing: "0.2em",
                                    textTransform: "uppercase",
                                    marginBottom: "2rem",
                                }}>
                                    {review.num} ——
                                </div>

                                {/* Texto */}
                                <p style={{
                                    fontFamily: "'DM Serif Display', serif",
                                    fontWeight: 400,
                                    fontStyle: "italic",
                                    fontSize: "clamp(1rem, 1.6vw, 1.35rem)",
                                    color: "rgba(242,240,237,0.85)",
                                    lineHeight: 1.5,
                                    letterSpacing: "-0.02em",
                                    margin: 0,
                                    marginBottom: "1.75rem",
                                    maxWidth: "720px",
                                }}>
                                    "{review.text}"
                                </p>

                                {/* Autor */}
                                <div style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "1rem",
                                    paddingTop: "1.5rem",
                                    borderTop: "1px solid rgba(242,240,237,0.06)",
                                }}>
                                    <div>
                                        <div style={{
                                            fontFamily: "'DM Serif Display', serif",
                                            fontWeight: 400,
                                            fontSize: "0.95rem",
                                            color: "#F2F0ED",
                                            letterSpacing: "-0.01em",
                                        }}>
                                            {review.name}
                                        </div>
                                        <div style={{
                                            fontFamily: "'Inter', sans-serif",
                                            fontSize: "0.65rem",
                                            fontWeight: 400,
                                            color: "rgba(242,240,237,0.3)",
                                            textTransform: "uppercase",
                                            letterSpacing: "0.15em",
                                            marginTop: "0.25rem",
                                        }}>
                                            {review.company} · {review.sector}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Flechas + contador */}
                    <div style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: "1.5rem",
                    }}>
                        {/* Contador */}
                        <div style={{
                            fontFamily: "'Inter', sans-serif",
                            fontSize: "0.65rem",
                            fontWeight: 500,
                            color: "rgba(242,240,237,0.25)",
                            letterSpacing: "0.1em",
                        }}>
                            {String(current + 1).padStart(2, "0")} / {String(reviews.length).padStart(2, "0")}
                        </div>

                        {/* Flecha arriba */}
                        <button
                            onClick={prev}
                            aria-label="Anterior reseña"
                            style={{
                                width: "48px",
                                height: "48px",
                                border: "1px solid rgba(242,240,237,0.12)",
                                borderRadius: "4px",
                                background: "transparent",
                                color: "rgba(242,240,237,0.6)",
                                cursor: "pointer",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                transition: "all 0.2s",
                                fontSize: "1rem",
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.borderColor = "#CC0000";
                                e.currentTarget.style.color = "#CC0000";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.borderColor = "rgba(242,240,237,0.12)";
                                e.currentTarget.style.color = "rgba(242,240,237,0.6)";
                            }}
                        >
                            ↑
                        </button>

                        {/* Flecha abajo */}
                        <button
                            onClick={next}
                            aria-label="Siguiente reseña"
                            style={{
                                width: "48px",
                                height: "48px",
                                border: "1px solid rgba(242,240,237,0.12)",
                                borderRadius: "4px",
                                background: "transparent",
                                color: "rgba(242,240,237,0.6)",
                                cursor: "pointer",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                transition: "all 0.2s",
                                fontSize: "1rem",
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.borderColor = "#CC0000";
                                e.currentTarget.style.color = "#CC0000";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.borderColor = "rgba(242,240,237,0.12)";
                                e.currentTarget.style.color = "rgba(242,240,237,0.6)";
                            }}
                        >
                            ↓
                        </button>
                    </div>
                </div>

                {/* Indicadores */}
                <div style={{
                    display: "flex",
                    gap: "0.5rem",
                    marginTop: "2rem",
                    paddingTop: "1.5rem",
                    borderTop: "1px solid rgba(242,240,237,0.06)",
                }}>
                    {reviews.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }}
                            aria-label={`Ir a reseña ${i + 1}`}
                            style={{
                                width: i === current ? "24px" : "6px",
                                height: "6px",
                                borderRadius: "3px",
                                background: i === current ? "#CC0000" : "rgba(242,240,237,0.15)",
                                border: "none",
                                cursor: "pointer",
                                padding: 0,
                                transition: "all 0.3s ease",
                            }}
                        />
                    ))}
                </div>
            </div>

            <style dangerouslySetInnerHTML={{ __html: `
                @media (max-width: 767px) {
                    .resenas-carousel-grid {
                        grid-template-columns: 1fr !important;
                        gap: 2rem !important;
                    }
                    .resenas-carousel-grid > div:last-child {
                        flex-direction: row !important;
                        justify-content: center !important;
                        gap: 1rem !important;
                    }
                }
            `}} />
        </section>
    );
}
