'use client';

import Image from "next/image";
import styles from "./page.module.css";
import { useEffect, useRef } from "react";

export default function Home() {
  const logoRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<{
    x: number;
    y: number;
    dx: number;
    dy: number;
  }>({
    x: 0,
    y: 0,
    dx: 3,
    dy: 2
  });

  useEffect(() => {
    // Initialize random position on client-side
    animationRef.current.x = Math.random() * window.innerWidth;
    animationRef.current.y = Math.random() * window.innerHeight;

    const logo = logoRef.current;
    if (!logo) return;

    const animate = () => {
      const pos = animationRef.current;
      const logoRect = logo.getBoundingClientRect();
      
      // Update position
      pos.x += pos.dx;
      pos.y += pos.dy;

      // Bounce off edges
      if (pos.x + logoRect.width > window.innerWidth || pos.x < 0) {
        pos.dx = -pos.dx;
      }
      if (pos.y + logoRect.height > window.innerHeight || pos.y < 0) {
        pos.dy = -pos.dy;
      }

      // Apply new position
      logo.style.transform = `translate(${pos.x}px, ${pos.y}px)`;

      requestAnimationFrame(animate);
    };

    animate();
  }, []);

  return (
    <div className={styles.page}>
      <div className={styles.bouncingLogoContainer}>
        <div ref={logoRef} className={styles.bouncingLogo}>
          <Image
            src="/logo.svg"
            alt="Bouncing logo"
            width={200}
            height={200}
            priority
          />
        </div>
      </div>
    </div>
  );
}
