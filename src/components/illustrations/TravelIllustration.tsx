export function TravelerIllustration({ className = "w-full h-full" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 500 400" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Sky gradient */}
      <defs>
        <linearGradient id="skyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style={{stopColor: "#FF6B00", stopOpacity: 0.3}} />
          <stop offset="100%" style={{stopColor: "#00A3CC", stopOpacity: 0.3}} />
        </linearGradient>
      </defs>
      <rect width="500" height="400" fill="url(#skyGradient)"/>

      {/* Sun */}
      <circle cx="420" cy="80" r="50" fill="#FFC400" opacity="0.9"/>
      <circle cx="420" cy="80" r="60" fill="#FFC400" opacity="0.3"/>

      {/* Ocean waves */}
      <path d="M0 280 Q125 260 250 280 T500 280 L500 400 L0 400 Z" fill="#00A3CC" opacity="0.6"/>
      <path d="M0 300 Q125 285 250 300 T500 300 L500 400 L0 400 Z" fill="#00A3CC" opacity="0.8"/>

      {/* Palm tree left */}
      <ellipse cx="80" cy="250" rx="25" ry="10" fill="#4A0099"/>
      <rect x="75" y="180" width="10" height="70" fill="#B38800"/>
      <ellipse cx="80" cy="160" rx="40" ry="25" fill="#4CAF50"/>
      <ellipse cx="60" cy="170" rx="35" ry="20" fill="#4CAF50"/>
      <ellipse cx="100" cy="170" rx="35" ry="20" fill="#4CAF50"/>

      {/* Beach umbrella */}
      <path d="M320 220 L340 220 Q350 200 360 220 L380 220 L380 225 L320 225 Z" fill="#E60073"/>
      <path d="M340 220 Q350 210 360 220" fill="#FFC400"/>
      <rect x="348" y="220" width="4" height="60" fill="#B38800"/>

      {/* Laptop on beach */}
      <rect x="280" y="260" width="80" height="50" rx="5" fill="#1e293b"/>
      <rect x="285" y="265" width="70" height="35" fill="#00A3CC"/>
      <rect x="290" y="270" width="60" height="25" fill="#E0F7FF"/>

      {/* Person sitting (simplified) */}
      <circle cx="240" cy="240" r="20" fill="#FFB84D"/>
      <path d="M240 260 L240 300 L220 320 M240 300 L260 320" stroke="#FF6B00" strokeWidth="8" strokeLinecap="round"/>
      <path d="M240 270 L220 290 M240 270 L270 280" stroke="#FF6B00" strokeWidth="8" strokeLinecap="round"/>

      {/* Suitcase */}
      <rect x="180" y="270" width="40" height="30" rx="3" fill="#9D00FF"/>
      <rect x="195" y="265" width="10" height="5" rx="2" fill="#BB66FF"/>
      <circle cx="185" cy="285" r="3" fill="#FFC400"/>
      <circle cx="215" cy="285" r="3" fill="#FFC400"/>

      {/* Flying birds */}
      <path d="M100 100 Q105 95 110 100 M110 100 Q115 95 120 100" stroke="#1e293b" strokeWidth="2" fill="none"/>
      <path d="M140 80 Q145 75 150 80 M150 80 Q155 75 160 80" stroke="#1e293b" strokeWidth="2" fill="none"/>

      {/* Clouds */}
      <ellipse cx="150" cy="60" rx="30" ry="15" fill="white" opacity="0.7"/>
      <ellipse cx="170" cy="55" rx="25" ry="12" fill="white" opacity="0.7"/>
      <ellipse cx="350" cy="120" rx="40" ry="20" fill="white" opacity="0.7"/>
    </svg>
  );
}

