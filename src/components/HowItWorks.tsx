"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";

// --- Components -----------------------------------------------------------

const Terminal = ({ active }: { active: boolean }) => {
    const [lines, setLines] = useState<{ text: string, isCommand: boolean }[]>([]);

    const terminalLines = [
        { text: "Escaneando sector náutica...", isCommand: true, delay: 0 },
        { text: "✓ Competidores identificados: 12", isCommand: false, delay: 800 },
        { text: "Analizando keywords objetivo...", isCommand: true, delay: 1400 },
        { text: "✓ Oportunidades SEO: 47 keywords", isCommand: false, delay: 2000 },
        { text: "Calculando potencial de mercado...", isCommand: true, delay: 2600 },
        { text: "✓ Mercado alcanzable: alto potencial", isCommand: false, delay: 3200 },
    ];

    useEffect(() => {
        if (!active) {
            setLines([]);
            return;
        }

        const timeouts: NodeJS.Timeout[] = [];
        terminalLines.forEach((line) => {
            const t = setTimeout(() => {
                setLines(prev => [...prev, { text: line.text, isCommand: line.isCommand }]);
            }, line.delay);
            timeouts.push(t);
        });

        return () => timeouts.forEach(t => clearTimeout(t));
    }, [active]);

    return (
        <div style={{
            background: "#FFFFFF",
            border: "1px solid rgba(8,8,8,0.08)",
            borderRadius: "16px",
            width: "100%",
            height: "100%",
            minHeight: "300px",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            boxShadow: "0 8px 40px rgba(8,8,8,0.08), 0 2px 8px rgba(8,8,8,0.04)"
        }}>
            <div style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                padding: "1rem 1.5rem",
                background: "#F7F5F2",
                borderBottom: "1px solid rgba(8,8,8,0.06)"
            }}>
                <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#FF5F57" }} />
                <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#FFBD2E" }} />
                <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#28CA41" }} />
                <div style={{ flex: 1, textAlign: "center", fontFamily: "var(--font-mono)", fontSize: "0.65rem", color: "#555" }}>
                    abg_analysis.sh
                </div>
            </div>

            <div
                className="terminal-content"
                style={{
                    padding: "1.5rem",
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.72rem",
                    lineHeight: 2,
                    flex: 1,
                    color: "#1a1a1a"
                }}
            >
                {lines.map((line, i) => (
                    <div
                        key={i}
                        style={{
                            color: line.isCommand ? "#1a1a1a" : "#CC0000",
                            animation: line.text.startsWith("✓") ? "terminalFlash 0.3s ease-out" : "none"
                        }}
                    >
                        {line.isCommand && (
                            <span style={{ color: "rgba(204,0,0,0.4)", marginRight: "0.5rem" }}>~/abg $</span>
                        )}
                        {line.text}
                    </div>
                ))}
                {active && (
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                        <span style={{ color: "rgba(204,0,0,0.4)" }}>~/abg $</span>
                        <motion.span
                            animate={{ opacity: [1, 0, 1] }}
                            transition={{ duration: 0.8, repeat: Infinity }}
                            style={{
                                display: "inline-block",
                                width: "8px",
                                height: "16px",
                                background: "#CC0000",
                                borderRadius: "1px"
                            }}
                        />
                    </div>
                )}
            </div>

            {/* Progress Bar */}
            <div style={{ height: "2px", background: "#0F0F0F", width: "100%", position: "relative" }}>
                <motion.div
                    initial={{ width: "0%" }}
                    animate={active ? { width: "100%" } : { width: "0%" }}
                    transition={{ duration: 4, ease: "linear" }}
                    style={{ height: "100%", background: "#CC0000" }}
                />
            </div>
        </div>
    );
};

