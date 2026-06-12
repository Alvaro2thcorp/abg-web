"use client";

import { useEffect, useRef } from "react";

interface PlasmaWaveProps {
    speed?: number;
    opacity?: number;
}

export default function PlasmaWave({ speed = 0.4, opacity = 0.35 }: PlasmaWaveProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const animRef = useRef<number>(0);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let t = 0;

        const resize = () => {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
        };
        resize();
        window.addEventListener("resize", resize);

        const draw = () => {
            const W = canvas.width;
            const H = canvas.height;
            ctx.clearRect(0, 0, W, H);

            const imageData = ctx.createImageData(W, H);
            const data = imageData.data;

            for (let y = 0; y < H; y += 2) {
                for (let x = 0; x < W; x += 2) {
                    const nx = x / W;
                    const ny = y / H;

                    const v1 = Math.sin(nx * 6 + t);
                    const v2 = Math.sin(ny * 6 + t * 0.8);
                    const v3 = Math.sin((nx + ny) * 5 + t * 1.2);
                    const v4 = Math.sin(Math.sqrt((nx - 0.5) * (nx - 0.5) + (ny - 0.5) * (ny - 0.5)) * 10 - t);

                    const v = (v1 + v2 + v3 + v4) / 4;
                    const norm = (v + 1) / 2;

                    // Paleta: crema → negro → rojo bisturí
                    let r, g, b, a;

                    if (norm < 0.4) {
                        // Crema oscurecida
                        const f = norm / 0.4;
                        r = Math.floor(242 - f * 80);
                        g = Math.floor(240 - f * 90);
                        b = Math.floor(237 - f * 100);
                        a = 180;
                    } else if (norm < 0.75) {
                        // Zona oscura/titanio
                        const f = (norm - 0.4) / 0.35;
                        r = Math.floor(162 - f * 90);
                        g = Math.floor(150 - f * 80);
                        b = Math.floor(137 - f * 80);
                        a = 200;
                    } else {
                        // Acento rojo muy sutil
                        const f = (norm - 0.75) / 0.25;
                        r = Math.floor(72 + f * 132);
                        g = Math.floor(57 - f * 57);
                        b = Math.floor(57 - f * 57);
                        a = 160;
                    }

                    const idx = (y * W + x) * 4;
                    data[idx] = r;
                    data[idx + 1] = g;
                    data[idx + 2] = b;
                    data[idx + 3] = a;

                    // Fill 2x2 block for performance
                    if (x + 1 < W) {
                        data[idx + 4] = r;
                        data[idx + 5] = g;
                        data[idx + 6] = b;
                        data[idx + 7] = a;
                    }
                    if (y + 1 < H) {
                        const idx2 = ((y + 1) * W + x) * 4;
                        data[idx2] = r;
                        data[idx2 + 1] = g;
                        data[idx2 + 2] = b;
                        data[idx2 + 3] = a;
                        if (x + 1 < W) {
                            data[idx2 + 4] = r;
                            data[idx2 + 5] = g;
                            data[idx2 + 6] = b;
                            data[idx2 + 7] = a;
                        }
                    }
                }
            }

            ctx.putImageData(imageData, 0, 0);
            t += speed * 0.016;
            animRef.current = requestAnimationFrame(draw);
        };

        draw();

        return () => {
            cancelAnimationFrame(animRef.current);
            window.removeEventListener("resize", resize);
        };
    }, [speed]);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                opacity,
                pointerEvents: "none",
                zIndex: 0,
            }}
        />
    );
}
