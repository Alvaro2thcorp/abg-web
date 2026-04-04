"use client";

import React from "react";
import { motion } from "framer-motion";

export default function ProblemaHome() {
    return (
        <section style={{
            background: "#F2F0ED",
            padding: "4rem 0 2rem",
            position: "relative"
        }}>
            <div style={{
                maxWidth: "1400px",
                width: "100%",
                margin: "0 auto",
                padding: "0 clamp(1.5rem, 5vw, 5rem)",
                display: "grid",
                gridTemplateColumns: "1fr",
                gap: "2rem"
            }}>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                    style={{ maxWidth: "800px" }}
                >
                    <h2 style={{
                        fontFamily: "var(--font-display)",
                        fontWeight: 800,
                        fontSize: "clamp(1.8rem, 3vw, 2.6rem)",
                        color: "#080808",
                        lineHeight: 1.1,
                        letterSpacing: "-0.03em",
                        marginBottom: "1.5rem"
                    }}>
                        Una web bien construida <span className="highlight-word">convierte visitas en consultas.</span>
                    </h2>

                    <div style={{
                        fontFamily: "Epilogue, sans-serif",
                        fontWeight: 300,
                        fontSize: "1rem",
                        color: "rgba(8,8,8,0.7)",
                        lineHeight: 1.65,
                        display: "flex",
                        flexDirection: "column",
                        gap: "1.2rem"
                    }}>
                        <p>
                            Negocios con años de trayectoria en Alicante —náutica, clínicas estéticas, inmobiliarias de alto valor— tienen el potencial de captar clientes de forma constante desde internet. La web es el primer filtro: si transmite autoridad y carga rápido, el cliente potencial se queda. Si no, se va a la competencia.
                        </p>
                        <p>
                            ABG Frame construye esa web. Diseño orientado a la conversión, SEO integrado desde el primer commit y rendimiento técnico que Google premia desde el lanzamiento. Cada decisión apunta a un resultado concreto: más consultas de calidad para el negocio.
                        </p>
                        <p>
                            El resultado es una herramienta de captación que trabaja de forma autónoma. Visibilidad orgánica que crece mes a mes, primeras impresiones que generan confianza y un sistema que no depende de publicidad constante para funcionar.
                        </p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