export function PlanningIllustration({ className = "w-full h-full" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Person head */}
      <circle cx="150" cy="80" r="35" fill="#FFB84D"/>

      {/* Body */}
      <rect x="125" y="115" width="50" height="70" rx="25" fill="#00A3CC"/>

      {/* Arms */}
      <rect x="85" y="130" width="40" height="12" rx="6" fill="#FFB84D" transform="rotate(-20 105 136)"/>
      <rect x="175" y="130" width="40" height="12" rx="6" fill="#FFB84D" transform="rotate(20 195 136)"/>

      {/* World map/globe in hands */}
      <circle cx="150" cy="180" r="50" fill="#9D00FF" opacity="0.2"/>
      <circle cx="150" cy="180" r="45" fill="#E60073" opacity="0.3"/>
      <circle cx="150" cy="180" r="40" fill="#FFC400"/>

      {/* Continents on globe */}
      <path d="M130 170 Q140 165 145 172 L142 180 Q138 182 132 178 Z" fill="#00A3CC"/>
      <path d="M160 170 Q165 168 170 175 L168 185 Q162 187 158 180 Z" fill="#FF6B00"/>
      <ellipse cx="150" cy="190" rx="15" ry="8" fill="#4CAF50"/>

      {/* Location pins */}
      <g transform="translate(120, 160)">
        <path d="M0 0 L0 10 L5 15 L10 10 L10 0 Z" fill="#E60073"/>
        <circle cx="5" cy="5" r="3" fill="white"/>
      </g>
      <g transform="translate(170, 175)">
        <path d="M0 0 L0 10 L5 15 L10 10 L10 0 Z" fill="#9D00FF"/>
        <circle cx="5" cy="5" r="3" fill="white"/>
      </g>

      {/* Sparkles */}
      <circle cx="100" cy="100" r="4" fill="#FFC400"/>
      <circle cx="200" cy="120" r="3" fill="#E60073"/>
      <circle cx="180" cy="80" r="5" fill="#00A3CC"/>
    </svg>
  );
}

export function AIAnalysisIllustration({ className = "w-full h-full" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Robot head */}
      <rect x="100" y="80" width="100" height="90" rx="15" fill="#00A3CC"/>
      <rect x="105" y="85" width="90" height="80" rx="10" fill="#80E0FF"/>

      {/* Robot eyes */}
      <circle cx="130" cy="115" r="12" fill="#9D00FF"/>
      <circle cx="170" cy="115" r="12" fill="#9D00FF"/>
      <circle cx="133" cy="112" r="5" fill="white"/>
      <circle cx="173" cy="112" r="5" fill="white"/>

      {/* Antenna */}
      <rect x="148" y="60" width="4" height="20" fill="#FFC400"/>
      <circle cx="150" cy="55" r="8" fill="#E60073"/>
      <circle cx="150" cy="55" r="12" fill="#E60073" opacity="0.3"/>

      {/* Smile */}
      <path d="M125 140 Q150 155 175 140" stroke="#9D00FF" strokeWidth="4" fill="none" strokeLinecap="round"/>

      {/* Brain/Circuit in chest */}
      <circle cx="150" cy="200" r="40" fill="#9D00FF" opacity="0.2"/>
      <circle cx="150" cy="200" r="30" fill="#BB66FF"/>

      {/* Circuit lines */}
      <path d="M130 200 L150 200 L150 185" stroke="#FFC400" strokeWidth="3"/>
      <path d="M170 200 L150 200 L150 215" stroke="#FFC400" strokeWidth="3"/>
      <circle cx="150" cy="185" r="4" fill="#FFC400"/>
      <circle cx="150" cy="215" r="4" fill="#FFC400"/>
      <circle cx="130" cy="200" r="4" fill="#FFC400"/>
      <circle cx="170" cy="200" r="4" fill="#FFC400"/>

      {/* Data streams */}
      <g opacity="0.6">
        <rect x="50" y="120" width="30" height="4" rx="2" fill="#00A3CC"/>
        <rect x="50" y="140" width="35" height="4" rx="2" fill="#FF6B00"/>
        <rect x="50" y="160" width="25" height="4" rx="2" fill="#FFC400"/>

        <rect x="220" y="120" width="30" height="4" rx="2" fill="#00A3CC"/>
        <rect x="215" y="140" width="35" height="4" rx="2" fill="#E60073"/>
        <rect x="225" y="160" width="25" height="4" rx="2" fill="#9D00FF"/>
      </g>

      {/* Globe being analyzed */}
      <circle cx="150" cy="260" r="25" fill="#FF6B00" opacity="0.3"/>
      <path d="M135 250 Q145 245 150 252 L148 265 Q143 267 137 263 Z" fill="#00A3CC"/>
      <path d="M160 250 Q165 248 170 255 L168 268 Q162 270 158 263 Z" fill="#4CAF50"/>
    </svg>
  );
}

