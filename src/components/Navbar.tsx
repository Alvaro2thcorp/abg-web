"use client";

import { useState, useEffect } from "react";
import PillNav from "./reactbits/PillNav";
import FormularioPresupuestoModal from "./FormularioPresupuestoModal";

const items = [
  { label: "Servicios", href: "/servicios" },
  { label: "Ejemplos", href: "/proyectos" },
  { label: "El estudio", href: "/sobre-nosotros" },
  { label: "Blog", href: "/blog" },
  { label: "Contacto", href: "/contacto" },
];

export default function Navbar() {
  const [activeHref, setActiveHref] = useState<string>("/");
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    setActiveHref(window.location.pathname);
  }, []);

  const ctaButton = (
    <button
      onClick={() => setModalOpen(true)}
      style={{
        background: "rgba(209, 65, 36, 0.85)",
        color: "#F2F0ED",
        fontFamily: "'Inter', sans-serif",
        fontWeight: 500,
        fontSize: "0.75rem",
        padding: "0 1.4rem",
        height: "52px",
        borderRadius: "9999px",
        border: "1px solid rgba(242, 240, 237, 0.15)",
        backdropFilter: "blur(20px) saturate(140%)",
        WebkitBackdropFilter: "blur(20px) saturate(140%)",
        cursor: "pointer",
        letterSpacing: "0.15em",
        textTransform: "uppercase",
        transition: "background 0.2s, transform 0.2s",
        whiteSpace: "nowrap",
      }}
      onMouseEnter={(e) => { e.currentTarget.style.background = "#D14124"; }}
      onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(209, 65, 36, 0.85)"; }}
    >
      Presupuesto →
    </button>
  );

  return (
    <>
      <PillNav
        logo="/images/isotipo.webp"
        logoAlt="ABG Frame"
        items={items}
        activeHref={activeHref}
        baseColor="#080808"
        pillColor="#F2F0ED"
        hoveredPillTextColor="#080808"
        pillTextColor="#F2F0ED"
        ease="power3.easeOut"
        initialLoadAnimation={true}
        ctaButton={ctaButton}
      />
      <FormularioPresupuestoModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
