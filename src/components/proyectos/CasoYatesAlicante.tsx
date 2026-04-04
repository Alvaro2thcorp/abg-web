"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

// Animation Variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as any }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  style?: React.CSSProperties;
}

const AnimatedSection = ({ children, className, style, id }: SectionProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.section
      id={id}
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={staggerContainer}
      className={className}
      style={style}
    >
      {children}
    </motion.section>
  );
};

export default function CasoYatesAlicante() {
  return (
    <div style={{ background: '#080808', color: '#F2F0ED', fontFamily: 'Epilogue, sans-serif' }}>
      
      {/* SECCIÓN 1 — HERO */}
      <AnimatedSection 
        className="hero-section"
        style={{ 
          position: 'relative', 
          overflow: 'hidden', 
          minHeight: '90vh', 
          display: 'flex', 
          flexDirection: 'column', 
          justifyContent: 'center', 
          padding: '5rem clamp(1.5rem, 5vw, 5rem) 4rem',
          background: '#080808' 
        }}
      >
        {/* Fondo decorativo */}
        <div 
          className="bg-number"
          style={{ 
            position: 'absolute', 
            right: '-2rem', 
            top: '50%', 
            transform: 'translateY(-50%)', 
            pointerEvents: 'none', 
            userSelect: 'none', 
            fontFamily: 'Cabinet Grotesk, sans-serif', 
            fontWeight: 800, 
            lineHeight: 1, 
            fontSize: '30vw', 
            opacity: 0.02, 
            color: '#F2F0ED' 
          }}
        >
          01
        </div>

        <div style={{ maxWidth: '1400px', margin: '0 auto', width: '100%', position: 'relative', zIndex: 10 }}>
          {/* Breadcrumb */}
          <nav style={{ marginBottom: '3rem' }}>
            <p style={{ fontFamily: 'Syne Mono, monospace', fontSize: '0.6rem', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'rgba(242, 240, 237, 0.25)' }}>
              <a href="/" style={{ color: 'inherit', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#F04E23'} onMouseLeave={(e) => e.currentTarget.style.color = 'inherit'}>ABG</a> / 
              <a href="/proyectos" style={{ color: 'inherit', textDecoration: 'none', transition: 'color 0.2s', marginLeft: '0.25rem' }} onMouseEnter={(e) => e.currentTarget.style.color = '#F04E23'} onMouseLeave={(e) => e.currentTarget.style.color = 'inherit'}> PROYECTOS</a> / 
              <span style={{ marginLeft: '0.25rem' }}>YATES ALICANTE</span>
            </p>
          </nav>

          <div className="hero-flex" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '3rem' }}>
            {/* IZQUIERDA */}
            <motion.div variants={fadeInUp} style={{ maxWidth: '800px' }}>
              <span style={{ display: 'inline-block', background: 'rgba(240, 78, 35, 0.1)', border: '1px solid rgba(240, 78, 35, 0.2)', borderRadius: '100px', padding: '0.25rem 0.75rem', marginBottom: '1.5rem', fontFamily: 'Syne Mono, monospace', fontSize: '0.55rem', color: '#F04E23', textTransform: 'uppercase' }}>
                CASO DE ESTUDIO
              </span>
              <h1 style={{ fontFamily: 'Cabinet Grotesk, sans-serif', fontWeight: 800, fontSize: 'clamp(2.2rem, 4vw, 4.5rem)', lineHeight: 0.92, letterSpacing: '-0.04em', margin: 0 }}>
                Yates <span className="highlight-word">Alicante</span>
              </h1>
              <p style={{ fontFamily: 'Cabinet Grotesk, sans-serif', fontWeight: 300, fontSize: 'clamp(1.1rem, 2vw, 1.4rem)', color: 'rgba(242, 240, 237, 0.4)', marginTop: '1.5rem', lineHeight: 1.5, maxWidth: '520px' }}>
                18 años en el sector náutico con una web de 2008. Reconstruimos su presencia digital desde cero: web nueva, SEO local y Google Ads. Los resultados llegaron en el tercer mes.
              </p>
            </motion.div>

            {/* DERECHA (FIX 1) */}
            <motion.div variants={fadeInUp} className="hero-data-col" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', alignItems: 'flex-end', textAlign: 'right' }}>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontFamily: 'Cabinet Grotesk, sans-serif', fontWeight: 800, fontSize: '2rem', lineHeight: 1, color: '#F2F0ED' }}>Web + SEO + Ads</span>
                <span style={{ fontFamily: 'Syne Mono, monospace', fontSize: '0.52rem', color: 'rgba(242, 240, 237, 0.25)', textTransform: 'uppercase', marginTop: '0.3rem', letterSpacing: '0.1em' }}>SERVICIOS</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <a href="https://yatesalicante.com" target="_blank" rel="noopener noreferrer" style={{ fontFamily: 'Cabinet Grotesk, sans-serif', fontWeight: 800, fontSize: '2rem', lineHeight: 1, color: '#F04E23', textDecoration: 'none', transition: 'opacity 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.opacity = '0.8'} onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}>
                  yatesalicante.com ↗
                </a>
                <span style={{ fontFamily: 'Syne Mono, monospace', fontSize: '0.52rem', color: 'rgba(242, 240, 237, 0.25)', textTransform: 'uppercase', marginTop: '0.3rem', letterSpacing: '0.1em' }}>WEB EN VIVO</span>
              </div>
            </motion.div>
          </div>

          {/* Barra inferior */}
          <motion.div variants={fadeInUp} style={{ marginTop: '4rem', paddingTop: '2rem', borderTop: '1px solid rgba(242, 240, 237, 0.08)', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            {["Astro 5", "React", "Tailwind CSS"].map((tech) => (
              <span key={tech} style={{ border: '1px solid rgba(242, 240, 237, 0.1)', borderRadius: '100px', padding: '0.4rem 1rem', fontFamily: 'Syne Mono, monospace', fontSize: '0.55rem', color: 'rgba(242, 240, 237, 0.4)', textTransform: 'uppercase' }}>
                {tech}
              </span>
            ))}
          </motion.div>
        </div>
      </AnimatedSection>

      {/* SECCIÓN 2 — EL RETO (FIX 2) */}
      <AnimatedSection 
        className="reto-section"
        style={{ padding: '4rem clamp(1.5rem, 5vw, 5rem)', background: '#F2F0ED' }}
      >
        <div className="reto-grid" style={{ maxWidth: '1400px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '5rem', alignItems: 'start' }}>
          {/* IZQUIERDA */}
          <motion.div variants={fadeInUp}>
            <span style={{ fontFamily: 'Syne Mono, monospace', fontSize: '0.6rem', color: '#F04E23', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '1rem', display: 'block' }}>
              EL RETO
            </span>
            <h2 style={{ fontFamily: 'Cabinet Grotesk, sans-serif', fontWeight: 800, fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', color: '#080808', lineHeight: 1.1, letterSpacing: '-0.02em', margin: 0 }}>
              Una empresa con 18 años de historia y una web que los hacía parecer <span className="highlight-word">de 2008.</span>
            </h2>
          </motion.div>

          {/* DERECHA */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {[
              {
                num: "01",
                title: "Visibilidad cero en Google",
                desc: "Con 18 años en el sector, Yates Alicante no aparecía en ninguna búsqueda relevante. Sus competidores más nuevos los superaban en todas las keywords del sector náutico en la Costa Blanca."
              },
              {
                num: "02",
                title: "Web obsoleta que generaba desconfianza",
                desc: "Su web anterior tenía más de 10 años, no era responsive, cargaba en más de 6 segundos y no transmitía la calidad real del servicio. Los clientes potenciales llegaban y se iban sin contactar."
              },
              {
                num: "03",
                title: "Sin sistema de captación digital",
                desc: "Dependían al 100% de referencias y clientes recurrentes. Sin formularios optimizados, sin presencia en redes y sin ninguna estrategia para captar nuevos clientes de alto ticket de forma predecible."
              }
            ].map((item) => (
              <motion.div 
                key={item.num}
                variants={fadeInUp}
                style={{ padding: '1.8rem 2rem', border: '1px solid rgba(8, 8, 8, 0.08)', borderRadius: '12px', background: '#FFFFFF' }}
              >
                <span style={{ fontFamily: 'Syne Mono, monospace', fontSize: '0.55rem', color: 'rgba(8, 8, 8, 0.2)', display: 'block', marginBottom: '0.5rem' }}>{item.num}</span>
                <h3 style={{ fontFamily: 'Cabinet Grotesk, sans-serif', fontWeight: 700, fontSize: '1.05rem', color: '#080808', marginBottom: '0.5rem', marginTop: 0 }}>{item.title}</h3>
                <p style={{ fontFamily: 'Epilogue, sans-serif', fontWeight: 300, fontSize: '0.875rem', color: 'rgba(8, 8, 8, 0.5)', lineHeight: 1.75, margin: 0 }}>
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* SECCIÓN 3 — LA SOLUCIÓN (FIX 3) */}
      <AnimatedSection 
        className="solucion-section"
        style={{ padding: '4rem clamp(1.5rem, 5vw, 5rem)', background: '#080808', borderTop: '1px solid rgba(242, 240, 237, 0.06)' }}
      >
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <span style={{ fontFamily: 'Syne Mono, monospace', fontSize: '0.6rem', color: '#F04E23', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '1rem', display: 'block' }}>
              LA SOLUCIÓN
            </span>
            <h2 style={{ fontFamily: 'Cabinet Grotesk, sans-serif', fontWeight: 800, fontSize: 'clamp(2rem, 4vw, 3.5rem)', color: '#F2F0ED', lineHeight: 1.05, letterSpacing: '-0.03em', margin: 0 }}>
              El Sistema ABG aplicado al <span className="highlight-word">sector náutico.</span>
            </h2>
          </div>

          <div className="solucion-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem' }}>
            {[
              {
                num: "01",
                title: "Diseño Web Náutica Premium",
                desc: "Desarrollamos una web en Astro 5 que refleja el lujo del sector. Velocidad instantánea, arquitectura SEO técnica y un diseño que transmite confianza absoluta a clientes internacionales."
              },
              {
                num: "02",
                title: "SEO Internacional ES/EN",
                desc: "Construimos una estrategia de posicionamiento para captar clientes españoles, británicos y franceses. Arquitectura de URLs optimizada y schema markup completo."
              },
              {
                num: "03",
                title: "Google Ads para Náutica",
                desc: "Campañas de búsqueda para captar demanda activa de clientes que buscan alquiler de barcos en Alicante. Segmentación por zona geográfica y por idioma. Resultados visibles desde el mes uno."
              },
              {
                num: "04",
                title: "Sistema de Captación",
                desc: "Formularios optimizados, integración con WhatsApp Business y una estructura diseñada para convertir visitas de alto valor en solicitudes reales de presupuesto."
              }
            ].map((item) => (
              <motion.div 
                key={item.num}
                variants={fadeInUp}
                style={{ padding: '2rem', border: '1px solid rgba(242, 240, 237, 0.08)', borderRadius: '16px', background: 'rgba(242, 240, 237, 0.02)', transition: 'background 0.3s' }}
                onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(242, 240, 237, 0.04)'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(242, 240, 237, 0.02)'}
              >
                <span style={{ fontFamily: 'Cabinet Grotesk, sans-serif', fontWeight: 800, fontSize: '3rem', color: 'rgba(240, 78, 35, 0.2)', lineHeight: 1, display: 'block', marginBottom: '1.5rem' }}>
                  {item.num}
                </span>
                <h3 style={{ fontFamily: 'Cabinet Grotesk, sans-serif', fontWeight: 700, fontSize: '1.1rem', color: '#F2F0ED', marginBottom: '0.75rem', marginTop: 0 }}>
                  {item.title}
                </h3>
                <p style={{ fontFamily: 'Epilogue, sans-serif', fontWeight: 300, fontSize: '0.875rem', color: 'rgba(242, 240, 237, 0.4)', lineHeight: 1.75, margin: 0 }}>
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* SECCIÓN 4 — MOCKUP VISUAL (FIX 4) */}
      <AnimatedSection 
        className="mockup-section"
        style={{ padding: '4rem clamp(1.5rem, 5vw, 5rem)', background: '#F2F0ED' }}
      >
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{ marginBottom: '3rem' }}>
            <span style={{ fontFamily: 'Syne Mono, monospace', fontSize: '0.6rem', color: '#F04E23', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '1rem', display: 'block' }}>
              EL RESULTADO VISUAL
            </span>
            <h2 style={{ fontFamily: 'Cabinet Grotesk, sans-serif', fontWeight: 800, fontSize: 'clamp(2rem, 4vw, 3.5rem)', color: '#080808', lineHeight: 1.05, letterSpacing: '-0.03em', margin: 0 }}>
              Una presencia digital <span className="highlight-word">a la altura del negocio.</span>
            </h2>
          </div>

          {/* Galería de capturas */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {/* IMAGEN PRINCIPAL */}
            <motion.div variants={fadeInUp} style={{ borderRadius: '16px', overflow: 'hidden', width: '100%', aspectRatio: '16/9', position: 'relative' }}>
              <img 
                src="/images/proyectos/yatesalicante-web1.jpg.png" 
                alt="Yates Alicante — diseño web premium home" 
                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }}
              />
            </motion.div>

            {/* GRID 2 COLUMNAS */}
            <div className="gallery-sub-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <motion.div variants={fadeInUp} style={{ borderRadius: '12px', overflow: 'hidden', width: '100%', aspectRatio: '16/9' }}>
                <img 
                  src="/images/proyectos/yatesalicante-web2.jpg.png" 
                  alt="Yates Alicante — sección interior" 
                  style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }}
                />
              </motion.div>
              <motion.div className="mobile-capture-container" variants={fadeInUp} style={{ borderRadius: '12px', overflow: 'hidden', width: '100%', aspectRatio: '9/16', maxHeight: '420px', position: 'relative' }}>
                <img 
                  src="/images/proyectos/yatesalicante-web3.jpg.png" 
                  alt="Yates Alicante — diseño responsive móvil" 
                  style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }}
                />
                <span style={{ position: 'absolute', top: '1rem', left: '1rem', fontFamily: 'Syne Mono, monospace', fontSize: '0.5rem', color: '#F04E23', background: 'rgba(8, 8, 8, 0.7)', borderRadius: '100px', padding: '0.25rem 0.65rem', textTransform: 'uppercase' }}>
                  RESPONSIVE
                </span>
              </motion.div>
            </div>
          </div>

          <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
            <a href="https://yatesalicante.com" target="_blank" rel="noopener noreferrer" style={{ fontFamily: 'Cabinet Grotesk, sans-serif', fontWeight: 600, fontSize: '0.95rem', color: '#F04E23', textDecoration: 'none', transition: 'opacity 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.opacity = '0.8'} onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}>
              Ver web en vivo → yatesalicante.com
            </a>
          </div>
        </div>
      </AnimatedSection>

      {/* SECCIÓN 5 — RESULTADOS (FIX 5) */}
      <AnimatedSection 
        className="resultados-section"
        style={{ padding: '4rem clamp(1.5rem, 5vw, 5rem)', background: '#080808', borderTop: '1px solid rgba(242, 240, 237, 0.06)' }}
      >
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <span style={{ fontFamily: 'Syne Mono, monospace', fontSize: '0.6rem', color: '#F04E23', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '1rem', display: 'block' }}>
              RESULTADOS
            </span>
            <h2 style={{ fontFamily: 'Cabinet Grotesk, sans-serif', fontWeight: 800, fontSize: 'clamp(2rem, 4vw, 3.5rem)', color: '#F2F0ED', lineHeight: 1.05, letterSpacing: '-0.03em', margin: 0 }}>
              Proyecto lanzado en 2024. Métricas en crecimiento.
            </h2>
          </div>

          <div className="metrics-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1px', background: 'rgba(242, 240, 237, 0.06)', border: '1px solid rgba(242, 240, 237, 0.06)', borderRadius: '16px', overflow: 'hidden' }}>
            {[
              { val: "100", suffix: "/100", label: "CORE WEB VITALS" },
              { val: "< 1.2s", label: "TIEMPO DE CARGA" },
              { val: "Top 3", label: "GOOGLE ES/EN" },
              { val: "↑", suffix: " Orgánico", label: "TRÁFICO EN CRECIMIENTO" }
            ].map((metric, idx) => (
              <div key={idx} style={{ background: '#080808', padding: '2.5rem 1.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
                  <span style={{ fontFamily: 'Cabinet Grotesk, sans-serif', fontWeight: 800, fontSize: 'clamp(2rem, 4vw, 3.5rem)', color: '#F2F0ED', lineHeight: 1 }}>
                    {metric.val}
                  </span>
                  {metric.suffix && (
                    <span style={{ fontFamily: 'Cabinet Grotesk, sans-serif', fontWeight: 800, fontSize: '1.4rem', color: '#F04E23' }}>
                      {metric.suffix}
                    </span>
                  )}
                </div>
                <span style={{ fontFamily: 'Syne Mono, monospace', fontSize: '0.52rem', color: 'rgba(242, 240, 237, 0.25)', textTransform: 'uppercase', marginTop: '0.75rem', letterSpacing: '0.1em' }}>
                  {metric.label}
                </span>
              </div>
            ))}
          </div>

          <p style={{ marginTop: '1.5rem', textAlign: 'center', fontFamily: 'Syne Mono, monospace', fontSize: '0.52rem', color: 'rgba(242, 240, 237, 0.2)', fontStyle: 'italic' }}>
            *Proyecto en fase de crecimiento SEO. Datos actualizados trimestralmente.
          </p>
        </div>
      </AnimatedSection>

      {/* SECCIÓN 6 — CTA FINAL (FIX 6) */}
      <AnimatedSection 
        className="cta-section"
        style={{ padding: '4rem clamp(1.5rem, 5vw, 5rem)', background: '#F2F0ED', textAlign: 'center' }}
      >
        <div style={{ maxWidth: '680px', margin: '0 auto' }}>
          <span style={{ fontFamily: 'Syne Mono, monospace', fontSize: '0.6rem', color: '#F04E23', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '1.5rem', display: 'block' }}>
            ¿TIENES UN NEGOCIO SIMILAR?
          </span>
          <h2 style={{ fontFamily: 'Cabinet Grotesk, sans-serif', fontWeight: 800, fontSize: 'clamp(2.2rem, 4vw, 3rem)', color: '#080808', lineHeight: 1.05, letterSpacing: '-0.03em', marginBottom: '1.5rem', marginTop: 0 }}>
            Construimos el mismo sistema para <span className="highlight-word">tu sector.</span>
          </h2>
          <p style={{ fontFamily: 'Epilogue, sans-serif', fontWeight: 300, fontSize: '1rem', color: 'rgba(8, 8, 8, 0.5)', lineHeight: 1.8, marginBottom: '2.5rem' }}>
            Si tienes un negocio náutico, inmobiliaria de lujo, finca de eventos o cualquier servicio premium, aplicamos exactamente el mismo sistema.
          </p>
          
          <div className="cta-buttons" style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a 
              href="/contacto" 
              className="btn-primary"
              style={{ padding: '1.1rem 2.5rem', background: '#080808', color: '#F2F0ED', fontFamily: 'Cabinet Grotesk, sans-serif', fontWeight: 700, borderRadius: '100px', textDecoration: 'none', transition: 'background 0.3s' }}
              onMouseEnter={(e) => e.currentTarget.style.background = '#F04E23'}
              onMouseLeave={(e) => e.currentTarget.style.background = '#080808'}
            >
              Solicitar análisis gratuito →
            </a>
            <a 
              href="/servicios" 
              className="btn-secondary"
              style={{ padding: '1.1rem 2.5rem', border: '1.5px solid rgba(8, 8, 8, 0.15)', color: 'rgba(8, 8, 8, 0.6)', fontFamily: 'Cabinet Grotesk, sans-serif', fontWeight: 600, borderRadius: '100px', textDecoration: 'none', transition: 'all 0.3s' }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#080808'; e.currentTarget.style.color = '#080808'; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(8, 8, 8, 0.15)'; e.currentTarget.style.color = 'rgba(8, 8, 8, 0.6)'; }}
            >
              Ver cómo funciona el sistema
            </a>
          </div>
        </div>
      </AnimatedSection>

      <style dangerouslySetInnerHTML={{
        __html: `
        @media (max-width: 767px) {
          .hero-section { padding: 6rem 1.5rem 5rem !important; }
          .hero-flex { flex-direction: column !important; align-items: flex-start !important; }
          .hero-data-col { align-items: flex-start !important; text-align: left !important; gap: 2rem !important; }
          .bg-number { font-size: 60vw !important; right: -5rem !important; }
          
          .reto-section { padding: 4rem 1.5rem !important; }
          .reto-grid { grid-template-columns: 1fr !important; gap: 2.5rem !important; }
          
          .solucion-section { padding: 4rem 1.5rem !important; }
          .solucion-grid { grid-template-columns: 1fr !important; }
          
          .mockup-section { padding: 4rem 1.5rem !important; }
          .gallery-sub-grid { grid-template-columns: 1fr !important; }
          .mobile-capture-container { max-height: none !important; }
          
          .resultados-section { padding: 4rem 1.5rem !important; }
          .metrics-grid { grid-template-columns: repeat(2, 1fr) !important; }
          
          .cta-section { padding: 4rem 1.5rem !important; }
          .btn-primary, .btn-secondary { width: 100% !important; display: inline-flex !important; }
          .cta-buttons { flex-direction: column !important; }
        }
      `}} />

    </div>
  );
}
