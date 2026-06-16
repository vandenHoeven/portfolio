"use client";

import { useEffect, useRef } from "react";

const CONFIG = {
  nodeCount: 18,
  linkDistance: 140,
  mouseLinkDistance: 160,
  mouseRepelRadius: 100,
  mouseRepelStrength: 0.08,
  lineOpacity: 0.15,
  triangleFill: "rgba(105, 179, 162, 0.08)",
  triangleStroke: "rgba(120, 120, 120, 0.2)",
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
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nodesRef = useRef<Node[]>([]);
  const mouseRef = useRef<{ x: number; y: number; active: boolean }>({
    x: 0,
    y: 0,
    active: false,
  });
  const frameRef = useRef<number>(0);
  const reducedMotionRef = useRef(false);
  const visibleRef = useRef(true);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    reducedMotionRef.current = mediaQuery.matches;

    const resize = () => {
      const { width, height } = container.getBoundingClientRect();
      canvas.width = width;
      canvas.height = height;
      if (nodesRef.current.length === 0 && width > 0 && height > 0) {
        nodesRef.current = createNodes(width, height);
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        active: true,
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        visibleRef.current = entry.isIntersecting;
        if (!entry.isIntersecting) {
          cancelAnimationFrame(frameRef.current);
        } else if (!reducedMotionRef.current) {
          animate();
        }
      },
      { threshold: 0.05 },
    );

    observer.observe(container);

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);

    const handleMotionChange = (e: MediaQueryListEvent) => {
      reducedMotionRef.current = e.matches;
      if (e.matches) {
        cancelAnimationFrame(frameRef.current);
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      } else if (visibleRef.current) {
        animate();
      }
    };

    mediaQuery.addEventListener("change", handleMotionChange);

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);

    const animate = () => {
      if (reducedMotionRef.current || !visibleRef.current) return;

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
            ctx.strokeStyle = `rgba(120, 120, 120, ${alpha})`;
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
          ctx.strokeStyle = `rgba(105, 179, 162, ${alpha})`;
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
          ctx.strokeStyle = "rgba(105, 179, 162, 0.12)";
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }

      for (const node of nodes) {
        drawTriangle(ctx, node.x, node.y, node.size, node.rotation);
      }

      frameRef.current = requestAnimationFrame(animate);
    };

    resize();
    if (reducedMotionRef.current) {
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    } else {
      animate();
    }

    return () => {
      cancelAnimationFrame(frameRef.current);
      observer.disconnect();
      resizeObserver.disconnect();
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
      mediaQuery.removeEventListener("change", handleMotionChange);
    };
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 z-0" aria-hidden>
      <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 h-full w-full" />
    </div>
  );
}
