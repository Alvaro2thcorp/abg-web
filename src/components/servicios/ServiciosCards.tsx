"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import CardSwap, { Card } from "../reactbits/CardSwap";

const SERVICIOS = [
  {
    num: "01",
    tag: "Diseño web",
    titulo: "La web que tu negocio merece.",
    items: [
      "Diseño a medida, cero plantillas",
      "Adaptada a móvil desde el primer día",
      "Entrega en 3–4 semanas",
      "Para que te encuentren en Google",
    ],
    accion: "Hablar del proyecto →",
    href: "/contacto",
    fondo: "#080808",
    color: "#F2F0ED",
  },
  {
    num: "02",
    tag: "Visibilidad local",
    titulo: "Que te encuentren en Alicante.",
    items: [
      "Posicionamiento en tu zona",
      "Más visitas de clientes reales",
      "Resultados que se mantienen",
      "Sin depender de publicidad",
    ],
    accion: "Hablar del proyecto →",
    href: "/contacto",
    fondo: "#F2F0ED",
    color: "#080808",
  },
  {
    num: "03",
    tag: "Todo integrado",
    titulo: "Web + Visibilidad + Contenido.",
    items: [
      "Sin permanencia",
      "Todo coordinado desde un sitio",
      "Informes mensuales claros",
      "Acompañamiento continuo",
    ],
    accion: "Ver El Sistema →",
    href: "/el-sistema",
    fondo: "#CC0000",
    color: "#F2F0ED",
  },
];

export default function ServiciosCards() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  return (
    <section
      ref={sectionRef}
      style={{
        background: "#080808",
        padding: "clamp(5rem, 10vw, 8rem) 0",
        position: "relative",
        overflow: "hidden",
        minHeight: "700px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "0 clamp(1.5rem, 5vw, 5rem)",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "4rem",
          alignItems: "center",
          position: "relative",
        }}
        className="servicios-cards-grid"
      >
        {/* Columna izquierda — texto editorial */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.65rem",
              fontWeight: 500,
              color: "#CC0000",
              textTransform: "uppercase",
              letterSpacing: "0.25em",
              marginBottom: "2rem",
            }}
          >
            Lo que hacemos
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: "'DM Serif Display', serif",
              fontWeight: 400,
              fontSize: "clamp(2rem, 4vw, 3.5rem)",
              color: "#F2F0ED",
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
              margin: 0,
              marginBottom: "2rem",
            }}
          >
            Tres formas de ayudarte.{" "}
            <span style={{ fontStyle: "italic", color: "rgba(242,240,237,0.3)" }}>
              Una sola dirección.
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 300,
              fontSize: "1rem",
              color: "rgba(242,240,237,0.45)",
              lineHeight: 1.65,
              margin: 0,
              marginBottom: "3rem",
              maxWidth: "420px",
            }}
          >
            Cada negocio es diferente. Por eso ofrecemos tres niveles de trabajo — desde una web sola hasta un sistema completo que trabaja para ti cada día.
          </motion.p>

          {/* Lista de servicios como índice */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
            {SERVICIOS.map((s, i) => (
              <motion.a
                key={s.num}
                href={s.href}
                initial={{ opacity: 0, x: -10 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.08 }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1.5rem",
                  padding: "1.25rem 0",
                  borderBottom: "1px solid rgba(242,240,237,0.06)",
                  textDecoration: "none",
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
                className="servicio-index-row"
              >
                <span style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.6rem",
                  fontWeight: 500,
                  color: "rgba(242,240,237,0.2)",
                  letterSpacing: "0.15em",
                  minWidth: "24px",
                }}>
                  {s.num}
                </span>
                <span style={{
                  fontFamily: "'DM Serif Display', serif",
                  fontWeight: 400,
                  fontSize: "clamp(1rem, 1.5vw, 1.3rem)",
                  color: "#F2F0ED",
                  letterSpacing: "-0.01em",
                }}>
                  {s.titulo}
                </span>
                <span
                  style={{
                    marginLeft: "auto",
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.7rem",
                    color: "#CC0000",
                    opacity: 0,
                    transition: "opacity 0.2s",
                  }}
                  className="servicio-arrow"
                >
                  →
                </span>
              </motion.a>
            ))}
          </div>
        </div>

        {/* Columna derecha — CardSwap */}
        <div style={{
          position: "relative",
          height: "520px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}>
          <CardSwap
            width={380}
            height={300}
            cardDistance={50}
            verticalDistance={60}
            delay={4000}
            pauseOnHover={true}
            easing="elastic"
            skewAmount={4}
          >
            {SERVICIOS.map((s) => (
              <Card
                key={s.num}
                style={{
                  background: s.fondo,
                  border: `1px solid ${s.fondo === "#F2F0ED" ? "rgba(8,8,8,0.1)" : "rgba(242,240,237,0.08)"}`,
                  padding: "2.5rem",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  cursor: "pointer",
                }}
                onClick={() => window.location.href = s.href}
              >
                <div>
                  <div style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.6rem",
                    fontWeight: 500,
                    color: s.fondo === "#CC0000" ? "rgba(242,240,237,0.7)" : s.fondo === "#F2F0ED" ? "rgba(8,8,8,0.4)" : "#CC0000",
                    textTransform: "uppercase",
                    letterSpacing: "0.2em",
                    marginBottom: "1rem",
                  }}>
                    {s.tag}
                  </div>
                  <div style={{
                    fontFamily: "'DM Serif Display', serif",
                    fontWeight: 400,
                    fontSize: "clamp(1.2rem, 2vw, 1.6rem)",
                    color: s.color,
                    letterSpacing: "-0.02em",
                    lineHeight: 1.2,
                    marginBottom: "1.5rem",
                  }}>
                    {s.titulo}
                  </div>
                  <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                    {s.items.map((item, i) => (
                      <li key={i} style={{
                        fontFamily: "'Inter', sans-serif",
                        fontWeight: 300,
                        fontSize: "0.85rem",
                        color: s.fondo === "#F2F0ED" ? "rgba(8,8,8,0.55)" : "rgba(242,240,237,0.55)",
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                      }}>
                        <span style={{ color: s.fondo === "#CC0000" ? "rgba(242,240,237,0.5)" : "#CC0000", fontSize: "0.5rem" }}>●</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.8rem",
                  fontWeight: 500,
                  color: s.fondo === "#CC0000" ? "#F2F0ED" : s.fondo === "#F2F0ED" ? "#080808" : "#CC0000",
                  marginTop: "1.5rem",
                  paddingTop: "1.25rem",
                  borderTop: `1px solid ${s.fondo === "#F2F0ED" ? "rgba(8,8,8,0.08)" : "rgba(242,240,237,0.08)"}`,
                }}>
                  {s.accion}
                </div>
              </Card>
            ))}
          </CardSwap>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .servicio-index-row:hover .servicio-arrow { opacity: 1 !important; }
        .servicio-index-row:hover > span:nth-child(2) { color: rgba(242,240,237,0.7) !important; }
        @media (max-width: 1023px) {
          .servicios-cards-grid { grid-template-columns: 1fr !important; }
        }
      `}} />
    </section>
  );
}
