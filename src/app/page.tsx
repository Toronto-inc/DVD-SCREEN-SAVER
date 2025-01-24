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
    // Initialize position at center of screen
    animationRef.current.x = (window.innerWidth - 200) / 2;  // 200 is logo width
    animationRef.current.y = (window.innerHeight - 200) / 2; // 200 is logo height

    // Initialize random diagonal movement
    const minVelocity = 2;
    const maxVelocity = 5;
    const getRandomVelocity = () => {
      const velocity = minVelocity + Math.random() * (maxVelocity - minVelocity);
      return Math.random() > 0.5 ? velocity : -velocity;
    };
    
    animationRef.current.dx = getRandomVelocity();
    animationRef.current.dy = getRandomVelocity();

    const logo = logoRef.current;
    if (!logo) return;

    const animate = () => {
      const pos = animationRef.current;
      const logoRect = logo.getBoundingClientRect();
      
      // Update position
      pos.x += pos.dx;
      pos.y += pos.dy;

      // Bounce off edges with minimum velocity
      const minVelocity = 2;
      if (pos.x + logoRect.width > window.innerWidth || pos.x < 0) {
        pos.dx = -pos.dx;
        // Ensure minimum velocity
        if (Math.abs(pos.dx) < minVelocity) {
          pos.dx = pos.dx > 0 ? minVelocity : -minVelocity;
        }
      }
      if (pos.y + logoRect.height > window.innerHeight || pos.y < 0) {
        pos.dy = -pos.dy;
        // Ensure minimum velocity
        if (Math.abs(pos.dy) < minVelocity) {
          pos.dy = pos.dy > 0 ? minVelocity : -minVelocity;
        }
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
