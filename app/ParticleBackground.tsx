'use client';

import { useEffect, useRef } from 'react';

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    class Particle {
      x: number;
      y: number;
      baseX: number;
      baseY: number;
      size: number;
      opacity: number;
      angle: number;
      angleSpeed: number;
      row: number;
      col: number;

      constructor(row: number, col: number) {
        this.row = row;
        this.col = col;
        this.baseX = 0;
        this.baseY = 0;
        this.x = 0;
        this.y = 0;
        this.size = 0;
        this.opacity = 0;
        this.angle = Math.random() * Math.PI * 2;
        this.angleSpeed = (Math.random() - 0.5) * 0.01;
        this.init();
      }

      init() {
        // Create curved wave pattern
        const rows = 14;
        const cols = 20;
        
        // Horizontal spacing increases as we go right (perspective)
        const xSpacing = 35 + this.col * 2;
        // Vertical spacing
        const ySpacing = 25;
        
        // Base position
        let x = 30 + this.col * xSpacing;
        let y = 80 + this.row * ySpacing;
        
        // Create the downward curve - dots curve down as they go right
        const curveAmount = Math.pow(this.col / cols, 1.5) * 120;
        y += curveAmount;
        
        // Add wave motion - creates the flowing S-curve pattern
        const wavePhase = (this.row / rows) * Math.PI * 2;
        const waveAmplitude = 25 * (this.col / cols);
        x += Math.sin(wavePhase) * waveAmplitude;
        
        this.baseX = x;
        this.baseY = y;
        this.x = x;
        this.y = y;
        
        // Size decreases with distance (perspective depth)
        const depth = (this.col + this.row * 0.3) / 25;
        this.size = Math.max(2, 12 - depth * 8);
        
        // Opacity decreases with depth
        this.opacity = Math.max(0.1, 0.9 - depth * 0.6);
      }

      update() {
        // Very subtle floating animation
        this.angle += this.angleSpeed;
        this.x = this.baseX + Math.sin(this.angle) * 3;
        this.y = this.baseY + Math.cos(this.angle * 0.7) * 2;
      }

      draw(ctx: CanvasRenderingContext2D) {
        // Outer glow
        const gradient = ctx.createRadialGradient(
          this.x,
          this.y,
          0,
          this.x,
          this.y,
          this.size * 2.5
        );

        gradient.addColorStop(0, `rgba(182, 255, 72, ${this.opacity * 0.8})`);
        gradient.addColorStop(0.4, `rgba(182, 255, 72, ${this.opacity * 0.3})`);
        gradient.addColorStop(1, `rgba(182, 255, 72, 0)`);

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * 2.5, 0, Math.PI * 2);
        ctx.fill();

        // Solid core
        ctx.fillStyle = `rgba(182, 255, 72, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Create particles in grid pattern
    const particles: Particle[] = [];
    const rows = 14;
    const cols = 20;

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        particles.push(new Particle(row, col));
      }
    }

    let animationFrameId: number;

    function animate() {
      if (!ctx || !canvas) return;

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        particle.update();
        particle.draw(ctx);
      });

      animationFrameId = requestAnimationFrame(animate);
    }

    animate();

    return () => {
      window.removeEventListener('resize', setCanvasSize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none"
      style={{ background: 'transparent' }}
    />
  );
}