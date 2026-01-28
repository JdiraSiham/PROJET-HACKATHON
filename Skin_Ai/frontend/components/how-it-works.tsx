"use client"

import { Video, Brain, FileText, CalendarDays } from "lucide-react"
import { useLanguage } from "@/src/context/LanguageContext"

export function HowItWorks() {
  const { t } = useLanguage()
  
  const steps = [
    {
      icon: Video,
      step: "01",
      title: t.howItWorks.step1.title,
      description: t.howItWorks.step1.description,
    },
    {
      icon: Brain,
      step: "02",
      title: t.howItWorks.step2.title,
      description: t.howItWorks.step2.description,
    },
    {
      icon: FileText,
      step: "03",
      title: t.howItWorks.step3.title,
      description: t.howItWorks.step3.description,
    },
    {
      icon: CalendarDays,
      step: "04",
      title: t.howItWorks.step4.title,
      description: t.howItWorks.step4.description,
    },
  ]

  return (
    <section id="how-it-works" className="py-24 relative overflow-hidden">
      {/* Fond subtil pour séparer la section */}
      <div className="absolute inset-0 bg-primary/5 -z-10" />

      <div className="container mx-auto px-6">
        {/* Section header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-primary font-bold text-sm uppercase tracking-widest border border-primary/20 px-3 py-1 rounded-full bg-primary/10">
            {t.howItWorks.badge}
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mt-6 mb-6 text-foreground bg-clip-text text-transparent bg-gradient-to-b from-white to-white/70">
            {t.howItWorks.title}
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            {t.howItWorks.subtitle}
          </p>
        </div>

        {/* Steps grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div 
              key={step.step}
              className="relative group"
            >
              {/* Connector line (FIX: Ligne dorée subtile) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-[60%] w-full h-[1px] bg-gradient-to-r from-primary/30 to-transparent z-0" />
              )}
              
              {/* FIX: Fond de carte plus sombre (black/40) et bordure dorée fine */}
              <div className="bg-black/40 backdrop-blur-md rounded-2xl p-8 border border-white/5 hover:border-primary/50 hover:shadow-[0_0_30px_-5px_rgba(212,175,55,0.15)] transition-all duration-300 relative z-10 group-hover:-translate-y-2 h-full">
                
                {/* FIX: Numéro en gros, sombre mais visible (style watermark) */}
                <span className="absolute top-2 right-4 text-6xl font-black text-white/5 group-hover:text-primary/10 transition-colors select-none">
                  {step.step}
                </span>
                
                {/* Icon */}
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <step.icon className="w-7 h-7 text-primary" />
                </div>
                
                {/* Content */}
                <h3 className="text-xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors">
                  {step.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}