import React, { useState, useEffect } from "react";

const BuildingLogoLoaderWithText = ({
  size = 500,
  duration = 4000,
  showProgress = true,
  onComplete,
  showLoadingMessage = true,
  enableParticles = true,
  enableInteractiveEffects = true
}) => {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min(100, (elapsed / duration) * 100);

      setProgress(newProgress);

      if (newProgress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setIsComplete(true);
          onComplete?.();
        }, 600);
      }
    }, 16); // 60fps smooth animation

    return () => clearInterval(interval);
  }, [duration, onComplete]);

  if (isComplete) {
    return null;
  }

  // Enhanced window opacity calculation with easing
  const getWindowOpacity = (index, total) => {
    const progressPerWindow = 100 / total;
    const windowStart = index * progressPerWindow;
    const windowEnd = windowStart + progressPerWindow;

    if (progress < windowStart) return 0;
    if (progress > windowEnd) return 1;

    const windowProgress = (progress - windowStart) / progressPerWindow;
    // Cubic easing for smoother animation
    return windowProgress < 0.5
      ? 4 * windowProgress * windowProgress * windowProgress
      : 1 - Math.pow(-2 * windowProgress + 2, 3) / 2;
  };

  // Particle system data
  const particles = Array.from({ length: enableParticles ? 15 : 0 }).map((_, i) => ({
    id: i,
    x: Math.random() * 500,
    y: Math.random() * 500,
    size: Math.random() * 3 + 1,
    speed: Math.random() * 2 + 1,
    delay: Math.random() * 2
  }));

  // Building data for easier management
  const buildings = [
    {
      x: 170, y: 70, width: 74, height: 210,
      windows: Array.from({ length: 12 }).map((_, i) => ({
        x: 182, y: 83 + i * 15, width: 50, height: 8
      }))
    },
    {
      x: 267, y: 125, width: 60, height: 150,
      windows: Array.from({ length: 10 }).map((_, i) => ({
        x: 278, y: 135 + i * 15, width: 40, height: 8
      }))
    }
  ];

  // Tree data structure
  const trees = [
    { type: 'main', cx: 245, cy: 360, rx: 22, ry: 34, topCy: 335, topR: 15, delay: 0.5 },
    { type: 'medium', cx: 210, cy: 380, rx: 17, ry: 28, topCy: 360, topR: 12, delay: 0.3 },
    { type: 'medium', cx: 280, cy: 380, rx: 17, ry: 28, topCy: 360, topR: 12, delay: 0.4 },
    { type: 'small', cx: 230, cy: 410, rx: 14, ry: 25, topCy: 395, topR: 9, delay: 0.2 },
    { type: 'small', cx: 260, cy: 410, rx: 14, ry: 25, topCy: 395, topR: 9, delay: 0.25 },
    { type: 'extra-small', cx: 190, cy: 410, rx: 14, ry: 25, topCy: 395, topR: 9, delay: 0.1 },
    { type: 'extra-small', cx: 300, cy: 410, rx: 14, ry: 25, topCy: 395, topR: 9, delay: 0.15 },
    { type: 'tiny', cx: 175, cy: 445, rx: 10, ry: 17, topCy: 436, topR: 7, delay: 0.05 },
    { type: 'tiny', cx: 315, cy: 445, rx: 10, ry: 17, topCy: 436, topR: 7, delay: 0.08 }
  ];

  return (
    <div className="flex flex-col items-center justify-center p-8 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 min-h-screen relative overflow-hidden">
      {/* Animated Background Overlay */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#34bfa3] to-transparent animate-shimmer" />
      </div>

      {/* Enhanced SVG Logo */}
      <div className="relative z-10">
        <svg
          width={size}
          height={size}
          viewBox="0 0 500 500"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`cursor-pointer transition-all duration-500 ${hovered && enableInteractiveEffects ? 'scale-105' : 'scale-100'}`}
          onMouseEnter={() => enableInteractiveEffects && setHovered(true)}
          onMouseLeave={() => enableInteractiveEffects && setHovered(false)}
        >
          <defs>
            {/* Enhanced Gradients */}
            <linearGradient id="buildingGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#f8fafc" />
              <stop offset="50%" stopColor="#f1f5f9" />
              <stop offset="100%" stopColor="#e2e8f0" />
            </linearGradient>

            <linearGradient id="greenGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#34bfa3" />
              <stop offset="50%" stopColor="#2ab394" />
              <stop offset="100%" stopColor="#219f83" />
            </linearGradient>

            <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFD700" />
              <stop offset="50%" stopColor="#FFEC8B" />
              <stop offset="100%" stopColor="#FFD700" />
            </linearGradient>

            {/* Enhanced Glow Effect */}
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="5" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            <filter id="intense-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="8" result="blur" />
              <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -8" result="glow" />
              <feComposite in="SourceGraphic" in2="glow" operator="over" />
            </filter>

            {/* Shadow Effects */}
            <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="2" dy="4" stdDeviation="4" floodColor="#000000" floodOpacity="0.4" />
            </filter>

            <filter id="soft-shadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="1" dy="2" stdDeviation="3" floodColor="#000000" floodOpacity="0.2" />
            </filter>
          </defs>

          {/* Animated Particles */}
          {enableParticles && (
            <g>
              {particles.map((particle) => (
                <circle
                  key={particle.id}
                  cx={particle.x}
                  cy={particle.y}
                  r={particle.size}
                  fill="#34bfa3"
                  opacity="0.6"
                  className="animate-float-random"
                  style={{
                    animationDelay: `${particle.delay}s`,
                    animationDuration: `${particle.speed * 2 + 3}s`
                  }}
                />
              ))}
            </g>
          )}

          {/* Pulsing Orb Effect */}
          <circle
            cx="250"
            cy="250"
            r={hovered ? "240" : "235"}
            fill="url(#greenGradient)"
            opacity="0.03"
            className="transition-all duration-1000 ease-in-out"
          />

          {/* Main Building Structures */}
          <g filter="url(#shadow)">
            {buildings.map((building, buildingIndex) => (
              <g
                key={buildingIndex}
                className={hovered && enableInteractiveEffects ? "animate-bounce-soft" : ""}
                style={{ animationDelay: `${buildingIndex * 0.1}s` }}
              >
                <rect
                  x={building.x}
                  y={building.y}
                  width={building.width}
                  height={building.height}
                  rx="6"
                  fill="url(#buildingGradient)"
                  stroke="#cbd5e1"
                  strokeWidth="3"
                  className="transition-all duration-500"
                />

                {/* Animated Windows */}
                <g>
                  {building.windows.map((window, windowIndex) => {
                    const globalIndex = buildingIndex === 0 ? windowIndex : windowIndex + 12;
                    return (
                      <rect
                        key={windowIndex}
                        x={window.x}
                        y={window.y}
                        width={window.width}
                        height={window.height}
                        rx="2"
                        fill="url(#greenGradient)"
                        opacity={getWindowOpacity(globalIndex, 22)}
                        className="transition-all duration-700 ease-out"
                        style={{
                          filter: hovered ? "brightness(1.3)" : "brightness(1)",
                          transformBox: 'fill-box',
                          transformOrigin: 'center'
                        }}
                      >
                        <animate
                          attributeName="opacity"
                          values="0.3;1;0.3"
                          dur="1.5s"
                          begin={`${globalIndex * 0.15}s`}
                          repeatCount="indefinite"
                        />
                      </rect>
                    );
                  })}
                </g>
              </g>
            ))}
          </g>

          {/* Enhanced Tree Group */}
          <g>
            {trees.map((tree, index) => (
              <g
                key={index}
                className="animate-float-slow"
                style={{ animationDelay: `${tree.delay}s` }}
                filter={tree.type === 'main' ? "url(#soft-shadow)" : "none"}
              >
                <ellipse
                  cx={tree.cx}
                  cy={tree.cy}
                  rx={tree.rx}
                  ry={tree.ry}
                  fill={tree.type === 'main' ? "url(#buildingGradient)" : "#e2e8f0"}
                  className="transition-all duration-700"
                />
                <circle
                  cx={tree.cx}
                  cy={tree.topCy}
                  r={tree.topR}
                  fill={tree.type === 'main' ? "#f1f5f9" : "#d1d5db"}
                  className="transition-all duration-700"
                />
              </g>
            ))}
          </g>

          {/* Animated Text with Enhanced Effects */}
          <g filter={hovered ? "url(#intense-glow)" : "url(#glow)"}>
            <text
              x="250"
              y="485"
              fontSize="44"
              fontFamily="'Arial Rounded MT Bold', Arial, sans-serif"
              textAnchor="middle"
              fill="url(#greenGradient)"
              className="animate-pulse-text"
              style={{
                transition: 'all 0.5s ease',
                opacity: mounted ? 1 : 0,
                transform: mounted ? 'translateY(0)' : 'translateY(10px)'
              }}
            >
              FlexLiv
              <animate
                attributeName="fill-opacity"
                values="0.7;1;0.7"
                dur="1.8s"
                repeatCount="indefinite"
              />
            </text>
          </g>

          {/* Enhanced Progress Ring */}
          <g>
            {/* Background Ring */}
            <circle
              cx="250"
              cy="250"
              r="227"
              stroke="#334155"
              strokeWidth="6"
              fill="none"
              opacity="0.4"
            />

            {/* Main Progress Ring */}
            <circle
              cx="250"
              cy="250"
              r="227"
              stroke="url(#greenGradient)"
              strokeWidth="8"
              fill="none"
              opacity="0.9"
              strokeDasharray="1426"
              strokeDashoffset={1426 * (1 - progress / 100)}
              strokeLinecap="round"
              transform="rotate(-90 250 250)"
              className="transition-all duration-100 ease-out"
              filter="url(#glow)"
            />

            {/* Progress Glow Effect */}
            <circle
              cx="250"
              cy="250"
              r="227"
              stroke="url(#goldGradient)"
              strokeWidth="2"
              fill="none"
              opacity={progress / 100}
              strokeDasharray="1426"
              strokeDashoffset={1426 * (1 - progress / 100)}
              strokeLinecap="round"
              transform="rotate(-90 250 250)"
              className="transition-all duration-300 ease-out"
              filter="url(#intense-glow)"
            />
          </g>

          {/* Interactive Hover Effects */}
          {hovered && enableInteractiveEffects && (
            <g>
              <rect
                x="0"
                y="0"
                width="500"
                height="500"
                fill="url(#greenGradient)"
                opacity="0.05"
                className="transition-opacity duration-500"
              />

              {/* Sparkle Effects */}
              {[130, 370, 250, 320, 180].map((x, i) => (
                <circle
                  key={i}
                  cx={x}
                  cy={100 + i * 20}
                  r="2"
                  fill="#FFD700"
                  opacity="0.8"
                  className="animate-ping"
                  style={{ animationDelay: `${i * 0.2}s` }}
                />
              ))}
            </g>
          )}

          {/* Completion Celebration */}
          {progress === 100 && (
            <g>
              {Array.from({ length: 8 }).map((_, i) => (
                <circle
                  key={i}
                  cx="250"
                  cy="250"
                  r={20 + i * 15}
                  stroke="url(#goldGradient)"
                  strokeWidth="2"
                  fill="none"
                  opacity={0.8 - i * 0.1}
                  className="animate-ripple"
                  style={{ animationDelay: `${i * 0.1}s` }}
                />
              ))}
            </g>
          )}
        </svg>

        {/* Enhanced Progress Indicator */}
        {showProgress && (
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-60 rounded-2xl px-6 py-3 backdrop-blur-lg border border-[#34bfa3] border-opacity-30">
            <div className="text-white text-lg font-bold flex items-center space-x-3">
              <div className="w-3 h-3 bg-[#34bfa3] rounded-full animate-pulse" />
              <span>{Math.round(progress)}%</span>
              <div className="w-3 h-3 bg-[#34bfa3] rounded-full animate-pulse" style={{ animationDelay: '0.3s' }} />
            </div>
          </div>
        )}
      </div>

      {/* Enhanced Loading Message */}
      {showLoadingMessage && (
        <div className="mt-10 text-center z-10">
          <div className="text-gray-200 text-xl font-light mb-4 animate-pulse-slow">
            {progress < 30 && "Initializing your workspace..."}
            {progress >= 30 && progress < 60 && "Loading essential modules..."}
            {progress >= 60 && progress < 90 && "Almost ready..."}
            {progress >= 90 && "Finalizing setup..."}
          </div>
          <div className="flex justify-center space-x-3">
            {[0, 1, 2, 3, 4].map((index) => (
              <div
                key={index}
                className="w-3 h-3 bg-gradient-to-r from-[#34bfa3] to-[#2ab394] rounded-full animate-bounce-enhanced"
                style={{
                  animationDelay: `${index * 0.15}s`,
                  opacity: 0.7 + (index * 0.06)
                }}
              />
            ))}
          </div>
        </div>
      )}

      {/* Enhanced Animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { 
            transform: translateY(0px) rotate(0deg);
          }
          33% { 
            transform: translateY(-10px) rotate(2deg);
          }
          66% { 
            transform: translateY(-5px) rotate(-1deg);
          }
        }
        
        @keyframes float-random {
          0%, 100% { 
            transform: translate(0px, 0px);
          }
          25% { 
            transform: translate(${Math.random() * 10 - 5}px, -8px);
          }
          50% { 
            transform: translate(${Math.random() * 8 - 4}px, -12px);
          }
          75% { 
            transform: translate(${Math.random() * 6 - 3}px, -6px);
          }
        }
        
        @keyframes float-slow {
          0%, 100% { 
            transform: translateY(0px) scale(1);
          }
          50% { 
            transform: translateY(-6px) scale(1.02);
          }
        }
        
        @keyframes bounce-soft {
          0%, 100% { 
            transform: translateY(0) scale(1);
          }
          50% { 
            transform: translateY(-12px) scale(1.03);
          }
        }
        
        @keyframes bounce-enhanced {
          0%, 100% { 
            transform: translateY(0);
          }
          25% { 
            transform: translateY(-8px);
          }
          50% { 
            transform: translateY(-12px);
          }
          75% { 
            transform: translateY(-4px);
          }
        }
        
        @keyframes pulse-slow {
          0%, 100% { 
            opacity: 0.6;
            transform: scale(1);
          }
          50% { 
            opacity: 1;
            transform: scale(1.05);
          }
        }
        
        @keyframes pulse-text {
          0%, 100% { 
            filter: drop-shadow(0 0 8px rgba(52, 191, 163, 0.4));
          }
          50% { 
            filter: drop-shadow(0 0 20px rgba(52, 191, 163, 0.8));
          }
        }
        
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        @keyframes ripple {
          0% { 
            transform: scale(0.8);
            opacity: 0.8;
          }
          100% { 
            transform: scale(2.5);
            opacity: 0;
          }
        }
        
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        
        .animate-float-random {
          animation: float-random 5s ease-in-out infinite;
        }
        
        .animate-float-slow {
          animation: float-slow 5s ease-in-out infinite;
        }
        
        .animate-bounce-soft {
          animation: bounce-soft 3s ease-in-out infinite;
        }
        
        .animate-bounce-enhanced {
          animation: bounce-enhanced 1.5s ease-in-out infinite;
        }
          
        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }
        
        .animate-pulse-text {
          animation: pulse-text 2s ease-in-out infinite;
        }
        
        .animate-shimmer {
          animation: shimmer 3s ease-in-out infinite;
        }
        
        .animate-ripple {
          animation: ripple 1.5s ease-out infinite;
        }
      `}</style>
    </div>
  );
};

export default BuildingLogoLoaderWithText;