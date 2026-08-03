import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const revealSelector = [
  ".content-notice",
  ".content-section__heading",
  ".info-card",
  ".pathway__item",
  ".figure-placeholder",
  ".timeline > li",
  ".focus-statement",
  ".system-flow__step",
  ".empty-state",
].join(",");

export function LegacyEffects() {
  const location = useLocation();

  useEffect(() => {
    const elements = Array.from(
      document.querySelectorAll<HTMLElement>(revealSelector),
    );
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    elements.forEach((element, index) => {
      element.classList.add("legacy-reveal");
      element.style.setProperty("--reveal-delay", `${(index % 3) * 70}ms`);
    });

    if (reduceMotion || !("IntersectionObserver" in window)) {
      elements.forEach((element) => element.classList.add("is-revealed"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -45px" },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [location.pathname]);

  useEffect(() => {
    if (location.pathname !== "/") return;

    const hero = document.querySelector<HTMLElement>(".home-hero");
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (!hero || reduceMotion) return;

    const canvas = document.createElement("canvas");
    canvas.className = "legacy-particle-canvas";
    canvas.setAttribute("aria-hidden", "true");
    hero.prepend(canvas);

    const context = canvas.getContext("2d");
    if (!context) {
      canvas.remove();
      return;
    }

    type Particle = {
      x: number;
      y: number;
      radius: number;
      speed: number;
      drift: number;
      alpha: number;
    };

    let width = 0;
    let height = 0;
    let frame = 0;
    let pointerX = 0;
    let pointerY = 0;
    let particles: Particle[] = [];

    const makeParticle = (atBottom = false): Particle => ({
      x: Math.random() * width,
      y: atBottom ? height + Math.random() * 30 : Math.random() * height,
      radius: 1.5 + Math.random() * 4,
      speed: 0.18 + Math.random() * 0.45,
      drift: (Math.random() - 0.5) * 0.25,
      alpha: 0.08 + Math.random() * 0.2,
    });

    const resize = () => {
      const rect = hero.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      const count = Math.min(90, Math.max(34, Math.floor(width / 15)));
      particles = Array.from({ length: count }, () => makeParticle());
    };

    const draw = () => {
      context.clearRect(0, 0, width, height);
      for (let index = 0; index < particles.length; index += 1) {
        const particle = particles[index];
        particle.y -= particle.speed;
        particle.x += particle.drift;
        if (particle.y < -20 || particle.x < -20 || particle.x > width + 20) {
          particles[index] = makeParticle(true);
          continue;
        }

        const x = particle.x + pointerX * particle.radius * 1.4;
        const y = particle.y + pointerY * particle.radius;
        const gradient = context.createRadialGradient(
          x,
          y,
          0,
          x,
          y,
          particle.radius * 4,
        );
        gradient.addColorStop(0, `rgba(255,255,255,${particle.alpha})`);
        gradient.addColorStop(1, "rgba(255,255,255,0)");
        context.fillStyle = gradient;
        context.beginPath();
        context.arc(x, y, particle.radius * 4, 0, Math.PI * 2);
        context.fill();
      }
      frame = window.requestAnimationFrame(draw);
    };

    const handlePointerMove = (event: PointerEvent) => {
      const rect = hero.getBoundingClientRect();
      pointerX = (event.clientX - rect.left) / rect.width - 0.5;
      pointerY = (event.clientY - rect.top) / rect.height - 0.5;
    };

    resize();
    draw();
    window.addEventListener("resize", resize);
    hero.addEventListener("pointermove", handlePointerMove, { passive: true });

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      hero.removeEventListener("pointermove", handlePointerMove);
      canvas.remove();
    };
  }, [location.pathname]);

  return null;
}