const StatusPill = ({ text, active }: { text: string, active: boolean }) => (
    <div style={{
        display: "flex",
        alignItems: "center",
        gap: "6px",
        background: "rgba(204,0,0,0.08)",
        border: "1px solid rgba(204,0,0,0.2)",
        padding: "0.2rem 0.6rem",
        borderRadius: "100px"
    }}>
        <div style={{
            width: "5px",
            height: "5px",
            background: "#CC0000",
            borderRadius: "50%",
            animation: active ? "blink 1s infinite" : "none"
        }} />
        <span style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.6rem",
            color: "#CC0000",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.1em"
        }}>{text}</span>
    </div>
);

const BadgesVisual = ({ active }: { active: boolean }) => {
    return (
        <div style={{
            background: "#FFFFFF",
            border: "1px solid rgba(8,8,8,0.08)",
            borderRadius: "16px",
            padding: "1.5rem",
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            gap: "0",
            boxShadow: "0 8px 40px rgba(8,8,8,0.08), 0 2px 8px rgba(8,8,8,0.04)"
        }}>
            <div style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.65rem",
                color: "rgba(8,8,8,0.35)",
                paddingBottom: "1rem",
                marginBottom: "1.5rem",
                borderBottom: "1px solid rgba(8,8,8,0.06)",
                background: "#F7F5F2",
                margin: "-1.5rem -1.5rem 1.5rem",
                padding: "1rem 1.5rem",
                borderTopLeftRadius: "16px",
                borderTopRightRadius: "16px"
            }}>
                sistema_abg.config
            </div>

            <AnimatePresence>
                {active && (
                    <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            style={{ background: "rgba(204,0,0,0.04)", border: "1px solid rgba(242,240,237,0.04)", borderRadius: "8px", padding: "1rem 1.25rem" }}
                        >
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.4rem" }}>
                                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                                    <div style={{ width: "8px", height: "8px", background: "#CC0000", borderRadius: "50%" }} />
                                    <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", color: "#080808" }}>WEB PREMIUM</span>
                                </div>
                                <StatusPill text="ACTIVO" active={true} />
                            </div>
                            <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.55rem", color: "rgba(8,8,8,0.55)" }}>Diseño · SEO técnico · Core Web Vitals 100</div>
                        </motion.div>

                        <div style={{ height: "1.5rem", width: "1px", borderLeft: "1px dotted rgba(204,0,0,0.15)", marginLeft: "1.5rem" }} />

                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.6 }}
                            style={{ background: "#F7F5F2", border: "1px solid rgba(8,8,8,0.04)", borderRadius: "8px", padding: "1rem 1.25rem" }}
                        >
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.4rem" }}>
                                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                                    <div style={{ width: "8px", height: "8px", background: "#CC0000", borderRadius: "50%" }} />
                                    <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", color: "#080808" }}>SEO INTERNACIONAL</span>
                                </div>
                                <StatusPill text="INDEXANDO" active={true} />
                            </div>
                            <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.55rem", color: "rgba(8,8,8,0.55)" }}>ES · EN · FR · Google Business</div>
                        </motion.div>

                        <div style={{ height: "1.5rem", width: "1px", borderLeft: "1px dotted rgba(204,0,0,0.15)", marginLeft: "1.5rem" }} />

                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 1.0 }}
                            style={{ background: "#F7F5F2", border: "1px solid rgba(8,8,8,0.04)", borderRadius: "8px", padding: "1rem 1.25rem" }}
                        >
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.4rem" }}>
                                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                                    <div style={{ width: "8px", height: "8px", background: "#CC0000", borderRadius: "50%" }} />
                                    <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", color: "#080808" }}>GOOGLE ADS</span>
                                </div>
                                <StatusPill text="CAPTANDO" active={true} />
                            </div>
                            <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.55rem", color: "rgba(8,8,8,0.55)" }}>Search · Display · Retargeting</div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 1.5 }}
                            style={{
                                marginTop: "1.5rem",
                                background: "rgba(204,0,0,0.06)",
                                border: "1px solid rgba(204,0,0,0.15)",
                                borderRadius: "6px",
                                padding: "0.75rem 1rem",
                                display: "flex",
                                justifyContent: "space-between",
                                fontFamily: "var(--font-mono)",
                                fontSize: "0.6rem",
                                boxShadow: "0 0 20px rgba(204,0,0,0.08)"
                            }}
                        >
                            <span style={{ color: "#080808" }}>SISTEMA COMPLETO</span>
                            <span style={{ color: "#CC0000", fontWeight: 700 }}>→ ACTIVADO</span>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

