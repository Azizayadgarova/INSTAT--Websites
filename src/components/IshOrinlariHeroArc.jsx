const STARS = [
  [120,40,1.1,2.2,0],[280,18,0.7,3.1,0.6],[430,55,1.3,1.9,1.0],[600,28,0.9,2.6,0.3],
  [750,62,0.8,3.3,1.4],[920,20,1.2,2.0,0.8],[1080,48,0.7,2.8,0.2],[1240,35,1.1,2.4,1.1],
  [1380,58,0.9,1.8,0.5],[185,130,1.0,2.7,0.9],[360,110,0.8,3.0,1.5],[540,145,1.3,2.1,0.4],
  [700,120,0.7,2.5,1.2],[880,138,1.1,1.7,0.7],[1060,115,0.9,3.2,0.1],[1300,142,1.2,2.3,1.3],
  [65,210,0.8,2.9,0.6],[250,195,1.0,2.2,1.8],[470,220,0.7,3.4,0.3],[660,200,1.3,1.9,1.0],
  [830,215,0.9,2.6,0.5],[1010,198,0.8,2.0,1.6],[1200,225,1.1,2.8,0.2],[1400,205,0.7,3.1,0.9],
  [340,300,1.0,2.4,1.4],[720,310,0.8,1.8,0.7],[1100,295,1.2,2.7,0.3],
]

