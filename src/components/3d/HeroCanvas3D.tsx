'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function HeroCanvas3D() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let animId: number;
    let scene = new THREE.Scene();
    let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    let renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });

    const dpr = Math.min(window.devicePixelRatio, 2);
    renderer.setPixelRatio(dpr);
    renderer.setSize(window.innerWidth, window.innerHeight);

    // ── 1. Icosaedro Wireframe com Shader GLSL ──
    const geometry = new THREE.IcosahedronGeometry(1.8, 2);

    const uniforms = {
      uTime: { value: 0 },
      uColor: { value: new THREE.Color(0x2563eb) },
      uGlitch: { value: 0 },
    };

    const vertexShader = `
      varying vec3 vPosition;
      varying vec2 vUv;
      void main() {
        vUv = uv;
        vPosition = position;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `;

    const fragmentShader = `
      uniform float uTime;
      uniform vec3  uColor;
      uniform float uGlitch;
      varying vec3  vPosition;
      varying vec2  vUv;

      void main() {
        float split = uGlitch * 0.08 + 0.005;
        float r = uColor.r + sin(vPosition.y * 10.0 + uTime * 2.0) * split;
        float g = uColor.g;
        float b = uColor.b + cos(vPosition.x * 10.0 - uTime * 2.0) * split;
        float alpha = 0.2 + sin(uTime * 4.0) * 0.05 + (uGlitch * 0.4);
        gl_FragColor = vec4(r, g, b, alpha);
      }
    `;

    const shaderMaterial = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
      wireframe: true,
      transparent: true,
    });

    const icosahedron = new THREE.Mesh(geometry, shaderMaterial);
    scene.add(icosahedron);

    // ── 2. Partículas em Espiral (350) ──
    const particleCount = 350;
    const particleGeo = new THREE.BufferGeometry();
    const particlePos = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const radius = 3 + Math.random() * 4;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      particlePos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      particlePos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      particlePos[i * 3 + 2] = radius * Math.cos(phi);
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePos, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0x00f0ff,
      size: 0.03,
      transparent: true,
      opacity: 0.6,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // ── 3. Debris Fragmentos (120) com InstancedMesh ──
    const debrisCount = 120;
    const debrisGeo = new THREE.ConeGeometry(0.08, 0.2, 3);
    const debrisMat = new THREE.MeshBasicMaterial({
      color: 0xd4a017,
      wireframe: true,
      transparent: true,
      opacity: 0.5,
    });
    const debrisMesh = new THREE.InstancedMesh(debrisGeo, debrisMat, debrisCount);

    const dummy = new THREE.Object3D();
    const debrisData: Array<{ x: number; y: number; z: number; rx: number; ry: number }> = [];

    for (let i = 0; i < debrisCount; i++) {
      const x = (Math.random() - 0.5) * 12;
      const y = (Math.random() - 0.5) * 12;
      const z = (Math.random() - 0.5) * 8;
      debrisData.push({
        x, y, z,
        rx: (Math.random() - 0.5) * 0.02,
        ry: (Math.random() - 0.5) * 0.02,
      });

      dummy.position.set(x, y, z);
      dummy.updateMatrix();
      debrisMesh.setMatrixAt(i, dummy.matrix);
    }
    scene.add(debrisMesh);

    // ── Mouse & Scroll Listeners ──
    let mouseX = 0;
    let mouseY = 0;
    let scrollVel = 0;
    let lastScrollY = window.scrollY;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    const handleScroll = () => {
      const currentY = window.scrollY;
      scrollVel = Math.abs(currentY - lastScrollY) * 0.005;
      lastScrollY = currentY;
    };

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });

    // Escutar eventos globais de glitch do Agente ÆVO
    const handleAevoGlitch = () => {
      uniforms.uGlitch.value = 1.0;
    };
    window.addEventListener('aevoGlitch', handleAevoGlitch);

    // ── Loop de Animação (60 FPS Cap) ──
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();
      uniforms.uTime.value = elapsedTime;

      scrollVel *= 0.92;
      uniforms.uGlitch.value = Math.max(uniforms.uGlitch.value * 0.95, scrollVel);

      icosahedron.rotation.x = elapsedTime * 0.2 + mouseY * 0.3;
      icosahedron.rotation.y = elapsedTime * 0.3 + mouseX * 0.3;

      particles.rotation.y = elapsedTime * 0.05;

      for (let i = 0; i < debrisCount; i++) {
        const d = debrisData[i];
        d.x += Math.sin(elapsedTime + i) * 0.002;
        d.y += Math.cos(elapsedTime + i) * 0.002;

        dummy.position.set(d.x + mouseX * 0.2, d.y - mouseY * 0.2, d.z);
        dummy.rotation.x += d.rx;
        dummy.rotation.y += d.ry;
        dummy.updateMatrix();
        debrisMesh.setMatrixAt(i, dummy.matrix);
      }
      debrisMesh.instanceMatrix.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('aevoGlitch', handleAevoGlitch);
      renderer.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="heroCanvas"
      className="global-3d-bg"
    />
  );
}