const LeadsCounter = ({ active }: { active: boolean }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!active) {
            setCount(0);
            return;
        }

        const interval = setInterval(() => {
            setCount(prev => {
                if (prev < 23) return prev + 1;
                clearInterval(interval);
                return 23;
            });
        }, 80);

        return () => clearInterval(interval);
    }, [active]);

    return (
        <div style={{
            background: "#FFFFFF",
            border: "1px solid rgba(8,8,8,0.08)",
            borderRadius: "16px",
            padding: "1.5rem",
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            boxShadow: "0 8px 40px rgba(8,8,8,0.08), 0 2px 8px rgba(8,8,8,0.04)"
        }}>
            <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "1.5rem",
                borderBottom: "1px solid rgba(8,8,8,0.06)",
                background: "#F7F5F2",
                margin: "-1.5rem -1.5rem 1.5rem",
                padding: "1rem 1.5rem",
                borderTopLeftRadius: "16px",
                borderTopRightRadius: "16px"
            }}>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", color: "rgba(8,8,8,0.35)" }}>
                    leads_dashboard.live
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "6px", fontFamily: "var(--font-mono)", fontSize: "0.5rem", color: "#28CA41" }}>
                    <div style={{ width: "6px", height: "6px", background: "#28CA41", borderRadius: "50%", animation: "blink 1s infinite" }} />
                    LIVE
                </div>
            </div>

            <div style={{ textAlign: "center", margin: "0.5rem 0 1.5rem", position: "relative" }}>
                <div style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 800,
                    fontSize: "4.5rem",
                    color: "#CC0000",
                    lineHeight: 1,
                    textShadow: "0 0 40px rgba(204,0,0,0.4)"
                }}>
                    {count}
                </div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.62rem", color: "#555", textTransform: "uppercase", letterSpacing: "0.2em", marginTop: "0.5rem" }}>
                    leads este mes
                </div>

                {/* Donut Chart */}
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "1.5rem" }}>
                    <div style={{ position: "relative", width: "48px", height: "48px" }}>
                        <svg width="48" height="48" viewBox="0 0 48 48">
                            <circle cx="24" cy="24" r="20" fill="none" stroke="rgba(242,240,237,0.05)" strokeWidth="3" />
                            <motion.circle
                                cx="24"
                                cy="24"
                                r="20"
                                fill="none"
                                stroke="#CC0000"
                                strokeWidth="3"
                                strokeDasharray="125.6"
                                initial={{ strokeDashoffset: 125.6 }}
                                animate={active ? { strokeDashoffset: 125.6 * (1 - 0.78) } : { strokeDashoffset: 125.6 }}
                                transition={{ duration: 1.5, delay: 0.5 }}
                                strokeLinecap="round"
                                transform="rotate(-90 24 24)"
                            />
                        </svg>
                        <div style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "100%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontFamily: "var(--font-mono)",
                            fontSize: "0.55rem",
                            color: "#CC0000"
                        }}>
                            78%
                        </div>
                    </div>
                    <div style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.5rem",
                        color: "#333",
                        textTransform: "uppercase",
                        letterSpacing: "0.1em",
                        marginTop: "0.4rem"
                    }}>
                        tasa de éxito
                    </div>
                </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column" }}>
                <MetricRow label="Tráfico orgánico" value="+340%" active={active} delay={0.2} />
                <MetricRow label="Coste por lead" value="-62%" active={active} delay={0.4} />
                <MetricRow label="Conversión web" value="4.8%" active={active} delay={0.6} />
            </div>

            <div style={{ marginTop: "auto", paddingTop: "1.5rem", textAlign: "right", fontFamily: "var(--font-mono)", fontSize: "0.55rem", color: "rgba(204,0,0,0.5)" }}>
                ↑ vs mes anterior
            </div>
        </div>
    );
};

