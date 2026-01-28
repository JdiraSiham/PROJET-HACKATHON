export function LuxuryLogo({ className = "w-12 h-12" }: { className?: string }) {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      {/* 1. Le halo de lumière derrière (Glow) */}
      <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full animate-pulse" />
      
      {/* 2. Le Cercle Doré */}
      <div className="relative w-full h-full rounded-full border border-primary/30 bg-black/50 backdrop-blur-sm flex items-center justify-center shadow-[0_0_15px_rgba(212,175,55,0.3)]">
        
        {/* 3. L'anneau intérieur fin */}
        <div className="absolute inset-1 rounded-full border border-primary/10" />

        {/* 4. Le Logo "S" stylisé et l'étoile */}
        <svg 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="1.5"
          className="w-1/2 h-1/2 text-primary drop-shadow-[0_0_8px_rgba(212,175,55,0.8)]"
        >
          {/* Forme abstraite du S */}
          <path d="M7 12c-1.5 0-3-1.5-3-3.5S6 5 8 5h2M16 12c1.5 0 3 1.5 3 3.5S17 19 15 19h-2" />
          <path d="M12 5v14" className="opacity-50" />
          
          {/* L'étoile brillante au centre (Le "Sparkle") */}
          <path 
            d="M12 2L13 11L22 12L13 13L12 22L11 13L2 12L11 11L12 2Z" 
            fill="currentColor" 
            className="animate-[pulse_3s_ease-in-out_infinite]"
            strokeWidth="0"
          />
        </svg>
      </div>
    </div>
  )
}