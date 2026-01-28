"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function DemoPage() {
    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Header />

            <main className="flex-1 pt-32 pb-16 px-6">
                <div className="container mx-auto max-w-5xl">
                    <Link
                        href="/"
                        className="inline-flex items-center text-muted-foreground hover:text-foreground mb-8"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Home
                    </Link>

                    <div className="text-center mb-12">
                        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-balance">
                            See Smart Skin in Action
                        </h1>
                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                            Watch how our advanced AI technology analyzes skin conditions and provides personalized insights in seconds.
                        </p>
                    </div>

                    <div className="aspect-video w-full rounded-2xl overflow-hidden bg-muted relative shadow-2xl border border-border/50">
                        {/* Replace with actual video if available, otherwise placeholder */}
                        <div className="absolute inset-0 flex items-center justify-center bg-card">
                            <div className="text-center p-8">
                                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                                    <span className="text-2xl">🎥</span>
                                </div>
                                <h3 className="text-lg font-semibold mb-2">Demo Video Placeholder</h3>
                                <p className="text-muted-foreground">The demo video would play here.</p>
                            </div>
                        </div>
                        {/* 
             Example of how to embed if video exists:
             <video 
               src="/path-to-video.mp4" 
               controls 
               className="w-full h-full object-cover" 
               poster="/poster.jpg"
             /> 
             */}
                    </div>

                    <div className="mt-16 text-center">
                        <h2 className="text-2xl font-bold mb-6">Ready to try it yourself?</h2>
                        <Link href="/analyze">
                            <Button size="lg" className="rounded-full px-8 py-6 text-base">
                                Start Your Analysis
                            </Button>
                        </Link>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    )
}
