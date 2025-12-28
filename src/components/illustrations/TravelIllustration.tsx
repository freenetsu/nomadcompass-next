export function TravelerIllustration({ className = "w-full h-full" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Globe */}
      <circle cx="200" cy="150" r="80" fill="#00A3CC" opacity="0.2"/>
      <circle cx="200" cy="150" r="70" fill="#FF6B00" opacity="0.3"/>

      {/* Continents */}
      <path d="M160 130 Q170 120 185 125 L190 135 Q185 140 175 138 Z" fill="#00A3CC"/>
      <path d="M210 140 Q220 135 230 142 L228 155 Q218 158 210 152 Z" fill="#9D00FF"/>

      {/* Airplane */}
      <g transform="translate(280, 80)">
        <path d="M0 0 L20 -5 L25 0 L20 5 Z" fill="#FFC400"/>
        <path d="M10 -15 L10 15 L15 10 L15 -10 Z" fill="#FFC400"/>
        <circle cx="5" cy="0" r="3" fill="#FF6B00"/>
      </g>

      {/* Suitcase */}
      <g transform="translate(100, 200)">
        <rect x="0" y="0" width="50" height="35" rx="5" fill="#E60073"/>
        <rect x="15" y="-8" width="20" height="8" rx="3" fill="#9D00FF"/>
        <line x1="10" y1="10" x2="40" y2="10" stroke="#FFC400" strokeWidth="2"/>
        <line x1="10" y1="20" x2="40" y2="20" stroke="#FFC400" strokeWidth="2"/>
      </g>

      {/* Passport */}
      <g transform="translate(250, 210)">
        <rect x="0" y="0" width="35" height="45" rx="3" fill="#9D00FF"/>
        <circle cx="17.5" cy="20" r="8" fill="#FFC400"/>
        <rect x="8" y="32" width="20" height="3" rx="1.5" fill="#00A3CC"/>
      </g>

      {/* Mountains */}
      <path d="M50 250 L100 180 L150 250 Z" fill="#00A3CC" opacity="0.4"/>
      <path d="M120 250 L180 160 L240 250 Z" fill="#FF6B00" opacity="0.4"/>
      <path d="M220 250 L280 190 L340 250 Z" fill="#9D00FF" opacity="0.4"/>

      {/* Sun/Stars */}
      <circle cx="320" cy="40" r="15" fill="#FFC400"/>
      <circle cx="50" cy="50" r="3" fill="#FFC400"/>
      <circle cx="80" cy="30" r="2" fill="#00A3CC"/>
      <circle cx="340" cy="80" r="2.5" fill="#E60073"/>
    </svg>
  );
}

export function WorldMapIllustration({ className = "w-full h-full" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 400 250" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Map pins in different locations */}
      <g>
        {/* Pin 1 - Europe */}
        <circle cx="180" cy="80" r="6" fill="#FF6B00"/>
        <path d="M180 74 L180 85" stroke="#FF6B00" strokeWidth="2"/>

        {/* Pin 2 - Asia */}
        <circle cx="280" cy="100" r="6" fill="#00A3CC"/>
        <path d="M280 94 L280 105" stroke="#00A3CC" strokeWidth="2"/>

        {/* Pin 3 - Americas */}
        <circle cx="90" cy="120" r="6" fill="#9D00FF"/>
        <path d="M90 114 L90 125" stroke="#9D00FF" strokeWidth="2"/>

        {/* Pin 4 - Africa */}
        <circle cx="200" cy="150" r="6" fill="#FFC400"/>
        <path d="M200 144 L200 155" stroke="#FFC400" strokeWidth="2"/>

        {/* Pin 5 - Oceania */}
        <circle cx="320" cy="170" r="6" fill="#E60073"/>
        <path d="M320 164 L320 175" stroke="#E60073" strokeWidth="2"/>
      </g>

      {/* Connecting lines */}
      <path d="M180 80 Q230 90 280 100" stroke="#00A3CC" strokeWidth="2" opacity="0.5" strokeDasharray="5,5"/>
      <path d="M90 120 Q140 100 180 80" stroke="#9D00FF" strokeWidth="2" opacity="0.5" strokeDasharray="5,5"/>
      <path d="M280 100 Q300 135 320 170" stroke="#FFC400" strokeWidth="2" opacity="0.5" strokeDasharray="5,5"/>

      {/* Decorative circles */}
      <circle cx="150" cy="60" r="20" fill="#FF6B00" opacity="0.1"/>
      <circle cx="250" cy="140" r="30" fill="#00A3CC" opacity="0.1"/>
      <circle cx="120" cy="180" r="25" fill="#9D00FF" opacity="0.1"/>
    </svg>
  );
}

export function AnalyticsIllustration({ className = "w-full h-full" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Chart background */}
      <rect x="50" y="50" width="200" height="180" rx="10" fill="white" stroke="#00A3CC" strokeWidth="3"/>

      {/* Bar chart */}
      <rect x="70" y="150" width="30" height="60" rx="5" fill="#FF6B00"/>
      <rect x="110" y="120" width="30" height="90" rx="5" fill="#00A3CC"/>
      <rect x="150" y="100" width="30" height="110" rx="5" fill="#9D00FF"/>
      <rect x="190" y="130" width="30" height="80" rx="5" fill="#FFC400"/>

      {/* Sparkles */}
      <circle cx="100" cy="80" r="4" fill="#FFC400"/>
      <circle cx="220" cy="90" r="3" fill="#E60073"/>

      {/* Graph line */}
      <path d="M70 200 Q110 170 150 180 T230 150" stroke="#E60073" strokeWidth="3" fill="none"/>
      <circle cx="70" cy="200" r="5" fill="#E60073"/>
      <circle cx="150" cy="180" r="5" fill="#E60073"/>
      <circle cx="230" cy="150" r="5" fill="#E60073"/>

      {/* Title/Icon */}
      <circle cx="150" cy="30" r="15" fill="#9D00FF"/>
      <path d="M145 30 L150 25 L155 30" stroke="white" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}
