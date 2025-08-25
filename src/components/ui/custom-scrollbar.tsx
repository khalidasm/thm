'use client';

import React, { useRef, useEffect, useState, useCallback } from 'react';
import { motion, useMotionValue, animate } from 'framer-motion';

interface CustomScrollbarProps {
  children: React.ReactNode;
  className?: string;
  onScroll?: (scrollLeft: number) => void;
}

const CustomScrollbar: React.FC<CustomScrollbarProps> = ({
  children,
  className = '',
  onScroll
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollbarRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [scrollInfo, setScrollInfo] = useState({
    maxScroll: 0,
    currentScroll: 0,
    thumbSize: 100,
    thumbPosition: 0
  });
  
  // Framer Motion values for smooth animations
  const thumbOpacity = useMotionValue(0.6);
  const scrollbarHeight = useMotionValue(4);

  // Calculate scroll information
  const calculateScrollInfo = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const scrollSize = container.scrollWidth;
    const clientSize = container.clientWidth;
    const currentScroll = container.scrollLeft;
    const maxScroll = Math.max(0, scrollSize - clientSize);
    
    // Calculate thumb size based on visible content ratio
    const ratio = clientSize / scrollSize;
    const thumbSize = Math.max(10, Math.min(100, ratio * 100));
    
    // Calculate thumb position
    const progress = maxScroll > 0 ? currentScroll / maxScroll : 0;
    const thumbPosition = progress * (100 - thumbSize);

    setScrollInfo({
      maxScroll,
      currentScroll,
      thumbSize,
      thumbPosition
    });
  }, []);

  // Update scroll info on scroll and resize
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      calculateScrollInfo();
      onScroll?.(container.scrollLeft);
    };

    // Initial calculation
    calculateScrollInfo();

    // Add event listeners
    container.addEventListener('scroll', handleScroll);
    const resizeObserver = new ResizeObserver(calculateScrollInfo);
    resizeObserver.observe(container);

    return () => {
      container.removeEventListener('scroll', handleScroll);
      resizeObserver.disconnect();
    };
  }, [calculateScrollInfo, onScroll]);

  // Handle scrollbar interactions
  useEffect(() => {
    const container = containerRef.current;
    const scrollbar = scrollbarRef.current;
    if (!container || !scrollbar) return;

    const handleMouseDown = (e: MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(true);
      
      const rect = scrollbar.getBoundingClientRect();
      const clickPosition = e.clientX - rect.left;
      const scrollbarSize = rect.width;
      
      const scrollRatio = Math.max(0, Math.min(1, clickPosition / scrollbarSize));
      const newScrollPosition = scrollRatio * scrollInfo.maxScroll;
      
      container.scrollLeft = newScrollPosition;
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      e.preventDefault();
      e.stopPropagation();
      
      const rect = scrollbar.getBoundingClientRect();
      const clickPosition = e.clientX - rect.left;
      const scrollbarSize = rect.width;
      
      const scrollRatio = Math.max(0, Math.min(1, clickPosition / scrollbarSize));
      const newScrollPosition = scrollRatio * scrollInfo.maxScroll;
      
      container.scrollLeft = newScrollPosition;
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    scrollbar.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      scrollbar.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, scrollInfo.maxScroll]);

  // Handle hover effects
  useEffect(() => {
    if (isHovered) {
      animate(thumbOpacity, 1, { duration: 0.2 });
      animate(scrollbarHeight, 8, { duration: 0.2 });
    } else {
      animate(thumbOpacity, 0.6, { duration: 0.2 });
      animate(scrollbarHeight, 4, { duration: 0.2 });
    }
  }, [isHovered, thumbOpacity, scrollbarHeight]);

  return (
    <div className={`relative ${className}`}>
      {/* Scrollable Content */}
      <div
        ref={containerRef}
        className="overflow-auto scrollbar-hide"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {children}
      </div>
      
      {/* Custom Scrollbar - Only show if there's scrollable content */}
      {scrollInfo.maxScroll > 0 && (
        <motion.div
          ref={scrollbarRef}
          className="absolute cursor-pointer bottom-0 left-0 right-0"
          style={{
            height: scrollbarHeight,
            width: '100%',
            backgroundColor: 'hsla(230, 3%, 62%, 10%)'
          }}
        >
          {/* Scrollbar Thumb */}
          <motion.div
            className="absolute bg-[var(--scrollbar-color)] rounded-full h-full"
            style={{
              opacity: thumbOpacity,
              left: `${scrollInfo.thumbPosition}%`,
              width: `${scrollInfo.thumbSize}%`
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          />
        </motion.div>
      )}
    </div>
  );
};

export default CustomScrollbar; 