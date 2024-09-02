import React, { useState, useEffect, useRef } from 'react';
import { Box } from '@radix-ui/themes';

interface FloatingContainerProps {
  children: React.ReactNode;
  boundaryRect: { top: number; left: number; width: number; height: number };
  isVisible: boolean;
}

const FloatingContainer: React.FC<FloatingContainerProps> = ({ children, boundaryRect, isVisible }) => {
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const containerRect = containerRef.current.getBoundingClientRect();
        const scrollY = window.scrollY;

        let newTop = Math.max(boundaryRect.top - scrollY + 20, 20);
        newTop = Math.min(newTop, boundaryRect.top + boundaryRect.height - scrollY - containerRect.height - 20);

        let newLeft = boundaryRect.left + (boundaryRect.width - containerRect.width) / 2;
        
        if (scrollY > boundaryRect.top) {
          newLeft = boundaryRect.left + 20;
        }

        setPosition({ top: newTop, left: newLeft });
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial position
    return () => window.removeEventListener('scroll', handleScroll);
  }, [boundaryRect]);

  if (!isVisible) {
    return null;
  }

  return (
    <Box
      ref={containerRef}
      style={{
        position: 'fixed',
        top: `${position.top}px`,
        left: `${position.left}px`,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        borderRadius: '16px',
        padding: '16px',
        backdropFilter: 'blur(10px)',
        boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
        border: '1px solid rgba(255, 255, 255, 0.3)',
        zIndex: 1000,
        transition: 'all 0.3s ease-in-out',
        width: '200px',
      }}
    >
      {children}
    </Box>
  );
};

export default FloatingContainer;