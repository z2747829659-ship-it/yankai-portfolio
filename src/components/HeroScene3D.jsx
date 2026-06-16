import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export function HeroScene3D() {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return undefined;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance"
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.35));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100);
    camera.position.set(0, 0.28, 12.2);

    const root = new THREE.Group();
    root.rotation.set(-0.44, 0.48, -0.1);
    root.scale.setScalar(0.94);
    scene.add(root);

    const environment = new THREE.CanvasTexture(createEnvironmentTexture());
    environment.mapping = THREE.EquirectangularReflectionMapping;
    environment.colorSpace = THREE.SRGBColorSpace;
    scene.environment = environment;

    const coreMaterial = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#08130c"),
      metalness: 0.78,
      roughness: 0.2,
      clearcoat: 1,
      clearcoatRoughness: 0.16,
      transmission: 0.08,
      thickness: 0.45,
      envMapIntensity: 1.75,
      iridescence: 0.42,
      iridescenceIOR: 1.55,
      iridescenceThicknessRange: [120, 420]
    });

    const edgeMaterial = new THREE.MeshBasicMaterial({
      color: new THREE.Color("#edfff1"),
      transparent: true,
      opacity: 0.7
    });

    const accentMaterials = [
      coreMaterial,
      coreMaterial.clone(),
      coreMaterial.clone()
    ];
    accentMaterials[1].color = new THREE.Color("#102719");
    accentMaterials[2].color = new THREE.Color("#163d24");

    const cubeGeometry = new THREE.BoxGeometry(0.96, 0.96, 0.96, 3, 3, 3);
    const edgeGeometry = new THREE.BoxGeometry(1.006, 1.006, 1.006);
    const edgeGeometries = [];
    const offsets = [-1.08, 0, 1.08];

    offsets.forEach((x, ix) => {
      offsets.forEach((y, iy) => {
        offsets.forEach((z, iz) => {
          const group = new THREE.Group();
          group.position.set(x, y, z);
          group.rotation.set(
            (iy - 1) * 0.025,
            (ix - 1) * -0.03,
            (iz - 1) * 0.02
          );

          const cube = new THREE.Mesh(
            cubeGeometry,
            accentMaterials[(ix + iy + iz) % accentMaterials.length]
          );
          cube.castShadow = false;
          cube.receiveShadow = false;
          group.add(cube);

          const edges = new THREE.EdgesGeometry(edgeGeometry, 18);
          edgeGeometries.push(edges);
          const line = new THREE.LineSegments(edges, edgeMaterial);
          line.scale.setScalar(1.01);
          group.add(line);

          root.add(group);
        });
      });
    });

    const ambient = new THREE.AmbientLight("#4f6b55", 1.2);
    scene.add(ambient);

    const key = new THREE.DirectionalLight("#ffffff", 4.2);
    key.position.set(4, 5, 6);
    scene.add(key);

    const greenFill = new THREE.PointLight("#64e58f", 22, 12);
    greenFill.position.set(-4, -1.2, 3.4);
    scene.add(greenFill);

    const emeraldKey = new THREE.PointLight("#b7ffc8", 28, 14);
    emeraldKey.position.set(3.4, 2.6, 3.2);
    scene.add(emeraldKey);

    const pointer = {
      dragging: false,
      lastX: 0,
      lastY: 0,
      velocityX: 0,
      velocityY: 0,
      targetX: root.rotation.x,
      targetY: root.rotation.y
    };

    const onPointerDown = (event) => {
      pointer.dragging = true;
      pointer.lastX = event.clientX;
      pointer.lastY = event.clientY;
      renderer.domElement.setPointerCapture?.(event.pointerId);
      mount.classList.add("is-dragging");
    };

    const onPointerMove = (event) => {
      if (!pointer.dragging) return;
      const dx = event.clientX - pointer.lastX;
      const dy = event.clientY - pointer.lastY;
      pointer.lastX = event.clientX;
      pointer.lastY = event.clientY;
      pointer.velocityY = dx * 0.006;
      pointer.velocityX = dy * 0.005;
      pointer.targetY += pointer.velocityY;
      pointer.targetX += pointer.velocityX;
    };

    const onPointerUp = (event) => {
      pointer.dragging = false;
      renderer.domElement.releasePointerCapture?.(event.pointerId);
      mount.classList.remove("is-dragging");
    };

    renderer.domElement.addEventListener("pointerdown", onPointerDown);
    renderer.domElement.addEventListener("pointermove", onPointerMove);
    renderer.domElement.addEventListener("pointerup", onPointerUp);
    renderer.domElement.addEventListener("pointerleave", onPointerUp);

    const resize = () => {
      const { width, height } = mount.getBoundingClientRect();
      const safeWidth = Math.max(width, 1);
      const safeHeight = Math.max(height, 1);
      renderer.setSize(safeWidth, safeHeight, false);
      camera.aspect = safeWidth / safeHeight;
      const compactHero = safeWidth < 760;
      camera.fov = compactHero ? 36 : 34;
      camera.position.z = compactHero ? 12.8 : 12.2;
      root.scale.setScalar(compactHero ? 0.86 : 0.94);
      camera.updateProjectionMatrix();
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(mount);
    resize();

    const clock = new THREE.Clock();
    let frameId = 0;
    let isActive = false;

    const render = () => {
      if (!isActive) {
        frameId = 0;
        return;
      }

      const elapsed = clock.getElapsedTime();

      if (!pointer.dragging) {
        pointer.targetY += 0.0045;
        pointer.targetX += Math.sin(elapsed * 0.65) * 0.0009;
      }

      root.rotation.x += (pointer.targetX - root.rotation.x) * 0.08;
      root.rotation.y += (pointer.targetY - root.rotation.y) * 0.08;
      root.rotation.z = -0.12 + Math.sin(elapsed * 0.55) * 0.055;

      root.children.forEach((child, index) => {
        if (child.type !== "Group") return;
        child.position.y += Math.sin(elapsed * 1.25 + index * 0.57) * 0.0009;
      });

      renderer.render(scene, camera);
      frameId = window.requestAnimationFrame(render);
    };

    const startRenderLoop = () => {
      if (frameId) return;
      isActive = true;
      clock.start();
      frameId = window.requestAnimationFrame(render);
    };

    const stopRenderLoop = () => {
      isActive = false;
      if (frameId) {
        window.cancelAnimationFrame(frameId);
        frameId = 0;
      }
    };

    const visibilityObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          startRenderLoop();
        } else {
          stopRenderLoop();
        }
      },
      { threshold: 0.04 }
    );
    visibilityObserver.observe(mount);
    renderer.render(scene, camera);

    return () => {
      stopRenderLoop();
      visibilityObserver.disconnect();
      resizeObserver.disconnect();
      renderer.domElement.removeEventListener("pointerdown", onPointerDown);
      renderer.domElement.removeEventListener("pointermove", onPointerMove);
      renderer.domElement.removeEventListener("pointerup", onPointerUp);
      renderer.domElement.removeEventListener("pointerleave", onPointerUp);
      mount.classList.remove("is-dragging");
      mount.removeChild(renderer.domElement);
      cubeGeometry.dispose();
      edgeGeometry.dispose();
      edgeGeometries.forEach((geometry) => geometry.dispose());
      accentMaterials.forEach((material) => material.dispose());
      edgeMaterial.dispose();
      environment.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div className="hero-3d-shell">
      <div ref={mountRef} className="hero-3d-canvas" />
    </div>
  );
}

function createEnvironmentTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 512;
  const ctx = canvas.getContext("2d");
  const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
  gradient.addColorStop(0, "#010301");
  gradient.addColorStop(0.28, "#08170d");
  gradient.addColorStop(0.48, "#effff1");
  gradient.addColorStop(0.62, "#1f7a3c");
  gradient.addColorStop(0.82, "#06160b");
  gradient.addColorStop(1, "#010201");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const glow = ctx.createRadialGradient(720, 180, 20, 720, 180, 260);
  glow.addColorStop(0, "rgba(255,255,255,0.95)");
  glow.addColorStop(0.26, "rgba(100,229,143,0.42)");
  glow.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "rgba(100, 229, 143, 0.28)";
  ctx.fillRect(0, 360, canvas.width, 18);
  ctx.fillStyle = "rgba(255, 255, 255, 0.62)";
  ctx.fillRect(80, 110, 390, 8);
  ctx.fillRect(650, 90, 240, 10);
  return canvas;
}
