"use client";

import React, { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import SplitText from "./reactbits/SplitText";

// --- Components -----------------------------------------------------------

const EditorialStatement = ({
    num,
    tag,
    title,
    italic,
    description,
    pills,
    delay
}: {
    num: string;
    tag: string;
    title: string;
    italic: string;
    description: string;
    pills: string[];
    delay: number;
}) => {
    const [isHovered, setIsHovered] = useState(false);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.2 });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="editorial-statement"
            style={{
                position: "relative",
                padding: "3rem 0",
                borderBottom: "1px solid rgba(242,240,237,0.06)",
                cursor: "default",
                overflow: "visible"
            }}
        >
            {/* Animated Left Line */}
            <div
                style={{
                    position: "absolute",
                    left: 0,
                    top: 0,
                    width: "2px",
                    height: isHovered ? "100%" : "0%",
                    background: "#CC0000",
                    transition: "height 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
                    zIndex: 10
                }}
            />

            {/* Background Number */}
            <div
                style={{
                    position: "absolute",
                    right: "-1rem",
                    top: "50%",
                    transform: "translateY(-50%)",
                    fontFamily: "var(--font-display)",
                    fontWeight: 800,
                    fontSize: "clamp(8rem, 12vw, 12rem)",
                    color: "rgba(242,240,237,0.03)",
                    lineHeight: 1,
                    pointerEvents: "none",
                    userSelect: "none",
                    transition: "all 0.6s ease",
                    zIndex: 0
                }}
            >
                {num}
            </div>

            <div
                className="statement-grid"
                style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "3rem",
                    alignItems: "start",
                    position: "relative",
                    zIndex: 5,
                    paddingLeft: "3.5rem"
                }}
            >
                {/* Left Column: Heading */}
                <div>
                    {/* Indicator */}
                    <div className="indicator-wrapper" style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "2.5rem" }}>
                        <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.62rem", color: "rgba(242,240,237,0.2)" }}>
                            {num} ——
                        </span>
                        <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.62rem", color: "rgba(204,0,0,0.8)", textTransform: "uppercase", letterSpacing: "0.15em" }}>
                            {tag}
                        </span>
                    </div>

                    <div className="statement-title-wrap" style={{ maxWidth: "800px" }}>
                        <SplitText
                            text={title}
                            tag="h3"
                            delay={0.03}
                            threshold={0.1}
                            style={{
                                fontFamily: "var(--font-display)",
                                fontWeight: 800,
                                fontSize: "clamp(1.6rem, 3vw, 2.8rem)",
                                color: "#F2F0ED",
                                lineHeight: 1.15,
                                letterSpacing: "-0.03em",
                                transition: "color 0.5s ease"
                            }}
                        />
                        {italic && (
                            <motion.span
                                initial={{ opacity: 0, y: 20 }}
                                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                                transition={{ duration: 0.7, delay: delay + 0.6 }}
                                className="statement-italic"
                                style={{
                                    display: "block",
                                    fontFamily: "var(--font-display)",
                                    fontWeight: 800,
                                    fontSize: "clamp(1.6rem, 3vw, 2.8rem)",
                                    color: "#F2F0ED",
                                    lineHeight: 1.1,
                                    marginTop: "0.1em",
                                    letterSpacing: "-0.03em"
                                }}
                            >
                                <span className="highlight-word">{italic}</span>
                            </motion.span>
                        )}
                    </div>

                    <div style={{
                        marginTop: "3rem",
                        width: "120px",
                        height: "1px",
                        background: "linear-gradient(to right, rgba(204,0,0,0.25), transparent)"
                    }} />
                </div>

                {/* Right Column: Description */}
                <div style={{ paddingTop: "1.2rem", minWidth: 0, overflow: "visible" }} className="statement-desc-col">
                    <p style={{
                        fontFamily: "var(--font-body)",
                        fontWeight: 300,
                        fontSize: "1rem",
                        color: "rgba(242,240,237,0.4)",
                        lineHeight: 1.65
                    }}>
                        {description}
                    </p>

                </div>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                @media (min-width: 1024px) {
                    .statement-grid {
                        grid-template-columns: 60% 40% !important;
                    }
                }
                .pill-editorial:hover {
                    border-color: rgba(204,0,0,0.3);
                    color: rgba(204,0,0,0.6);
                    transform: translateY(-2px);
                }
                @media (max-width: 767px) {
                    .statement-grid { 
                        display: flex !important; 
                        flex-direction: column !important; 
                        padding-left: 1.5rem !important; 
                        gap: 1.2rem !important; 
                    }
                    .editorial-statement { padding: 2.5rem 0 !important; }
                    .statement-desc-col { padding-top: 0 !important; width: 100% !important; }
                    .statement-desc-col p { font-size: 0.9rem !important; line-height: 1.8 !important; }
                    .pill-editorial { font-size: 0.5rem !important; }
                    .indicator-wrapper { margin-bottom: 1rem !important; }
                    .statement-title-wrap h3 { font-size: clamp(2rem, 8vw, 2.8rem) !important; width: 100% !important; }
                    .statement-italic { font-size: clamp(2rem, 8vw, 2.8rem) !important; width: 100% !important; }
                }
            `}} />
        </motion.div>
    );
};

// --- Main Section ---------------------------------------------------------

export default function WhyABG() {
    return (
        <section
            id="por-que-abg"
            aria-label="Por qué elegir ABG agencia diseño web SEO Alicante"
            style={{
                background: "#080808",
                padding: "3rem 0 4rem",
                borderTop: "1px solid rgba(242,240,237,0.06)"
            }}
        >
            <div style={{
                width: "100%",
                maxWidth: "1400px",
                margin: "0 auto",
                padding: "0 clamp(1.5rem, 5vw, 5rem)"
            }}>

                {/* Header Minimalista */}
                <header style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    position: "relative",
                    marginBottom: "3rem",
                    paddingBottom: "2rem",
                    borderBottom: "1px solid rgba(242,240,237,0.06)",
                    background: "#080808"
                }}>
                    <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.62rem", color: "#CC0000", letterSpacing: "0.25em", textTransform: "uppercase" }}>
                        MANIFIESTO
                    </div>

                    <div style={{
                        position: "absolute",
                        left: "50%",
                        transform: "translateX(-50%)",
                        textAlign: "center"
                    }} className="header-center-mobile">
                        <h2 style={{
                            fontFamily: "var(--font-display)",
                            fontWeight: 800,
                            fontSize: "clamp(1.6rem, 2.8vw, 2.5rem)",
                            color: "#F2F0ED",
                            letterSpacing: "-0.02em"
                        }}>
                            Por qué <span className="highlight-word">ABG.</span>
                        </h2>
                    </div>

                    <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.62rem", color: "rgba(242,240,237,0.15)", letterSpacing: "0.2em", textTransform: "uppercase" }}>
                        03 RAZONES
                    </div>
                </header>

                {/* Statements */}
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <EditorialStatement
                        num="01"
                        tag="Tecnología Adaptada"
                        title="La herramienta correcta"
                        italic="para cada proyecto."
                        description="ABG Frame elige la tecnología que mejor se adapta a cada negocio. Astro y React cuando la velocidad y el rendimiento son críticos. WordPress cuando tiene sentido para el proyecto. Lo que nunca cambia: sin plantillas genéricas, sin atajos, sin código que nadie entiende en seis meses. El resultado siempre es el mismo — una web que Google trata diferente desde el día uno."
                        pills={["Astro + React", "WordPress", "Core Web Vitals reales"]}
                        delay={0.1}
                    />
                    <EditorialStatement
                        num="02"
                        tag="SEO Local Real"
                        title="Posicionar en Alicante"
                        italic="no es magia."
                        description="ABG Frame conoce qué busca un cliente cuando quiere contratar servicios náuticos en el puerto, o una clínica en San Juan. No por haber leído un blog — por años trabajando con negocios de la zona. El SEO local tiene su lógica propia: Google My Business, menciones de zona, arquitectura semántica. No se improvisa."
                        pills={["SEO Local Alicante", "Google My Business", "Arquitectura semántica"]}
                        delay={0.25}
                    />
                    <EditorialStatement
                        num="03"
                        tag="Captación"
                        title="Web, SEO y Ads"
                        italic="trabajando juntos."
                        description="Diseño web que convierte, SEO local que atrae tráfico orgánico y Google Ads que acelera los resultados desde el día uno. Todo coordinado, todo medible."
                        pills={["Google Ads", "SEO orgánico", "Sistema integrado"]}
                        delay={0.4}
                    />
                </div>



            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                @media (max-width: 767px) {
                    .section-padding-mobile { padding: 0 1.5rem !important; }
                    header { margin-bottom: 4rem !important; }
                    .header-center-mobile { position: relative !important; left: 0 !important; transform: none !important; margin: 1.5rem 0; }
                    header { flex-direction: column !important; align-items: flex-start !important; }
                }
            `}} />
        </section>
    );
}
