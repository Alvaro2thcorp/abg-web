"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

// ── Data ──────────────────────────────────────────────────────────────────────
const LINES: { cmd: string; badge: string }[] = [
    { cmd: "analizando tu mercado y competencia...", badge: "✓  día 1-2" },
    { cmd: "diseñando arquitectura y wireframes...", badge: "✓  día 3-5" },
    { cmd: "desarrollando la web...",                badge: "✓  semana 2" },
    { cmd: "optimizando SEO técnico...",             badge: "✓  semana 3" },
    { cmd: "revisiones y ajustes finales...",        badge: "✓  semana 3-4" },
    { cmd: "lanzamiento en producción...",           badge: "✓  semana 4" },
];

// How long each character takes to type (ms)
const CHAR_DELAY = 28;
// Gap between lines (ms) after previous line finishes
const LINE_GAP = 320;

// ── Typing line ───────────────────────────────────────────────────────────────
function TypingLine({
    cmd,
    badge,
    startDelay,
    onDone,
    isLast,
}: {
    cmd: string;
    badge: string;
    startDelay: number;
    onDone: () => void;
    isLast: boolean;
}) {
    const [displayed, setDisplayed] = useState("");
    const [showBadge, setShowBadge] = useState(false);
    const [showCursor, setShowCursor] = useState(false);
    const started = useRef(false);

    useEffect(() => {
        if (started.current) return;
        started.current = true;

        const startTimer = setTimeout(() => {
            setShowCursor(true);
            let i = 0;
            const interval = setInterval(() => {
                i++;
                setDisplayed(cmd.slice(0, i));
                if (i >= cmd.length) {
                    clearInterval(interval);
                    setTimeout(() => {
                        setShowBadge(true);
                        if (!isLast) setShowCursor(false);
                        onDone();
                    }, 180);
                }
            }, CHAR_DELAY);
        }, startDelay);

        return () => clearTimeout(startTimer);
    }, []);

    return (
        <div
            style={{
                display: "flex",
                alignItems: "baseline",
                justifyContent: "space-between",
                gap: "1rem",
                padding: "0.55rem 0",
                borderBottom: "1px solid rgba(8,8,8,0.05)",
                minHeight: "2rem",
            }}
        >
            {/* Prompt + typed text + cursor */}
            <span
                style={{
                    fontFamily: "'Syne Mono', monospace",
                    fontSize: "clamp(0.72rem, 1.6vw, 0.88rem)",
                    color: "#080808",
                    display: "flex",
                    alignItems: "baseline",
                    gap: "0.5rem",
                    flexShrink: 0,
                    minWidth: 0,
                }}
            >
                <span style={{ color: "#F04E23", userSelect: "none" }}>❯</span>
                <span style={{ wordBreak: "break-word" }}>{displayed}</span>
                {showCursor && (
                    <span
                        className="terminal-cursor"
                        style={{
                            display: "inline-block",
                            width: "0.55em",
                            height: "1.1em",
                            background: "#F04E23",
                            verticalAlign: "text-bottom",
                            borderRadius: "1px",
                        }}
                    />
                )}
            </span>

            {/* Badge */}
            {showBadge && (
                <motion.span
                    initial={{ opacity: 0, x: 8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    style={{
                        fontFamily: "'Syne Mono', monospace",
                        fontSize: "clamp(0.62rem, 1.2vw, 0.72rem)",
                        color: "#F04E23",
                        whiteSpace: "nowrap",
                        flexShrink: 0,
                    }}
                >
                    {badge}
                </motion.span>
            )}
        </div>
    );
}

// ── Terminal window ───────────────────────────────────────────────────────────
function TerminalWindow({ active }: { active: boolean }) {
    const [visibleLines, setVisibleLines] = useState(0);
    const started = useRef(false);

    // Compute each line's startDelay from cumulative typing time
    const delays: number[] = [];
    let acc = 0;
    for (const line of LINES) {
        delays.push(acc);
        acc += line.cmd.length * CHAR_DELAY + 180 + LINE_GAP;
    }

    useEffect(() => {
        if (!active || started.current) return;
        started.current = true;
        setVisibleLines(1);
    }, [active]);

    const handleLineDone = (index: number) => {
        if (index + 1 < LINES.length) {
            setVisibleLines(index + 2);
        }
    };

    return (
        <div
            style={{
                background: "#FAFAF9",
                border: "1px solid rgba(8,8,8,0.1)",
                borderRadius: "10px",
                overflow: "hidden",
                boxShadow: "0 2px 24px rgba(8,8,8,0.07), 0 1px 4px rgba(8,8,8,0.05)",
                maxWidth: "720px",
                width: "100%",
                margin: "0 auto",
            }}
        >
            {/* Title bar */}
            <div
                style={{
                    background: "#EDECEA",
                    borderBottom: "1px solid rgba(8,8,8,0.08)",
                    padding: "0.7rem 1rem",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    userSelect: "none",
                }}
            >
                {/* Traffic lights */}
                {["#FF5F57", "#FEBC2E", "#28C840"].map((color, i) => (
                    <div
                        key={i}
                        style={{
                            width: "12px",
                            height: "12px",
                            borderRadius: "50%",
                            background: color,
                            flexShrink: 0,
                        }}
                    />
                ))}
                <span
                    style={{
                        flex: 1,
                        textAlign: "center",
                        fontFamily: "'Syne Mono', monospace",
                        fontSize: "0.65rem",
                        color: "rgba(8,8,8,0.3)",
                        letterSpacing: "0.05em",
                    }}
                >
                    abgframe — proceso@web ~ zsh
                </span>
            </div>

            {/* Body */}
            <div style={{ padding: "1.5rem 1.75rem" }}>
                {LINES.slice(0, visibleLines).map((line, i) => (
                    <TypingLine
                        key={i}
                        cmd={line.cmd}
                        badge={line.badge}
                        startDelay={i === 0 ? 0 : delays[i] - delays[i - 1] - (i > 0 ? 0 : 0)}
                        onDone={() => handleLineDone(i)}
                        isLast={i === LINES.length - 1}
                    />
                ))}
            </div>
        </div>
    );
}

// ── Section ───────────────────────────────────────────────────────────────────
export default function ElTimeline() {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, amount: 0.25 });
    const [terminalActive, setTerminalActive] = useState(false);

    useEffect(() => {
        if (isInView && !terminalActive) {
            // Small delay so the heading animation plays first
            const t = setTimeout(() => setTerminalActive(true), 600);
            return () => clearTimeout(t);
        }
    }, [isInView]);

    return (
        <section
            id="el-timeline"
            ref={sectionRef}
            aria-label="Proceso de trabajo ABG Frame — 4 semanas de cero a visible"
            style={{
                background: "#F2F0ED",
                padding: "6rem 0 7rem",
            }}
        >
            <div
                style={{
                    width: "100%",
                    maxWidth: "1400px",
                    margin: "0 auto",
                    padding: "0 clamp(1.5rem, 5vw, 5rem)",
                }}
            >
                {/* ── Heading ── */}
                <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
                    {/* Eyebrow */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6 }}
                        style={{
                            fontFamily: "'Syne Mono', monospace",
                            fontSize: "0.62rem",
                            color: "#F04E23",
                            textTransform: "uppercase",
                            letterSpacing: "0.25em",
                            marginBottom: "1.25rem",
                        }}
                    >
                        EL PROCESO
                    </motion.div>

                    {/* Main title */}
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.75, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                        style={{
                            fontFamily: "var(--font-display)",
                            fontWeight: 800,
                            fontSize: "clamp(2.5rem, 6vw, 5rem)",
                            color: "#080808",
                            letterSpacing: "-0.04em",
                            lineHeight: 0.95,
                            margin: "0 0 1rem",
                        }}
                    >
                        De cero a{" "}
                        <span style={{ color: "#F04E23", fontStyle: "italic" }}>visible.</span>
                    </motion.h2>

                    {/* Subtitle */}
                    <motion.p
                        initial={{ opacity: 0, y: 14 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.65, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
                        style={{
                            fontFamily: "Epilogue, sans-serif",
                            fontWeight: 300,
                            fontSize: "1rem",
                            color: "rgba(8,8,8,0.4)",
                            letterSpacing: "0.01em",
                            margin: 0,
                        }}
                    >
                        4 semanas. Sin rodeos.
                    </motion.p>
                </div>

                {/* ── Terminal ── */}
                <motion.div
                    initial={{ opacity: 0, y: 28 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
                >
                    <TerminalWindow active={terminalActive} />
                </motion.div>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes blink {
                    0%, 100% { opacity: 1; }
                    50%       { opacity: 0; }
                }
                .terminal-cursor {
                    animation: blink 0.85s step-start infinite;
                }
                `,
            }} />
        </section>
    );
}
