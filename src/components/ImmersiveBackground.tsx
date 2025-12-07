import { useEffect, useState, useCallback } from 'react';

const ImmersiveBackground = () => {
  const [scrollY, setScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const [techDots, setTechDots] = useState<Array<{
    id: number;
    left: number;
    top: number;
    depth: number;
  }>>([]);

  const [dataStreams, setDataStreams] = useState<Array<{
    id: number;
    top: number;
    width: number;
    animationDuration: number;
    animationDelay: number;
    depth: number;
  }>>([]);

  const [floatingOrbs, setFloatingOrbs] = useState<Array<{
    id: number;
    left: number;
    top: number;
    size: number;
    depth: number;
    hue: number;
  }>>([]);

  const handleScroll = useCallback(() => {
    setScrollY(window.scrollY);
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    setMousePosition({
      x: (e.clientX / window.innerWidth - 0.5) * 2,
      y: (e.clientY / window.innerHeight - 0.5) * 2
    });
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Generate glowing tech dots with depth
    const dots = Array.from({ length: 40 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      depth: 0.2 + Math.random() * 0.8
    }));
    setTechDots(dots);

    // Generate data streams with depth
    const streams = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      top: Math.random() * 100,
      width: 100 + Math.random() * 200,
      animationDuration: 3 + Math.random() * 4,
      animationDelay: Math.random() * 8,
      depth: 0.3 + Math.random() * 0.7
    }));
    setDataStreams(streams);

    // Generate floating orbs for parallax
    const orbs = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: 100 + Math.random() * 300,
      depth: 0.1 + Math.random() * 0.9,
      hue: Math.random() * 60 + 200
    }));
    setFloatingOrbs(orbs);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [handleScroll, handleMouseMove]);

  const getParallaxStyle = (depth: number, baseTop?: number, baseLeft?: number) => {
    const scrollOffset = scrollY * depth * 0.3;
    const mouseOffsetX = mousePosition.x * depth * 15;
    const mouseOffsetY = mousePosition.y * depth * 15;
    
    return {
      transform: `translate3d(${mouseOffsetX}px, ${-scrollOffset + mouseOffsetY}px, 0)`,
      ...(baseTop !== undefined && { top: `${baseTop}%` }),
      ...(baseLeft !== undefined && { left: `${baseLeft}%` })
    };
  };

  return (
    <>
      {/* Deep background orbs with strong parallax */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {floatingOrbs.map((orb) => (
          <div
            key={orb.id}
            className="absolute rounded-full opacity-20 blur-3xl"
            style={{
              left: `${orb.left}%`,
              top: `${orb.top}%`,
              width: `${orb.size}px`,
              height: `${orb.size}px`,
              background: `radial-gradient(circle, hsl(${orb.hue} 70% 50% / 0.4), transparent 70%)`,
              ...getParallaxStyle(orb.depth)
            }}
          />
        ))}
      </div>

      {/* Circuit overlay with subtle parallax */}
      <div 
        className="circuit-overlay"
        style={{
          transform: `translate3d(${mousePosition.x * 5}px, ${-scrollY * 0.1 + mousePosition.y * 5}px, 0)`
        }}
      />
      
      {/* Tech grid with parallax */}
      <div 
        className="tech-grid"
        style={{
          transform: `translate3d(${mousePosition.x * 8}px, ${-scrollY * 0.15 + mousePosition.y * 8}px, 0)`
        }}
      />
      
      {/* Scanlines - static for CRT effect */}
      <div className="scanlines" />

      {/* Data streams with parallax */}
      <div className="data-streams">
        {dataStreams.map((stream) => (
          <div
            key={stream.id}
            className="data-stream"
            style={{
              top: `${stream.top}%`,
              width: `${stream.width}px`,
              animationDuration: `${stream.animationDuration}s`,
              animationDelay: `${stream.animationDelay}s`,
              ...getParallaxStyle(stream.depth)
            }}
          />
        ))}
      </div>

      {/* Glowing tech dots with individual parallax */}
      <div className="tech-dots">
        {techDots.map((dot) => (
          <div
            key={dot.id}
            className="tech-dot"
            style={{
              left: `${dot.left}%`,
              top: `${dot.top}%`,
              animationDelay: `${Math.random() * 3}s`,
              transform: `translate3d(${mousePosition.x * dot.depth * 20}px, ${-scrollY * dot.depth * 0.2 + mousePosition.y * dot.depth * 20}px, 0)`
            }}
          />
        ))}
      </div>

      {/* Additional floating geometric shapes */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div 
          className="absolute w-64 h-64 border border-primary/10 rounded-full"
          style={{
            left: '10%',
            top: '20%',
            ...getParallaxStyle(0.4)
          }}
        />
        <div 
          className="absolute w-96 h-96 border border-accent/10 rounded-full"
          style={{
            right: '5%',
            top: '60%',
            ...getParallaxStyle(0.6)
          }}
        />
        <div 
          className="absolute w-48 h-48 border border-primary/5 rotate-45"
          style={{
            left: '70%',
            top: '10%',
            ...getParallaxStyle(0.3)
          }}
        />
        <div 
          className="absolute w-32 h-32 border border-accent/10 rotate-12"
          style={{
            left: '20%',
            top: '70%',
            ...getParallaxStyle(0.7)
          }}
        />
      </div>
    </>
  );
};

export default ImmersiveBackground;
