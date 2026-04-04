"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ── Types ─────────────────────────────────────────────────────────────────────
interface NavLink {
    num: string;
    label: string;
    href: string;
}

// ── Data ──────────────────────────────────────────────────────────────────────
const links: NavLink[] = [
    { num: "01", label: "INICIO", href: "/" },
    { num: "02", label: "SERVICIOS", href: "/servicios" },
    { num: "03", label: "EL SISTEMA", href: "/el-sistema" },
    { num: "04", label: "SOBRE NOSOTROS", href: "/sobre-nosotros" },
    { num: "05", label: "BLOG", href: "/blog" },
    { num: "06", label: "CONTACTO", href: "/contacto" },
];


// ── Hamburger icon ─────────────────────────────────────────────────────────────
function HamburgerIcon({ isOpen }: { isOpen: boolean }) {
    return (
        <div
            style={{
                width: "22px",
                height: "14px",
                position: "relative",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
            }}
        >
            <motion.span
                animate={isOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
                style={{
                    display: "block",
                    width: "100%",
                    height: "1.5px",
                    background: "#F2F0ED",
                    borderRadius: "2px",
                    transformOrigin: "center",
                }}
            />
            <motion.span
                animate={isOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                transition={{ duration: 0.2 }}
                style={{
                    display: "block",
                    width: "100%",
                    height: "1.5px",
                    background: "#F2F0ED",
                    borderRadius: "2px",
                }}
            />
            <motion.span
                animate={isOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
                style={{
                    display: "block",
                    width: "100%",
                    height: "1.5px",
                    background: "#F2F0ED",
                    borderRadius: "2px",
                    transformOrigin: "center",
                }}
            />
        </div>
    );
}

// ── Main Component ─────────────────────────────────────────────────────────────
export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    // Scroll effect
    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Lock body scroll when menu open
    useEffect(() => {
        document.body.style.overflow = menuOpen ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [menuOpen]);

    // Close on Escape
    useEffect(() => {
        const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setMenuOpen(false); };
        document.addEventListener("keydown", onKey);
        return () => document.removeEventListener("keydown", onKey);
    }, []);

    const toggleMenu = () => setMenuOpen((prev) => !prev);

    return (
        <>
            {/* ── Navbar bar ───────────────────────────────────────────────────────── */}
            <nav
                aria-label="Navegación principal"
                style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "100%",
                    zIndex: 100,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "1.5rem 3rem",
                    transition: "background 0.3s, border-color 0.3s",
                    background: scrolled ? "rgba(8, 8, 8, 0.9)" : "transparent",
                    backdropFilter: scrolled ? "blur(12px)" : "none",
                    WebkitBackdropFilter: scrolled ? "blur(12px)" : "none",
                    borderBottom: scrolled ? "1px solid rgba(242, 240, 237, 0.06)" : "1px solid transparent",
                }}
            >
                {/* Left: Logo */}
                <a href="/" aria-label="ABG — Inicio" style={{ display: "flex", alignItems: "center", flexShrink: 0 }}>
                    <img
                        src="/images/abglogo.png"
                        alt="ABG Frame — Agencia Diseño Web y SEO Alicante"
                        height="32"
                        className="nav-logo-img"
                        style={{ display: "block", height: "32px", width: "auto" }}
                    />
                </a>

                {/* Center: tagline — desktop only */}
                <span
                    className="nav-tagline"
                    style={{
                        fontFamily: "'Syne Mono', monospace",
                        fontSize: "0.65rem",
                        textTransform: "uppercase",
                        letterSpacing: "0.12em",
                        color: "#aaa",
                        userSelect: "none",
                    }}
                >
                    Diseño web · SEO · Alicante
                </span>

                {/* Right: CTA + Menu button */}
                <div style={{ display: "flex", alignItems: "center", gap: "1.25rem" }}>
                    {/* Presupuesto button — hidden when menu open */}
                    <AnimatePresence>
                        {!menuOpen && (
                            <motion.a
                                href="/contacto"
                                initial={{ opacity: 0, y: -6 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -6 }}
                                transition={{ duration: 0.2 }}
                                className="nav-cta-btn"
                                style={{
                                    fontFamily: "Syne, sans-serif",
                                    fontWeight: 700,
                                    fontSize: "0.8rem",
                                    color: "#ffffff",
                                    background: "#F04E23",
                                    borderRadius: "100px",
                                    padding: "0.5rem 1.25rem",
                                    textDecoration: "none",
                                    whiteSpace: "nowrap",
                                    display: "inline-block",
                                }}
                            >
                                Presupuesto →
                            </motion.a>
                        )}
                    </AnimatePresence>

                    {/* MENÚ / CERRAR button */}
                    <button
                        onClick={toggleMenu}
                        aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
                        aria-expanded={menuOpen}
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "0.5rem",
                            background: "none",
                            border: "none",
                            cursor: "pointer",
                            padding: "0",
                            color: "#F2F0ED",
                        }}
                    >
                        <span
                            className="nav-menu-label"
                            style={{
                                fontFamily: "'Syne Mono', monospace",
                                fontSize: "0.65rem",
                                textTransform: "uppercase",
                                letterSpacing: "0.12em",
                                color: "#F2F0ED",
                            }}
                        >
                            {menuOpen ? "CERRAR" : "MENÚ"}
                        </span>
                        <HamburgerIcon isOpen={menuOpen} />
                    </button>
                </div>
            </nav>

            {/* ── Fullscreen overlay menu ───────────────────────────────────────────── */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        key="overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.35, ease: "easeInOut" }}
                        className="mobile-menu-overlay"
                        style={{
                            position: "fixed",
                            inset: 0,
                            zIndex: 99,
                            background: "#f9f8f6",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                            overflow: "hidden",
                        }}
                    >
                        {/* Links area */}
                        <nav
                            aria-label="Menú de navegación"
                            className="mobile-menu-nav"
                            style={{
                                paddingTop: "6rem",
                                paddingLeft: "3rem",
                                paddingRight: "3rem",
                                flex: 1,
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                            }}
                        >
                            <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
                                {links.map((link, i) => (
                                    <motion.li
                                        key={link.href}
                                        initial={{ opacity: 0, y: 40 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 20 }}
                                        transition={{
                                            duration: 0.5,
                                            delay: 0.08 * i,
                                            ease: [0.22, 1, 0.36, 1],
                                        }}
                                        style={{ marginBottom: "0.25rem" }}
                                    >
                                        <a
                                            href={link.href}
                                            onClick={() => setMenuOpen(false)}
                                            onMouseEnter={() => setHoveredIndex(i)}
                                            onMouseLeave={() => setHoveredIndex(null)}
                                            style={{
                                                display: "flex",
                                                alignItems: "baseline",
                                                gap: "1rem",
                                                textDecoration: "none",
                                                padding: "0.25rem 0",
                                                transform: hoveredIndex === i ? "translateX(12px)" : "translateX(0)",
                                                transition: "transform 0.25s ease, color 0.2s ease",
                                            }}
                                        >
                                            <span
                                                className="mobile-nav-num"
                                                style={{
                                                    fontFamily: "'Syne Mono', monospace",
                                                    fontSize: "0.7rem",
                                                    color: "#333",
                                                    flexShrink: 0,
                                                    lineHeight: 1,
                                                    paddingBottom: "0.25rem",
                                                }}
                                            >
                                                {link.num}
                                            </span>
                                            <span
                                                className={`mobile-nav-label ${hoveredIndex === i ? 'mobile-nav-label-active' : ''}`}
                                                style={{
                                                    fontFamily: "Syne, sans-serif",
                                                    fontWeight: 800,
                                                    fontSize: "clamp(1.5rem, 4vw, 3.5rem)",
                                                    color: hoveredIndex === i ? "#080808" : "rgba(8,8,8,0.2)",
                                                    lineHeight: 0.95,
                                                    transition: "color 0.2s ease",
                                                    letterSpacing: "-0.02em",
                                                }}
                                            >
                                                {link.label}
                                            </span>
                                        </a>
                                    </motion.li>
                                ))}
                            </ul>
                        </nav>

                        {/* Bottom contact info */}
                        <div
                            className="mobile-menu-footer"
                            style={{
                                padding: "1.5rem 3rem 0",
                                display: "flex",
                                alignItems: "center",
                                gap: "2rem",
                            }}
                        >
                            <a
                                href="mailto:hola@abgframe.com"
                                style={{
                                    fontFamily: "'Syne Mono', monospace",
                                    fontSize: "0.75rem",
                                    color: "#555",
                                    textDecoration: "none",
                                    transition: "color 0.2s",
                                }}
                                onMouseEnter={(e) => (e.currentTarget.style.color = "#080808")}
                                onMouseLeave={(e) => (e.currentTarget.style.color = "#888")}
                            >
                                hola@abgframe.com
                            </a>
                            <a
                                href="https://instagram.com/abgframe"
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                    fontFamily: "'Syne Mono', monospace",
                                    fontSize: "0.75rem",
                                    color: "#555",
                                    textDecoration: "none",
                                    transition: "color 0.2s",
                                }}
                                onMouseEnter={(e) => (e.currentTarget.style.color = "#080808")}
                                onMouseLeave={(e) => (e.currentTarget.style.color = "#888")}
                            >
                                @abgframe
                            </a>
                        </div>

                        {/* Bottom bar */}
                        <div
                            className="mobile-menu-bottom-bar"
                            style={{
                                borderTop: "1px solid #e5e3df",
                                padding: "1rem 3rem",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                flexWrap: "wrap",
                                gap: "0.5rem",
                            }}
                        >
                            <span
                                style={{
                                    fontFamily: "'Syne Mono', monospace",
                                    fontSize: "0.6rem",
                                    color: "#333",
                                    textTransform: "uppercase",
                                    letterSpacing: "0.08em",
                                }}
                            >
                                © 2025 ABG · Alicante
                            </span>
                            <span
                                style={{
                                    fontFamily: "'Syne Mono', monospace",
                                    fontSize: "0.6rem",
                                    color: "#333",
                                    textTransform: "uppercase",
                                    letterSpacing: "0.08em",
                                }}
                            >
                                Diseño Web · SEO · Mantenimiento
                            </span>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <style>{`
        .nav-tagline {
          display: none;
        }
        @media (max-width: 767px) {
          nav[style*="position: fixed"] {
            padding: 0 1rem !important;
            height: 56px !important;
            max-width: 100vw !important;
            overflow: hidden !important;
            display: flex !important;
            align-items: center !important;
            justify-content: space-between !important;
          }
          .mobile-menu-overlay {
            background: #080808 !important;
          }
          .mobile-menu-nav {
            padding-top: 6rem !important;
            padding-left: 1.5rem !important;
            padding-right: 1.5rem !important;
          }
          .mobile-nav-label {
            font-size: 2.5rem !important;
            font-weight: 800 !important;
            color: rgba(242, 240, 237, 0.2) !important;
          }
          .mobile-nav-label-active {
            color: #F2F0ED !important;
          }
          .mobile-nav-num {
            color: rgba(242, 240, 237, 0.4) !important;
          }
          .mobile-menu-footer {
            padding: 1.5rem !important;
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 1rem !important;
          }
          .mobile-menu-footer a {
            color: rgba(242, 240, 237, 0.5) !important;
          }
          .mobile-menu-bottom-bar {
            padding: 1.5rem !important;
            flex-direction: column !important;
            align-items: flex-start !important;
            border-top: 1px solid rgba(242, 240, 237, 0.08) !important;
            gap: 0.8rem !important;
          }
          .mobile-menu-bottom-bar span {
            color: rgba(242, 240, 237, 0.25) !important;
          }
        }
        .nav-cta-btn {
          transition: transform 0.2s ease, box-shadow 0.2s ease !important;
        }
        .nav-cta-btn:hover {
          transform: translateY(-2px) !important;
          box-shadow: 0 8px 24px rgba(240, 78, 35, 0.35) !important;
        }
        @media (max-width: 767px) {
          .nav-logo-img {
            height: 24px !important;
          }
          .nav-cta-btn {
            padding: 0.45rem 0.9rem !important;
            font-size: 0.75rem !important;
            white-space: nowrap !important;
          }
          .nav-menu-label {
            font-size: 0.65rem !important;
          }
        }
      `}</style>
        </>
    );
}
