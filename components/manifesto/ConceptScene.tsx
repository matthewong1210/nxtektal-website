/**
 * NXTektal robot concept visual (original in-house SVG, carried over from the
 * previous homepage). Rendered full-bleed as the ground stage of the earth
 * sequence. The `data-depth` groups are translated at slightly different
 * rates by the scroll driver for a restrained 2.5D parallax.
 */
export default function ConceptScene() {
  return (
    <div className="concept-ground">
      <svg
        viewBox="0 0 1440 720"
        preserveAspectRatio="xMidYMax slice"
        role="img"
        aria-label="NXTektal autonomous outdoor robot concept visualization"
      >
        <defs>
          <linearGradient id="scene-sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#101720" />
            <stop offset="0.55" stopColor="#141c16" />
            <stop offset="1" stopColor="#0e160f" />
          </linearGradient>
          <linearGradient id="scene-ground" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#1d2e18" />
            <stop offset="0.5" stopColor="#132212" />
            <stop offset="1" stopColor="#0b130c" />
          </linearGradient>
          <linearGradient id="robot-body" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#d6d9d7" />
            <stop offset="0.55" stopColor="#7b817e" />
            <stop offset="1" stopColor="#353b39" />
          </linearGradient>
          <linearGradient id="robot-glass" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#20292b" />
            <stop offset="1" stopColor="#070c0f" />
          </linearGradient>
          <radialGradient id="scene-glow" cx="62%" cy="52%" r="48%">
            <stop offset="0" stopColor="#a6e22e" stopOpacity="0.1" />
            <stop offset="1" stopColor="#a6e22e" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="scene-shade" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#0d1117" stopOpacity="0.88" />
            <stop offset="0.4" stopColor="#0d1117" stopOpacity="0" />
            <stop offset="0.82" stopColor="#0d1117" stopOpacity="0" />
            <stop offset="1" stopColor="#0d1117" stopOpacity="0.85" />
          </linearGradient>
          <filter id="lime-glow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="robot-shadow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="12" result="blur" />
            <feOffset dy="12" result="offset" />
            <feColorMatrix in="offset" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 .55 0" />
            <feMerge><feMergeNode /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>
        <g data-depth="far">
          <rect width="1440" height="720" fill="url(#scene-sky)" />
          <rect width="1440" height="720" fill="url(#scene-glow)" />
          <g opacity="0.07" stroke="#f5f7f7" strokeWidth="1">
            {Array.from({ length: 15 }).map((_, i) => <path key={`v-${i}`} d={`M${i * 104} 0v720`} />)}
            {Array.from({ length: 7 }).map((_, i) => <path key={`h-${i}`} d={`M0 ${140 + i * 92}h1440`} />)}
          </g>
          <g fill="#0b120d" opacity="0.95" transform="translate(0 160)">
            <path d="M0 258c40-38 74-52 108-34 26-52 80-60 112-10 38-50 108-53 140 4 33-33 80-33 113 5 34-44 92-52 130-7 44-41 102-40 132 8 37-37 88-38 121 5 37-50 105-53 141 0 31-37 86-39 119 2 32-38 92-39 124 4 34-40 78-42 100-2v72H0Z" />
            <circle cx="132" cy="212" r="58" /><circle cx="300" cy="216" r="70" /><circle cx="520" cy="204" r="60" /><circle cx="748" cy="216" r="74" /><circle cx="988" cy="202" r="66" /><circle cx="1180" cy="218" r="58" /><circle cx="1350" cy="208" r="52" />
          </g>
        </g>
        <g data-depth="near">
          <path d="M0 482c300-46 560-30 790 8 226 37 400 30 650-14v244H0Z" fill="url(#scene-ground)" />
          <path d="M120 630C400 516 660 532 860 598c156 52 306 52 452-14" fill="none" stroke="#a6e22e" strokeOpacity="0.26" strokeWidth="2" strokeDasharray="8 12" />
          <g fill="#f2f3ee" stroke="#aeb4b0" strokeWidth="1" opacity="0.85">
            <circle cx="255" cy="632" r="7" /><circle cx="360" cy="598" r="6" /><circle cx="470" cy="646" r="7" /><circle cx="586" cy="584" r="5" /><circle cx="1210" cy="640" r="6" />
          </g>
          <g filter="url(#robot-shadow)" transform="translate(760 396) scale(0.98)">
            <ellipse cx="180" cy="213" rx="174" ry="28" fill="#030606" opacity="0.72" />
            <g>
              <circle cx="57" cy="192" r="43" fill="#111616" stroke="#353b3b" strokeWidth="9" />
              <circle cx="57" cy="192" r="19" fill="#090d0e" stroke="#6b7280" strokeWidth="4" />
              <circle cx="291" cy="192" r="43" fill="#111616" stroke="#353b3b" strokeWidth="9" />
              <circle cx="291" cy="192" r="19" fill="#090d0e" stroke="#6b7280" strokeWidth="4" />
            </g>
            <path d="M31 174 56 85c8-27 27-42 56-45l122-9c28-2 50 10 66 36l42 67c8 13 3 31-11 39l-33 19H58c-21 0-33-8-27-18Z" fill="url(#robot-body)" stroke="#d8dcda" strokeOpacity="0.36" />
            <path d="M103 53 224 45c24-2 42 8 56 29l21 34H81l18-48c1-3 2-5 4-7Z" fill="url(#robot-glass)" stroke="#9ea5a4" strokeOpacity="0.55" />
            <path d="M82 119h222" stroke="#a6e22e" strokeWidth="8" strokeLinecap="round" filter="url(#lime-glow)" />
            <path d="M129 33h99l12 15H115Z" fill="#13191a" stroke="#747b7c" />
            <rect x="152" y="19" width="62" height="17" rx="7" fill="#121819" stroke="#7e8585" />
            <circle cx="166" cy="27.5" r="4" fill="#a6e22e" filter="url(#lime-glow)" />
            <circle cx="200" cy="27.5" r="4" fill="#d6dbda" />
            <path d="M193 82h38" stroke="#a6e22e" strokeWidth="3" />
            <text x="190" y="103" fill="#1a201f" fontSize="18" fontWeight="700" letterSpacing="2">NXTektal</text>
            <path d="M27 163h317" stroke="#141a19" strokeWidth="8" />
            <path d="M128 139h84" stroke="#242a29" strokeWidth="3" />
          </g>
        </g>
        <rect width="1440" height="720" fill="url(#scene-shade)" />
      </svg>
      <div className="concept-tag"><i aria-hidden="true" /> CONCEPT VISUAL</div>
    </div>
  );
}