const MetricRow = ({ label, value, active, delay }: { label: string, value: string, active: boolean, delay: number }) => {
    // Extract percentage for the mini bar
    const percentageMatch = value.match(/(-?\d+\.?\d*)/);
    const percentageValue = percentageMatch ? Math.min(Math.abs(parseFloat(percentageMatch[0])), 100) : 0;

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.5, delay }}
            style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.4rem",
                padding: "0.8rem 0",
                borderBottom: "1px solid rgba(8,8,8,0.06)"
            }}
        >
            <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "var(--font-mono)", fontSize: "0.62rem" }}>
                <span style={{ color: "rgba(8,8,8,0.35)" }}>{label}</span>
                <span style={{ color: "#CC0000" }}>{value}</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <div style={{ flex: 1, height: "1px", background: "#e5e3df", borderRadius: "2px", overflow: "hidden" }}>
                    <motion.div
                        initial={{ width: "0%" }}
                        animate={active ? { width: `${percentageValue}%` } : { width: "0%" }}
                        transition={{ duration: 1, delay: delay + 0.3 }}
                        style={{ height: "100%", background: "#CC0000" }}
                    />
                </div>
                <div style={{ width: "40px", height: "2px" }} /> {/* Spacer to align with text */}
            </div>
        </motion.div>
    );
};

// --- Phase Component ------------------------------------------------------

interface PhaseProps {
    num: string;
    tag: string;
    title: string;
    description: string;
    items: string[];
    visual: React.ReactNode;
    isLast?: boolean;
    onActive: (isActive: boolean) => void;
}

