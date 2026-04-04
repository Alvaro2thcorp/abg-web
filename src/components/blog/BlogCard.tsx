"use client";

import React from "react";

interface BlogCardProps {
    title: string;
    description: string;
    pubDate: Date;
    category: string;
    tags: string[];
    slug: string;
    readingTime: number;
    featured?: boolean;
    image?: string;
    imageAlt?: string;
}

export default function BlogCard({
    title,
    description,
    pubDate,
    category,
    slug,
    readingTime,
    image,
    imageAlt
}: BlogCardProps) {
    const formattedDate = new Date(pubDate).toLocaleDateString('es-ES', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
    }).toUpperCase();

    const getGradient = (cat: string) => {
        switch (cat) {
            case 'SEO': return 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)';
            case 'Diseño Web': return 'linear-gradient(135deg, #0f0f0f 0%, #2a1510 100%)';
            case 'Meta Ads': return 'linear-gradient(135deg, #0a0a12 0%, #12101a 100%)';
            case 'Estrategia Digital': return 'linear-gradient(135deg, #080808 0%, #141414 100%)';
            case 'Casos de Estudio': return 'linear-gradient(135deg, #0a0808 0%, #1a0f0a 100%)';
            default: return '#080808';
        }
    };

    return (
        <a
            href={`/blog/${slug}`}
            className="blog-card"
            style={{
                display: "flex",
                flexDirection: "column",
                height: "100%",
                background: "#FFFFFF",
                border: "1px solid rgba(8, 8, 8, 0.07)",
                borderRadius: "12px",
                overflow: "hidden",
                cursor: "pointer",
                textDecoration: "none",
                transition: "transform 0.3s ease, box-shadow 0.3s ease"
            }}
        >
            {/* ZONA SUPERIOR: Cover */}
            <div className="blog-card-header" style={{
                height: "180px",
                position: "relative",
                overflow: "hidden",
                display: "flex",
                alignItems: "flex-end",
                padding: "1.2rem 1.5rem",
                background: image ? '#080808' : getGradient(category)
            }}>
                {image ? (
                    <>
                        <img 
                            src={image} 
                            alt={imageAlt || title} 
                            className="blog-card-image"
                            style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                                objectPosition: "center",
                                position: "absolute",
                                inset: 0,
                                transition: "transform 0.5s ease"
                            }} 
                        />
                        <div style={{
                            position: "absolute",
                            inset: 0,
                            background: "linear-gradient(to bottom, rgba(8,8,8,0.2) 0%, rgba(8,8,8,0.5) 100%)",
                            zIndex: 2
                        }} />
                    </>
                ) : (
                    <div style={{
                        position: "absolute",
                        right: "-0.5rem",
                        bottom: "-1rem",
                        fontFamily: "var(--font-display)",
                        fontWeight: 800,
                        fontSize: "7rem",
                        lineHeight: 1,
                        color: "rgba(255, 255, 255, 0.04)",
                        pointerEvents: "none",
                        userSelect: "none",
                        zIndex: 1
                    }}>
                        {category.charAt(0)}
                    </div>
                )}

                <div style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-end",
                    position: "relative",
                    zIndex: 3
                }}>
                    <span style={{
                        background: image ? "rgba(240, 78, 35, 0.9)" : "rgba(240, 78, 35, 0.15)",
                        border: image ? "none" : "1px solid rgba(240, 78, 35, 0.3)",
                        borderRadius: "100px",
                        padding: "0.2rem 0.65rem",
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.5rem",
                        color: image ? "#F2F0ED" : "#F04E23",
                        textTransform: "uppercase",
                        letterSpacing: "0.08em"
                    }}>
                        {category}
                    </span>
                    <span style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.5rem",
                        color: "rgba(255, 255, 255, 0.6)",
                        textTransform: "uppercase"
                    }}>
                        {formattedDate}
                    </span>
                </div>
            </div>

            {/* ZONA CONTENIDO */}
            <div className="blog-card-body" style={{
                padding: "1.4rem 1.5rem 1rem",
                flexGrow: 1,
                display: "flex",
                flexDirection: "column"
            }}>
                <h3 className="blog-card-title" style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 700,
                    fontSize: "1.05rem",
                    color: "#080808",
                    lineHeight: 1.3,
                    letterSpacing: "-0.01em",
                    marginBottom: "0.6rem",
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden"
                }}>
                    {title}
                </h3>
                <p style={{
                    fontFamily: "var(--font-body)",
                    fontWeight: 300,
                    fontSize: "0.82rem",
                    color: "rgba(8, 8, 8, 0.45)",
                    lineHeight: 1.7,
                    margin: 0,
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    flexGrow: 1
                }}>
                    {description}
                </p>
            </div>

            {/* ZONA FOOTER */}
            <div style={{
                padding: "0.9rem 1.5rem 1.2rem",
                borderTop: "1px solid rgba(8, 8, 8, 0.05)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: "auto"
            }}>
                <span style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.5rem",
                    color: "rgba(8, 8, 8, 0.3)",
                    textTransform: "uppercase"
                }}>
                    Álvaro Bergillos
                </span>
                <span style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.5rem",
                    color: "rgba(8, 8, 8, 0.25)",
                    textTransform: "uppercase"
                }}>
                    {readingTime} min lectura
                </span>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                .blog-card:hover {
                    transform: translateY(-3px) !important;
                    box-shadow: 0 16px 32px rgba(8, 8, 8, 0.08) !important;
                }
                .blog-card:hover .blog-card-image {
                    transform: scale(1.04) !important;
                }
                @media (max-width: 767px) {
                    .blog-card-header {
                        height: 240px !important;
                    }
                    .blog-card-body {
                        padding: 1.5rem !important;
                    }
                    .blog-card-title {
                        font-size: 1.25rem !important;
                    }
                }
            `}} />
        </a>
    );
}
