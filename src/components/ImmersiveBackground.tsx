import { useEffect, useState } from 'react';

const ImmersiveBackground = () => {
  const [matrixColumns, setMatrixColumns] = useState<Array<{
    id: number;
    left: number;
    animationDuration: number;
    content: string;
  }>>([]);

  const [codeParticles, setCodeParticles] = useState<Array<{
    id: number;
    left: number;
    content: string;
    animationDelay: number;
  }>>([]);

  const [techDots, setTechDots] = useState<Array<{
    id: number;
    left: number;
    top: number;
  }>>([]);

  useEffect(() => {
    // Generate matrix rain columns
    const columns = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      animationDuration: 8 + Math.random() * 10,
      content: generateMatrixText()
    }));
    setMatrixColumns(columns);

    // Generate floating code particles
    const particles = Array.from({ length: 25 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      content: getRandomCodeSnippet(),
      animationDelay: Math.random() * 15
    }));
    setCodeParticles(particles);

    // Generate glowing tech dots
    const dots = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100
    }));
    setTechDots(dots);
  }, []);

  const generateMatrixText = () => {
    const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    let result = '';
    for (let i = 0; i < 20; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length)) + '\n';
    }
    return result;
  };

  const getRandomCodeSnippet = () => {
    const snippets = [
      'const', 'function', 'return', 'import', 'export', 'class', 'async', 'await',
      'useState', 'useEffect', 'console.log', 'npm install', 'git commit',
      'React', 'TypeScript', 'JavaScript', 'HTML', 'CSS', 'API', 'JSON',
      'SELECT *', 'INSERT', 'UPDATE', 'DELETE', 'WHERE', 'JOIN',
      '<div>', '</div>', '{}', '[]', '=>', '&&', '||', '!==',
      'try', 'catch', 'finally', 'throw', 'new Error', 'Promise',
      'map()', 'filter()', 'reduce()', 'forEach()', 'push()', 'pop()'
    ];
    return snippets[Math.floor(Math.random() * snippets.length)];
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

      {/* Floating code particles */}
      <div className="code-particles">
        {codeParticles.map((particle) => (
          <div
            key={particle.id}
            className="code-particle"
            style={{
              left: `${particle.left}%`,
              animationDelay: `${particle.animationDelay}s`
            }}
          >
            {particle.content}
          </div>
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