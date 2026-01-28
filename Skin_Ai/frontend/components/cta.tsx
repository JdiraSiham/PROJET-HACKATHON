"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, AlertCircle } from "lucide-react"
import { useLanguage } from "@/src/context/LanguageContext"

export function CTA() {
  const { t } = useLanguage()

  return (
    <section className="py-32 relative overflow-hidden">
      {/* Fond d'ambiance global derrière la section */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[100px] -z-10 pointer-events-none" />

      <div className="container mx-auto px-6">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-b from-zinc-900/80 to-black/90 backdrop-blur-2xl border border-white/5 p-12 md:p-20 text-center shadow-[0_0_50px_-10px_rgba(0,0,0,0.5)] group">
          
          {/* Effets de lumière décoratifs (Glows) */}
          <div className="absolute top-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2 group-hover:bg-primary/15 transition-colors duration-700" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[100px] translate-x-1/2 translate-y-1/2" />

          {/* Grille subtile en fond pour la texture */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_100%)] opacity-20 pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 text-balance drop-shadow-lg tracking-tight">
              Ready to Understand Your <br/>
              <span className="text-primary bg-clip-text text-transparent bg-gradient-to-r from-primary via-[#FFD700] to-primary drop-shadow-[0_0_25px_rgba(212,175,55,0.4)]">
                Skin Better?
              </span>
            </h2>
            
            <p className="text-gray-300/90 text-xl mb-10 leading-relaxed max-w-2xl mx-auto">
              Join thousands of users who are taking control of their skin health with AI-powered insights and personalized care routines.
            </p>

            <Link href="/analyze">
              <Button
                size="lg"
                className="relative text-lg px-10 py-7 rounded-full h-auto 
                           bg-gradient-to-b from-zinc-800 to-zinc-950 
                           border border-primary/40 text-primary 
                           shadow-[0_0_20px_-5px_rgba(212,175,55,0.2)]
                           hover:scale-105 hover:from-primary hover:to-accent hover:text-black hover:border-primary
                           hover:shadow-[0_0_40px_-10px_rgba(212,175,55,0.6)]
                           transition-all duration-300 group/btn"
              >
                <span className="relative z-10 flex items-center font-semibold tracking-wide">
                  Start Free Analysis
                  <ArrowRight className="ml-3 w-6 h-6 group-hover/btn:translate-x-1 transition-transform" />
                </span>
              </Button>
            </Link>

            <div className="mt-12 flex items-start gap-4 text-left bg-black/60 border border-white/5 rounded-2xl p-6 max-w-xl mx-auto backdrop-blur-md shadow-inner">
              <AlertCircle className="w-6 h-6 text-gray-500 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-gray-400 leading-relaxed">
                <span className="text-gray-300 font-medium">Note:</span> Smart Skin Insight provides educational information only. This is not a medical diagnosis. Please consult a healthcare professional for medical advice.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}