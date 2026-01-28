"use client"

import { useEffect, useState } from "react"
import { Brain, ScanFace, Activity, CheckCircle2, Lock, FileText, Server, Sparkles } from "lucide-react"

export function ScannerAnimation() {
  const [currentStep, setCurrentStep] = useState(0)

  // MISE À JOUR : On passe à Gemini 3 pour le Hackathon
  const steps = [
    { text: "Connecting to Gemini 3...", icon: Server },
    { text: "Extracting Video Frames...", icon: ScanFace },
    { text: "Mapping Facial Topography...", icon: Activity },
    { text: "Gemini 3 Vision Analysis...", icon: Brain }, // Mention explicite ici aussi
    { text: "Detecting Inflammation Patterns...", icon: ScanFace },
    { text: "Compiling Dermatological Report...", icon: FileText },
    { text: "Analysis Complete.", icon: CheckCircle2 }
  ]

  // Effet pour faire avancer les étapes automatiquement
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev < steps.length - 1 ? prev + 1 : 0))
    }, 1200) 

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative w-full aspect-video rounded-3xl overflow-hidden bg-black border border-primary/20 shadow-[0_0_60px_-15px_rgba(212,175,55,0.4)] group select-none">
      
      {/* 1. Fond Grille Technologique */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(212,175,55,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(212,175,55,0.05)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_100%)] opacity-50" />

      {/* 2. Silhouette Visage Stylisée (SVG) */}
      <div className="absolute inset-0 flex items-center justify-center opacity-30">
        <svg viewBox="0 0 200 250" className="h-3/4 w-auto stroke-primary fill-none stroke-[0.5]">
            <path d="M100 20 C 60 20, 20 60, 20 110 C 20 180, 60 230, 100 230 C 140 230, 180 180, 180 110 C 180 60, 140 20, 100 20 Z" />
            <path d="M60 100 Q 70 110 80 100" className="opacity-50" />
            <path d="M120 100 Q 130 110 140 100" className="opacity-50" />
            <path d="M95 130 L 105 130 L 100 150 Z" className="opacity-50" />
            <path d="M80 180 Q 100 190 120 180" className="opacity-50" />
            
            <circle cx="100" cy="20" r="2" className="fill-primary animate-ping" />
            <circle cx="20" cy="110" r="2" className="fill-primary animate-pulse" />
            <circle cx="180" cy="110" r="2" className="fill-primary animate-pulse" />
            <circle cx="100" cy="230" r="2" className="fill-primary animate-pulse" />
        </svg>
      </div>

      {/* 3. Le Scanner (Barre qui descend) */}
      <div className="absolute inset-x-0 h-[1px] bg-primary shadow-[0_0_20px_rgba(212,175,55,1)] animate-scan z-20">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-80" />
      </div>
      
      {/* 4. Faisceau lumineux */}
      <div className="absolute inset-x-0 h-40 bg-gradient-to-b from-primary/10 to-transparent animate-scan-beam z-10" />

      {/* 5. Interface HUD (Le panneau de contrôle) */}
      <div className="absolute top-6 left-6 right-6 bottom-6 flex flex-col justify-between z-30 pointer-events-none">
        
        {/* En-tête HUD */}
        <div className="flex justify-between items-start">
            <div className="flex flex-col gap-1">
                <div className="text-[10px] text-primary/60 font-mono uppercase tracking-widest">Target Source</div>
                <div className="text-sm text-white font-mono font-bold flex items-center gap-2">
                    VIDEO_INPUT_01.mp4 <Lock className="w-3 h-3 text-primary" />
                </div>
            </div>

            {/* AJOUT : LA PHRASE EN HAUT AU CENTRE (Style Tech) */}
            <div className="absolute left-1/2 -translate-x-1/2 top-0 bg-primary/10 border border-primary/20 px-4 py-1 rounded-b-xl backdrop-blur-md">
                <div className="flex items-center gap-2 text-primary font-mono text-xs font-bold tracking-widest uppercase">
                    <Sparkles className="w-3 h-3" />
                    Demo: How Gemini 3 Works
                </div>
            </div>

            <div className="text-right">
                 <div className="text-[10px] text-primary/60 font-mono uppercase tracking-widest">AI Model</div>
                 {/* MISE À JOUR DU BADGE */}
                 <div className="text-xs text-black font-bold bg-primary px-2 py-1 rounded border border-primary shadow-[0_0_10px_rgba(212,175,55,0.5)]">
                     GEMINI 3
                 </div>
            </div>
        </div>

        {/* Le Cœur de l'analyse (Liste des étapes) */}
        <div className="self-center w-full max-w-sm">
             <div className="bg-black/80 backdrop-blur-md border border-primary/20 rounded-xl p-4 shadow-2xl">
                {steps.map((step, index) => {
                    const isActive = index === currentStep;
                    const isDone = index < currentStep;
                    
                    return (
                        <div key={index} 
                             className={`flex items-center gap-3 py-1.5 transition-all duration-300 ${isActive || isDone ? 'opacity-100' : 'opacity-30'}`}
                        >
                            <div className={`w-4 h-4 rounded-full flex items-center justify-center border ${
                                isActive ? 'border-primary animate-pulse' : 
                                isDone ? 'border-green-500 bg-green-500/20' : 'border-gray-700'
                            }`}>
                                {isDone && <div className="w-2 h-2 bg-green-500 rounded-full" />}
                                {isActive && <div className="w-2 h-2 bg-primary rounded-full" />}
                            </div>

                            <span className={`text-xs font-mono tracking-wide ${isActive ? 'text-primary font-bold' : isDone ? 'text-green-500' : 'text-gray-500'}`}>
                                {step.text}
                            </span>
                        </div>
                    )
                })}
             </div>
        </div>

        {/* Pied de page HUD */}
        <div className="flex justify-between items-end">
             <div className="flex gap-4 text-[10px] text-primary/40 font-mono">
                 <span>ISO: 400</span>
                 <span>LATENCY: 12ms</span>
                 <span>FPS: 60</span>
             </div>
             <div className="flex items-center gap-2 text-primary/80 font-mono text-xs">
                 <Activity className="w-4 h-4 animate-pulse" />
                 PROCESSING WITH GEMINI 3
             </div>
        </div>
      </div>

      {/* Coins décoratifs */}
      <div className="absolute top-4 left-4 w-6 h-6 border-l-2 border-t-2 border-primary/40 rounded-tl-lg" />
      <div className="absolute top-4 right-4 w-6 h-6 border-r-2 border-t-2 border-primary/40 rounded-tr-lg" />
      <div className="absolute bottom-4 left-4 w-6 h-6 border-l-2 border-b-2 border-primary/40 rounded-bl-lg" />
      <div className="absolute bottom-4 right-4 w-6 h-6 border-r-2 border-b-2 border-primary/40 rounded-br-lg" />
    </div>
  )
}