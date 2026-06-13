"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface FormularioPresupuestoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function FormularioPresupuestoModal({ isOpen, onClose }: FormularioPresupuestoModalProps) {
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    if (isOpen) window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    const formData = new FormData(e.currentTarget);
    formData.append("_subject", "Solicitud de presupuesto desde ABG Frame");
    try {
      const response = await fetch("https://formspree.io/f/meerbynw", {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });
      if (response.ok) { setSuccess(true); (e.target as HTMLFormElement).reset(); }
      else setError("Hubo un problema. Inténtalo de nuevo o escríbenos a contacto@abgframe.com");
    } catch {
      setError("Hubo un problema. Inténtalo de nuevo o escríbenos a contacto@abgframe.com");
    } finally { setSubmitting(false); }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(8,8,8,0.7)",
              backdropFilter: "blur(8px)",
              zIndex: 9998,
            }}
          />

          {/* Centering wrapper — a prueba de balas */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 9999,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "1.5rem",
              pointerEvents: "none",
            }}
          >
            {/* Modal card */}
            <div
              onClick={(e) => e.stopPropagation()}
              style={{
                width: "100%",
                maxWidth: "640px",
                maxHeight: "90vh",
                overflowY: "auto",
                background: "#F2F0ED",
                borderRadius: "8px",
                boxShadow: "0 24px 80px rgba(0,0,0,0.4)",
                position: "relative",
                pointerEvents: "auto",
              }}
            >
              {/* Close button */}
              <button
                onClick={onClose}
                aria-label="Cerrar"
                style={{
                  position: "absolute",
                  top: "1.5rem",
                  right: "1.5rem",
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "1.5rem",
                  color: "rgba(8,8,8,0.4)",
                  lineHeight: 1,
                  padding: "0.5rem",
                  zIndex: 2,
                }}
              >
                ×
              </button>

              {/* Content */}
              <div style={{ padding: "clamp(2rem, 5vw, 3.5rem)" }}>
                {success ? (
                  <div style={{ textAlign: "center", padding: "2rem 0" }}>
                    <div style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "0.7rem",
                      fontWeight: 500,
                      color: "#CC0000",
                      textTransform: "uppercase",
                      letterSpacing: "0.25em",
                      marginBottom: "1.5rem",
                    }}>
                      Mensaje recibido
                    </div>
                    <h3 style={{
                      fontFamily: "'DM Serif Display', serif",
                      fontWeight: 400,
                      fontSize: "clamp(1.8rem, 3vw, 2.4rem)",
                      color: "#080808",
                      letterSpacing: "-0.02em",
                      lineHeight: 1.1,
                      margin: 0,
                      marginBottom: "1rem",
                    }}>
                      Gracias por escribir. <span style={{ fontStyle: "italic", color: "#CC0000" }}>Respondemos en 24h.</span>
                    </h3>
                    <p style={{
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: 300,
                      fontSize: "0.95rem",
                      color: "rgba(8,8,8,0.55)",
                      lineHeight: 1.6,
                      margin: 0,
                    }}>
                      Revisamos cada solicitud personalmente. Pronto tendrás noticias.
                    </p>
                  </div>
                ) : (
                  <>
                    <div style={{ marginBottom: "2.5rem" }}>
                      <div style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "0.65rem",
                        fontWeight: 500,
                        color: "#CC0000",
                        textTransform: "uppercase",
                        letterSpacing: "0.25em",
                        marginBottom: "1.25rem",
                      }}>
                        Solicitar presupuesto
                      </div>
                      <h2 style={{
                        fontFamily: "'DM Serif Display', serif",
                        fontWeight: 400,
                        fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)",
                        color: "#080808",
                        letterSpacing: "-0.02em",
                        lineHeight: 1.05,
                        margin: 0,
                      }}>
                        Cuéntanos tu proyecto. <span style={{ fontStyle: "italic", color: "#CC0000" }}>Respondemos en 24h.</span>
                      </h2>
                    </div>

                    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                      <FormField name="nombre" label="Nombre" type="text" required />
                      <FormField name="email" label="Email" type="email" required />
                      <FormField name="negocio" label="Tu negocio o empresa" type="text" required />

                      <FormSelect name="tipo_proyecto" label="Tipo de proyecto" options={[
                        "Web nueva",
                        "Rediseño de mi web actual",
                        "Web + Sistema completo (Web + Visibilidad + Contenido)",
                        "No lo tengo claro todavía",
                      ]} required />

                      <FormSelect name="presupuesto" label="Presupuesto orientativo" options={[
                        "2.000€ — 3.000€",
                        "3.000€ — 5.000€",
                        "5.000€ — 10.000€",
                        "Más de 10.000€",
                        "Prefiero hablarlo",
                      ]} required />

                      <FormField name="mensaje" label="Cuéntanos brevemente" type="textarea" required />

                      {error && (
                        <div style={{
                          fontFamily: "'Inter', sans-serif",
                          fontSize: "0.85rem",
                          color: "#CC0000",
                          padding: "0.75rem 1rem",
                          background: "rgba(204,0,0,0.08)",
                          borderRadius: "4px",
                        }}>
                          {error}
                        </div>
                      )}

                      <button
                        type="submit"
                        disabled={submitting}
                        style={{
                          background: "#080808",
                          color: "#F2F0ED",
                          fontFamily: "'Inter', sans-serif",
                          fontWeight: 500,
                          fontSize: "0.85rem",
                          padding: "1rem 2rem",
                          borderRadius: "4px",
                          border: "none",
                          cursor: submitting ? "wait" : "pointer",
                          letterSpacing: "0.05em",
                          textTransform: "uppercase",
                          transition: "background 0.2s",
                          opacity: submitting ? 0.6 : 1,
                          marginTop: "0.5rem",
                        }}
                        onMouseEnter={(e) => { if (!submitting) e.currentTarget.style.background = "#CC0000"; }}
                        onMouseLeave={(e) => { if (!submitting) e.currentTarget.style.background = "#080808"; }}
                      >
                        {submitting ? "Enviando..." : "Enviar solicitud →"}
                      </button>

                      <p style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "0.75rem",
                        color: "rgba(8,8,8,0.4)",
                        lineHeight: 1.5,
                        margin: 0,
                        marginTop: "0.5rem",
                        textAlign: "center",
                      }}>
                        Sin compromiso. Revisamos cada solicitud personalmente.
                      </p>
                    </form>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function FormField({ name, label, type, required }: { name: string; label: string; type: string; required?: boolean }) {
  const [focused, setFocused] = useState(false);
  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "0.85rem 0",
    background: "transparent",
    border: "none",
    borderBottom: focused ? "1px solid #080808" : "1px solid rgba(8,8,8,0.15)",
    fontFamily: "'Inter', sans-serif",
    fontSize: "1rem",
    color: "#080808",
    outline: "none",
    transition: "border-color 0.2s",
    boxSizing: "border-box",
  };
  return (
    <div>
      <label htmlFor={name} style={{
        display: "block",
        fontFamily: "'Inter', sans-serif",
        fontSize: "0.7rem",
        fontWeight: 500,
        color: "rgba(8,8,8,0.5)",
        textTransform: "uppercase",
        letterSpacing: "0.15em",
        marginBottom: "0.4rem",
      }}>
        {label} {required && <span style={{ color: "#CC0000" }}>*</span>}
      </label>
      {type === "textarea" ? (
        <textarea id={name} name={name} required={required} rows={3} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} style={{ ...inputStyle, resize: "vertical", minHeight: "60px", fontFamily: "'Inter', sans-serif" }} />
      ) : (
        <input id={name} name={name} type={type} required={required} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} style={inputStyle} />
      )}
    </div>
  );
}

