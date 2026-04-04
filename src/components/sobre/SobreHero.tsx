"use client";

import { motion } from "framer-motion";

export default function SobreHero() {
    const ease = [0.16, 1, 0.3, 1] as any;

    return (
        <section
            style={{
                backgroundColor: "#080808",
                minHeight: "85vh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                padding: "3rem clamp(1.5rem, 5vw, 5rem) 4rem",
                position: "relative",
                overflow: "hidden"
            }}
        >
            {/* FONDO DECORATIVO */}
            
            {/* LÍNEAS HORIZONTALES */}
            <div style={{ position: "absolute", top: "20%", left: 0, right: 0, height: "1px", background: "rgba(242, 240, 237, 0.03)", pointerEvents: "none" }} />
            <div style={{ position: "absolute", top: "35%", left: 0, right: 0, height: "1px", background: "rgba(242, 240, 237, 0.03)", pointerEvents: "none" }} />
            <div style={{ position: "absolute", top: "50%", left: 0, right: 0, height: "1px", background: "rgba(242, 240, 237, 0.03)", pointerEvents: "none" }} />
            <div style={{ position: "absolute", top: "65%", left: 0, right: 0, height: "1px", background: "rgba(242, 240, 237, 0.03)", pointerEvents: "none" }} />
            <div style={{ position: "absolute", top: "80%", left: 0, right: 0, height: "1px", background: "rgba(242, 240, 237, 0.03)", pointerEvents: "none" }} />

            {/* TEXTO 'NOSOTROS' */}
            <div
                style={{
                    position: "absolute",
                    bottom: "-3rem",
                    left: "50%",
                    transform: "translateX(-50%)",
                    fontFamily: "var(--font-display)",
                    fontWeight: 800,
                    fontSize: "20vw",
                    lineHeight: 1,
                    color: "rgba(242, 240, 237, 0.03)",
                    pointerEvents: "none",
                    userSelect: "none",
                    whiteSpace: "nowrap",
                    zIndex: 0
                }}
            >
                NOSOTROS
            </div>

            <div style={{ maxWidth: "1400px", margin: "0 auto", width: "100%", position: "relative", zIndex: 1, display: "flex", flexDirection: "column", flexGrow: 1 }}>
                
                {/* ZONA SUPERIOR — breadcrumb */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.05, ease }}
                    style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.6rem",
                        color: "rgba(242, 240, 237, 0.25)",
                        textTransform: "uppercase",
                        letterSpacing: "0.15em",
                        marginBottom: "3rem"
                    }}
                >
                    <a href="/" style={{ textDecoration: "none", color: "inherit", transition: "color 0.2s" }} onMouseEnter={(e) => e.currentTarget.style.color = "#F04E23"} onMouseLeave={(e) => e.currentTarget.style.color = "inherit"}>
                        ABG
                    </a>
                    {" / "}
                    Sobre nosotros
                </motion.div>

                {/* ZONA CENTRAL */}
                <div style={{ flexGrow: 1, display: "flex", alignItems: "center" }}>
                    <div style={{ width: "100%", display: "grid", gap: "4rem", alignItems: "center" }} className="sobre-hero-grid-inner">
                        
                        {/* COLUMNA IZQUIERDA */}
                        <div>
                            {/* H1 */}
                            <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                                <div style={{ overflow: "hidden" }}>
                                    <motion.span
                                        initial={{ y: 40, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ duration: 0.8, delay: 0.15, ease }}
                                        className="sobre-hero-h1"
                                        style={{
                                            display: "block",
                                            fontFamily: "var(--font-display)",
                                            fontWeight: 800,
                                            color: "#F2F0ED",
                                            lineHeight: 0.92,
                                            letterSpacing: "-0.04em"
                                        }}
                                    >
                                        La agencia digital
                                    </motion.span>
                                </div>
                                <div style={{ overflow: "hidden" }}>
                                    <motion.span
                                        initial={{ y: 40, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ duration: 0.8, delay: 0.28, ease }}
                                        className="sobre-hero-h1 outline-text"
                                        style={{
                                            display: "block",
                                            fontFamily: "var(--font-display)",
                                            fontWeight: 800,
                                            color: "transparent",
                                            WebkitTextStroke: "1.5px rgba(242, 240, 237, 0.4)",
                                            lineHeight: 0.92,
                                            letterSpacing: "-0.04em"
                                        }}
                                    >
                                        de Alicante.
                                    </motion.span>
                                </div>
                            </div>

                            {/* Línea decorativa naranja */}
                            <motion.div
                                initial={{ scaleX: 0 }}
                                animate={{ scaleX: 1 }}
                                transition={{ duration: 0.6, delay: 0.45, ease }}
                                style={{
                                    width: "60px",
                                    height: "2px",
                                    background: "#F04E23",
                                    marginTop: "2.5rem",
                                    marginBottom: "2rem",
                                    transformOrigin: "left"
                                }}
                            />

                            {/* Párrafo */}
                            <motion.p
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.7, delay: 0.5, ease }}
                                style={{
                                    maxWidth: "420px",
                                    fontFamily: "var(--font-body)",
                                    fontWeight: 300,
                                    fontSize: "1rem",
                                    color: "rgba(242, 240, 237, 0.4)",
                                    lineHeight: 1.85,
                                    margin: 0
                                }}
                            >
                                ABG Frame es el proyecto de Álvaro Bergillos, fundado en San Juan de Alicante. Ni una agencia de 50 personas, ni un freelance que desaparece. Un especialista que entiende que tu web no es un gasto — es tu activo más rentable.
                            </motion.p>
                        </div>

                        {/* COLUMNA DERECHA */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.35, ease }}
                            style={{
                                border: "1px solid rgba(242, 240, 237, 0.08)",
                                borderRadius: "16px",
                                overflow: "hidden",
                                display: "flex",
                                flexDirection: "column"
                            }}
                            className="sobre-hero-col-der"
                        >
                            {[
                                { number: "01", title: "Diseño con propósito.", subtitle: "Cada píxel tiene una razón" },
                                { number: "02", title: "Tecnología al servicio del negocio.", subtitle: "No al revés" },
                                { number: "03", title: "Alto ticket únicamente.", subtitle: "Especialización total" }
                            ].map((item, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.8, delay: 0.35 + (idx * 0.08), ease }}
                                    className="sobre-hero-card"
                                    style={{
                                        padding: "1.5rem 2rem",
                                        borderBottom: idx === 2 ? "none" : "1px solid rgba(242, 240, 237, 0.06)",
                                        transition: "background 0.25s ease"
                                    }}
                                >
                                    <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.55rem", color: "rgba(242, 240, 237, 0.2)", marginBottom: "0.6rem", display: "block" }}>
                                        {item.number}
                                    </span>
                                    <div style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "1rem", color: "#F2F0ED", lineHeight: 1.3 }}>
                                        {item.title}
                                    </div>
                                    <div style={{ fontFamily: "var(--font-body)", fontWeight: 300, fontSize: "0.8rem", color: "rgba(242, 240, 237, 0.35)", marginTop: "0.3rem", lineHeight: 1.5 }}>
                                        {item.subtitle}
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </div>

                {/* ZONA INFERIOR */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.65, ease }}
                    style={{
                        paddingTop: "2.5rem",
                        borderTop: "1px solid rgba(242, 240, 237, 0.08)",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        flexWrap: "wrap",
                        gap: "1.5rem"
                    }}
                    className="sobre-hero-bottom"
                >
                    {/* Izquierda */}
                    <div style={{ display: "flex", alignItems: "center", gap: "0.8rem" }}>
                        {/* Dot animado */}
                        <div style={{
                            width: "8px", height: "8px", borderRadius: "50%", background: "#F04E23", flexShrink: 0
                        }} className="pulse-dot" />
                        <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", color: "rgba(242, 240, 237, 0.5)", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                            Álvaro Bergillos · Alicante
                        </div>
                    </div>

                    {/* Derecha - Botones */}
                    <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" as const }}>
                        <a
                            href="/proyectos"
                            style={{
                                display: "inline-block",
                                border: "1px solid rgba(242, 240, 237, 0.08)",
                                borderRadius: "100px",
                                padding: "0.8rem 1.5rem",
                                fontFamily: "var(--font-display)",
                                fontWeight: 600,
                                fontSize: "0.8rem",
                                color: "rgba(242, 240, 237, 0.3)",
                                textDecoration: "none",
                                transition: "all 0.3s ease",
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.borderColor = "rgba(242, 240, 237, 0.2)";
                                e.currentTarget.style.color = "rgba(242, 240, 237, 0.6)";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.borderColor = "rgba(242, 240, 237, 0.08)";
                                e.currentTarget.style.color = "rgba(242, 240, 237, 0.3)";
                            }}
                        >
                            Ver proyectos →
                        </a>
                        <a
                            href="/el-sistema"
                            style={{
                                display: "inline-block",
                                border: "1px solid rgba(242, 240, 237, 0.12)",
                                borderRadius: "100px",
                                padding: "0.8rem 1.8rem",
                                fontFamily: "var(--font-display)",
                                fontWeight: 700,
                                fontSize: "0.875rem",
                                color: "rgba(242, 240, 237, 0.5)",
                                textDecoration: "none",
                                transition: "all 0.3s ease",
                                pointerEvents: "auto"
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.borderColor = "#F04E23";
                                e.currentTarget.style.color = "#F04E23";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.borderColor = "rgba(242, 240, 237, 0.12)";
                                e.currentTarget.style.color = "rgba(242, 240, 237, 0.5)";
                            }}
                        >
                            Ver El Sistema →
                        </a>
                    </div>
                </motion.div>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes pulse-anim {
                    0% { box-shadow: 0 0 0 0 rgba(240, 78, 35, 0.7); }
                    70% { box-shadow: 0 0 0 6px rgba(240, 78, 35, 0); }
                    100% { box-shadow: 0 0 0 0 rgba(240, 78, 35, 0); }
                }
                .pulse-dot {
                    animation: pulse-anim 2s infinite;
                }
                .sobre-hero-card:hover {
                    background: rgba(242, 240, 237, 0.03);
                }
                .sobre-hero-h1 {
                    font-size: clamp(2.5rem, 4.5vw, 4.5rem);
                }
                .sobre-hero-grid-inner {
                    grid-template-columns: 6fr 4fr;
                }

                @media (max-width: 767px) {
                    .sobre-hero-grid-inner {
                        grid-template-columns: 1fr !important;
                        gap: 2rem !important;
                    }
                    .sobre-hero-col-der {
                        margin-top: 2rem !important;
                    }
                    .sobre-hero-h1 {
                        font-size: clamp(2rem, 7vw, 2.5rem) !important;
                    }
                    .sobre-hero-bottom {
                        flex-direction: column !important;
                        align-items: flex-start !important;
                        gap: 1rem !important;
                    }
                    .sobre-hero-bottom-left {
                        flex-direction: column !important;
                        align-items: flex-start !important;
                        gap: 1rem !important;
                    }
                    .divider-mobile {
                        display: none !important;
                    }
                }
            `}} />
        </section>
    );
}