export function CelebrationIllustration({ className = "w-full h-full" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Confetti */}
      <rect x="50" y="40" width="8" height="8" fill="#FFC400" transform="rotate(45 54 44)"/>
      <rect x="220" y="60" width="8" height="8" fill="#E60073" transform="rotate(30 224 64)"/>
      <rect x="80" y="80" width="6" height="6" fill="#00A3CC" transform="rotate(60 83 83)"/>
      <rect x="240" y="100" width="6" height="6" fill="#9D00FF" transform="rotate(15 243 103)"/>
      <circle cx="100" cy="50" r="4" fill="#FF6B00"/>
      <circle cx="230" cy="80" r="5" fill="#4CAF50"/>
      <circle cx="70" cy="70" r="3" fill="#FFC400"/>

      {/* Person jumping */}
      <circle cx="150" cy="100" r="25" fill="#FFB84D"/>

      {/* Arms up */}
      <path d="M150 125 L120 90" stroke="#FF6B00" strokeWidth="10" strokeLinecap="round"/>
      <path d="M150 125 L180 90" stroke="#FF6B00" strokeWidth="10" strokeLinecap="round"/>

      {/* Body */}
      <rect x="135" y="125" width="30" height="50" rx="15" fill="#00A3CC"/>

      {/* Legs */}
      <path d="M145 175 L130 210" stroke="#FFB84D" strokeWidth="10" strokeLinecap="round"/>
      <path d="M155 175 L170 210" stroke="#FFB84D" strokeWidth="10" strokeLinecap="round"/>

      {/* Suitcase */}
      <rect x="200" y="200" width="50" height="40" rx="5" fill="#9D00FF"/>
      <rect x="220" y="190" width="10" height="10" rx="3" fill="#BB66FF"/>
      <rect x="210" y="215" width="30" height="3" fill="#FFC400"/>
      <rect x="210" y="225" width="30" height="3" fill="#FFC400"/>

      {/* Travel stickers on suitcase */}
      <circle cx="215" cy="220" r="5" fill="#E60073"/>
      <circle cx="235" cy="220" r="5" fill="#00A3CC"/>

      {/* Stars */}
      <g transform="translate(80, 120)">
        <polygon points="0,-8 2,-2 8,-2 3,2 5,8 0,4 -5,8 -3,2 -8,-2 -2,-2" fill="#FFC400"/>
      </g>
      <g transform="translate(210, 150)">
        <polygon points="0,-6 1.5,-1.5 6,-1.5 2.5,1.5 4,6 0,3 -4,6 -2.5,1.5 -6,-1.5 -1.5,-1.5" fill="#E60073"/>
      </g>

      {/* Trophy/Success symbol */}
      <path d="M130 250 L130 230 L170 230 L170 250 Q150 260 130 250" fill="#FFC400"/>
      <rect x="145" y="250" width="10" height="20" fill="#B38800"/>
      <rect x="135" y="270" width="30" height="8" rx="4" fill="#B38800"/>
      <circle cx="150" cy="240" r="8" fill="#FF6B00"/>
    </svg>
  );
}

