"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

export default function Contacto() {
    const ease = [0.16, 1, 0.3, 1] as any;

    const [formData, setFormData] = useState({
        nombre: '', email: '', telefono: '',
        sector: '', servicio: '', mensaje: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (error) setError('');
    };

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        // 1. Validar
        if (!formData.nombre || !formData.email || !formData.sector || !formData.mensaje) {
            setError('Por favor completa los campos obligatorios');
            return;
        }

        // 2. Estado loading
        setIsSubmitting(true);
        setError('');

        try {
            // CONFIGURACIÓN FORMSPREE:
            // 1. Ir a formspree.io y crear cuenta gratuita
            // 2. Crear nuevo formulario
            // 3. Copiar el ID y reemplazar 'XXXXXXXX' en el fetch
            // 4. Verificar email de destino en Formspree dashboard
            const response = await fetch('https://formspree.io/f/meerbynw', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                // 4. Si ok
                setIsSuccess(true);
                setIsSubmitting(false);
            } else {
                throw new Error('Error en respuesta');
            }
        } catch (err) {
            // 5. Si error
            setError('Error al enviar. Inténtalo de nuevo o escríbenos directamente.');
            setIsSubmitting(false);
        }
    };

    const contactItems = [
        { label: "EMAIL", value: "hola@abgframe.com", href: "mailto:hola@abgframe.com" },
        { label: "WHATSAPP", value: "+34 601 05 89 97", href: "https://wa.me/34601058997" },
        { label: "UBICACIÓN", value: "San Juan de Alicante", href: "https://maps.app.goo.gl/vjX" }
    ];

    return (
        <section className="contacto-container" style={{
            backgroundColor: "#080808",
            minHeight: "100vh",
            position: "relative",
            overflow: "hidden"
        }}>
            {/* FONDO DECORATIVO */}
            <div
                style={{
                    position: "absolute",
                    right: "-8rem",
                    bottom: "-8rem",
                    fontFamily: "var(--font-display)",
                    fontWeight: 800,
                    fontSize: "35vw",
                    lineHeight: 1,
                    color: "rgba(242, 240, 237, 0.015)",
                    pointerEvents: "none",
                    userSelect: "none",
                    zIndex: 0
                }}
            >
                →
            </div>

            {/* COLUMNA IZQUIERDA */}
            <div className="contacto-izq" style={{
                background: "#080808",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                position: "relative",
                zIndex: 1
            }}>
                {/* ZONA SUPERIOR */}
                <div>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.05, ease }}
                        style={{
                            fontFamily: "var(--font-mono)",
                            fontSize: "0.6rem",
                            color: "rgba(242, 240, 237, 0.25)",
                            textTransform: "uppercase",
                            letterSpacing: "0.15em",
                            marginBottom: "4rem"
                        }}
                    >
                        <a href="/" style={{ textDecoration: "none", color: "inherit", transition: "color 0.2s" }} onMouseEnter={(e) => e.currentTarget.style.color = "#F04E23"} onMouseLeave={(e) => e.currentTarget.style.color = "inherit"}>
                            ABG
                        </a>
                        {" / "}
                        Contacto
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.1, ease }}
                        style={{
                            fontFamily: "var(--font-display)",
                            fontWeight: 800,
                            fontSize: "clamp(2.2rem, 4vw, 4rem)",
                            color: "#F2F0ED",
                            lineHeight: 0.92,
                            letterSpacing: "-0.04em",
                            marginBottom: "1.5rem",
                            marginTop: 0
                        }}
                    >
                        Hablemos.
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.25, ease }}
                        style={{
                            fontFamily: "var(--font-body)",
                            fontWeight: 300,
                            fontSize: "1rem",
                            color: "rgba(242, 240, 237, 0.4)",
                            lineHeight: 1.85,
                            maxWidth: "420px",
                            margin: 0
                        }}
                    >
                        Sin presupuestos automáticos ni plantillas de respuesta. Cuéntanos qué hace tu negocio y en qué punto estás. ABG Frame responde en menos de 24 horas. Si hay encaje, se explica cómo y cuánto. Si no, también.
                    </motion.p>
                </div>

                {/* ZONA MEDIA — 3 formas de contacto */}
                <div style={{ marginTop: "2rem", display: "flex", flexDirection: "column", gap: 0 }}>
                    {contactItems.map((item, idx) => (
                        <motion.a
                            key={idx}
                            href={item.href}
                            target={item.label === "INSTAGRAM" ? "_blank" : undefined}
                            rel={item.label === "INSTAGRAM" ? "noopener noreferrer" : undefined}
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.35 + (idx * 0.08), ease }}
                            className="contacto-item"
                            style={{
                                padding: "1.2rem 0",
                                borderBottom: "1px solid rgba(242, 240, 237, 0.06)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                gap: "1rem",
                                cursor: "pointer",
                                transition: "all 0.25s",
                                textDecoration: "none"
                            }}
                        >
                            <div style={{ pointerEvents: "none" }}>
                                <span style={{
                                    fontFamily: "var(--font-mono)",
                                    fontSize: "0.52rem",
                                    color: "rgba(242, 240, 237, 0.25)",
                                    textTransform: "uppercase",
                                    display: "block",
                                    marginBottom: "0.3rem",
                                    letterSpacing: "0.1em"
                                }}>
                                    {item.label}
                                </span>
                                <span className="contacto-item-valor" style={{
                                    fontFamily: "var(--font-display)",
                                    fontWeight: 600,
                                    fontSize: "1rem",
                                    color: "#F2F0ED",
                                    transition: "color 0.25s"
                                }}>
                                    {item.value}
                                </span>
                            </div>
                            <span className="contacto-item-arrow" style={{
                                fontFamily: "'Cabinet Grotesk', sans-serif",
                                fontWeight: 300,
                                fontSize: "1.1rem",
                                color: "rgba(242, 240, 237, 0.2)",
                                transition: "color 0.25s, transform 0.25s"
                            }}>
                                ↗
                            </span>
                        </motion.a>
                    ))}
                </div>

                {/* ZONA INFERIOR */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.6, ease }}
                    className="contacto-inferior"
                    style={{
                        marginTop: "auto",
                        paddingTop: "2rem"
                    }}
                >
                    <p style={{
                        fontFamily: "var(--font-body)",
                        fontWeight: 300,
                        fontSize: "0.85rem",
                        color: "rgba(242, 240, 237, 0.25)",
                        lineHeight: 1.7,
                        maxWidth: "320px",
                        margin: 0
                    }}>
                        Analizamos tu situación digital sin coste.
                        En 48 horas tienes un diagnóstico real.
                    </p>
                </motion.div>
            </div>

            {/* COLUMNA DERECHA — FORMULARIO */}
            <div className="contacto-der" style={{
                background: "#F2F0ED",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                position: "relative",
                zIndex: 1
            }}>
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.7, delay: 0.2, ease }}
                >
                    <div style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.6rem",
                        color: "#F04E23",
                        textTransform: "uppercase",
                        letterSpacing: "0.15em",
                        marginBottom: "0.8rem"
                    }}>
                        ANÁLISIS GRATUITO
                    </div>
                    <div style={{
                        fontFamily: "var(--font-display)",
                        fontWeight: 700,
                        fontSize: "1.4rem",
                        color: "#080808",
                        letterSpacing: "-0.02em",
                        marginBottom: "1.5rem"
                    }}>
                        Cuéntanos tu proyecto
                    </div>
                </motion.div>

                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                    {/* Campo 1: Nombre */}
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.35, ease }}>
                        <label style={labelStyle}>TU NOMBRE</label>
                        <input className="contact-input" type="text" name="nombre" placeholder="Álvaro García" value={formData.nombre} onChange={handleChange} required />
                    </motion.div>

                    {/* Campo 2: Email */}
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.41, ease }}>
                        <label style={labelStyle}>EMAIL</label>
                        <input className="contact-input" type="email" name="email" placeholder="alvaro@tuempresa.com" value={formData.email} onChange={handleChange} required />
                    </motion.div>

                    {/* Campo 3: Teléfono */}
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.47, ease }}>
                        <label style={labelStyle}>TELÉFONO (OPCIONAL)</label>
                        <input className="contact-input" type="tel" name="telefono" placeholder="+34 600 000 000" value={formData.telefono} onChange={handleChange} />
                    </motion.div>

                    {/* Campo 4: Sector */}
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.53, ease }} style={{ position: "relative" }}>
                        <label style={labelStyle}>TU SECTOR</label>
                        <select className="contact-input contact-select" name="sector" value={formData.sector} onChange={handleChange} required>
                            <option value="" disabled>Selecciona tu sector</option>
                            <option value="Náutica / Charter">Náutica / Charter</option>
                            <option value="Inmobiliaria de lujo">Inmobiliaria de lujo</option>
                            <option value="Finca / Eventos">Finca / Eventos</option>
                            <option value="Hotel / Restaurante">Hotel / Restaurante</option>
                            <option value="Clínica estética">Clínica estética</option>
                            <option value="Otro sector premium">Otro sector premium</option>
                        </select>
                        <div style={{
                            position: "absolute",
                            right: 0,
                            bottom: "0.75rem",
                            fontFamily: "var(--font-display)",
                            fontWeight: 300,
                            fontSize: "0.9rem",
                            color: "rgba(8, 8, 8, 0.3)",
                            pointerEvents: "none"
                        }}>
                            ↓
                        </div>
                    </motion.div>

                    {/* Campo 5: Servicio de interés */}
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.59, ease }} style={{ position: "relative" }}>
                        <label style={labelStyle}>QUÉ TE INTERESA</label>
                        <select className="contact-input contact-select" name="servicio" value={formData.servicio} onChange={handleChange}>
                            <option value="" disabled>Selecciona un servicio</option>
                            <option value="Sistema Completo (Web + SEO + Ads)">Sistema Completo (Web + SEO + Ads)</option>
                            <option value="Solo Web Premium">Solo Web Premium</option>
                            <option value="Solo SEO Internacional">Solo SEO Internacional</option>
                            <option value="Solo Meta Ads">Solo Meta Ads</option>
                            <option value="No lo tengo claro aún">No lo tengo claro aún</option>
                        </select>
                        <div style={{
                            position: "absolute",
                            right: 0,
                            bottom: "0.75rem",
                            fontFamily: "var(--font-display)",
                            fontWeight: 300,
                            fontSize: "0.9rem",
                            color: "rgba(8, 8, 8, 0.3)",
                            pointerEvents: "none"
                        }}>
                            ↓
                        </div>
                    </motion.div>

                    {/* Campo 6: Mensaje */}
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.65, ease }}>
                        <label style={labelStyle}>CUÉNTANOS TU PROYECTO</label>
                        <textarea className="contact-input" name="mensaje" rows={3} placeholder="Tengo un negocio de... y necesito..." value={formData.mensaje} onChange={handleChange} style={{ resize: "none" }} required />
                    </motion.div>
                </div>

                {error && (
                    <div style={{
                        marginTop: "0.5rem",
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.6rem",
                        color: "#F04E23",
                        textTransform: "uppercase"
                    }}>
                        {error}
                    </div>
                )}

                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.7, ease }} style={{ marginTop: "0.8rem" }}>
                    <button
                        onClick={handleSubmit}
                        disabled={isSubmitting || isSuccess}
                        className="contact-btn"
                        style={{
                            width: "100%",
                            background: isSuccess ? "#1a1a1a" : "#080808",
                            color: "#F2F0ED",
                            fontFamily: "var(--font-display)",
                            fontWeight: 700,
                            fontSize: "1rem",
                            padding: "1.2rem 2rem",
                            border: "none",
                            borderRadius: "100px",
                            cursor: (isSubmitting || isSuccess) ? "not-allowed" : "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: "0.75rem",
                            opacity: isSubmitting ? 0.7 : 1,
                            transition: "all 0.3s ease"
                        }}
                    >
                        {isSuccess ? (
                            "✓ Mensaje enviado — te respondemos en 48h"
                        ) : isSubmitting ? (
                            <>
                                Enviando...
                                <div style={{
                                    width: "16px",
                                    height: "16px",
                                    border: "2px solid rgba(242, 240, 237, 0.3)",
                                    borderTopColor: "#F2F0ED",
                                    borderRadius: "50%",
                                    animation: "spin 0.8s linear infinite"
                                }} />
                            </>
                        ) : (
                            "Solicitar análisis gratuito →"
                        )}
                    </button>

                    <div style={{
                        marginTop: "0.8rem",
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.52rem",
                        color: "rgba(8, 8, 8, 0.25)",
                        textAlign: "center",
                        lineHeight: 1.6,
                        textTransform: "uppercase"
                    }}>
                        Sin spam. Sin cesión de datos. Solo te contactamos para<br />
                        responderte sobre tu proyecto.
                    </div>
                </motion.div>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                .contacto-container {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    grid-template-rows: 1fr auto;
                }
                .contacto-izq {
                    padding: 4rem clamp(1.5rem, 4vw, 5rem);
                    border-right: 1px solid rgba(242, 240, 237, 0.06);
                }
                .contacto-der {
                    padding: 4rem clamp(1.5rem, 4vw, 4rem);
                }
                .contacto-item:hover .contacto-item-valor {
                    color: #F04E23 !important;
                }
                .contacto-item:hover .contacto-item-arrow {
                    color: #F04E23 !important;
                    transform: translate(2px, -2px);
                }
                .contact-input {
                    width: 100%;
                    background: transparent;
                    border: none;
                    border-bottom: 1.5px solid rgba(8, 8, 8, 0.12);
                    border-radius: 0;
                    padding: 0.75rem 0;
                    font-family: var(--font-display);
                    font-weight: 400;
                    font-size: 0.95rem;
                    color: #080808;
                    outline: none;
                    transition: border-color 0.2s;
                }
                .contact-input::placeholder {
                    color: rgba(8, 8, 8, 0.2);
                }
                .contact-input:focus {
                    border-color: #F04E23;
                }
                .contact-select {
                    appearance: none;
                    -webkit-appearance: none;
                    -moz-appearance: none;
                    cursor: pointer;
                }
                .contact-btn:hover:not(:disabled) {
                    background: #F04E23 !important;
                    color: #080808 !important;
                }
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }

                @media (max-width: 767px) {
                    .contacto-container {
                        grid-template-columns: 1fr !important;
                    }
                    .contacto-izq {
                        order: 1 !important;
                        min-height: auto;
                        padding: 4rem 1.5rem 3rem !important;
                        border-right: none !important;
                        border-bottom: 1px solid rgba(242, 240, 237, 0.06) !important;
                    }
                    .contacto-izq h1 {
                        font-size: clamp(2.5rem, 8vw, 3.5rem) !important;
                    }
                    .contacto-der {
                        order: 2 !important;
                        padding: 4rem 1.5rem !important;
                    }
                    .contact-input {
                        background: #FFFFFF !important;
                        border: 1px solid rgba(8, 8, 8, 0.08) !important;
                        border-radius: 8px !important;
                        padding: 0.85rem 1rem !important;
                        font-size: 1rem !important;
                    }
                    .contact-input:focus {
                        border-color: #F04E23 !important;
                        background: #FFFFFF !important;
                    }
                }
                @media (max-height: 800px) and (min-width: 768px) {
                    .contacto-inferior {
                        display: none !important;
                    }
                }
            `}} />
        </section>
    );
}

const labelStyle: React.CSSProperties = {
    fontFamily: "var(--font-mono)",
    fontSize: "0.55rem",
    color: "rgba(8, 8, 8, 0.4)",
    textTransform: "uppercase",
    letterSpacing: "0.1em",
    display: "block",
    marginBottom: "0.4rem"
};
