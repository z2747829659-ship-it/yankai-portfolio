import React, { useEffect, useRef } from "react";

const hexToRgb = (hex) => {
  const normalized = hex.replace("#", "");
  const value = parseInt(
    normalized.length === 3
      ? normalized
          .split("")
          .map((char) => char + char)
          .join("")
      : normalized,
    16
  );

  return {
    r: (value >> 16) & 255,
    g: (value >> 8) & 255,
    b: value & 255
  };
};

const originMap = {
  "top-right": [1, 0],
  "top-left": [0, 0],
  "bottom-right": [1, 1],
  "bottom-left": [0, 1]
};

export function SideRaysBackground({
  rayColor1 = "#74f0ff",
  rayColor2 = "#8a6dff",
  origin = "top-right",
  speed = 0.65,
  intensity = 0.82,
  spread = 1.15,
  tilt = -8,
  saturation = 1.08,
  blend = 0.58,
  falloff = 1.9,
  opacity = 0.52,
  className = ""
}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const ctx = canvas.getContext("2d", { alpha: true });
    const color1 = hexToRgb(rayColor1);
    const color2 = hexToRgb(rayColor2);
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let width = 0;
    let height = 0;
    let rafId = 0;
    let start = performance.now();

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = Math.max(1, Math.floor(rect.width));
      height = Math.max(1, Math.floor(rect.height));
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const drawRay = ({
      originX,
      originY,
      angle,
      length,
      thickness,
      color,
      alpha
    }) => {
      ctx.save();
      ctx.translate(originX, originY);
      ctx.rotate(angle);

      const gradient = ctx.createLinearGradient(0, 0, length, 0);
      gradient.addColorStop(0, `rgba(${color.r}, ${color.g}, ${color.b}, ${alpha})`);
      gradient.addColorStop(
        0.34,
        `rgba(${color.r}, ${color.g}, ${color.b}, ${alpha * 0.34})`
      );
      gradient.addColorStop(1, `rgba(${color.r}, ${color.g}, ${color.b}, 0)`);

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.moveTo(0, -thickness * 0.12);
      ctx.lineTo(length, -thickness);
      ctx.lineTo(length, thickness);
      ctx.lineTo(0, thickness * 0.12);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    };

    const render = (now) => {
      const elapsed = (now - start) / 1000;
      ctx.clearRect(0, 0, width, height);
      ctx.globalCompositeOperation = "screen";
      ctx.filter = `saturate(${saturation}) blur(0.2px)`;

      const [originXPct, originYPct] = originMap[origin] ?? originMap["top-right"];
      const originX = originXPct * width;
      const originY = originYPct * height;
      const diagonal = Math.hypot(width, height);
      const directionX = originXPct === 1 ? -1 : 1;
      const directionY = originYPct === 1 ? -1 : 1;
      const baseAngle =
        Math.atan2(directionY * height, directionX * width) +
        (tilt * Math.PI) / 180;
      const drift = prefersReducedMotion
        ? 0
        : Math.sin(elapsed * speed) * 0.055;
      const pulse = prefersReducedMotion
        ? 1
        : 0.88 + Math.sin(elapsed * speed * 0.74) * 0.12;

      const haze = ctx.createRadialGradient(
        originX,
        originY,
        0,
        originX,
        originY,
        diagonal * 0.72
      );
      haze.addColorStop(
        0,
        `rgba(${color1.r}, ${color1.g}, ${color1.b}, ${0.2 * opacity})`
      );
      haze.addColorStop(
        0.38,
        `rgba(${color2.r}, ${color2.g}, ${color2.b}, ${0.085 * opacity})`
      );
      haze.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = haze;
      ctx.fillRect(0, 0, width, height);

      const rayCount = 12;
      for (let index = 0; index < rayCount; index += 1) {
        const centered = index - (rayCount - 1) / 2;
        const offset = centered * 0.048 * spread;
        const phase = elapsed * speed * 0.5 + index * 0.71;
        const color = index / rayCount < blend ? color1 : color2;
        const alpha =
          opacity *
          intensity *
          pulse *
          Math.pow(1 - Math.abs(centered) / (rayCount * 0.78), falloff) *
          (0.18 + (index % 3) * 0.035);

        drawRay({
          originX,
          originY,
          angle: baseAngle + offset + drift + Math.sin(phase) * 0.012,
          length: diagonal * (0.86 + (index % 4) * 0.04),
          thickness: diagonal * (0.055 + (index % 5) * 0.006),
          color,
          alpha
        });
      }

      ctx.filter = "blur(18px)";
      drawRay({
        originX,
        originY,
        angle: baseAngle + drift * 0.55,
        length: diagonal * 0.82,
        thickness: diagonal * 0.14,
        color: color2,
        alpha: opacity * intensity * 0.12
      });

      ctx.filter = "none";
      ctx.globalCompositeOperation = "source-over";
      rafId = window.requestAnimationFrame(render);
    };

    resize();
    window.addEventListener("resize", resize);
    rafId = window.requestAnimationFrame(render);

    return () => {
      window.cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
      start = 0;
    };
  }, [
    rayColor1,
    rayColor2,
    origin,
    speed,
    intensity,
    spread,
    tilt,
    saturation,
    blend,
    falloff,
    opacity
  ]);

  return (
    <canvas
      ref={canvasRef}
      className={`side-rays-background ${className}`.trim()}
      aria-hidden="true"
    />
  );
}