function FormSelect({ name, label, options, required }: { name: string; label: string; options: string[]; required?: boolean }) {
  const [focused, setFocused] = useState(false);
  return (
    <div>
      <label htmlFor={name} style={{
        display: "block",
        fontFamily: "'Inter', sans-serif",
        fontSize: "0.7rem",
        fontWeight: 500,
        color: "rgba(8,8,8,0.5)",
        textTransform: "uppercase",
        letterSpacing: "0.15em",
        marginBottom: "0.4rem",
      }}>
        {label} {required && <span style={{ color: "#CC0000" }}>*</span>}
      </label>
      <select
        id={name}
        name={name}
        required={required}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        defaultValue=""
        style={{
          width: "100%",
          padding: "0.85rem 0",
          background: "transparent",
          border: "none",
          borderBottom: focused ? "1px solid #080808" : "1px solid rgba(8,8,8,0.15)",
          fontFamily: "'Inter', sans-serif",
          fontSize: "1rem",
          color: "#080808",
          outline: "none",
          appearance: "none",
          backgroundImage: "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'><path d='M1 1l5 5 5-5' stroke='%23080808' stroke-width='1.5' fill='none' stroke-linecap='round'/></svg>\")",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "right 0.25rem center",
          paddingRight: "1.75rem",
          cursor: "pointer",
          transition: "border-color 0.2s",
          boxSizing: "border-box",
        }}
      >
        <option value="" disabled>Selecciona una opción</option>
        {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
      </select>
    </div>
  );
}
