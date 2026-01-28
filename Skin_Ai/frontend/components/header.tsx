"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, Globe } from "lucide-react"
import { useLanguage } from "@/src/context/LanguageContext"
import { LuxuryLogo } from "@/components/ui/LuxuryLog"

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { currentLanguage, changeLanguage, t } = useLanguage()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // CORRECTION ICI : On définit la liste proprement pour éviter l'erreur TypeScript
  const navItems = [
    { label: t.nav?.howItWorks || "How It Works", href: "#how-it-works" },
    { label: t.nav?.features || "Features", href: "#features" },
    { label: t.nav?.faq || "FAQ", href: "#faq" },
  ]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || isMobileMenuOpen
          ? "bg-black/80 backdrop-blur-md border-b border-white/10 py-4 shadow-[0_4px_30px_rgba(0,0,0,0.5)]"
          : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-3 group">
          <LuxuryLogo className="w-10 h-10 group-hover:scale-110 transition-transform duration-500" />
          <span className="text-xl font-bold tracking-wide text-white">
            Smart <span className="text-primary drop-shadow-[0_0_10px_rgba(212,175,55,0.5)]">Skin</span>
          </span>
        </Link>

        {/* Navigation Desktop CORRIGÉE */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-gray-300 hover:text-primary transition-colors tracking-wide uppercase"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Actions (Langue + Bouton) */}
        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={() => changeLanguage(currentLanguage.code === 'en' ? 'fr' : 'en')}
            className="flex items-center gap-2 text-sm font-medium text-gray-300 hover:text-primary transition-colors px-3 py-2 rounded-full hover:bg-white/5"
          >
            <Globe className="w-4 h-4" />
            <span className="uppercase">{currentLanguage.code}</span>
          </button>
          
          <Link href="/analyze">
            <Button className="bg-primary text-black hover:bg-white hover:text-black border border-primary/50 shadow-[0_0_15px_rgba(212,175,55,0.3)] transition-all rounded-full px-6">
              {t.nav?.getStarted || "Get Started"}
            </Button>
          </Link>
        </div>

        {/* Menu Mobile Button */}
        <button
          className="md:hidden text-white p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Menu Mobile Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-black/95 backdrop-blur-xl border-b border-white/10 p-6 animate-in slide-in-from-top-5">
          <nav className="flex flex-col gap-6 text-center">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-lg font-medium text-gray-300 hover:text-primary"
              >
                {item.label}
              </Link>
            ))}
            <button
              onClick={() => {
                changeLanguage(currentLanguage.code === 'en' ? 'fr' : 'en');
                setIsMobileMenuOpen(false);
              }}
              className="flex items-center justify-center gap-2 text-lg font-medium text-gray-300 hover:text-primary"
            >
              <Globe className="w-5 h-5" />
              <span className="uppercase">{currentLanguage.code === 'en' ? 'Français' : 'English'}</span>
            </button>
            <Link href="/analyze" onClick={() => setIsMobileMenuOpen(false)}>
              <Button className="w-full bg-primary text-black hover:bg-white font-bold py-6 rounded-xl">
                {t.nav?.getStarted || "Get Started"}
              </Button>
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}