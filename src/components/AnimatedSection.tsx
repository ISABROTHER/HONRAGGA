// src/components/AnimatedSection.tsx
import React, { useEffect, useRef } from 'react';

export const AnimatedSection = ({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-section-enter');
          entry.target.classList.remove('opacity-0', 'translate-y-5');
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );
    const currentRef = ref.current;
    if (currentRef) {
      currentRef.classList.add('opacity-0', 'translate-y-5');
      observer.observe(currentRef);
    }
    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return <div ref={ref} className="transition-all duration-700 ease-out" style={{ transitionDelay: `${delay}ms` }}>{children}</div>;
};