'use client';

import { useEffect } from 'react';

export default function ParticleBackground() {
  useEffect(() => {
    const container = document.getElementById('particles-container');
    if (!container) return;

    for (let i = 0; i < 40; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.left = Math.random() * 100 + '%';
      particle.style.top = Math.random() * 100 + '%';
      particle.style.animationDelay = Math.random() * 30 + 's';
      particle.style.opacity = (Math.random() * 0.6 + 0.2).toString();
      container.appendChild(particle);
    }
  }, []);

  return (
    <div id="particles-container" className="particles" />
  );
}
