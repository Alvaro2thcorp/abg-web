"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

const vp = { once: true, margin: "-80px" } as const;

// ── Data ──────────────────────────────────────────────────────────────────────

const piezas = [
    {
        num: "01",
        label: "WEB PREMIUM",
        title: "La base que convierte.",
        desc: "Construida con la tecnología adecuada para cada negocio. Core Web Vitals por encima de 95. SEO técnico integrado desde el primer commit. Entrega en 3-5 semanas.",
        items: ["DISEÑO UX/UI EXCLUSIVO", "CORE WEB VITALS 100/100", "ARQUITECTURA SEO DESDE DÍA 1", "ENTREGA EN 3-5 SEMANAS"],
    },
    {
        num: "02",
        label: "SEO LOCAL + EN",
        title: "Visible cuando te buscan.",
        desc: "SEO local para clientes de proximidad y SEO en inglés para el mercado internacional. Google Business optimizado. Contenido estratégico mensual. Posicionamiento real, no proyecciones.",
        items: ["KEYWORDS ES + EN", "SEO ON-PAGE CONTINUO", "GOOGLE BUSINESS OPTIMIZADO", "INFORMES MENSUALES"],
    },
    {
        num: "03",
        label: "META ADS",
        title: "Captación activa desde el día uno.",
        desc: "Mientras el SEO madura, Meta Ads captura la demanda que ya existe en redes sociales. Gestionamos las campañas con foco en un solo número: el coste por lead cualificado. Nada de métricas de vanidad.",
        items: ["CAMPAÑAS META ADS (INSTAGRAM + FACEBOOK)", "SEGMENTACIÓN POR AUDIENCIAS", "RETARGETING EN REDES", "INFORME ROI MENSUAL"],
    },
];

const pasos = [
    {
        num: "01",
        semana: "SEMANA 1",
        titulo: "Estrategia y análisis.",
        desc: "Antes de escribir una línea de código, entendemos tu negocio. Analizamos tu mercado, tu competencia real en Alicante y el perfil exacto de tu cliente ideal.",
        badge: "AUDITORÍA · KEYWORDS · COMPETENCIA",
    },
    {
        num: "02",
        semana: "SEMANAS 2-4",
        titulo: "Desarrollo web.",
        desc: "Diseño UX/UI a medida y desarrollo con la tecnología adecuada para tu proyecto. El SEO técnico no entra al final — entra desde el primer commit.",
        badge: "ASTRO · WORDPRESS · SHOPIFY · CORE WEB VITALS 100",
    },
    {
        num: "03",
        semana: "MES 1",
        titulo: "Lanzamiento.",
        desc: "Tu web sale al mundo configurada para convertir. Google Analytics, Search Console, Schema markup y seguimiento de conversiones desde el minuto uno.",
        badge: "GA4 · GSC · SCHEMA · INDEXACIÓN",
    },
    {
        num: "04",
        semana: "RECURRENTE",
        titulo: "SEO mes a mes.",
        desc: "Posicionamiento continuo. Contenido optimizado, arquitectura semántica en evolución y seguimiento de posiciones. El orgánico trabaja aunque tú no estés.",
        badge: "ON-PAGE · LINKBUILDING · INFORMES MENSUALES",
    },
    {
        num: "05",
        semana: "RECURRENTE",
        titulo: "Contenido y redes sociales.",
        desc: "Pablo Lizón, partner colaborador especialista en marketing digital, define la estrategia de contenido y desarrolla los guiones. Grabamos, editamos y distribuimos en Instagram, TikTok y LinkedIn.",
        badge: "PABLO LIZÓN (PARTNER) · INSTAGRAM · TIKTOK · LINKEDIN",
    },
    {
        num: "06",
        semana: "CUANDO PROCEDE",
        titulo: "Meta Ads.",
        desc: "Cuando el orgánico necesita aceleración, activamos campañas en Meta (Instagram, Facebook). Captamos demanda activa en ES, EN y FR. Solo cuando tiene sentido para tu negocio.",
        badge: "BÚSQUEDA · RETARGETING · ES · EN · FR",
    },
];