const PhaseIndicator = ({ num, active }: { num: string, active: boolean }) => (
    <div style={{ position: "relative", width: "24px", height: "24px", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <svg width="24" height="24" viewBox="0 0 24 24" style={{ position: "absolute", transform: "rotate(-90deg)" }}>
            <circle cx="12" cy="12" r="11" fill="none" stroke="rgba(204,0,0,0.5)" strokeWidth="1.5" />
            <motion.circle
                cx="12"
                cy="12"
                r="11"
                fill="none"
                stroke="#CC0000"
                strokeWidth="1.5"
                strokeDasharray="70"
                initial={{ strokeDashoffset: 70 }}
                animate={active ? { strokeDashoffset: 0 } : { strokeDashoffset: 70 }}
                transition={{ duration: 1, ease: "easeInOut" }}
            />
        </svg>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.55rem", color: "#CC0000", position: "relative", zIndex: 1 }}>{num}</span>
    </div>
);

const Phase = ({ num, tag, title, description, items, visual, isLast, onActive }: PhaseProps) => {
    const ref = useRef(null);
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsActive(entry.isIntersecting);
                onActive(entry.isIntersecting);
            },
            { threshold: 0.3 }
        );

        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    // Split title to italicize the last word
    const titleWords = title.split(" ");
    const lastWord = titleWords.pop();
    const mainTitle = titleWords.join(" ");

    return (
        <div
            ref={ref}
            className="phase-container"
            style={{
                padding: isLast ? "4rem 0 0 3rem" : "4rem 0 4rem 3rem",
                position: "relative",
                width: "100%",
                overflow: "hidden"
            }}
        >
            {/* Background Number - Massive */}
            <div
                className="background-number"
                style={{
                    position: "absolute",
                    right: "-5%",
                    top: "50%",
                    transform: "translateY(-50%)",
                    fontFamily: "var(--font-display)",
                    fontWeight: 800,
                    fontSize: "clamp(8rem, 15vw, 15rem)",
                    color: "rgba(8,8,8,0.03)",
                    lineHeight: 1,
                    pointerEvents: "none",
                    userSelect: "none",
                    transition: "color 0.8s ease",
                    whiteSpace: "nowrap"
                }}
            >
                {num}
            </div>

            <div
                className="phase-grid"
                style={{ position: "relative", zIndex: 10, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(300px, 100%), 1fr))", gap: "4rem", alignItems: "center" }}
            >
                {/* Left Column */}
                <motion.div
                    initial={{ opacity: 0, y: 32 }}
                    animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
                    transition={{ duration: 0.7 }}
                    style={{ minWidth: 0 }}
                >
                    <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                        <PhaseIndicator num={num} active={isActive} />
                        <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.62rem", color: "rgba(8,8,8,0.35)", letterSpacing: "0.2em" }}>{tag}</span>
                    </div>

                    <h3 style={{
                        fontFamily: "var(--font-display)",
                        fontWeight: 800,
                        fontSize: "clamp(1.8rem, 3vw, 2.8rem)",
                        color: "#080808",
                        lineHeight: 1.1,
                        margin: "1.5rem 0 1rem",
                        letterSpacing: "-0.025em"
                    }}>
                        {mainTitle} <span className="highlight-word">{lastWord}</span>
                    </h3>

                    <p style={{
                        fontFamily: "var(--font-body)",
                        fontWeight: 300,
                        fontSize: "0.95rem",
                        color: "rgba(8,8,8,0.55)",
                        lineHeight: 1.8,
                        maxWidth: "380px",
                        marginBottom: "2rem"
                    }}>
                        {description}
                    </p>

                    <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}>
                        {items.map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -10 }}
                                animate={isActive ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                                transition={{ duration: 0.4, delay: 0.3 + (i * 0.05) }}
                                className="deliverable-item"
                                style={{ display: "flex", alignItems: "center", gap: "1rem", cursor: "default" }}
                            >
                                <div className="deliverable-line" style={{ width: "12px", height: "1px", background: "#CC0000", transition: "width 0.3s ease" }} />
                                <span className="deliverable-text" style={{
                                    fontFamily: "var(--font-mono)",
                                    fontSize: "0.65rem",
                                    color: "rgba(8,8,8,0.35)",
                                    textTransform: "uppercase",
                                    transition: "color 0.3s ease"
                                }}>{item}</span>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Right Column (Visual) */}
                <motion.div
                    className="visual-container"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={isActive ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                    style={{ minWidth: 0 }}
                >
                    {visual}
                </motion.div>
            </div>

            {/* Separator Gradient (Desktop) */}
            {!isLast && (
                <div
                    className="desktop-separator"
                    style={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        height: "1px",
                        width: "100%",
                        background: "linear-gradient(to right, #CC0000, rgba(204,0,0,0.1) 30%, transparent 60%)"
                    }} />
            )}
        </div>
    );
};

// --- Main Section ---------------------------------------------------------

