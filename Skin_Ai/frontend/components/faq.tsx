"use client"

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { useLanguage } from "@/src/context/LanguageContext"

export function FAQ() {
    const { t } = useLanguage()
    
    const faqs = [
        { question: t.faq.faq1.question, answer: t.faq.faq1.answer },
        { question: t.faq.faq2.question, answer: t.faq.faq2.answer },
        { question: t.faq.faq3.question, answer: t.faq.faq3.answer },
        { question: t.faq.faq4.question, answer: t.faq.faq4.answer },
        { question: t.faq.faq5.question, answer: t.faq.faq5.answer },
    ]

    return (
        <section id="faq" className="py-32 relative overflow-hidden">
            <div className="container mx-auto px-6 max-w-3xl">
                
                <div className="text-center mb-16">
                    <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-6 backdrop-blur-sm">
                        <span className="text-primary font-medium text-xs uppercase tracking-[0.2em]">
                            {t.faq.badge}
                        </span>
                    </div>
                    
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight drop-shadow-lg">
                        {t.faq.title}
                    </h2>
                </div>

                <Accordion type="single" collapsible className="w-full space-y-4">
                    {faqs.map((faq, index) => (
                        <AccordionItem 
                            key={index} 
                            value={`item-${index}`}
                            // --- LE CHANGEMENT EST ICI ---
                            // Style CTA appliqué à chaque ligne de FAQ
                            className="bg-black/40 backdrop-blur-xl border border-primary/20 px-6 md:px-8 rounded-2xl 
                                       data-[state=open]:bg-black/60 data-[state=open]:border-primary/50 
                                       hover:border-primary/40 transition-all duration-300"
                        >
                            <AccordionTrigger 
                                className="text-left text-lg md:text-xl font-medium text-white/90 py-6 
                                           hover:text-primary hover:no-underline 
                                           [&[data-state=open]]:text-primary transition-colors"
                            >
                                {faq.question}
                            </AccordionTrigger>
                            
                            <AccordionContent className="text-gray-400 text-base leading-relaxed pb-6 pr-4">
                                {faq.answer}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
        </section>
    )
}