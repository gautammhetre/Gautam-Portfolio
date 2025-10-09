import { useEffect, useState } from 'react';

const ImmersiveBackground = () => {
  const [matrixColumns, setMatrixColumns] = useState<Array<{
    id: number;
    left: number;
    animationDuration: number;
    content: string;
  }>>([]);


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
    // Generate enhanced matrix rain columns
    const columns = Array.from({ length: 25 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      animationDuration: 6 + Math.random() * 12,
      content: generateMatrixText()
    }));
    setMatrixColumns(columns);


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

  const generateMatrixText = () => {
    const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲンﾊﾝﾏｰｶｰ';
    let result = '';
    for (let i = 0; i < 25; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length)) + '\n';
    }
    return result;
  };


  return (
    <>
      {/* Circuit overlay background */}
      <div className="circuit-overlay" />
      
      {/* Tech grid */}
      <div className="tech-grid" />
      
      {/* Scanlines */}
      <div className="scanlines" />

      {/* Matrix rain columns */}
      <div className="matrix-container">
        {matrixColumns.map((column) => (
          <div
            key={column.id}
            className="matrix-column"
            style={{
              left: `${column.left}%`,
              animationDuration: `${column.animationDuration}s`,
              animationDelay: `${Math.random() * 5}s`
            }}
          >
            {column.content}
          </div>
        ))}
      </div>


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