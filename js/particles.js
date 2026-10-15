/**
 * SHIVARA BY RIDDHI - Luxury Pearls & Gold Dust Floating Particle Canvas
 * Features soft iridescent pearls, golden beads, and shimmering star dust.
 * Automatically throttles on mobile devices for smooth 60fps performance.
 */

class LuxuryParticleCanvas {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.isMobile = window.innerWidth <= 768;
    this.particleCount = this.isMobile ? 16 : 42;
    this.mouseX = -1000;
    this.mouseY = -1000;
    this.animationId = null;
    this.isVisible = true;

    this.init();
  }

  init() {
    this.resize();
    this.createParticles();
    this.bindEvents();
    this.animate();
  }

  resize() {
    this.width = this.canvas.width = this.canvas.parentElement.clientWidth;
    this.height = this.canvas.height = this.canvas.parentElement.clientHeight;
  }

  bindEvents() {
    window.addEventListener('resize', () => {
      this.resize();
      this.isMobile = window.innerWidth <= 768;
    });

    if (!this.isMobile) {
      this.canvas.addEventListener('mousemove', (e) => {
        const rect = this.canvas.getBoundingClientRect();
        this.mouseX = e.clientX - rect.left;
        this.mouseY = e.clientY - rect.top;
      });

      this.canvas.addEventListener('mouseleave', () => {
        this.mouseX = -1000;
        this.mouseY = -1000;
      });
    }

    // Intersection Observer to pause canvas rendering when off-screen
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          this.isVisible = entry.isIntersecting;
        });
      }, { threshold: 0.1 });
      observer.observe(this.canvas);
    }
  }

  createParticles() {
    this.particles = [];
    for (let i = 0; i < this.particleCount; i++) {
      const typeRand = Math.random();
      let type = 'dust';
      let radius = Math.random() * 2 + 1;

      if (typeRand > 0.75) {
        type = 'pearl'; // Big luminous pearl
        radius = Math.random() * 6 + 4;
      } else if (typeRand > 0.45) {
        type = 'gold-bead'; // Metallic gold bead
        radius = Math.random() * 3.5 + 2.5;
      }

      this.particles.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: -Math.random() * 0.45 - 0.15, // float gently upwards
        radius: radius,
        type: type,
        alpha: Math.random() * 0.6 + 0.3,
        pulseSpeed: Math.random() * 0.03 + 0.01,
        pulseVal: Math.random() * Math.PI * 2,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.02
      });
    }
  }

  drawPearl(p) {
    const ctx = this.ctx;
    ctx.save();
    ctx.translate(p.x, p.y);

    // Pearl outer soft shadow
    ctx.shadowColor = 'rgba(217, 178, 106, 0.25)';
    ctx.shadowBlur = p.radius * 1.5;

    // Pearl 3D gradient
    const grad = ctx.createRadialGradient(
      -p.radius * 0.3, -p.radius * 0.35, p.radius * 0.1,
      0, 0, p.radius
    );
    grad.addColorStop(0, `rgba(255, 255, 255, ${p.alpha * 0.95})`);
    grad.addColorStop(0.35, `rgba(253, 248, 238, ${p.alpha * 0.85})`);
    grad.addColorStop(0.75, `rgba(240, 226, 202, ${p.alpha * 0.7})`);
    grad.addColorStop(1, `rgba(217, 178, 106, ${p.alpha * 0.4})`);

    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(0, 0, p.radius, 0, Math.PI * 2);
    ctx.fill();

    // Specular highlight pinpoint
    ctx.shadowBlur = 0;
    ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha * 0.9})`;
    ctx.beginPath();
    ctx.arc(-p.radius * 0.35, -p.radius * 0.35, p.radius * 0.25, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  }

  drawGoldBead(p) {
    const ctx = this.ctx;
    ctx.save();
    ctx.translate(p.x, p.y);

    ctx.shadowColor = 'rgba(184, 134, 59, 0.35)';
    ctx.shadowBlur = p.radius * 1.2;

    const grad = ctx.createRadialGradient(
      -p.radius * 0.3, -p.radius * 0.3, p.radius * 0.1,
      0, 0, p.radius
    );
    grad.addColorStop(0, `rgba(255, 244, 214, ${p.alpha * 0.95})`);
    grad.addColorStop(0.4, `rgba(217, 178, 106, ${p.alpha * 0.85})`);
    grad.addColorStop(0.8, `rgba(184, 134, 59, ${p.alpha * 0.75})`);
    grad.addColorStop(1, `rgba(138, 94, 31, ${p.alpha * 0.6})`);

    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(0, 0, p.radius, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  }

  drawDust(p) {
    const ctx = this.ctx;
    const currentAlpha = Math.abs(Math.sin(p.pulseVal)) * p.alpha;
    ctx.save();
    ctx.fillStyle = `rgba(217, 178, 106, ${currentAlpha})`;
    ctx.shadowColor = 'rgba(217, 178, 106, 0.5)';
    ctx.shadowBlur = 4;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  animate() {
    if (!this.isVisible) {
      this.animationId = requestAnimationFrame(() => this.animate());
      return;
    }

    this.ctx.clearRect(0, 0, this.width, this.height);

    for (let i = 0; i < this.particles.length; i++) {
      const p = this.particles[i];

      // Move particle
      p.x += p.vx;
      p.y += p.vy;
      p.pulseVal += p.pulseSpeed;

      // Mouse subtle interaction (desktop only)
      if (!this.isMobile && this.mouseX > 0) {
        const dx = p.x - this.mouseX;
        const dy = p.y - this.mouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120 && dist > 0) {
          const force = (120 - dist) / 120;
          p.x += (dx / dist) * force * 1.5;
          p.y += (dy / dist) * force * 1.5;
        }
      }

      // Wrap edges smoothly
      if (p.y < -20) {
        p.y = this.height + 20;
        p.x = Math.random() * this.width;
      }
      if (p.x < -20) p.x = this.width + 20;
      if (p.x > this.width + 20) p.x = -20;

      // Render by type
      if (p.type === 'pearl') {
        this.drawPearl(p);
      } else if (p.type === 'gold-bead') {
        this.drawGoldBead(p);
      } else {
        this.drawDust(p);
      }
    }

    this.animationId = requestAnimationFrame(() => this.animate());
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new LuxuryParticleCanvas('heroCanvas');
});
