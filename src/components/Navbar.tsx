"use client";

import { useState, useEffect } from "react";
import PillNav from "./reactbits/PillNav";
import FormularioPresupuestoModal from "./FormularioPresupuestoModal";

const items = [
  { label: "Servicios", href: "/servicios" },
  { label: "El Sistema", href: "/el-sistema" },
  { label: "Sobre Nosotros", href: "/sobre-nosotros" },
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
        background: "#D14124",
        color: "#F2F0ED",
        fontFamily: "'Inter', sans-serif",
        fontWeight: 500,
        fontSize: "0.75rem",
        padding: "0 1.4rem",
        height: "52px",
        borderRadius: "9999px",
        border: "none",
        cursor: "pointer",
        letterSpacing: "0.15em",
        textTransform: "uppercase",
        transition: "background 0.2s, transform 0.2s",
        whiteSpace: "nowrap",
      }}
      onMouseEnter={(e) => { e.currentTarget.style.background = "#A8331C"; }}
      onMouseLeave={(e) => { e.currentTarget.style.background = "#D14124"; }}
    >
      Presupuesto →
    </button>
  );

  return (
    <>
      <PillNav
        logo="/images/isotipo-3d.png"
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
