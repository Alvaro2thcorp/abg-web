"use client";

import React from "react";

interface SectionTransitionProps {
    from: string;
    to: string;
    height?: string;
    zIndex?: number;
}

const SectionTransition: React.FC<SectionTransitionProps> = ({
    from,
    to,
    height = "120px",
    zIndex = 10
}) => {

    return (
        <div
            style={{
                width: "100%",
                height,
                background: `linear-gradient(to bottom, ${from} 50%, ${to} 50%)`,
                position: "relative",
                zIndex,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                pointerEvents: "none",
                marginTop: "-1px",
                marginBottom: "-1px",
            }}
        >
            {/* ── CENTRAL SEPARATOR LINE ── */}
            <div
                style={{
                    position: "absolute",
                    width: "100%",
                    height: "1px",
                    background: "rgba(204, 0, 0, 0.2)",
                    left: 0,
                    top: "50%",
                    transform: "translateY(-50%)"
                }}
            />

            {/* Sub-line for extra technical detail */}
            <div
                style={{
                    position: "absolute",
                    width: "150px",
                    height: "1px",
                    background: "linear-gradient(to right, transparent, #CC0000, transparent)",
                    bottom: "20%",
                    left: "50%",
                    transform: "translateX(-50%)",
                    opacity: 0.15
                }}
            />
        </div>
    );
};

export default SectionTransition;