export function WorldMapIllustration({ className = "w-full h-full" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 600 300" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Background */}
      <rect width="600" height="300" fill="#E0F7FF" opacity="0.3"/>

      {/* Continents simplified */}
      <path d="M100 100 Q120 80 150 90 L180 110 Q190 120 185 140 L160 160 Q140 165 120 155 L95 130 Z" fill="#4CAF50" opacity="0.7"/>
      <path d="M250 80 Q280 70 310 85 L340 100 Q350 115 345 135 L320 150 Q300 155 280 145 L260 120 Z" fill="#4CAF50" opacity="0.7"/>
      <path d="M420 120 Q450 110 480 125 L510 145 Q520 160 515 180 L490 195 Q470 200 450 190 L430 165 Z" fill="#4CAF50" opacity="0.7"/>
      <path d="M180 180 Q210 170 240 185 L265 205 Q270 220 265 235 L240 245 Q220 248 205 238 L185 215 Z" fill="#4CAF50" opacity="0.7"/>

      {/* Landmarks */}
      {/* Eiffel Tower */}
      <g transform="translate(140, 100)">
        <polygon points="0,60 -15,60 -10,0 10,0 15,60" fill="#FF6B00"/>
        <rect x="-3" y="20" width="6" height="10" fill="#FFC400"/>
      </g>

      {/* Pyramid */}
      <g transform="translate(320, 110)">
        <polygon points="0,0 25,40 -25,40" fill="#FFC400"/>
        <polygon points="0,0 -25,40 -20,40 0,5" fill="#E6B000"/>
      </g>

      {/* Temple */}
      <g transform="translate(470, 150)">
        <polygon points="0,0 30,10 25,30 5,30" fill="#E60073"/>
        <rect x="10" y="15" width="8" height="15" fill="#CC0066"/>
      </g>

      {/* Beach/Island */}
      <g transform="translate(220, 210)">
        <ellipse cx="0" cy="0" rx="30" ry="15" fill="#FFC400"/>
        <rect x="-2" y="-25" width="4" height="25" fill="#B38800"/>
        <ellipse cx="0" cy="-30" rx="15" ry="10" fill="#4CAF50"/>
      </g>

      {/* Location pins with country flags colors */}
      <g transform="translate(150, 120)">
        <circle cx="0" cy="0" r="15" fill="#00A3CC" opacity="0.3"/>
        <path d="M-5 -15 L-5 0 L0 5 L5 0 L5 -15 Z" fill="#00A3CC"/>
        <circle cx="0" cy="-7" r="4" fill="white"/>
      </g>

      <g transform="translate(310, 95)">
        <circle cx="0" cy="0" r="15" fill="#E60073" opacity="0.3"/>
        <path d="M-5 -15 L-5 0 L0 5 L5 0 L5 -15 Z" fill="#E60073"/>
        <circle cx="0" cy="-7" r="4" fill="white"/>
      </g>

      <g transform="translate(480, 155)">
        <circle cx="0" cy="0" r="15" fill="#9D00FF" opacity="0.3"/>
        <path d="M-5 -15 L-5 0 L0 5 L5 0 L5 -15 Z" fill="#9D00FF"/>
        <circle cx="0" cy="-7" r="4" fill="white"/>
      </g>

      <g transform="translate(230, 210)">
        <circle cx="0" cy="0" r="15" fill="#FFC400" opacity="0.3"/>
        <path d="M-5 -15 L-5 0 L0 5 L5 0 L5 -15 Z" fill="#FFC400"/>
        <circle cx="0" cy="-7" r="4" fill="white"/>
      </g>

      {/* Connecting flight paths */}
      <path d="M150 120 Q230 100 310 95" stroke="#FF6B00" strokeWidth="3" strokeDasharray="8 4" opacity="0.5"/>
      <path d="M310 95 Q395 125 480 155" stroke="#00A3CC" strokeWidth="3" strokeDasharray="8 4" opacity="0.5"/>
      <path d="M150 120 Q190 165 230 210" stroke="#9D00FF" strokeWidth="3" strokeDasharray="8 4" opacity="0.5"/>

      {/* Airplane icon */}
      <g transform="translate(240, 140) rotate(-30)">
        <path d="M0 0 L15 -3 L18 0 L15 3 Z" fill="#1e293b"/>
        <path d="M8 -12 L8 12 L12 8 L12 -8 Z" fill="#1e293b"/>
      </g>
    </svg>
  );
}
