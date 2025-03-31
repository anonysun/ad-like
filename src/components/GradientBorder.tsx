import React, { useEffect, useRef } from 'react';

interface GradientBorderProps {
  children: React.ReactNode;
  className?: string;
  gradientColors?: {
    from: string;
    to: string;
  };
  proximityDistance?: number;
  maxGradientRadius?: number;
}

export const GradientBorder: React.FC<GradientBorderProps> = ({
  children,
  className = '',
  gradientColors = { from: '#8e44ad', to: '#3498db' },
  proximityDistance = 30,
  maxGradientRadius = 70,
}) => {
  const boxRef = useRef<HTMLDivElement>(null);
  const borderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!boxRef.current || !borderRef.current) return;

      const rect = boxRef.current.getBoundingClientRect();
      const closestX = Math.max(rect.left, Math.min(e.clientX, rect.right));
      const closestY = Math.max(rect.top, Math.min(e.clientY, rect.bottom));
      const distanceX = e.clientX - closestX;
      const distanceY = e.clientY - closestY;
      const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

      const isInsideBox = e.clientX >= rect.left && e.clientX <= rect.right && 
                         e.clientY >= rect.top && e.clientY <= rect.bottom;

      if (isInsideBox) {
        borderRef.current.style.background = `linear-gradient(to right, ${gradientColors.from}, ${gradientColors.to})`;
      } else if (distance < proximityDistance) {
        const opacity = 1 - (distance / proximityDistance);
        const cursorXRelative = e.clientX - rect.left;
        const cursorYRelative = e.clientY - rect.top;

        borderRef.current.style.background = `radial-gradient(circle ${maxGradientRadius}px at ${cursorXRelative}px ${cursorYRelative}px, 
          rgba(${hexToRgb(gradientColors.from)}, ${opacity}), 
          rgba(${hexToRgb(gradientColors.to)}, ${opacity}) 50%, 
          transparent 100%)`;
      } else {
        borderRef.current.style.background = 'transparent';
      }
    };

    const handleMouseEnter = () => {
      if (borderRef.current) {
        borderRef.current.style.background = `linear-gradient(to right, ${gradientColors.from}, ${gradientColors.to})`;
      }
    };

    const handleMouseLeave = () => {
      if (borderRef.current) {
        borderRef.current.style.background = 'transparent';
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    boxRef.current?.addEventListener('mouseenter', handleMouseEnter);
    boxRef.current?.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      boxRef.current?.removeEventListener('mouseenter', handleMouseEnter);
      boxRef.current?.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [gradientColors, proximityDistance, maxGradientRadius]);

  return (
    <div ref={boxRef} className={`relative p-[1px] box-border ${className}`}>
      <div
        ref={borderRef}
        className={`absolute top-0 left-0 w-full h-full bg-transparent transition-colors duration-300 ${className}`}
      />
      {children}
    </div>
  );
};

// 헬퍼 함수: HEX 컬러를 RGB로 변환
const hexToRgb = (hex: string): string => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`
    : '0, 0, 0';
};