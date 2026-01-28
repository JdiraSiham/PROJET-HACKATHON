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
        { 
            question: t.faq?.faq1?.question || "How accurate is the AI analysis?", 
            answer: t.faq?.faq1?.answer || "Our AI model has been trained on over 100,000 dermatological images and achieves 95% accuracy in detecting common skin patterns. However, it is an educational tool and does not replace professional medical diagnosis."
        },
        { 
            question: t.faq?.faq2?.question || "Is my video data private?", 
            answer: t.faq?.faq2?.answer || "Yes, absolutely. All video uploads are end-to-end encrypted and processed securely. We only store anonymized analysis results, and you can delete your data at any time."
        },
        { 
            question: t.faq?.faq3?.question || "Does it work on all skin tones?", 
            answer: t.faq?.faq3?.answer || "Yes! We have significantly invested in ensuring our AI is unbiased and effective across all Fitzpatrick skin types."
        },
        { 
            question: t.faq?.faq4?.question || "Can I use this for my child?", 
            answer: t.faq?.faq4?.answer || "Smart Skin Insight allows profiles for family members. For children under 13, a parent or guardian must manage the account."
        },
        { 
            question: t.faq?.faq5?.question || "Do I need a special camera?", 
            answer: t.faq?.faq5?.answer || "No, a standard smartphone camera with good lighting is perfectly sufficient for our analysis."
        },
    ]

    return (
        <section id="faq" className="py-32 relative overflow-hidden">
            <div className="container mx-auto px-6 max-w-3xl">
                
                <div className="text-center mb-16">
                    <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-6 backdrop-blur-sm">
                        <span className="text-primary font-medium text-xs uppercase tracking-[0.2em]">
                            {t.faq?.badge || "FAQ"}
                        </span>
                    </div>
                    
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight drop-shadow-lg">
                        {t.faq?.title || "Frequently Asked Questions"}
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