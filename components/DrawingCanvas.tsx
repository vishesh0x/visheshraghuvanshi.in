"use client";

import { useEffect, useRef } from "react";

interface Point {
  x: number;
  y: number;
  t: number; // timestamp
}

interface Stroke {
  points: Point[];
  color: string;
}

export default function DrawingCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const strokes = useRef<Stroke[]>([]);
  const currentStroke = useRef<Stroke | null>(null);
  const rafId = useRef<number>(0);
  const isDrawing = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // ── Rendering loop ──────────────────────────────
    const FADE_DURATION = 3000; // ms

    const render = () => {
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const now = Date.now();

      strokes.current = strokes.current.filter((stroke) => {
        const age = now - stroke.points[stroke.points.length - 1].t;
        return age < FADE_DURATION;
      });

      for (const stroke of strokes.current) {
        if (stroke.points.length < 2) continue;
        const age = now - stroke.points[stroke.points.length - 1].t;
        const alpha = Math.max(0, 1 - age / FADE_DURATION);

        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.strokeStyle = stroke.color;
        ctx.lineWidth = 2.5;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        // Glow intensity is lower in light mode so it stays visible
        ctx.shadowColor = stroke.color;
        ctx.shadowBlur = 14;

        ctx.beginPath();
        ctx.moveTo(stroke.points[0].x, stroke.points[0].y);
        for (let i = 1; i < stroke.points.length - 1; i++) {
          const mx = (stroke.points[i].x + stroke.points[i + 1].x) / 2;
          const my = (stroke.points[i].y + stroke.points[i + 1].y) / 2;
          ctx.quadraticCurveTo(stroke.points[i].x, stroke.points[i].y, mx, my);
        }
        const last = stroke.points[stroke.points.length - 1];
        ctx.lineTo(last.x, last.y);
        ctx.stroke();
        ctx.restore();
      }

      rafId.current = requestAnimationFrame(render);
    };
    rafId.current = requestAnimationFrame(render);

    // ── Event helpers ──────────────────────────────
    const getPosFromMouse = (e: MouseEvent): Point => ({
      x: e.clientX,
      y: e.clientY,
      t: Date.now(),
    });

    const getPosFromTouch = (t: globalThis.Touch): Point => ({
      x: t.clientX,
      y: t.clientY,
      t: Date.now(),
    });

    const startDraw = (pos: Point) => {
      isDrawing.current = true;
      currentStroke.current = {
        points: [pos],
        color: `hsl(${28 + Math.random() * 20}, 85%, 65%)`,
      };
      strokes.current.push(currentStroke.current);
    };

    const continueDraw = (pos: Point) => {
      if (!isDrawing.current || !currentStroke.current) return;
      currentStroke.current.points.push(pos);
    };

    const endDraw = () => {
      isDrawing.current = false;
      currentStroke.current = null;
    };

    // Mouse
    const onMouseDown = (e: MouseEvent) => {
      // Only draw on the canvas itself (not on interactive elements)
      if ((e.target as HTMLElement).closest("button, a, input, textarea, [role='dialog']")) return;
      startDraw(getPosFromMouse(e));
    };
    const onMouseMove = (e: MouseEvent) => continueDraw(getPosFromMouse(e));
    const onMouseUp = () => endDraw();

    // Touch
    const onTouchStart = (e: TouchEvent) => {
      if ((e.target as HTMLElement).closest("button, a, input, textarea, [role='dialog']")) return;
      startDraw(getPosFromTouch(e.touches[0]));
    };
    const onTouchMove = (e: TouchEvent) => continueDraw(getPosFromTouch(e.touches[0]));
    const onTouchEnd = () => endDraw();

    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onTouchEnd);

    return () => {
      cancelAnimationFrame(rafId.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      aria-hidden="true"
    />
  );
}