const IshOrinlariHeroArc = ({ tilt = { x: 0, y: 0 }, isMobile = false }) => (
  <svg
    style={{
      position: 'absolute',
      top: isMobile ? '150px' : '-1186px', left: '50%',
      transform: isMobile
        ? 'translateX(-50%)'
        : `translateX(-50%) perspective(520px) rotateX(${tilt.y * -58}deg) rotateY(${tilt.x * 38}deg) scale(1.12)`,
      transformOrigin: '50% 92%',
      width: '100vw',
      height: isMobile ? '280px' : '1900px',
      overflow: 'visible',
      zIndex: 1, pointerEvents: 'none',
      willChange: 'transform',
    }}
    viewBox="0 0 1440 580"
    fill="none"
    preserveAspectRatio="xMidYMax meet"
  >
    <defs>
      <radialGradient id="dome-fill" cx="50%" cy="0%" r="80%" gradientUnits="objectBoundingBox">
        <stop offset="0%"   stopColor="rgba(100,145,220,0.32)" />
        <stop offset="45%"  stopColor="rgba(90,130,210,0.14)" />
        <stop offset="100%" stopColor="rgba(80,120,200,0)" />
      </radialGradient>
      <radialGradient id="orb-dark" cx="38%" cy="30%" r="65%">
        <stop offset="0%"   stopColor="#0d1f3c" />
        <stop offset="100%" stopColor="#040c1c" />
      </radialGradient>
      <filter id="orb-ambient" x="-150%" y="-150%" width="400%" height="400%">
        <feGaussianBlur stdDeviation="22" />
      </filter>
      <filter id="star-glow" x="-200%" y="-200%" width="500%" height="500%">
        <feGaussianBlur stdDeviation="2" result="blur"/>
        <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
      </filter>
      <linearGradient id="orb-r-stroke" x1="0.5" y1="0" x2="0.5" y2="1" gradientUnits="objectBoundingBox">
        <stop offset="0%"   stopColor="rgba(55,139,239,1)" />
        <stop offset="35%"  stopColor="rgba(55,139,239,0.6)" />
        <stop offset="65%"  stopColor="rgba(20,60,120,0.15)" />
        <stop offset="100%" stopColor="rgba(8,20,33,0)" />
      </linearGradient>
      <radialGradient id="orb-top-light" cx="870" cy="-59" r="700" gradientUnits="userSpaceOnUse">
        <stop offset="0%"   stopColor="#60a5fa" stopOpacity="0.95" />
        <stop offset="20%"  stopColor="#378BEF" stopOpacity="0.7" />
        <stop offset="55%"  stopColor="rgba(55,139,239,0.25)" />
        <stop offset="85%"  stopColor="rgba(55,139,239,0.05)" />
        <stop offset="100%" stopColor="rgba(55,139,239,0)" />
      </radialGradient>
      <radialGradient id="orb-light" cx="1094" cy="274" r="320" gradientUnits="userSpaceOnUse">
        <stop offset="0%"   stopColor="#60a5fa" stopOpacity="0.95" />
        <stop offset="25%"  stopColor="#378BEF" stopOpacity="0.7" />
        <stop offset="60%"  stopColor="rgba(55,139,239,0.2)" />
        <stop offset="100%" stopColor="rgba(55,139,239,0)" />
      </radialGradient>
      <radialGradient id="orb-l-light" cx="288" cy="324" r="370" gradientUnits="userSpaceOnUse">
        <stop offset="0%"   stopColor="#60a5fa" stopOpacity="0.95" />
        <stop offset="25%"  stopColor="#378BEF" stopOpacity="0.7" />
        <stop offset="60%"  stopColor="rgba(55,139,239,0.2)" />
        <stop offset="100%" stopColor="rgba(55,139,239,0)" />
      </radialGradient>
      <linearGradient id="orb-l-stroke" x1="0.5" y1="0" x2="0.5" y2="1" gradientUnits="objectBoundingBox">
        <stop offset="0%"   stopColor="rgba(55,139,239,1)" />
        <stop offset="35%"  stopColor="rgba(55,139,239,0.6)" />
        <stop offset="65%"  stopColor="rgba(20,60,120,0.15)" />
        <stop offset="100%" stopColor="rgba(8,20,33,0)" />
      </linearGradient>
      <linearGradient id="shoot1" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="transparent"/>
        <stop offset="60%" stopColor="rgba(165,243,252,0.6)"/>
        <stop offset="100%" stopColor="white"/>
      </linearGradient>
      <linearGradient id="shoot2" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="transparent"/>
        <stop offset="60%" stopColor="rgba(147,197,253,0.5)"/>
        <stop offset="100%" stopColor="white"/>
      </linearGradient>
      <mask id="mask-arc1">
        <rect x="-1000" y="-2000" width="5000" height="6000" fill="white"/>
        <circle r="36" fill="black">
          <animateMotion dur="42s" begin="0s" repeatCount="indefinite" rotate="none">
            <mpath href="#arc1"/>
          </animateMotion>
        </circle>
        <circle r="36" fill="black">
          <animateMotion dur="42s" begin="21s" repeatCount="indefinite" rotate="none">
            <mpath href="#arc1"/>
          </animateMotion>
        </circle>
      </mask>
      <mask id="mask-arc2">
        <rect x="-1000" y="-2000" width="5000" height="6000" fill="white"/>
        <circle r="50" fill="black">
          <animateMotion dur="36s" begin="0s" repeatCount="indefinite" rotate="none"
            keyPoints="1;0" keyTimes="0;1" calcMode="linear">
            <mpath href="#arc2"/>
          </animateMotion>
        </circle>
        <circle r="27" fill="black">
          <animateMotion dur="36s" begin="18s" repeatCount="indefinite" rotate="none"
            keyPoints="1;0" keyTimes="0;1" calcMode="linear">
            <mpath href="#arc2"/>
          </animateMotion>
        </circle>
      </mask>
      <radialGradient id="nebula-c" cx="50%" cy="45%" r="50%">
        <stop offset="0%" stopColor="rgba(43,100,200,0.12)"/>
        <stop offset="50%" stopColor="rgba(20,60,140,0.06)"/>
        <stop offset="100%" stopColor="transparent"/>
      </radialGradient>
      <radialGradient id="nebula-l" cx="15%" cy="55%" r="35%">
        <stop offset="0%" stopColor="rgba(0,180,220,0.07)"/>
        <stop offset="100%" stopColor="transparent"/>
      </radialGradient>
      <radialGradient id="nebula-r" cx="85%" cy="50%" r="35%">
        <stop offset="0%" stopColor="rgba(80,50,200,0.07)"/>
        <stop offset="100%" stopColor="transparent"/>
      </radialGradient>
    </defs>

    <style>{`
      @keyframes arc_starA { 0%,100%{opacity:.08} 50%{opacity:.9} }
      @keyframes arc_starB { 0%,100%{opacity:.04} 35%{opacity:.65} 70%{opacity:.18} }
      @keyframes arc_nebula { 0%,100%{opacity:.6} 50%{opacity:1} }
    `}</style>

    <ellipse cx="720" cy="260" rx="600" ry="220" fill="url(#nebula-c)"
      style={{animation:'arc_nebula 7s ease-in-out infinite'}}/>
    <ellipse cx="180" cy="320" rx="350" ry="180" fill="url(#nebula-l)"
      style={{animation:'arc_nebula 9s ease-in-out 2s infinite'}}/>
    <ellipse cx="1260" cy="300" rx="320" ry="170" fill="url(#nebula-r)"
      style={{animation:'arc_nebula 8s ease-in-out 4s infinite'}}/>

    {STARS.map(([cx,cy,r,dur,delay],i) => (
      <circle key={i} cx={cx} cy={cy} r={r} fill="white"
        filter="url(#star-glow)"
        style={{
          animation:`${i%3===0?'arc_starA':'arc_starB'} ${dur}s ${delay}s ease-in-out infinite`,
          opacity:.1,
        }}/>
    ))}

    <path d="M 380 580 A 340 290 0 0 1 1060 580" fill="url(#dome-fill)" />

    <path id="arc1" d="M -80 580 A 800 650 0 0 1 1520 580"
      stroke="url(#orb-top-light)" strokeWidth="1.5" fill="none" mask="url(#mask-arc1)" />
    <path id="arc2" d="M 175 580 A 545 420 0 0 1 1265 580"
      stroke="url(#orb-l-light)" strokeWidth="1.5" fill="none" mask="url(#mask-arc2)" />

    <path d="M -80 580 A 800 650 0 0 1 1520 580"
      stroke="url(#orb-light)" strokeWidth="1.5" fill="none" mask="url(#mask-arc1)" />
    <path d="M 175 580 A 545 420 0 0 1 1265 580"
      stroke="url(#orb-light)" strokeWidth="1.5" fill="none" mask="url(#mask-arc2)" />

    <g>
      <animateMotion dur="42s" begin="0s" repeatCount="indefinite" rotate="none">
        <mpath href="#arc1" />
      </animateMotion>
      <animate attributeName="opacity"
        values="0;0.12;0.9;1;0.9;0.12;0"
        keyTimes="0;0.12;0.42;0.5;0.58;0.88;1"
        dur="42s" begin="0s" repeatCount="indefinite" />
      <circle r="45" fill="rgba(30,80,180,0.22)" filter="url(#orb-ambient)" />
      <circle r="35" fill="url(#orb-dark)" stroke="url(#orb-r-stroke)" strokeWidth="1" />
    </g>
    <g>
      <animateMotion dur="42s" begin="21s" repeatCount="indefinite" rotate="none">
        <mpath href="#arc1" />
      </animateMotion>
      <animate attributeName="opacity"
        values="0;0.12;0.9;1;0.9;0.12;0"
        keyTimes="0;0.12;0.42;0.5;0.58;0.88;1"
        dur="42s" begin="21s" repeatCount="indefinite" />
      <circle r="45" fill="rgba(30,80,180,0.22)" filter="url(#orb-ambient)" />
      <circle r="35" fill="url(#orb-dark)" stroke="url(#orb-r-stroke)" strokeWidth="1" />
    </g>

    <g>
      <animateMotion dur="36s" begin="0s" repeatCount="indefinite" rotate="none"
        keyPoints="1;0" keyTimes="0;1" calcMode="linear">
        <mpath href="#arc2" />
      </animateMotion>
      <animate attributeName="opacity"
        values="0;0.1;0.85;1;0.85;0.1;0"
        keyTimes="0;0.13;0.43;0.5;0.57;0.87;1"
        dur="36s" begin="0s" repeatCount="indefinite" />
      <circle r="60" fill="rgba(30,80,180,0.20)" filter="url(#orb-ambient)" />
      <circle r="48" fill="url(#orb-dark)" stroke="url(#orb-r-stroke)" strokeWidth="1" />
    </g>
    <g>
      <animateMotion dur="36s" begin="18s" repeatCount="indefinite" rotate="none"
        keyPoints="1;0" keyTimes="0;1" calcMode="linear">
        <mpath href="#arc2" />
      </animateMotion>
      <animate attributeName="opacity"
        values="0;0.1;0.85;1;0.85;0.1;0"
        keyTimes="0;0.13;0.43;0.5;0.57;0.87;1"
        dur="36s" begin="18s" repeatCount="indefinite" />
      <circle r="35" fill="rgba(30,80,180,0.28)" filter="url(#orb-ambient)" />
      <circle r="25" fill="url(#orb-dark)" stroke="url(#orb-l-stroke)" strokeWidth="1" />
    </g>
  </svg>
)

export default IshOrinlariHeroArc
