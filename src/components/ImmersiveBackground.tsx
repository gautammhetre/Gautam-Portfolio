import { useEffect, useState } from 'react';

const ImmersiveBackground = () => {


  const [techDots, setTechDots] = useState<Array<{
    id: number;
    left: number;
    top: number;
  }>>([]);

  const [dataStreams, setDataStreams] = useState<Array<{
    id: number;
    top: number;
    width: number;
    animationDuration: number;
    animationDelay: number;
  }>>([]);

  useEffect(() => {


    // Generate more glowing tech dots
    const dots = Array.from({ length: 35 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100
    }));
    setTechDots(dots);

    // Generate data streams
    const streams = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      top: Math.random() * 100,
      width: 100 + Math.random() * 200,
      animationDuration: 3 + Math.random() * 4,
      animationDelay: Math.random() * 8
    }));
    setDataStreams(streams);
  }, []);



  return (
    <>
      {/* Circuit overlay background */}
      <div className="circuit-overlay" />
      
      {/* Tech grid */}
      <div className="tech-grid" />
      
      {/* Scanlines */}
      <div className="scanlines" />



      {/* Data streams */}
      <div className="data-streams">
        {dataStreams.map((stream) => (
          <div
            key={stream.id}
            className="data-stream"
            style={{
              top: `${stream.top}%`,
              width: `${stream.width}px`,
              animationDuration: `${stream.animationDuration}s`,
              animationDelay: `${stream.animationDelay}s`
            }}
          />
        ))}
      </div>

      {/* Glowing tech dots */}
      <div className="tech-dots">
        {techDots.map((dot) => (
          <div
            key={dot.id}
            className="tech-dot"
            style={{
              left: `${dot.left}%`,
              top: `${dot.top}%`,
              animationDelay: `${Math.random() * 3}s`
            }}
          />
        ))}
      </div>
    </>
  );
};

export default ImmersiveBackground;