export default function HowItWorks() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [activePhase, setActivePhase] = useState(0);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start center", "end center"]
    });

    const progressHeight = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    const phases = [
        {
            num: "01",
            tag: "FASE 01",
            title: "Análisis real de tu mercado en Alicante",
            description: "No empezamos a diseñar hasta saber quién es tu competencia real, qué buscan tus clientes potenciales y dónde están las oportunidades de posicionamiento local. Una semana de análisis vale más que seis meses de trabajo mal orientado.",
            items: ["Auditoría de presencia digital", "Análisis de competidores locales", "Mapa de keywords por zona", "Estrategia de captación personalizada"],
            visual: <Terminal active={activePhase >= 1} />
        },
        {
            num: "02",
            tag: "FASE 02",
            title: "Construimos el sistema completo",
            description: "Web en Astro y React desde cero, SEO técnico integrado desde el primer commit, y contenido editorial que construye autoridad. No son tres servicios independientes — cada uno alimenta al siguiente. Meta Ads opcional cuando el negocio quiere acelerar.",
            items: ["Web premium a medida", "SEO local + técnico integrado", "Contenido editorial estratégico", "Meta Ads opcional"],
            visual: <BadgesVisual active={activePhase >= 2} />
        },
        {
            num: "03",
            tag: "FASE 03",
            title: "Clientes que llegan solos",
            description: "Cuando el sistema está funcionando, el tráfico orgánico crece mes a mes. Los Ads cierran el gap mientras el SEO escala. La web convierte. Y tú recibes consultas de personas que ya leyeron tu propuesta antes de escribirte.",
            items: ["Leads cualificados recurrentes", "Posicionamiento Google Alicante", "Optimización continua de campañas", "Informe mensual de resultados"],
            visual: <LeadsCounter active={activePhase >= 3} />
        }
    ];

    return (
        <section style={{
            background: "#F2F0ED",
            padding: "4rem 0 5rem",
            position: "relative",
            overflow: "hidden"
        }}>
            <div style={{
                maxWidth: "1400px",
                width: "100%",
                margin: "0 auto",
                padding: "0 clamp(1.5rem, 5vw, 5rem)"
            }}>

                {/* Header */}
                <header className="how-it-works-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "4rem", flexWrap: "wrap", gap: "2rem" }}>
                    <div style={{ flex: 1 }}>
                        <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.62rem", color: "rgba(8,8,8,0.35)", letterSpacing: "0.2em", marginBottom: "1rem" }}>EL PROCESO</div>
                        <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(2rem, 4vw, 3.5rem)", color: "#080808", lineHeight: 0.95, letterSpacing: "-0.03em" }}>
                            Así captamos clientes <span className="highlight-word">en Alicante.</span>
                        </h2>
                        <div style={{ width: "48px", height: "2px", background: "#CC0000", marginTop: "1.5rem" }} />
                    </div>
                    <div className="header-right-text" style={{ maxWidth: "280px", borderLeft: "1px solid rgba(8,8,8,0.08)", paddingLeft: "2rem" }}>
                        <p style={{ fontFamily: "var(--font-body)", fontWeight: 300, fontSize: "0.9rem", color: "rgba(8,8,8,0.55)", lineHeight: 1.8 }}>
                            Tres fases. Sin saltarse ninguna. Porque cada paso construye sobre el anterior, y saltarse la base es la razón por la que la mayoría de las campañas no funcionan.
                        </p>
                    </div>
                </header>

                {/* Timeline and Phases */}
                <div ref={containerRef} style={{ position: "relative", display: "flex", flexDirection: "column" }}>
                    {/* Progress Line */}
                    <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: "2px", background: "rgba(8,8,8,0.08)" }}>
                        <motion.div
                            style={{
                                position: "absolute",
                                left: 0,
                                top: 0,
                                width: "2px",
                                background: "#CC0000",
                                height: "100%",
                                scaleY: progressHeight,
                                transformOrigin: "top",
                                boxShadow: "0 0 8px rgba(204,0,0,0.4)"
                            }}
                        />
                    </div>

                    {phases.map((phase, i) => (
                        <Phase
                            key={i}
                            {...phase}
                            isLast={i === phases.length - 1}
                            onActive={(active) => {
                                if (active) setActivePhase(prev => Math.max(prev, i + 1));
                            }}
                        />
                    ))}
                </div>

                {/* Bottom CTA */}
                <div style={{
                    marginTop: "3.5rem",
                    padding: "3rem",
                    background: "rgba(204,0,0,0.03)",
                    border: "1px solid rgba(204,0,0,0.08)",
                    borderRadius: "16px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexWrap: "wrap",
                    gap: "2rem"
                }}>
                    <div>
                        <div style={{ width: "32px", height: "2px", background: "#CC0000", marginBottom: "0.75rem" }} />
                        <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(1.5rem, 2.5vw, 2.2rem)", color: "#080808", marginBottom: "0.5rem" }}>
                            ¿Listo para activar el sistema?
                        </h3>
                        <p style={{ fontFamily: "var(--font-body)", fontWeight: 300, fontSize: "0.9rem", color: "#555" }}>
                            Análisis gratuito de tu situación digital. Sin compromiso.
                        </p>
                    </div>
                    <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" as const }}>
                        <a
                            href="/contacto"
                            className="proceso-cta-btn"
                            style={{
                                background: "#CC0000",
                                color: "#f9f8f6",
                                borderRadius: "100px",
                                padding: "1rem 2rem",
                                fontFamily: "var(--font-display)",
                                fontWeight: 700,
                                fontSize: "0.9rem",
                                textDecoration: "none",
                                transition: "all 0.3s ease",
                                display: "inline-block",
                                position: "relative",
                                overflow: "hidden"
                            }}
                        >
                            Solicitar análisis gratuito →
                            <div
                                className="btn-shimmer"
                                style={{
                                    position: "absolute",
                                    top: 0,
                                    left: 0,
                                    width: "100%",
                                    height: "100%",
                                    background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)",
                                    transform: "translateX(-100%)",
                                    pointerEvents: "none"
                                }}
                            />
                        </a>
                        <a
                            href="/el-sistema"
                            className="proceso-cta-outline"
                            style={{
                                border: "1.5px solid rgba(8,8,8,0.15)",
                                color: "rgba(8,8,8,0.5)",
                                borderRadius: "100px",
                                padding: "1rem 2rem",
                                fontFamily: "var(--font-display)",
                                fontWeight: 600,
                                fontSize: "0.9rem",
                                textDecoration: "none",
                                transition: "all 0.3s ease",
                                display: "inline-block",
                            }}
                        >
                            Ver El Sistema →
                        </a>
                    </div>
                </div>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
                @keyframes terminalFlash {
                    0% { opacity: 0; background: rgba(204, 0, 0, 0.1); }
                    100% { opacity: 1; background: transparent; }
                }
                @keyframes shimmer {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(100%); }
                }
                .proceso-cta-btn:hover {
                    transform: translateY(-3px);
                    box-shadow: 0 16px 40px rgba(204, 0, 0, 0.35);
                }
                .proceso-cta-btn:hover .btn-shimmer {
                    animation: shimmer 0.6s ease;
                }
                .deliverable-item {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                    cursor: default;
                    transition: color 0.2s ease;
                }
                .deliverable-item .deliverable-text {
                    font-family: var(--font-mono);
                    font-size: 0.65rem;
                    color: rgba(8, 8, 8, 0.4);
                    text-transform: uppercase;
                    transition: color 0.2s ease;
                }
                .deliverable-item:hover .deliverable-line {
                    width: 20px !important;
                }
                .deliverable-item:hover .deliverable-text {
                    color: rgba(8, 8, 8, 0.8) !important;
                }
                @media (max-width: 991px) {
                    .phase-grid { grid-template-columns: 1fr !important; }
                }
                @media (max-width: 767px) {
                    .proceso-cta-btn { width: 100%; text-align: center; }
                    .how-it-works-header { flex-direction: column !important; align-items: flex-start !important; gap: 1.5rem !important; }
                    .header-right-text { border-left: none !important; padding-left: 0 !important; max-width: 100% !important; border-top: 1px solid rgba(8,8,8,0.06) !important; padding-top: 1rem !important; }
                    
                    .phase-container { 
                        padding: 2rem 0 2rem 0 !important; 
                        border-bottom: 1px solid rgba(8,8,8,0.08) !important;
                    }
                    .phase-container:last-child {
                        border-bottom: none !important;
                    }
                    .phase-grid {
                        grid-template-columns: 1fr !important;
                        gap: 2rem !important;
                    }
                    .desktop-separator { display: none !important; }
                    
                    .background-number { display: none !important; }
                    .visual-container { 
                        margin-top: 0; 
                        width: 100%; 
                        max-width: 100%;
                        overflow-x: hidden;
                    }
                    .terminal-content {
                        font-size: 0.72rem !important;
                    }
                }
            ` }} />
        </section>
    );
}