const faqs = [
    {
        q: "¿Hay permanencia o contrato mínimo?",
        a: "No. ABG Frame trabaja mes a mes porque confía en sus resultados. Si en algún momento sientes que el sistema no te compensa, puedes cancelar sin dramas. La única garantía de ABG Frame es hacer un trabajo tan bueno que no quieras irte.",
    },
    {
        q: "¿Qué pasa si ya tengo una web?",
        a: "Si tu web está bien construida y convierte, la mantenemos y vamos directo a SEO y Ads. Pero siendo honestos: el 90% de las webs que auditamos tienen errores técnicos que lastran el SEO. Si es tu caso, rehacerla de cero está incluido en El Sistema.",
    },
    {
        q: "¿El precio incluye la inversión en publicidad?",
        a: "No. Los honorarios de ABG Frame son por la gestión completa (Web + SEO + Contenido + Meta Ads opcional). El presupuesto publicitario que decidas invertir en Meta se paga directamente a Meta. ABG Frame lo optimiza para que cada euro rinda al máximo.",
    },
    {
        q: "¿Qué tecnología usáis para construir las webs?",
        a: "Depende del proyecto. ABG Frame trabaja con Astro, React, WordPress o la herramienta que mejor encaje con los objetivos del negocio. Lo que nunca cambia es el enfoque: sin atajos, sin plantillas genéricas y con el SEO técnico integrado desde el primer día.",
    },
    {
        q: "¿Vais a posicionarme solo en Alicante?",
        a: "Depende de tu negocio. Si eres una clínica, atacamos SEO local puro (Alicante, San Juan, Playa de San Juan). Si eres un charter náutico, atacamos el SEO local pero también posicionamiento internacional para captar a quien busca desde Londres o Madrid.",
    },
    {
        q: "¿En cuánto tiempo tendré clientes?",
        a: "La web vuela en 3-5 semanas. Los anuncios (Ads) traen tráfico desde el día 1. El SEO es una maratón: notarás el crecimiento real en Google a partir del tercer o cuarto mes.",
    },
    {
        q: "¿Las campañas de Meta Ads las gestiona el mismo equipo que la web?",
        a: "Sí. Pablo Lizón, como partner colaborador de ABG Frame, se encarga de toda la parte de tráfico de pago. La ventaja de coordinarlo todo en el mismo proyecto es que la landing page, el anuncio y la conversión están alineados desde el diseño. No hay fricción entre agencias.",
    },
    {
        q: "¿Este sistema sirve para cualquier sector?",
        a: "No. Si vendes fundas de móvil de 10€, este sistema no es para ti. El Sistema ABG está diseñado para negocios donde un solo cliente captado justifica la inversión: inmobiliarias, náutica, reformas, clínicas, abogados o B2B.",
    },
    {
        q: "¿Qué necesito para empezar?",
        a: "Media hora de tu tiempo para una consultoría inicial. Analizamos tu competencia y te decimos la verdad: si vemos que podemos ayudarte, te damos el plan. Si no, te lo diremos igual.",
    },
    {
        q: "¿Quién será mi contacto directo?",
        a: "Álvaro Bergillos es ABG Frame: diseño, desarrollo, SEO técnico y dirección del proyecto. Pablo Lizón es el partner colaborador externo que se incorpora al Sistema para la pieza de contenido y redes sociales. El cliente firma con ABG Frame. El interlocutor principal es Álvaro.",
    },
];

// ── Sub-components ────────────────────────────────────────────────────────────

function SectionLabel({ children, dark = false }: { children: string; dark?: boolean }) {
    return (
        <span
            style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.6rem",
                color: "#CC0000",
                textTransform: "uppercase" as const,
                letterSpacing: "0.15em",
                display: "block",
                marginBottom: "1rem",
            }}
        >
            {children}
        </span>
    );
}

// ── Section 1: Hero ───────────────────────────────────────────────────────────

