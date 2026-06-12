"use client";

import { motion } from "framer-motion";

export default function SobreHero() {
    return (
        <section style={{
            background: "#F2F0ED",
            minHeight: "70vh",
            display: "flex",
            alignItems: "center",
            padding: "clamp(8rem, 15vw, 12rem) clamp(1.5rem, 5vw, 5rem) clamp(4rem, 8vw, 6rem)",
        }}>
            <div style={{
                maxWidth: "1400px",
                width: "100%",
                margin: "0 auto",
            }}>
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "0.7rem",
                        fontWeight: 500,
                        color: "#CC0000",
                        textTransform: "uppercase",
                        letterSpacing: "0.25em",
                        marginBottom: "2rem",
                    }}
                >
                    Sobre nosotros
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
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
                    Un estudio pequeño <span style={{ fontStyle: "italic", color: "#CC0000" }}>con foco grande.</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    style={{
                        fontFamily: "'Inter', sans-serif",
                        fontWeight: 300,
                        fontSize: "clamp(1rem, 1.4vw, 1.2rem)",
                        color: "rgba(8,8,8,0.55)",
                        lineHeight: 1.6,
                        marginTop: "3rem",
                        maxWidth: "640px",
                    }}
                >
                    No somos una agencia con cientos de clientes. Trabajamos con pocos negocios cada año, los suficientes para dedicarle a cada uno el tiempo que merece. Calidad por encima de cantidad.
                </motion.p>
            </div>
        </section>
    );
}
