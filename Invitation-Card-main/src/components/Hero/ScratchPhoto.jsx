import { useLayoutEffect, useRef, useState } from "react";
import confetti from "canvas-confetti";
import familyPhoto from "../../assets/family-scratch-photo.png";
import { useLanguage } from "../../i18n/LanguageContext";

export default function ScratchPhoto({ onScratchComplete }) {
    const language = useLanguage();
    const canvasRef = useRef(null);
    const confettiCanvasRef = useRef(null);
    const canvasInitializedRef = useRef(false);
    const [isScratched, setIsScratched] = useState(false);
    const [isDrawing, setIsDrawing] = useState(false);
    const revealStartedRef = useRef(false);


    useLayoutEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const preventTouchScrollOnCanvas = (e) => {
            if (e.cancelable) {
                e.preventDefault();
            }
        };

        canvas.addEventListener('touchstart', preventTouchScrollOnCanvas, { passive: false, capture: true });
        canvas.addEventListener('touchmove', preventTouchScrollOnCanvas, { passive: false, capture: true });
        canvas.addEventListener('touchend', preventTouchScrollOnCanvas, { passive: false, capture: true });
        canvas.addEventListener('touchcancel', preventTouchScrollOnCanvas, { passive: false, capture: true });

        const resizeCanvas = () => {
            const rect = canvas.getBoundingClientRect();
            if (!rect.width || !rect.height) return;

            const dpr = window.devicePixelRatio || 1;
            const width = Math.round(rect.width * dpr);
            const height = Math.round(rect.height * dpr);
            if (canvas.width === width && canvas.height === height) return;

            const previousCanvas = document.createElement("canvas");
            if (canvasInitializedRef.current) {
                previousCanvas.width = canvas.width;
                previousCanvas.height = canvas.height;
                previousCanvas.getContext("2d").drawImage(canvas, 0, 0);
            }

            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext("2d", { willReadFrequently: true });
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

            if (canvasInitializedRef.current) {
                ctx.drawImage(previousCanvas, 0, 0, rect.width, rect.height);
                return;
            }

            const gradient = ctx.createLinearGradient(0, 0, rect.width, rect.height);
            gradient.addColorStop(0, "#D9A897");
            gradient.addColorStop(0.25, "#F7D8D0");
            gradient.addColorStop(0.5, "#C89585");
            gradient.addColorStop(0.75, "#F7D8D0");
            gradient.addColorStop(1, "#D9A897");

            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, rect.width, rect.height);

            for (let i = 0; i < 4000; i++) {
                ctx.fillStyle = Math.random() > 0.5 ? "rgba(255,255,255,0.25)" : "rgba(100,50,0,0.15)";
                ctx.fillRect(
                    Math.random() * rect.width,
                    Math.random() * rect.height,
                    2, 2
                );
            }
            canvasInitializedRef.current = true;
        };

        canvas.style.touchAction = 'none';
        resizeCanvas();
        const observer = new ResizeObserver(resizeCanvas);
        observer.observe(canvas.parentElement);
        window.addEventListener("resize", resizeCanvas);

        return () => {
            observer.disconnect();
            window.removeEventListener("resize", resizeCanvas);
            canvas.removeEventListener('touchstart', preventTouchScrollOnCanvas);
            canvas.removeEventListener('touchmove', preventTouchScrollOnCanvas);
            canvas.removeEventListener('touchend', preventTouchScrollOnCanvas);
            canvas.removeEventListener('touchcancel', preventTouchScrollOnCanvas);
        };
    }, []);

    function handlePointerDown(e) {
        if (isScratched) return;
        setIsDrawing(true);
        e.currentTarget?.setPointerCapture?.(e.pointerId);
        scratch(e);
    }

    function handlePointerUp(e) {
        setIsDrawing(false);
        checkCompletion();
        e.currentTarget?.releasePointerCapture?.(e.pointerId);
    }

    function handlePointerMove(e) {
        if (!isDrawing || isScratched) return;
        scratch(e);
    }

    function handlePointerCancel() {
        setIsDrawing(false);
        checkCompletion();
    }

    function scratch(e) {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d", { willReadFrequently: true });
        const rect = canvas.getBoundingClientRect();


        const clientX = e.clientX || (e.touches && e.touches[0].clientX);
        const clientY = e.clientY || (e.touches && e.touches[0].clientY);

        if (!clientX || !clientY) return;

        const x = clientX - rect.left;
        const y = clientY - rect.top;

        ctx.globalCompositeOperation = "destination-out";
        ctx.beginPath();
        ctx.arc(x, y, 65, 0, 2 * Math.PI);
        ctx.fill();
    }

    function checkCompletion() {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d", { willReadFrequently: true });
        const w = canvas.width;
        const h = canvas.height;

        const imageData = ctx.getImageData(0, 0, w, h);
        const pixels = imageData.data;
        let transparentCount = 0;
        let visibleSamples = 0;
        const centerX = w / 2;
        const centerY = h / 2;
        const radiusX = w / 2;
        const radiusY = h / 2;

        for (let pixel = 0; pixel < w * h; pixel += 4) {
            const x = (pixel % w) + 0.5;
            const y = Math.floor(pixel / w) + 0.5;
            const normalizedX = (x - centerX) / radiusX;
            const normalizedY = (y - centerY) / radiusY;

            if (normalizedX * normalizedX + normalizedY * normalizedY <= 1) {
                visibleSamples++;
                if (pixels[pixel * 4 + 3] < 128) {
                    transparentCount++;
                }
            }
        }

        const percentage = (transparentCount / visibleSamples) * 100;

        if (percentage >= 60) {
            completeReveal();
        }
    }

    function completeReveal() {
        if (revealStartedRef.current) return;
        revealStartedRef.current = true;
        setIsScratched(true);
        onScratchComplete?.();

        if (canvasRef.current) {
            canvasRef.current.style.transition = "opacity 0.8s ease-out";
            canvasRef.current.style.opacity = "0";
            canvasRef.current.style.pointerEvents = "none";
        }

        if (confettiCanvasRef.current) {
            const myConfetti = confetti.create(confettiCanvasRef.current, {
                useWorker: true
            });

            myConfetti({
                particleCount: 200,
                angle: 90,
                spread: 120,
                origin: { x: 0.5, y: 1.1 },
                startVelocity: 20,
                gravity: 0.04,
                drift: 0,
                colors: ["#FFFFFF"],
                shapes: ["circle"],
                disableForReducedMotion: true,
                scalar: 0.5,
                ticks: 2000
            });
        }
    }

    return (
        <div className="relative z-30 mx-auto my-0 flex w-full flex-col items-center">
            <div
                className="hero-scratch-photo-frame relative aspect-[4/3] overflow-hidden rounded-[50%] border-[3px] border-[#C89585] shadow-inner"
                style={{ background: "#F5EFE6" }}
            >
                <div className="absolute inset-0 flex items-center justify-center bg-[#E8D4C8]">
                    <img
                        src={familyPhoto}
                        alt={language === "hi" ? "दूल्हा-दुल्हन अपने परिवार के साथ" : "The couple with their family"}
                        loading="eager"
                        className="h-full w-full object-cover object-[center_38%]"
                    />
                </div>

                {!isScratched && (
                    <span lang="en" className="scratch-card-instruction pointer-events-none absolute inset-0 z-30 flex items-center justify-center px-4 text-center text-[#6F3C2E]">
                        Scratch here
                    </span>
                )}

                <canvas
                    ref={canvasRef}
                    className="absolute inset-0 z-20 h-full w-full cursor-pointer touch-none"
                    style={{ touchAction: 'none' }}
                    onPointerDown={(e) => {
                        handlePointerDown(e);
                    }}
                    onPointerUp={(e) => {
                        handlePointerUp(e);
                    }}
                    onPointerMove={(e) => {
                        handlePointerMove(e);
                    }}
                    onPointerLeave={() => {
                        handlePointerCancel();
                    }}
                    onTouchStart={(e) => {
                        handlePointerDown(e);
                    }}
                    onTouchMove={(e) => {
                        handlePointerMove(e);
                    }}
                    onTouchEnd={(e) => {
                        handlePointerUp(e);
                    }}
                    onTouchCancel={() => {
                        handlePointerCancel();
                    }}
                />

                <canvas
                    ref={confettiCanvasRef}
                    className="pointer-events-none absolute inset-0 z-40 h-full w-full"
                />
            </div>
        </div>
    );
}
