"use client"

import Link from "next/link"
import { useLanguage } from "@/src/context/LanguageContext"
import { LuxuryLogo } from "@/components/ui/LuxuryLog"

export function Footer() {
  const { t } = useLanguage()
  
  return (
    <footer className="bg-black/80 border-t border-white/10 py-12 backdrop-blur-lg">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          
          {/* Logo Footer */}
          <div className="flex items-center gap-3 opacity-80 hover:opacity-100 transition-opacity">
            <LuxuryLogo className="w-8 h-8" />
            <span className="text-lg font-bold text-white">
              Smart <span className="text-primary">Skin</span>
            </span>
          </div>

          <div className="text-sm text-gray-500 text-center md:text-right">
            <p>&copy; {new Date().getFullYear()} Smart Skin AI. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}