function HeroSection() {
    return (
        <section
            style={{
                background: "#080808",
                minHeight: "90vh",
                display: "flex",
                flexDirection: "column" as const,
                justifyContent: "space-between",
                padding: "3rem clamp(1.5rem,5vw,5rem) 3rem",
                position: "relative",
                overflow: "hidden",
            }}
        >
            {/* Decorative background text */}
            <div
                style={{
                    position: "absolute",
                    bottom: "-3rem",
                    left: "50%",
                    transform: "translateX(-50%)",
                    fontFamily: "var(--font-display)",
                    fontWeight: 800,
                    fontSize: "18vw",
                    lineHeight: 1,
                    color: "rgba(242,240,237,0.025)",
                    pointerEvents: "none",
                    userSelect: "none" as const,
                    whiteSpace: "nowrap" as const,
                    zIndex: 0,
                }}
            >
                SISTEMA
            </div>

            {/* Breadcrumb */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease }}
                style={{ position: "relative", zIndex: 1 }}
            >
                <span
                    style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.6rem",
                        color: "rgba(242,240,237,0.25)",
                        textTransform: "uppercase" as const,
                        letterSpacing: "0.15em",
                    }}
                >
                    <a
                        href="/"
                        style={{ color: "rgba(242,240,237,0.25)", textDecoration: "none", transition: "color 0.2s" }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = "#CC0000")}
                        onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(242,240,237,0.25)")}
                    >
                        ABG
                    </a>
                    {" / El Sistema"}
                </span>
            </motion.div>

            {/* Central grid */}
            <div className="hero-grid" style={{ position: "relative", zIndex: 1, marginTop: "2rem" }}>
                {/* Left */}
                <div>
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1, ease }}
                        style={{
                            display: "inline-block",
                            background: "rgba(204,0,0,0.1)",
                            border: "1px solid rgba(204,0,0,0.2)",
                            borderRadius: "100px",
                            padding: "0.25rem 0.75rem",
                            fontFamily: "var(--font-mono)",
                            fontSize: "0.55rem",
                            color: "#CC0000",
                            textTransform: "uppercase" as const,
                            letterSpacing: "0.1em",
                            marginBottom: "1.5rem",
                        }}
                    >
                        EL PRODUCTO DE ABG FRAME
                    </motion.span>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2, ease }}
                        style={{
                            fontFamily: "var(--font-display)",
                            fontWeight: 800,
                            fontSize: "clamp(2.2rem,4vw,4.5rem)",
                            lineHeight: 0.92,
                            letterSpacing: "-0.04em",
                            color: "#F2F0ED",
                        }}
                    >
                        Sistema web, SEO
                        <br />
                        y Ads para
                        <br />
                        <span
                            style={{
                                WebkitTextStroke: "1.5px rgba(242,240,237,0.4)",
                                color: "transparent",
                            }}
                        >
                            Alicante.
                        </span>
                    </motion.h1>

                    <motion.div
                        initial={{ opacity: 0, scaleX: 0 }}
                        animate={{ opacity: 1, scaleX: 1 }}
                        transition={{ duration: 0.6, delay: 0.4, ease }}
                        style={{
                            width: "60px",
                            height: "2px",
                            background: "#CC0000",
                            margin: "2rem 0",
                            transformOrigin: "left",
                        }}
                    />

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.5, ease }}
                        style={{
                            fontFamily: "var(--font-body)",
                            fontWeight: 300,
                            fontSize: "1rem",
                            color: "rgba(242,240,237,0.4)",
                            lineHeight: 1.85,
                            maxWidth: "420px",
                        }}
                    >
                        El Sistema es un servicio integrado donde ABG Frame colabora habitualmente con Pablo Lizón — especialista en marketing digital — para cubrir todas las piezas que necesita un negocio premium: web, visibilidad orgánica y contenido editorial. Dos especialistas, una sola dirección, un único responsable de cara al cliente. Meta Ads disponible como complemento opcional.
                    </motion.p>
                </div>

                {/* Right — Price box */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.35, ease }}
                    style={{
                        border: "1px solid rgba(242,240,237,0.08)",
                        borderRadius: "20px",
                        padding: "2.5rem",
                        background: "rgba(242,240,237,0.02)",
                    }}
                >
                    <p
                        style={{
                            fontFamily: "var(--font-mono)",
                            fontSize: "0.55rem",
                            color: "rgba(242,240,237,0.25)",
                            textTransform: "uppercase" as const,
                            letterSpacing: "0.1em",
                            marginBottom: "1.5rem",
                        }}
                    >
                        TODO INCLUIDO · SIN PERMANENCIA
                    </p>

                    <div style={{ marginBottom: "0.5rem" }}>
                        <a
                            href="/contacto"
                            style={{
                                fontFamily: "var(--font-display)",
                                fontWeight: 800,
                                fontSize: "2rem",
                                color: "#CC0000",
                                textDecoration: "none",
                                display: "inline-block",
                                lineHeight: 1.2,
                            }}
                        >
                            Solicitar presupuesto →
                        </a>
                    </div>

                    <p
                        style={{
                            fontFamily: "var(--font-body)",
                            fontWeight: 300,
                            fontSize: "0.8rem",
                            color: "rgba(242,240,237,0.3)",
                            lineHeight: 1.6,
                            marginBottom: "2rem",
                        }}
                    >
                        Web premium incluida en el primer mes.
                        <br />
                        Sin coste adicional de setup.
                    </p>

                    <div style={{ height: "1px", background: "rgba(242,240,237,0.06)", marginBottom: "1.5rem" }} />

                    {["Web premium a medida", "SEO local + posicionamiento ES/EN/FR", "Contenido editorial y redes sociales", "Meta Ads opcional (publicidad de pago)"].map((item, i) => (
                        <div
                            key={i}
                            style={{
                                display: "flex",
                                flexDirection: "row" as const,
                                gap: "0.75rem",
                                alignItems: "center",
                                padding: "0.6rem 0",
                                borderBottom: "1px solid rgba(242,240,237,0.04)",
                            }}
                        >
                            <span
                                style={{
                                    width: "6px",
                                    height: "6px",
                                    borderRadius: "50%",
                                    background: "#CC0000",
                                    flexShrink: 0,
                                }}
                            />
                            <span
                                style={{
                                    fontFamily: "var(--font-display)",
                                    fontWeight: 500,
                                    fontSize: "0.9rem",
                                    color: "#F2F0ED",
                                }}
                            >
                                {item}
                            </span>
                        </div>
                    ))}

                    <a
                        href="/contacto"
                        className="hero-cta-btn"
                        style={{
                            display: "block",
                            background: "#CC0000",
                            color: "#080808",
                            fontFamily: "var(--font-display)",
                            fontWeight: 700,
                            fontSize: "0.95rem",
                            padding: "1.1rem 2rem",
                            borderRadius: "100px",
                            width: "100%",
                            textAlign: "center" as const,
                            textDecoration: "none",
                            marginTop: "1.5rem",
                            transition: "background 0.3s",
                        }}
                    >
                        Solicitar consultoría gratuita →
                    </a>
                </motion.div>
            </div>

            {/* Bottom bar */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.7, ease }}
                style={{
                    position: "relative",
                    zIndex: 1,
                    paddingTop: "2.5rem",
                    borderTop: "1px solid rgba(242,240,237,0.08)",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexWrap: "wrap" as const,
                    gap: "1.5rem",
                    marginTop: "3rem",
                }}
            >
                <div style={{ display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap" as const }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                        <span className="dot-pulse" style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#CC0000", display: "inline-block", flexShrink: 0 }} />
                        <span
                            style={{
                                fontFamily: "var(--font-display)",
                                fontWeight: 600,
                                fontSize: "0.95rem",
                                color: "rgba(242,240,237,0.5)",
                            }}
                        >
                            ABG Frame · Pablo Lizón (partner)
                        </span>
                    </div>
                    <span style={{ color: "rgba(242,240,237,0.1)" }}>·</span>
                    <span
                        style={{
                            fontFamily: "var(--font-mono)",
                            fontSize: "0.58rem",
                            color: "rgba(242,240,237,0.25)",
                            textTransform: "uppercase" as const,
                        }}
                    >
                        Alicante, España
                    </span>
                </div>
                <span
                    style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.6rem",
                        color: "rgba(242,240,237,0.2)",
                        textTransform: "uppercase" as const,
                    }}
                >
                    Sin permanencia · Sin contratos
                </span>
            </motion.div>
        </section>
    );
}

// ── Section 2: Qué es El Sistema ─────────────────────────────────────────────

