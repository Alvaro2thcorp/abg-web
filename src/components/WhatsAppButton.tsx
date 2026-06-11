"use client";

import React from "react";
import { motion } from "framer-motion";

export default function WhatsAppButton() {
    return (
        <>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.5, ease: [0.16, 1, 0.3, 1] }}
                className="wa-wrapper"
                style={{
                    position: "fixed",
                    bottom: "2rem",
                    right: "2rem",
                    zIndex: 999,
                    display: "flex",
                    alignItems: "center",
                }}
            >
                {/* Tooltip */}
                <span className="wa-tooltip" style={{
                    position: "absolute",
                    right: "70px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "rgba(8, 8, 8, 0.85)",
                    color: "#F2F0ED",
                    fontFamily: "var(--font-display)",
                    fontSize: "0.8rem",
                    fontWeight: 600,
                    padding: "0.4rem 0.9rem",
                    borderRadius: "8px",
                    whiteSpace: "nowrap",
                    opacity: 0,
                    pointerEvents: "none",
                    transition: "opacity 0.2s",
                }}>
                    ¿Hablamos? →
                </span>

                {/* Button */}
                <a
                    href="https://wa.me/34601058997"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Contactar por WhatsApp"
                    className="wa-btn"
                    style={{
                        width: "56px",
                        height: "56px",
                        borderRadius: "50%",
                        background: "#25D366",
                        boxShadow: "0 4px 20px rgba(37, 211, 102, 0.4)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        transition: "transform 0.3s, box-shadow 0.3s",
                        textDecoration: "none",
                        flexShrink: 0,
                    }}
                >
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                        <path d="M12 0C5.373 0 0 5.373 0 12c0 2.122.554 4.118 1.523 5.851L.057 23.994l6.304-1.538A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.006-1.371l-.359-.214-3.721.907.944-3.641-.234-.374A9.818 9.818 0 1112 21.818z"/>
                    </svg>
                </a>
            </motion.div>

            <style dangerouslySetInnerHTML={{ __html: `
                .wa-btn:hover {
                    transform: scale(1.1) !important;
                    box-shadow: 0 6px 28px rgba(37, 211, 102, 0.5) !important;
                }
                .wa-wrapper:hover .wa-tooltip {
                    opacity: 1 !important;
                }
                @media (max-width: 767px) {
                    .wa-wrapper {
                        bottom: 1.5rem !important;
                        right: 1.5rem !important;
                    }
                    .wa-tooltip {
                        display: none !important;
                    }
                }
            `}} />
        </>
    );
}
