import { LuxuryLogo } from "@/components/ui/LuxuryLog";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[9999] bg-[#030303] flex flex-col items-center justify-center">
      
      {/* L'animation de respiration du logo */}
      <div className="animate-[pulse_2s_ease-in-out_infinite] scale-150">
        <LuxuryLogo className="w-24 h-24" />
      </div>

      {/* Barre de chargement dorée fine */}
      <div className="mt-8 w-48 h-[2px] bg-zinc-800 rounded-full overflow-hidden">
        <div className="h-full bg-primary w-1/3 animate-[shimmer_1.5s_infinite_linear]" 
             style={{
               backgroundImage: 'linear-gradient(90deg, transparent, #D4AF37, transparent)' 
             }}
        />
      </div>
      
      <p className="mt-4 text-primary/60 text-sm tracking-[0.3em] uppercase font-light animate-pulse">
        Loading Skin AI
      </p>
    </div>
  );
}