function QueEsSection() {
    const sinItems = [
        "Web hecha por un freelance sin SEO integrado",
        "SEO contratado aparte, sin conocer la web",
        "Redes gestionadas por alguien sin estrategia",
        "Nadie coordina, nadie es responsable del resultado",
    ];
    const conItems = [
        "Web diseñada desde el día 1 para convertir y posicionar",
        "SEO integrado en la arquitectura, no añadido después",
        "Meta Ads opcional, coordinado con la web y el SEO",
        "Un equipo, una estrategia, un responsable",
    ];

    return (
        <section style={{ background: "#F2F0ED", padding: "6rem clamp(1.5rem,5vw,5rem)" }}>
            <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={vp}
                    transition={{ duration: 0.8, ease }}
                >
                    <SectionLabel>POR QUÉ UN SISTEMA</SectionLabel>
                    <h2
                        style={{
                            fontFamily: "var(--font-display)",
                            fontWeight: 800,
                            fontSize: "clamp(2.5rem,4.5vw,4rem)",
                            color: "#080808",
                            lineHeight: 1.0,
                            letterSpacing: "-0.03em",
                            marginBottom: "1.5rem",
                        }}
                    >
                        La diferencia entre
                        <br />
                        una web y <span className="highlight-word">un sistema.</span>
                    </h2>
                    <p
                        style={{
                            fontFamily: "var(--font-body)",
                            fontWeight: 300,
                            fontSize: "1rem",
                            color: "rgba(8,8,8,0.5)",
                            lineHeight: 1.85,
                            maxWidth: "640px",
                            marginBottom: "4rem",
                        }}
                    >
                        La mayoría de agencias te venden piezas sueltas.
                        Te hacen la web. Luego te buscan un SEO.
                        Luego alguien gestiona tus redes. Cada uno
                        trabaja por su cuenta, sin coordinación.
                        El resultado: inversión fragmentada, resultados mediocres.
                    </p>
                </motion.div>

                <div className="ques-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>
                    {/* Sin sistema */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={vp}
                        transition={{ duration: 0.7, delay: 0.1, ease }}
                        style={{
                            padding: "2rem",
                            border: "1px solid rgba(8,8,8,0.08)",
                            borderRadius: "16px",
                            background: "#FFFFFF",
                        }}
                    >
                        <p
                            style={{
                                fontFamily: "var(--font-display)",
                                fontWeight: 700,
                                fontSize: "1rem",
                                color: "#080808",
                                marginBottom: "1.5rem",
                            }}
                        >
                            ❌ Sin sistema
                        </p>
                        {sinItems.map((item, i) => (
                            <div
                                key={i}
                                style={{
                                    padding: "0.75rem 0",
                                    borderBottom: "1px solid rgba(8,8,8,0.05)",
                                    fontFamily: "var(--font-body)",
                                    fontWeight: 300,
                                    fontSize: "0.9rem",
                                    color: "rgba(8,8,8,0.5)",
                                }}
                            >
                                {item}
                            </div>
                        ))}
                    </motion.div>

                    {/* Con El Sistema */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={vp}
                        transition={{ duration: 0.7, delay: 0.2, ease }}
                        style={{
                            padding: "2rem",
                            border: "1.5px solid #CC0000",
                            borderRadius: "16px",
                            background: "rgba(204,0,0,0.02)",
                        }}
                    >
                        <p
                            style={{
                                fontFamily: "var(--font-display)",
                                fontWeight: 700,
                                fontSize: "1rem",
                                color: "#CC0000",
                                marginBottom: "1.5rem",
                            }}
                        >
                            ✓ Con El Sistema ABG
                        </p>
                        {conItems.map((item, i) => (
                            <div
                                key={i}
                                style={{
                                    padding: "0.75rem 0",
                                    borderBottom: "1px solid rgba(8,8,8,0.05)",
                                    fontFamily: "var(--font-body)",
                                    fontWeight: 300,
                                    fontSize: "0.9rem",
                                    color: "rgba(8,8,8,0.5)",
                                }}
                            >
                                {item}
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

// ── Section 3: Las 3 Piezas ───────────────────────────────────────────────────

function TresPiezasSection() {
    return (
        <section
            style={{
                background: "#080808",
                padding: "6rem clamp(1.5rem,5vw,5rem)",
                borderTop: "1px solid rgba(242,240,237,0.06)",
            }}
        >
            <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={vp}
                    transition={{ duration: 0.8, ease }}
                    style={{ textAlign: "center" as const, marginBottom: "5rem" }}
                >
                    <SectionLabel>QUÉ INCLUYE</SectionLabel>
                    <h2
                        style={{
                            fontFamily: "var(--font-display)",
                            fontWeight: 800,
                            fontSize: "clamp(2.5rem,4.5vw,4rem)",
                            color: "#F2F0ED",
                            lineHeight: 1.0,
                            letterSpacing: "-0.03em",
                        }}
                    >
                        Tres piezas.
                        <br />
                        <span className="highlight-word">Una máquina.</span>
                    </h2>
                </motion.div>

                {/* Grid */}
                <div className="piezas-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.5rem" }}>
                    {piezas.map((pieza, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={vp}
                            transition={{ duration: 0.7, delay: i * 0.1, ease }}
                            className="pieza-card"
                            style={{
                                padding: "2.5rem 2rem",
                                border: "1px solid rgba(242,240,237,0.08)",
                                borderRadius: "20px",
                                background: "rgba(242,240,237,0.02)",
                                position: "relative",
                                overflow: "hidden",
                                transition: "background 0.3s",
                            }}
                        >
                            {/* Decorative number background */}
                            <div
                                style={{
                                    position: "absolute",
                                    right: "-0.5rem",
                                    bottom: "-1rem",
                                    fontFamily: "var(--font-display)",
                                    fontWeight: 800,
                                    fontSize: "8rem",
                                    lineHeight: 1,
                                    color: "rgba(242,240,237,0.03)",
                                    pointerEvents: "none",
                                    userSelect: "none" as const,
                                }}
                            >
                                {pieza.num}
                            </div>

                            {/* Number */}
                            <div
                                style={{
                                    fontFamily: "var(--font-display)",
                                    fontWeight: 800,
                                    fontSize: "3rem",
                                    color: "#CC0000",
                                    opacity: 0.3,
                                    lineHeight: 1,
                                    marginBottom: "1.5rem",
                                }}
                            >
                                {pieza.num}
                            </div>

                            {/* Label */}
                            <p
                                style={{
                                    fontFamily: "var(--font-mono)",
                                    fontSize: "0.55rem",
                                    color: "rgba(242,240,237,0.3)",
                                    textTransform: "uppercase" as const,
                                    letterSpacing: "0.1em",
                                    marginBottom: "0.5rem",
                                }}
                            >
                                {pieza.label}
                            </p>

                            {/* Title */}
                            <h3
                                style={{
                                    fontFamily: "var(--font-display)",
                                    fontWeight: 700,
                                    fontSize: "1.3rem",
                                    color: "#F2F0ED",
                                    marginBottom: "0.75rem",
                                }}
                            >
                                {pieza.title}
                            </h3>

                            {/* Description */}
                            <p
                                style={{
                                    fontFamily: "var(--font-body)",
                                    fontWeight: 300,
                                    fontSize: "0.875rem",
                                    color: "rgba(242,240,237,0.4)",
                                    lineHeight: 1.75,
                                    marginBottom: "2rem",
                                }}
                            >
                                {pieza.desc}
                            </p>

                            {/* Separator */}
                            <div style={{ height: "1px", background: "rgba(242,240,237,0.06)", marginBottom: "1.5rem" }} />

                            {/* Items */}
                            {pieza.items.map((item, ii) => (
                                <div
                                    key={ii}
                                    style={{
                                        display: "flex",
                                        flexDirection: "row" as const,
                                        gap: "0.6rem",
                                        alignItems: "center",
                                        padding: "0.4rem 0",
                                    }}
                                >
                                    <span
                                        style={{
                                            width: "4px",
                                            height: "4px",
                                            borderRadius: "50%",
                                            background: "#CC0000",
                                            flexShrink: 0,
                                        }}
                                    />
                                    <span
                                        style={{
                                            fontFamily: "var(--font-mono)",
                                            fontSize: "0.55rem",
                                            color: "rgba(242,240,237,0.35)",
                                            textTransform: "uppercase" as const,
                                            letterSpacing: "0.05em",
                                        }}
                                    >
                                        {item}
                                    </span>
                                </div>
                            ))}
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

// ── Section 4: Cómo Funciona ──────────────────────────────────────────────────

function ComoFuncionaSection() {
    return (
        <section style={{ background: "#F2F0ED", padding: "6rem clamp(1.5rem,5vw,5rem)" }}>
            <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={vp}
                    transition={{ duration: 0.8, ease }}
                    style={{ marginBottom: "4rem" }}
                >
                    <SectionLabel>EL PROCESO</SectionLabel>
                    <h2
                        style={{
                            fontFamily: "var(--font-display)",
                            fontWeight: 800,
                            fontSize: "clamp(2.5rem,4.5vw,4rem)",
                            color: "#080808",
                            lineHeight: 1.0,
                            letterSpacing: "-0.03em",
                        }}
                    >
                        Cómo trabajamos,
                        <br />
                        <span className="highlight-word">paso a paso.</span>
                    </h2>
                </motion.div>

                {pasos.map((paso, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={vp}
                        transition={{ duration: 0.7, delay: i * 0.08, ease }}
                        style={{
                            display: "grid",
                            gridTemplateColumns: "5rem 1fr",
                            gap: "2rem",
                            alignItems: "flex-start",
                            padding: "2.5rem 0",
                            borderTop: "1px solid rgba(8,8,8,0.08)",
                        }}
                    >
                        {/* Número grande */}
                        <div
                            style={{
                                fontFamily: "var(--font-display)",
                                fontWeight: 800,
                                fontSize: "clamp(3rem,5vw,4.5rem)",
                                color: "#CC0000",
                                lineHeight: 1,
                                flexShrink: 0,
                            }}
                        >
                            {paso.num}
                        </div>

                        {/* Contenido */}
                        <div style={{ paddingTop: "0.25rem" }}>
                            {/* Etiqueta de tiempo */}
                            <p
                                style={{
                                    fontFamily: "var(--font-mono)",
                                    fontSize: "0.58rem",
                                    color: "rgba(8,8,8,0.35)",
                                    textTransform: "uppercase" as const,
                                    letterSpacing: "0.18em",
                                    marginBottom: "0.6rem",
                                }}
                            >
                                {paso.semana}
                            </p>

                            {/* Título */}
                            <h3
                                style={{
                                    fontFamily: "var(--font-display)",
                                    fontWeight: 800,
                                    fontSize: "clamp(1.4rem,2.5vw,2rem)",
                                    color: "#080808",
                                    letterSpacing: "-0.025em",
                                    lineHeight: 1.1,
                                    marginBottom: "0.9rem",
                                }}
                            >
                                {paso.titulo}
                            </h3>

                            {/* Descripción */}
                            <p
                                style={{
                                    fontFamily: "var(--font-body)",
                                    fontWeight: 300,
                                    fontSize: "0.9rem",
                                    color: "rgba(8,8,8,0.55)",
                                    lineHeight: 1.75,
                                    marginBottom: "1.1rem",
                                    maxWidth: "52ch",
                                }}
                            >
                                {paso.desc}
                            </p>

                            {/* Badge técnico */}
                            <span
                                style={{
                                    display: "inline-block",
                                    fontFamily: "var(--font-mono)",
                                    fontSize: "0.55rem",
                                    letterSpacing: "0.12em",
                                    textTransform: "uppercase" as const,
                                    color: "#F2F0ED",
                                    background: "#080808",
                                    borderRadius: "100px",
                                    padding: "0.35rem 0.9rem",
                                }}
                            >
                                {paso.badge}
                            </span>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}

// ── Section 5: Equipo ─────────────────────────────────────────────────────────

function EquipoSection() {
    return (
        <section
            style={{
                background: "#F2F0ED",
                padding: "6rem clamp(1.5rem,5vw,5rem)",
            }}
        >
            <div style={{ maxWidth: "1400px", margin: "0 auto" }}>

                {/* HEADER */}
                <div style={{ marginBottom: "4rem" }}>
                    <div style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.6rem",
                        color: "#CC0000",
                        textTransform: "uppercase",
                        letterSpacing: "0.15em",
                        marginBottom: "1rem"
                    }}>
                        QUIÉN LO EJECUTA
                    </div>
                    <h2 style={{
                        fontFamily: "var(--font-display)",
                        fontWeight: 800,
                        fontSize: "clamp(2rem, 4vw, 3.5rem)",
                        color: "#080808",
                        lineHeight: 1.0,
                        letterSpacing: "-0.03em",
                        margin: 0
                    }}>
                        ABG Frame + un partner.<br />Una estrategia.
                    </h2>
                </div>

                {/* GRID DE CARDS */}
                <div className="equipo-sistema-grid">

                    {/* CARD ÁLVARO */}
                    <motion.div
                        initial={{ opacity: 0, y: 25 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.1 }}
                        transition={{ duration: 0.8, ease }}
                        style={{
                            border: "1px solid rgba(8, 8, 8, 0.08)",
                            borderRadius: "20px",
                            overflow: "hidden",
                            background: "#FFFFFF",
                        }}
                    >
                        {/* Zona foto */}
                        <div style={{
                            height: "280px",
                            position: "relative",
                            overflow: "hidden",
                        }}>
                            {/* TODO: Reemplazar placeholder por foto real */}
                            {/* Ruta: /public/images/alvaro.jpg */}
                            {/* Formato recomendado: JPG, ratio 3:4, mín 600x800px */}
                            {/* Tratamiento: object-fit cover, object-position top */}
                            {/* <img
                                src="/images/alvaro.jpg"
                                alt="Álvaro Bergillos"
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover",
                                    objectPosition: "center top"
                                }}
                            /> */}

                            {/* PLACEHOLDER — eliminar cuando se añada la imagen */}
                            <div style={{
                                width: "100%",
                                height: "100%",
                                background: "linear-gradient(135deg, #0f0f0f 0%, #1a1a1a 100%)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                            }}>
                                <span style={{
                                    fontFamily: "var(--font-display)",
                                    fontWeight: 800,
                                    fontSize: "3rem",
                                    color: "rgba(242, 240, 237, 0.1)"
                                }}>ÁB</span>
                            </div>
                        </div>

                        {/* Zona contenido */}
                        <div style={{ padding: "2rem" }}>
                            <div style={{
                                fontFamily: "var(--font-display)",
                                fontWeight: 700,
                                fontSize: "1.2rem",
                                color: "#080808",
                                marginBottom: "0.3rem"
                            }}>
                                Álvaro Bergillos
                            </div>
                            <span style={{
                                fontFamily: "var(--font-mono)",
                                fontSize: "0.55rem",
                                color: "#CC0000",
                                textTransform: "uppercase",
                                letterSpacing: "0.1em",
                                display: "block",
                                marginBottom: "1rem"
                            }}>
                                FUNDADOR &amp; CEO · WEB + SEO
                            </span>
                            <p style={{
                                fontFamily: "var(--font-body)",
                                fontWeight: 300,
                                fontSize: "0.875rem",
                                color: "rgba(8, 8, 8, 0.5)",
                                lineHeight: 1.75,
                                marginBottom: "1.5rem",
                                margin: "0 0 1.5rem 0"
                            }}>
                                Álvaro Bergillos es el fundador y quien programa. Ha visto demasiados negocios perder clientes por tener webs lentas y sin estrategia. Cada web que entrega ABG Frame está programada en Astro y React, con SEO desde la primera línea. Si buscas <strong>diseño web profesional en Alicante</strong> sin atajos, hablas directamente con quien lo ejecuta.
                            </p>
                            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                                {["DISEÑO WEB", "SEO", "ESTRATEGIA"].map((tag) => (
                                    <span key={tag} style={{
                                        border: "1px solid rgba(8, 8, 8, 0.08)",
                                        borderRadius: "100px",
                                        padding: "0.25rem 0.65rem",
                                        fontFamily: "var(--font-mono)",
                                        fontSize: "0.5rem",
                                        color: "rgba(8, 8, 8, 0.35)",
                                        textTransform: "uppercase"
                                    }}>
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* CARD PABLO */}
                    <motion.div
                        initial={{ opacity: 0, y: 25 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.1 }}
                        transition={{ duration: 0.8, delay: 0.1, ease }}
                        style={{
                            border: "1px solid rgba(8, 8, 8, 0.08)",
                            borderRadius: "20px",
                            overflow: "hidden",
                            background: "#FFFFFF",
                        }}
                    >
                        {/* Zona foto */}
                        <div style={{
                            height: "280px",
                            position: "relative",
                            overflow: "hidden",
                        }}>
                            {/* TODO: Reemplazar placeholder por foto real */}
                            {/* Ruta: /public/images/pablo.jpg */}
                            {/* Formato recomendado: JPG, ratio 3:4, mín 600x800px */}
                            {/* <img
                                src="/images/pablo.jpg"
                                alt="Pablo Lizón"
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover",
                                    objectPosition: "center top"
                                }}
                            /> */}

                            {/* PLACEHOLDER — eliminar cuando se añada la imagen */}
                            <div style={{
                                width: "100%",
                                height: "100%",
                                background: "linear-gradient(135deg, #0f0f0f 0%, #1a1a1a 100%)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                            }}>
                                <span style={{
                                    fontFamily: "var(--font-display)",
                                    fontWeight: 800,
                                    fontSize: "3rem",
                                    color: "rgba(242, 240, 237, 0.1)"
                                }}>PL</span>
                            </div>
                        </div>

                        {/* Zona contenido */}
                        <div style={{ padding: "2rem" }}>
                            <div style={{
                                fontFamily: "var(--font-display)",
                                fontWeight: 700,
                                fontSize: "1.2rem",
                                color: "#080808",
                                marginBottom: "0.3rem"
                            }}>
                                Pablo Lizón
                            </div>
                            <span style={{
                                fontFamily: "var(--font-mono)",
                                fontSize: "0.55rem",
                                color: "#CC0000",
                                textTransform: "uppercase",
                                letterSpacing: "0.1em",
                                display: "block",
                                marginBottom: "1rem"
                            }}>
                                PARTNER · MARKETING DIGITAL
                            </span>
                            <p style={{
                                fontFamily: "var(--font-body)",
                                fontWeight: 300,
                                fontSize: "0.875rem",
                                color: "rgba(8, 8, 8, 0.5)",
                                lineHeight: 1.75,
                                marginBottom: "1.5rem",
                                margin: "0 0 1.5rem 0"
                            }}>
                                Pablo Lizón es especialista en marketing digital y contenido. Colabora habitualmente con ABG Frame en proyectos de Sistema completo, donde se encarga de la estrategia de contenido y la gestión de redes sociales. No es socio de la empresa — es el partner de confianza al que ABG Frame recurre cuando el proyecto necesita esa pieza.
                            </p>
                            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                                {["CONTENIDO", "REDES SOCIALES", "META ADS"].map((tag) => (
                                    <span key={tag} style={{
                                        border: "1px solid rgba(8, 8, 8, 0.08)",
                                        borderRadius: "100px",
                                        padding: "0.25rem 0.65rem",
                                        fontFamily: "var(--font-mono)",
                                        fontSize: "0.5rem",
                                        color: "rgba(8, 8, 8, 0.35)",
                                        textTransform: "uppercase"
                                    }}>
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                .equipo-sistema-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 2rem;
                }
                @media (max-width: 767px) {
                    .equipo-sistema-grid {
                        grid-template-columns: 1fr !important;
                    }
                }
            `}} />
        </section>
    );
}

// ── Section 6: FAQ ────────────────────────────────────────────────────────────

function FaqSection() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    return (
        <section
            style={{
                background: "#080808",
                padding: "6rem clamp(1.5rem,5vw,5rem)",
                borderTop: "1px solid rgba(242,240,237,0.06)",
            }}
        >
            <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={vp}
                    transition={{ duration: 0.8, ease }}
                    style={{ marginBottom: "4rem" }}
                >
                    <SectionLabel>PREGUNTAS FRECUENTES</SectionLabel>
                    <h2
                        style={{
                            fontFamily: "var(--font-display)",
                            fontWeight: 800,
                            fontSize: "clamp(2.5rem,4.5vw,4rem)",
                            color: "#F2F0ED",
                            lineHeight: 1.0,
                            letterSpacing: "-0.03em",
                        }}
                    >
                        Lo que siempre
                        <br />
                        nos preguntan.
                    </h2>
                </motion.div>

                <div style={{ maxWidth: "800px", margin: "0 auto" }}>
                    {faqs.map((faq, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={vp}
                            transition={{ duration: 0.6, delay: i * 0.06, ease }}
                            style={{ borderBottom: "1px solid rgba(242,240,237,0.06)" }}
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                                style={{
                                    width: "100%",
                                    padding: "1.5rem 0",
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    background: "none",
                                    border: "none",
                                    cursor: "pointer",
                                    textAlign: "left" as const,
                                    fontFamily: "var(--font-display)",
                                    fontWeight: 600,
                                    fontSize: "1rem",
                                    color: openIndex === i ? "#CC0000" : "#F2F0ED",
                                    transition: "color 0.2s",
                                }}
                                onMouseEnter={(e) => {
                                    if (openIndex !== i) (e.currentTarget as HTMLButtonElement).style.color = "#CC0000";
                                }}
                                onMouseLeave={(e) => {
                                    if (openIndex !== i) (e.currentTarget as HTMLButtonElement).style.color = "#F2F0ED";
                                }}
                            >
                                <span>{faq.q}</span>
                                <span
                                    style={{
                                        fontFamily: "var(--font-display)",
                                        fontWeight: 300,
                                        fontSize: "1.5rem",
                                        color: "#CC0000",
                                        flexShrink: 0,
                                        marginLeft: "1rem",
                                    }}
                                >
                                    {openIndex === i ? "−" : "+"}
                                </span>
                            </button>

                            <AnimatePresence initial={false}>
                                {openIndex === i && (
                                    <motion.div
                                        key="answer"
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                                        style={{ overflow: "hidden" }}
                                    >
                                        <p
                                            style={{
                                                fontFamily: "var(--font-body)",
                                                fontWeight: 300,
                                                fontSize: "0.9rem",
                                                color: "rgba(242,240,237,0.4)",
                                                lineHeight: 1.8,
                                                paddingBottom: "1.5rem",
                                            }}
                                        >
                                            {faq.a}
                                        </p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

// ── Section 6: CTA Final ──────────────────────────────────────────────────────

function CtaFinalSection() {
    return (
        <section style={{ background: "#F2F0ED", padding: "6rem clamp(1.5rem,5vw,5rem)", textAlign: "center" as const }}>
            <div style={{ maxWidth: "700px", margin: "0 auto" }}>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={vp}
                    transition={{ duration: 0.8, ease }}
                >
                    <SectionLabel>¿LISTO PARA EMPEZAR?</SectionLabel>
                    <h2
                        style={{
                            fontFamily: "var(--font-display)",
                            fontWeight: 800,
                            fontSize: "clamp(2.5rem,4.5vw,4rem)",
                            color: "#080808",
                            lineHeight: 1.0,
                            letterSpacing: "-0.03em",
                            marginBottom: "1.5rem",
                        }}
                    >
                        <span className="highlight-word">Consultoría gratuita.</span>
                        <br />
                        Sin compromiso.
                    </h2>
                    <p
                        style={{
                            fontFamily: "var(--font-body)",
                            fontWeight: 300,
                            fontSize: "1rem",
                            color: "rgba(8,8,8,0.5)",
                            lineHeight: 1.8,
                            marginBottom: "2.5rem",
                        }}
                    >
                        30 minutos. Analizamos tu negocio, tu competencia
                        y tu presencia digital actual. Te decimos
                        exactamente qué está fallando y cómo lo arreglaríamos.
                        Gratis, sin compromiso y sin PowerPoints de 40 páginas.
                    </p>

                    <div className="cta-btns" style={{ display: "flex", flexDirection: "row" as const, gap: "1rem", justifyContent: "center", flexWrap: "wrap" as const }}>
                        <a
                            href="/contacto"
                            className="cta-primary"
                            style={{
                                background: "#080808",
                                color: "#F2F0ED",
                                fontFamily: "var(--font-display)",
                                fontWeight: 700,
                                fontSize: "0.95rem",
                                padding: "1.2rem 2.5rem",
                                borderRadius: "100px",
                                textDecoration: "none",
                                transition: "background 0.3s, color 0.3s",
                                display: "inline-block",
                            }}
                        >
                            Solicitar consultoría gratuita →
                        </a>
                        <a
                            href="/proyectos/yates-alicante"
                            className="cta-secondary"
                            style={{
                                border: "1.5px solid rgba(8,8,8,0.15)",
                                color: "rgba(8,8,8,0.6)",
                                fontFamily: "var(--font-display)",
                                fontWeight: 600,
                                fontSize: "0.95rem",
                                padding: "1.2rem 2.5rem",
                                borderRadius: "100px",
                                textDecoration: "none",
                                transition: "border-color 0.3s, color 0.3s",
                                display: "inline-block",
                            }}
                        >
                            Ver caso de éxito →
                        </a>
                    </div>

                    <p
                        style={{
                            fontFamily: "var(--font-mono)",
                            fontSize: "0.55rem",
                            color: "rgba(8,8,8,0.25)",
                            textTransform: "uppercase" as const,
                            letterSpacing: "0.1em",
                            marginTop: "1.5rem",
                        }}
                    >
                        Respuesta en menos de 24h · Sin permanencia · Sin contratos
                    </p>
                </motion.div>
            </div>
        </section>
    );
}

// ── Main Export ───────────────────────────────────────────────────────────────

export default function SistemaPage() {
    return (
        <>
            <HeroSection />
            <QueEsSection />
            <TresPiezasSection />
            <ComoFuncionaSection />
            <EquipoSection />
            <FaqSection />
            <CtaFinalSection />

            <style dangerouslySetInnerHTML={{
                __html: `
                /* Hero CTA button */
                .hero-cta-btn:hover {
                    background: rgba(204,0,0,0.85) !important;
                }

                /* Pieza cards hover */
                .pieza-card:hover {
                    background: rgba(242,240,237,0.04) !important;
                }

                /* CTA buttons hover */
                .cta-primary:hover {
                    background: #CC0000 !important;
                    color: #080808 !important;
                }
                .cta-secondary:hover {
                    border-color: #080808 !important;
                    color: #080808 !important;
                }

                /* Dot pulse animation */
                @keyframes sistema-pulse {
                    0%, 100% { box-shadow: 0 0 0 0 rgba(204,0,0,0.4); }
                    50% { box-shadow: 0 0 0 6px rgba(204,0,0,0); }
                }
                .dot-pulse {
                    animation: sistema-pulse 2s ease-in-out infinite;
                }

                /* ── Mobile ── */
                @media (max-width: 767px) {
                    .hero-grid {
                        display: grid !important;
                        grid-template-columns: 1fr !important;
                        gap: 3rem !important;
                    }
                    .ques-grid {
                        grid-template-columns: 1fr !important;
                    }
                    .piezas-grid {
                        grid-template-columns: 1fr !important;
                    }
                    .paso-num {
                        font-size: 1.8rem !important;
                    }
                    .cta-btns {
                        flex-direction: column !important;
                    }
                    .cta-primary, .cta-secondary {
                        width: 100% !important;
                        text-align: center !important;
                    }
                }

                /* ── Desktop hero grid ── */
                @media (min-width: 768px) {
                    .hero-grid {
                        display: grid !important;
                        grid-template-columns: 60fr 40fr !important;
                        gap: 4rem !important;
                        align-items: center !important;
                    }
                }
            `}} />
        </>
    );
}
