"use client";

import { useEffect, useRef } from "react";

const CONFIG = {
  baseNodeCount: 40,
  minNodeCount: 28,
  maxNodeCount: 58,
  nodeCountReferenceArea: 960_000,
  linkDistance: 155,
  mouseLinkDistance: 175,
  mouseRepelRadius: 140,
  mouseRepelStrength: 0.55,
  directPushFactor: 4,
  velocityDampingActive: 0.993,
  velocityDampingAmbient: 0.998,
  velocityDampingRestore: 0.978,
  restoreDelayMs: 2800,
  restoreRampMs: 4000,
  springStrength: 0.0012,
  springStrengthBoost: 0.0025,
  settleRate: 0.018,
  settleSpeedThreshold: 0.35,
  ambientDriftRate: 0.045,
  ambientDriftRateActive: 0.035,
  edgeMargin: 20,
  edgePushStrength: 0.01,
  baseDriftMin: 0.18,
  baseDriftMax: 0.42,
  lineOpacity: 0.38,
  lineWidth: 1.25,
  triangleFill: "rgba(105, 179, 162, 0.14)",
  triangleStroke: "rgba(100, 100, 100, 0.38)",
  maxSpeed: 1.1,
  idleMaxSpeed: 0.65,
  triangleSize: 10,
  mouseLineOpacity: 0.45,
  mouseTriangleOpacity: 0.22,
  rotationSpeed: 0.003,
  driftJitterIntervalMs: 2500,
  driftJitterAngle: 0.04,
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
  const mag =
    CONFIG.baseDriftMin +
    Math.random() * (CONFIG.baseDriftMax - CONFIG.baseDriftMin);
  const angle = Math.random() * Math.PI * 2;
  return { vx: Math.cos(angle) * mag, vy: Math.sin(angle) * mag };
}

function jitterBaseDrift(baseVx: number, baseVy: number) {
  const speed = Math.hypot(baseVx, baseVy);
  const angle =
    Math.atan2(baseVy, baseVx) + (Math.random() - 0.5) * CONFIG.driftJitterAngle;
  return { vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed };
}

function getNodeCount(width: number, height: number) {
  const scale = Math.sqrt((width * height) / CONFIG.nodeCountReferenceArea);
  return Math.round(
    Math.min(
      CONFIG.maxNodeCount,
      Math.max(CONFIG.minNodeCount, CONFIG.baseNodeCount * scale),
    ),
  );
}

function createNodes(width: number, height: number): Node[] {
  const count = getNodeCount(width, height);
  return Array.from({ length: count }, () => {
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
  const lastInteractionRef = useRef<number | null>(null);
  const lastJitterRef = useRef(0);
  const lastMousePosRef = useRef<{ x: number; y: number } | null>(null);

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
      if (mouseRef.current.active) {
        lastInteractionRef.current = performance.now();
      }
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
      lastMousePosRef.current = null;
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
      const now = performance.now();

      let restoreProgress = 0;
      if (lastInteractionRef.current !== null) {
        const elapsed = now - lastInteractionRef.current;
        if (elapsed > CONFIG.restoreDelayMs) {
          restoreProgress = Math.min(
            1,
            (elapsed - CONFIG.restoreDelayMs) / CONFIG.restoreRampMs,
          );
        }
      }

      const isPointerActive =
        mouse.active &&
        lastInteractionRef.current !== null &&
        now - lastInteractionRef.current < CONFIG.restoreDelayMs;

      const isRestoring =
        lastInteractionRef.current !== null &&
        restoreProgress > 0 &&
        restoreProgress < 1;
      const isSettled =
        lastInteractionRef.current !== null &&
        restoreProgress >= 1 &&
        !isPointerActive;

      const damping = isPointerActive
        ? CONFIG.velocityDampingActive
        : isRestoring
          ? CONFIG.velocityDampingRestore
          : CONFIG.velocityDampingAmbient;

      if (
        isSettled &&
        now - lastJitterRef.current > CONFIG.driftJitterIntervalMs
      ) {
        lastJitterRef.current = now;
        for (const node of nodes) {
          if (distance(node.x, node.y, node.homeX, node.homeY) < 15) {
            const drift = jitterBaseDrift(node.baseVx, node.baseVy);
            node.baseVx = drift.vx;
            node.baseVy = drift.vy;
          }
        }
      }

      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, width, height);

      for (const node of nodes) {
        const driftRate = isPointerActive
          ? CONFIG.ambientDriftRateActive
          : CONFIG.ambientDriftRate;
        node.vx += (node.baseVx - node.vx) * driftRate;
        node.vy += (node.baseVy - node.vy) * driftRate;

        if (isPointerActive) {
          const mouseMoved =
            !lastMousePosRef.current ||
            mouse.x !== lastMousePosRef.current.x ||
            mouse.y !== lastMousePosRef.current.y;

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
            if (mouseMoved) {
              lastInteractionRef.current = now;
            }
          }
        } else if (isRestoring) {
          const homeDist = distance(node.x, node.y, node.homeX, node.homeY);
          const speed = Math.hypot(node.vx, node.vy);
          const baseSpring =
            speed > CONFIG.settleSpeedThreshold
              ? CONFIG.springStrengthBoost
              : CONFIG.springStrength;
          const spring = baseSpring * restoreProgress;

          node.vx += (node.homeX - node.x) * spring;
          node.vy += (node.homeY - node.y) * spring;

          if (homeDist < 40 && speed < CONFIG.settleSpeedThreshold) {
            node.vx += (node.baseVx - node.vx) * CONFIG.settleRate * restoreProgress;
            node.vy += (node.baseVy - node.vy) * CONFIG.settleRate * restoreProgress;
          }
        }

        node.vx *= damping;
        node.vy *= damping;

        node.x += node.vx;
        node.y += node.vy;

        applySoftEdges(node, width, height);

        const speed = Math.hypot(node.vx, node.vy);
        const speedCap = isPointerActive ? CONFIG.maxSpeed : CONFIG.idleMaxSpeed;
        if (speed > speedCap) {
          node.vx = (node.vx / speed) * speedCap;
          node.vy = (node.vy / speed) * speedCap;
        }

        node.rotation += CONFIG.rotationSpeed;
      }

      if (mouse.active) {
        lastMousePosRef.current = { x: mouse.x, y: mouse.y };
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
