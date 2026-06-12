"use client";

import React from "react";
import { motion } from "framer-motion";

export default function ProblemaHome() {
    return (
        <section style={{
            background: "#F2F0ED",
            padding: "clamp(6rem, 12vw, 10rem) 0",
            position: "relative",
            overflow: "hidden",
        }}>
            <div style={{
                maxWidth: "1400px",
                width: "100%",
                margin: "0 auto",
                padding: "0 clamp(1.5rem, 5vw, 5rem)",
            }}>
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.5 }}
                    style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "0.7rem",
                        fontWeight: 500,
                        color: "#CC0000",
                        textTransform: "uppercase",
                        letterSpacing: "0.25em",
                        marginBottom: "3rem",
                    }}
                >
                    01 — La diferencia
                </motion.div>

                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                    style={{
                        fontFamily: "'DM Serif Display', serif",
                        fontWeight: 400,
                        fontSize: "clamp(2.5rem, 6vw, 5.5rem)",
                        color: "#080808",
                        lineHeight: 1.05,
                        letterSpacing: "-0.03em",
                        margin: 0,
                        maxWidth: "1100px",
                    }}
                >
                    Tu web no es un escaparate.
                    <br />
                    <span style={{ fontStyle: "italic", color: "#CC0000" }}>
                        Es tu mejor comercial.
                    </span>
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    style={{
                        fontFamily: "'Inter', sans-serif",
                        fontWeight: 300,
                        fontSize: "clamp(1rem, 1.4vw, 1.15rem)",
                        color: "rgba(8,8,8,0.55)",
                        lineHeight: 1.6,
                        marginTop: "3rem",
                        maxWidth: "560px",
                    }}
                >
                    Trabaja para ti las 24 horas. Atrae a la gente correcta, transmite lo que tu negocio vale y convierte visitas en clientes reales — sin que tengas que estar encima.
                </motion.p>
            </div>
        </section>
    );
}
