"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Play, Sparkles, X } from "lucide-react" // 1. J'ai ajouté 'X' pour le bouton fermer
import { useLanguage } from "@/src/context/LanguageContext"
import { useState } from "react"
// 2. On importe ton Scanner IA
import { ScannerAnimation } from "@/components/ui/scannar-animation"

export function Hero() {
  const { t } = useLanguage()
  const [videoError, setVideoError] = useState(false)

  // 3. La mémoire pour ouvrir/fermer la boite noire
  const [isDemoOpen, setIsDemoOpen] = useState(false)
  
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        
      {/* --- FOND VIDÉO (Inchangé) --- */}
      <div className="absolute inset-0 overflow-hidden bg-black">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-100"
          onError={() => setVideoError(true)}
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            minWidth: '100%',
            minHeight: '100%',
            width: 'auto',
            height: 'auto',
            objectFit: 'cover'
          }}
        >
          <source src="/videos/7010921-hd_1920_1080_25fps.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/60" />
      </div> 

      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-black/60 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-8">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-white">{t.hero.poweredBy}</span>
          </div>

          {/* Main headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 text-balance">
            <span className="text-white">{t.hero.title1}</span>
            <br />
            <span className="text-primary">{t.hero.title2}</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-10 leading-relaxed text-pretty">
            {t.hero.subtitle}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/analyze">
              <Button size="lg" className="text-base px-8 py-6 rounded-full shadow-lg hover:shadow-xl transition-all h-auto">
                {t.hero.getStarted}
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            
            {/* 4. MODIFICATION ICI : On enlève le Link et on met un onClick */}
            <Button 
                variant="outline" 
                size="lg" 
                onClick={() => setIsDemoOpen(true)} // <-- C'est ça qui ouvre la boite
                className="text-base px-8 py-6 rounded-full border-2 bg-transparent h-auto hover:bg-white/10 text-white border-white/30 cursor-pointer"
            >
                <Play className="mr-2 w-5 h-5" />
                {t.hero.watchDemo}
            </Button>
          </div>

          {/* Trust badge */}
          <p className="mt-10 text-sm text-white/80">
            Trusted by <span className="font-semibold text-white">10,000+</span> users worldwide
          </p>
        </div>
      </div>

      {/* 5. LA BOITE NOIRE (MODALE) */}
      {isDemoOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-300">
            {/* Le conteneur de la pièce */}
            <div className="relative w-full max-w-5xl bg-black rounded-[2rem] border border-primary/20 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
                
                {/* Bouton X pour fermer */}
                <button 
                    onClick={() => setIsDemoOpen(false)}
                    className="absolute top-6 right-6 z-50 p-2 bg-black/50 hover:bg-white/20 rounded-full text-white transition-colors border border-white/10"
                >
                    <X className="w-6 h-6" />
                </button>

                {/* Ton Scanner IA à l'intérieur */}
                <div className="w-full h-full">
                    <ScannerAnimation />
                </div>
            </div>
        </div>
      )}

    </section>
  )
}