"use client";

import { motion } from "framer-motion";

const MIEMBROS = [
    {
        nombre: "Álvaro Bergillos",
        rol: "Fundador · Diseño y desarrollo",
        descripcion: "Diseño cada proyecto de principio a fin. Desde la primera conversación hasta el lanzamiento. Sin intermediarios, sin equipos de cuenta, sin perder la visión por el camino.",
    },
    {
        nombre: "Pablo Lizón",
        rol: "Contenido y comunicación",
        descripcion: "Estrategia editorial y presencia digital. Para que la web no sea el final del trabajo, sino el comienzo de una conversación con tu cliente potencial.",
    },
];

export default function Equipo() {
    return (
        <section style={{
            background: "#080808",
            padding: "clamp(5rem, 10vw, 8rem) clamp(1.5rem, 5vw, 5rem)",
        }}>
            <div style={{
                maxWidth: "1400px",
                width: "100%",
                margin: "0 auto",
            }}>
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
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
                    Quiénes somos
                </motion.div>

                <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(380px, 1fr))",
                    gap: "clamp(3rem, 5vw, 5rem)",
                }}>
                    {MIEMBROS.map((m, i) => (
                        <motion.div
                            key={m.nombre}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <h3 style={{
                                fontFamily: "'DM Serif Display', serif",
                                fontWeight: 400,
                                fontSize: "clamp(1.8rem, 3vw, 2.5rem)",
                                color: "#F2F0ED",
                                letterSpacing: "-0.02em",
                                lineHeight: 1.1,
                                margin: 0,
                                marginBottom: "0.5rem",
                            }}>
                                {m.nombre}
                            </h3>
                            <div style={{
                                fontFamily: "'Inter', sans-serif",
                                fontSize: "0.7rem",
                                fontWeight: 500,
                                color: "rgba(242,240,237,0.5)",
                                textTransform: "uppercase",
                                letterSpacing: "0.2em",
                                marginBottom: "1.5rem",
                            }}>
                                {m.rol}
                            </div>
                            <p style={{
                                fontFamily: "'Inter', sans-serif",
                                fontWeight: 300,
                                fontSize: "1rem",
                                color: "rgba(242,240,237,0.6)",
                                lineHeight: 1.65,
                                margin: 0,
                                maxWidth: "440px",
                            }}>
                                {m.descripcion}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
