"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { apiService, DiagnosisResponse } from "@/lib/api-service"
import { Loader2, Upload, Video, CheckCircle2, AlertCircle, Leaf, ShieldAlert, Stethoscope } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useLanguage } from "@/src/context/LanguageContext"

export function SkinAnalysis() {
  const [videoFile, setVideoFile] = useState<File | null>(null)
  
  // CORRECTION 1 : On ajoute un état pour stocker l'URL de prévisualisation
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisResult, setAnalysisResult] = useState<DiagnosisResponse | null>(null)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { toast } = useToast()
  const { getGeminiLanguagePrompt, t } = useLanguage()

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      if (file.type.startsWith('video/')) {
        setVideoFile(file)
        setError(null)
        setAnalysisResult(null)
        
        // CORRECTION 2 : On crée l'URL magique ici et on la stocke
        const objectUrl = URL.createObjectURL(file)
        setPreviewUrl(objectUrl)

      } else {
        toast({
          title: t.analyzePage.invalidFormat,
          description: t.analyzePage.invalidFormatDescription,
          variant: "destructive",
        })
      }
    }
  }

  const handleAnalyze = async () => {
    if (!videoFile) {
      toast({
        title: t.analyzePage.noVideoSelected,
        description: t.analyzePage.noVideoDescription,
        variant: "destructive",
      })
      return
    }

    setIsAnalyzing(true)
    setError(null)
    setAnalysisResult(null)

    try {
      const languagePrompt = getGeminiLanguagePrompt()
      const result = await apiService.analyzeSkinVideo(videoFile, languagePrompt)
      setAnalysisResult(result)
      toast({
        title: t.analyzePage.analysisComplete,
        description: t.analyzePage.analysisCompleteDescription,
      })
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Une erreur est survenue"
      setError(errorMessage)
      toast({
        title: t.analyzePage.analysisError,
        description: errorMessage,
        variant: "destructive",
      })
    } finally {
      setIsAnalyzing(false)
    }
  }

  const handleReset = () => {
    setVideoFile(null)
    setPreviewUrl(null) // CORRECTION : On nettoie aussi l'URL
    setAnalysisResult(null)
    setError(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const getUrgencyColor = (urgency: string) => {
      const lower = urgency?.toLowerCase() || "";
      if (lower.includes('haute') || lower.includes('high') || lower.includes('élevée')) return 'text-red-500';
      if (lower.includes('moyenne') || lower.includes('medium')) return 'text-yellow-500';
      return 'text-green-500';
  }

  return (
    <div className="container mx-auto px-6 py-12 max-w-4xl">
      <Card className="border-white/10 bg-black/40 backdrop-blur-xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <Video className="h-5 w-5 text-primary" />
            {t.analyzePage.skinAnalysisTitle}
          </CardTitle>
          <CardDescription className="text-gray-400">
            {t.analyzePage.skinAnalysisDescription}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          
          <div className="space-y-4">
             <div className="flex items-center gap-4">
               <input
                 ref={fileInputRef}
                 type="file"
                 accept="video/*"
                 onChange={handleFileSelect}
                 className="hidden"
                 id="video-upload"
                 disabled={isAnalyzing}
               />
               <Button
                 variant="outline"
                 onClick={() => fileInputRef.current?.click()}
                 disabled={isAnalyzing}
                 className="flex items-center gap-2 border-primary/20 bg-white/5 text-white hover:bg-white/10 hover:text-primary"
               >
                 <Upload className="h-4 w-4" />
                 {videoFile ? t.analyzePage.changeVideo : t.analyzePage.selectVideo}
               </Button>
               {videoFile && (
                 <span className="text-sm text-gray-400">
                   {videoFile.name} ({(videoFile.size / 1024 / 1024).toFixed(2)} MB)
                 </span>
               )}
             </div>

             {/* CORRECTION 3 : On utilise previewUrl comme source (src) */}
             {previewUrl && (
               <div className="relative w-full max-w-md mx-auto mt-6">
                 <div className="rounded-xl overflow-hidden border border-white/10 shadow-2xl bg-black">
                    <video
                        src={previewUrl}
                        controls
                        playsInline
                        className="w-full h-auto max-h-[400px]"
                    />
                 </div>
               </div>
             )}
           </div>

           <div className="flex gap-4">
             <Button
               onClick={handleAnalyze}
               disabled={!videoFile || isAnalyzing}
               className="flex items-center gap-2 bg-primary text-black hover:bg-primary/90"
             >
               {isAnalyzing ? (
                 <>
                   <Loader2 className="h-4 w-4 animate-spin" />
                   {t.analyzePage.analysisInProgress}
                 </>
               ) : (
                 <>
                   <Video className="h-4 w-4" />
                   {t.analyzePage.analyzeButton}
                 </>
               )}
             </Button>
             {(videoFile || analysisResult) && (
               <Button variant="outline" onClick={handleReset} disabled={isAnalyzing} className="border-white/10 text-gray-300 hover:bg-white/5">
                 {t.analyzePage.resetButton}
               </Button>
             )}
           </div>

          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {analysisResult && (
            <div className="space-y-6 mt-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <Alert className="bg-green-500/10 border-green-500/20 text-green-500">
                <CheckCircle2 className="h-4 w-4" />
                <AlertTitle>{t.analyzePage.analysisComplete}</AlertTitle>
                <AlertDescription>
                  {t.analyzePage.analysisCompleteDescription}
                </AlertDescription>
              </Alert>

              <div className="grid gap-6 md:grid-cols-2">
                {/* DIAGNOSTIC */}
                <Card className="bg-white/5 border-primary/20">
                  <CardHeader>
                    <CardTitle className="text-lg text-primary">{t.results.possibleDiagnosis}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold text-white">{analysisResult.diagnostic_probable}</p>
                    <p className="text-sm text-gray-400 mt-2">
                      {t.results.confidence}: <span className="text-primary">{analysisResult.confiance_ia}</span>
                    </p>
                  </CardContent>
                </Card>

                {/* URGENCE */}
                <Card className="bg-white/5 border-primary/20">
                  <CardHeader>
                    <CardTitle className="text-lg text-primary">{t.results.urgency}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className={`text-2xl font-bold ${getUrgencyColor(analysisResult.niveau_urgence)}`}>
                      {analysisResult.niveau_urgence}
                    </p>
                    <div className="mt-2 flex items-center gap-2 text-sm text-gray-300">
                        <Stethoscope className="w-4 h-4 text-primary" />
                        {analysisResult.recommandation_specialiste}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* ANALYSE DÉTAILLÉE */}
              <Card className="bg-white/5 border-white/5">
                <CardHeader>
                  <CardTitle className="text-lg text-white">{t.results.temporalAnalysis}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 leading-relaxed">{analysisResult.analyse_detaillee}</p>
                </CardContent>
              </Card>

              {/* SYMPTÔMES & ROUTINE */}
              <div className="grid gap-6 md:grid-cols-2">
                  <Card className="bg-white/5 border-white/5">
                    <CardHeader>
                      <CardTitle className="text-lg text-white">{t.results.symptoms}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="list-disc list-inside space-y-2 text-gray-300">
                        {analysisResult.symptomes_cles?.map((symptome: string, index: number) => (
                          <li key={index}>{symptome}</li>
                        )) || <li>Aucun symptôme détecté</li>}
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className="bg-white/5 border-green-500/20">
                    <CardHeader>
                      <CardTitle className="text-lg text-green-400 flex items-center gap-2">
                          <Leaf className="w-5 h-5" /> Routine Saine
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="list-none space-y-3">
                        {analysisResult.routine_naturelle?.map((conseil: string, index: number) => (
                          <li key={index} className="flex gap-2 text-gray-300 text-sm">
                              <span className="text-green-500 mt-1">✓</span> {conseil}
                          </li>
                        )) || <li>Aucune routine spécifique</li>}
                      </ul>
                    </CardContent>
                  </Card>
              </div>

              {/* À ÉVITER ABSOLUMENT */}
              <Card className="bg-red-500/10 border-red-500/20">
                <CardHeader>
                  <CardTitle className="text-lg text-red-400 flex items-center gap-2">
                      <ShieldAlert className="w-5 h-5" /> À Éviter Absolument
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="grid gap-2 md:grid-cols-2">
                    {analysisResult.a_eviter_absolument?.map((danger: string, index: number) => (
                      <li key={index} className="flex gap-2 text-gray-300 text-sm items-start bg-black/20 p-2 rounded">
                          <span className="text-red-500 font-bold">✕</span> {danger}
                      </li>
                    )) || <li>Rien de spécifique à signaler</li>}
                  </ul>
                </CardContent>
              </Card>

            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}