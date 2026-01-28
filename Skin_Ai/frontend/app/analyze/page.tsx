"use client"

import { Header } from "@/components/header"
import { SkinAnalysis } from "@/components/skin-analysis"
import { Footer } from "@/components/footer"
import { useLanguage } from "@/src/context/LanguageContext"

export default function AnalyzePage() {
  const { t } = useLanguage()
  
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16 pb-12">
        <div className="container mx-auto px-6 mb-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {t.analyzePage.title}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t.analyzePage.subtitle}
          </p>
        </div>
        <SkinAnalysis />
      </main>
      <Footer />
    </div>
  )
}

