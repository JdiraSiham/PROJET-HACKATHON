"use client"

import { Scan, TrendingUp, Leaf, Apple, Clock, Shield } from "lucide-react"
import { useLanguage } from "@/src/context/LanguageContext"

export function Features() {
  const { t } = useLanguage()
  
  const features = [
    {
      icon: Scan,
      title: t.features.feature1.title,
      description: t.features.feature1.description,
    },
    {
      icon: TrendingUp,
      title: t.features.feature2.title,
      description: t.features.feature2.description,
    },
    {
      icon: Leaf,
      title: t.features.feature3.title,
      description: t.features.feature3.description,
    },
    {
      icon: Apple,
      title: t.features.feature4.title,
      description: t.features.feature4.description,
    },
    {
      icon: Clock,
      title: t.features.feature5.title,
      description: t.features.feature5.description,
    },
    {
      icon: Shield,
      title: t.features.feature6.title,
      description: t.features.feature6.description,
    },
  ]

  return (
    <section id="features" className="py-32 relative">
      {/* NOTE: Pas de background ici (transparent par défaut) 
         pour laisser voir le fond global du site.
      */}
      
      {/* Lueurs d'ambiance derrière les cartes (Atmosphère) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-primary/5 rounded-full blur-[120px] -z-10 pointer-events-none" />

      <div className="container mx-auto px-6">
        
        {/* En-tête de section */}
        <div className="text-center max-w-3xl mx-auto mb-20">
            <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-6 backdrop-blur-sm shadow-[0_0_15px_-5px_rgba(212,175,55,0.3)]">
                <span className="text-primary font-bold text-xs uppercase tracking-[0.25em]">
                    {t.features.badge}
                </span>
            </div>

          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white drop-shadow-xl tracking-tight">
            {t.features.title}
          </h2>
          <p className="text-gray-300/80 text-lg leading-relaxed max-w-2xl mx-auto">
            {t.features.subtitle}
          </p>
        </div>

        {/* Grille des Features */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="group relative p-8 rounded-[2rem] 
                         bg-zinc-900/20 backdrop-blur-md 
                         border border-white/5 
                         hover:bg-zinc-900/40 hover:border-primary/40 
                         transition-all duration-500 ease-out 
                         hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)]"
            >
              {/* Petit reflet doré au survol en haut de la carte */}
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/0 to-transparent group-hover:via-primary/50 transition-all duration-700" />

              {/* Icône */}
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-white/5 to-white/0 border border-white/10 
                              flex items-center justify-center mb-8 
                              group-hover:bg-primary group-hover:scale-110 group-hover:rotate-3
                              transition-all duration-500 shadow-lg group-hover:shadow-[0_0_30px_rgba(212,175,55,0.4)]">
                <feature.icon className="w-8 h-8 text-primary group-hover:text-black transition-colors duration-300" />
              </div>
              
              {/* Contenu */}
              <h3 className="text-xl font-bold mb-4 text-white group-hover:text-primary transition-colors duration-300">
                {feature.title}
              </h3>
              <p className="text-gray-400 leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
