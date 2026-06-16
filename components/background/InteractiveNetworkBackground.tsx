"use client";

import { useEffect, useRef } from "react";

const CONFIG = {
  nodeCount: 28,
  linkDistance: 155,
  mouseLinkDistance: 175,
  mouseRepelRadius: 140,
  mouseRepelStrength: 0.55,
  directPushFactor: 4,
  velocityDampingActive: 0.985,
  velocityDampingIdle: 0.96,
  springStrength: 0.003,
  springStrengthBoost: 0.006,
  settleRate: 0.025,
  settleSpeedThreshold: 0.35,
  edgeMargin: 20,
  edgePushStrength: 0.01,
  baseDriftMin: 0.08,
  baseDriftMax: 0.28,
  lineOpacity: 0.38,
  lineWidth: 1.25,
  triangleFill: "rgba(105, 179, 162, 0.14)",
  triangleStroke: "rgba(100, 100, 100, 0.38)",
  maxSpeed: 1.1,
  triangleSize: 10,
  mouseLineOpacity: 0.45,
  mouseTriangleOpacity: 0.22,
};

type Node = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  homeX: number;
  homeY: number;
  baseVx: number;
  baseVy: number;
  size: number;
  rotation: number;
};

function randomBaseDrift() {
  const sign = () => (Math.random() > 0.5 ? 1 : -1);
  const mag =
    CONFIG.baseDriftMin +
    Math.random() * (CONFIG.baseDriftMax - CONFIG.baseDriftMin);
  const angle = Math.random() * Math.PI * 2;
  return { vx: Math.cos(angle) * mag, vy: Math.sin(angle) * mag };
}

function createNodes(width: number, height: number): Node[] {
  return Array.from({ length: CONFIG.nodeCount }, () => {
    const x = Math.random() * width;
    const y = Math.random() * height;
    const { vx, vy } = randomBaseDrift();

    return {
      x,
      y,
      vx,
      vy,
      homeX: x,
      homeY: y,
      baseVx: vx,
      baseVy: vy,
      size: CONFIG.triangleSize + Math.random() * 4,
      rotation: Math.random() * Math.PI * 2,
    };
  });
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
  ctx.lineWidth = 1.25;
  ctx.fill();
  ctx.stroke();
  ctx.restore();
}

function applySoftEdges(node: Node, width: number, height: number) {
  const { edgeMargin, edgePushStrength } = CONFIG;

  if (node.x < edgeMargin) {
    node.vx += (edgeMargin - node.x) * edgePushStrength;
  } else if (node.x > width - edgeMargin) {
    node.vx -= (node.x - (width - edgeMargin)) * edgePushStrength;
  }

  if (node.y < edgeMargin) {
    node.vy += (edgeMargin - node.y) * edgePushStrength;
  } else if (node.y > height - edgeMargin) {
    node.vy -= (node.y - (height - edgeMargin)) * edgePushStrength;
  }

  node.x = Math.max(0, Math.min(width, node.x));
  node.y = Math.max(0, Math.min(height, node.y));
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

    const updateMouse = (clientX: number, clientY: number) => {
      const rect = container.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;
      const inside =
        clientX >= rect.left &&
        clientX <= rect.right &&
        clientY >= rect.top &&
        clientY <= rect.bottom;

      mouseRef.current = { x, y, active: inside };
    };

    const handleMouseMove = (e: MouseEvent) => {
      updateMouse(e.clientX, e.clientY);
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

    window.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);

    const animate = () => {
      if (reducedMotionRef.current || !visibleRef.current) return;

      const { width, height } = canvas;
      const nodes = nodesRef.current;
      const mouse = mouseRef.current;
      const damping = mouse.active
        ? CONFIG.velocityDampingActive
        : CONFIG.velocityDampingIdle;

      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, width, height);

      for (const node of nodes) {
        if (mouse.active) {
          const dist = distance(node.x, node.y, mouse.x, mouse.y);
          if (dist < CONFIG.mouseRepelRadius && dist > 0) {
            const falloff = (CONFIG.mouseRepelRadius - dist) / CONFIG.mouseRepelRadius;
            const force = falloff * falloff * CONFIG.mouseRepelStrength;
            const nx = (node.x - mouse.x) / dist;
            const ny = (node.y - mouse.y) / dist;

            node.vx += nx * force;
            node.vy += ny * force;
            node.x += nx * force * CONFIG.directPushFactor;
            node.y += ny * force * CONFIG.directPushFactor;
          }
        } else {
          const homeDist = distance(node.x, node.y, node.homeX, node.homeY);
          const speed = Math.hypot(node.vx, node.vy);
          const spring =
            speed > CONFIG.settleSpeedThreshold
              ? CONFIG.springStrengthBoost
              : CONFIG.springStrength;

          node.vx += (node.homeX - node.x) * spring;
          node.vy += (node.homeY - node.y) * spring;

          if (homeDist < 30 && speed < CONFIG.settleSpeedThreshold) {
            node.vx += (node.baseVx - node.vx) * CONFIG.settleRate;
            node.vy += (node.baseVy - node.vy) * CONFIG.settleRate;
          }
        }

        node.vx *= damping;
        node.vy *= damping;

        node.x += node.vx;
        node.y += node.vy;

        applySoftEdges(node, width, height);

        const speed = Math.hypot(node.vx, node.vy);
        if (speed > CONFIG.maxSpeed) {
          node.vx = (node.vx / speed) * CONFIG.maxSpeed;
          node.vy = (node.vy / speed) * CONFIG.maxSpeed;
        }

        node.rotation += 0.002;
      }

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const dist = distance(a.x, a.y, b.x, b.y);
          if (dist < CONFIG.linkDistance) {
            const alpha = Math.max(
              0.12,
              (1 - dist / CONFIG.linkDistance) * CONFIG.lineOpacity,
            );
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(90, 90, 90, ${alpha})`;
            ctx.lineWidth = CONFIG.lineWidth;
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
          const alpha = Math.max(
            0.15,
            (1 - dist / CONFIG.mouseLinkDistance) * CONFIG.mouseLineOpacity,
          );
          ctx.beginPath();
          ctx.moveTo(mouse.x, mouse.y);
          ctx.lineTo(node.x, node.y);
          ctx.strokeStyle = `rgba(105, 179, 162, ${alpha})`;
          ctx.lineWidth = CONFIG.lineWidth;
          ctx.stroke();
        }

        if (nearest.length >= 2) {
          ctx.beginPath();
          ctx.moveTo(nearest[0].node.x, nearest[0].node.y);
          for (let i = 1; i < nearest.length; i++) {
            ctx.lineTo(nearest[i].node.x, nearest[i].node.y);
          }
          ctx.closePath();
          ctx.strokeStyle = `rgba(105, 179, 162, ${CONFIG.mouseTriangleOpacity})`;
          ctx.lineWidth = CONFIG.lineWidth;
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
      window.removeEventListener("mousemove", handleMouseMove);
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
