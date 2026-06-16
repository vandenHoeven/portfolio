"use client";

import { useEffect, useRef } from "react";

const CONFIG = {
  nodeCount: 18,
  linkDistance: 140,
  mouseLinkDistance: 160,
  mouseRepelRadius: 100,
  mouseRepelStrength: 0.08,
  lineOpacity: 0.15,
  triangleFill: "rgba(13, 148, 136, 0.06)",
  triangleStroke: "rgba(100, 116, 139, 0.25)",
  lineColor: "rgba(100, 116, 139, 0.15)",
  mouseLineColor: "rgba(13, 148, 136, 0.2)",
  minSpeed: 0.15,
  maxSpeed: 0.35,
  triangleSize: 10,
};

type Node = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  rotation: number;
};

function randomSpeed() {
  const sign = () => (Math.random() > 0.5 ? 1 : -1);
  const mag =
    CONFIG.minSpeed + Math.random() * (CONFIG.maxSpeed - CONFIG.minSpeed);
  return { vx: sign() * mag, vy: sign() * mag };
}

function createNodes(width: number, height: number): Node[] {
  return Array.from({ length: CONFIG.nodeCount }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    ...randomSpeed(),
    size: CONFIG.triangleSize + Math.random() * 4,
    rotation: Math.random() * Math.PI * 2,
  }));
}

function distance(x1: number, y1: number, x2: number, y2: number) {
  return Math.hypot(x2 - x1, y2 - y1);
}

function drawTriangle(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  size: number,
  rotation: number,
) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(rotation);
  ctx.beginPath();
  ctx.moveTo(0, -size);
  ctx.lineTo(size * 0.866, size * 0.5);
  ctx.lineTo(-size * 0.866, size * 0.5);
  ctx.closePath();
  ctx.fillStyle = CONFIG.triangleFill;
  ctx.strokeStyle = CONFIG.triangleStroke;
  ctx.lineWidth = 1;
  ctx.fill();
  ctx.stroke();
  ctx.restore();
}

export default function InteractiveNetworkBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nodesRef = useRef<Node[]>([]);
  const mouseRef = useRef<{ x: number; y: number; active: boolean }>({
    x: 0,
    y: 0,
    active: false,
  });
  const frameRef = useRef<number>(0);
  const reducedMotionRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    reducedMotionRef.current = mediaQuery.matches;

    const handleMotionChange = (e: MediaQueryListEvent) => {
      reducedMotionRef.current = e.matches;
      if (e.matches) {
        cancelAnimationFrame(frameRef.current);
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      } else {
        animate();
      }
    };

    mediaQuery.addEventListener("change", handleMotionChange);

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      if (nodesRef.current.length === 0) {
        nodesRef.current = createNodes(canvas.width, canvas.height);
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY, active: true };
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    const animate = () => {
      if (reducedMotionRef.current) return;

      const { width, height } = canvas;
      const nodes = nodesRef.current;
      const mouse = mouseRef.current;

      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, width, height);

      for (const node of nodes) {
        if (mouse.active) {
          const dist = distance(node.x, node.y, mouse.x, mouse.y);
          if (dist < CONFIG.mouseRepelRadius && dist > 0) {
            const force = (CONFIG.mouseRepelRadius - dist) / CONFIG.mouseRepelRadius;
            node.vx += ((node.x - mouse.x) / dist) * force * CONFIG.mouseRepelStrength;
            node.vy += ((node.y - mouse.y) / dist) * force * CONFIG.mouseRepelStrength;
          }
        }

        node.x += node.vx;
        node.y += node.vy;

        if (node.x < 0 || node.x > width) {
          node.vx *= -1;
          node.x = Math.max(0, Math.min(width, node.x));
        }
        if (node.y < 0 || node.y > height) {
          node.vy *= -1;
          node.y = Math.max(0, Math.min(height, node.y));
        }

        const speed = Math.hypot(node.vx, node.vy);
        if (speed > CONFIG.maxSpeed) {
          node.vx = (node.vx / speed) * CONFIG.maxSpeed;
          node.vy = (node.vy / speed) * CONFIG.maxSpeed;
        }
        if (speed < CONFIG.minSpeed) {
          const boost = CONFIG.minSpeed / (speed || 1);
          node.vx *= boost;
          node.vy *= boost;
        }

        node.rotation += 0.002;
      }

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const dist = distance(a.x, a.y, b.x, b.y);
          if (dist < CONFIG.linkDistance) {
            const alpha = (1 - dist / CONFIG.linkDistance) * CONFIG.lineOpacity;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(100, 116, 139, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      if (mouse.active) {
        const nearest = [...nodes]
          .map((node) => ({
            node,
            dist: distance(node.x, node.y, mouse.x, mouse.y),
          }))
          .filter(({ dist }) => dist < CONFIG.mouseLinkDistance)
          .sort((a, b) => a.dist - b.dist)
          .slice(0, 3);

        for (const { node, dist } of nearest) {
          const alpha = (1 - dist / CONFIG.mouseLinkDistance) * 0.25;
          ctx.beginPath();
          ctx.moveTo(mouse.x, mouse.y);
          ctx.lineTo(node.x, node.y);
          ctx.strokeStyle = `rgba(13, 148, 136, ${alpha})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }

        if (nearest.length >= 2) {
          ctx.beginPath();
          ctx.moveTo(nearest[0].node.x, nearest[0].node.y);
          for (let i = 1; i < nearest.length; i++) {
            ctx.lineTo(nearest[i].node.x, nearest[i].node.y);
          }
          ctx.closePath();
          ctx.strokeStyle = "rgba(13, 148, 136, 0.12)";
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }

      for (const node of nodes) {
        drawTriangle(ctx, node.x, node.y, node.size, node.rotation);
      }

      frameRef.current = requestAnimationFrame(animate);
    };

    if (reducedMotionRef.current) {
      resize();
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    } else {
      animate();
    }

    return () => {
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      mediaQuery.removeEventListener("change", handleMotionChange);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0"
    />
  );
}
