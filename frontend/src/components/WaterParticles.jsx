import { useEffect, useRef } from "react";

function WaterParticles() {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: null, y: null, radius: 120 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationFrameId;

    let particles = [];
    let droplets = [];
    const particleCount = 45;
    const dropletCount = 35;

    // Handle resizing
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Particle class for neural network nodes
    class NetworkNode {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.35;
        this.vy = (Math.random() - 0.5) * 0.35;
        this.radius = Math.random() * 2 + 1.5;
        this.color = `rgba(6, 182, 212, ${Math.random() * 0.4 + 0.2})`; // Cyan color
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        // Wrap around borders
        if (this.x < 0 || this.x > canvas.width) this.vx = -this.vx;
        if (this.y < 0 || this.y > canvas.height) this.vy = -this.vy;

        // Mouse interaction (gentle attraction)
        if (mouseRef.current.x !== null) {
          const dx = mouseRef.current.x - this.x;
          const dy = mouseRef.current.y - this.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mouseRef.current.radius) {
            const force = (mouseRef.current.radius - dist) / mouseRef.current.radius;
            this.x -= dx * force * 0.02;
            this.y -= dy * force * 0.02;
          }
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
      }
    }

    // Particle class for floating water droplets
    class WaterDroplet {
      constructor() {
        this.reset(true);
      }

      reset(init = false) {
        this.x = Math.random() * canvas.width;
        this.y = init ? Math.random() * canvas.height : canvas.height + 20;
        this.vy = -(Math.random() * 0.4 + 0.15); // float upwards
        this.vx = (Math.random() - 0.5) * 0.1;
        this.radius = Math.random() * 3 + 1;
        this.alpha = Math.random() * 0.3 + 0.05;
        this.scaleSpeed = Math.random() * 0.005 + 0.002;
        this.wobble = Math.random() * 100;
        this.wobbleSpeed = Math.random() * 0.02 + 0.01;
      }

      update() {
        this.y += this.vy;
        this.x += this.vx + Math.sin(this.wobble) * 0.15;
        this.wobble += this.wobbleSpeed;

        // Recycle if out of bounds or faded
        if (this.y < -20 || this.x < -20 || this.x > canvas.width + 20) {
          this.reset(false);
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(56, 189, 248, ${this.alpha})`; // Light blue
        ctx.shadowBlur = 10;
        ctx.shadowColor = "rgba(56, 189, 248, 0.4)";
        ctx.fill();
        ctx.shadowBlur = 0; // reset shadow
      }
    }

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      particles.push(new NetworkNode());
    }
    for (let i = 0; i < dropletCount; i++) {
      droplets.push(new WaterDroplet());
    }

    // Mouse listeners
    const handleMouseMove = (e) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouseRef.current.x = null;
      mouseRef.current.y = null;
    };

    window.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    // Render loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // 1. Draw Network Connections
      ctx.lineWidth = 0.5;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 150) {
            const alpha = (150 - dist) / 150 * 0.15;
            ctx.strokeStyle = `rgba(20, 184, 166, ${alpha})`; // teal line
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // 2. Draw & Update Network Nodes
      particles.forEach((p) => {
        p.update();
        p.draw();
      });

      // 3. Draw & Update Water Droplets
      droplets.forEach((d) => {
        d.update();
        d.draw();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-80"
    />
  );
}

export default WaterParticles;
