"use client"

import { useState, useCallback } from "react"
import { CivicHeader } from "@/components/civic-header"
import { IssueForm } from "@/components/issue-form"
import { TicketReview } from "@/components/ticket-review"
import { SubmissionScreen } from "@/components/submission-screen"
import type { CitylineCategory } from "@/lib/cityline-data"

export interface ClassificationResult {
  match: CitylineCategory
  confidence: number
  summary: string
  location: string | null
  urgencyReasoning: string
  alternatives: CitylineCategory[]
  submittedText: string
  imageDataUrl: string | null
  ticketId: string
  timestamp: Date
}

type AppStep = "input" | "review" | "submitting" | "submitted"

function generateTicketId(): string {
  const prefix = "SYR"
  const date = new Date()
  const datePart = `${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, "0")}${String(date.getDate()).padStart(2, "0")}`
  const seq = String(Math.floor(Math.random() * 9999) + 1).padStart(4, "0")
  return `${prefix}-${datePart}-${seq}`
}

export default function Home() {
  const [step, setStep] = useState<AppStep>("input")
  const [text, setText] = useState("")
  const [imageDataUrl, setImageDataUrl] = useState<string | null>(null)
  const [isClassifying, setIsClassifying] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<ClassificationResult | null>(null)

  const handleClassify = useCallback(async () => {
    const trimmed = text.trim()
    if (!trimmed) {
      setError("Please describe the issue before submitting.")
      return
    }
    if (trimmed.length < 10) {
      setError("Please provide more detail (at least 10 characters).")
      return
    }

    setIsClassifying(true)
    setError(null)

    try {
      const res = await fetch("/api/classify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description: trimmed, imageDataUrl }),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || "Classification failed")
      }

      const data = await res.json()

      setResult({
        match: data.category,
        confidence: data.confidence,
        summary: data.summary,
        location: data.location,
        urgencyReasoning: data.urgencyReasoning,
        alternatives: data.alternatives || [],
        submittedText: trimmed,
        imageDataUrl: imageDataUrl,
        ticketId: generateTicketId(),
        timestamp: new Date(),
      })
      setStep("review")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Classification failed. Please try again.")
    } finally {
      setIsClassifying(false)
    }
  }, [text, imageDataUrl])

  const handleSubmitToCityline = useCallback(async () => {
    setStep("submitting")
    await new Promise((resolve) => setTimeout(resolve, 2200 + Math.random() * 800))
    setStep("submitted")
  }, [])

  const handleBackToEdit = useCallback(() => {
    setStep("input")
  }, [])

  const handleStartOver = useCallback(() => {
    setStep("input")
    setText("")
    setImageDataUrl(null)
    setResult(null)
    setError(null)
  }, [])

  const handleSelectCategory = useCallback(
    (cat: CitylineCategory) => {
      if (!result) return
      setResult({
        ...result,
        match: cat,
        confidence: Math.max(0.5, result.confidence - 0.1),
      })
    },
    [result]
  )

  return (
    <main className="flex min-h-screen flex-col items-center px-4 py-8 sm:py-12">
      <div className="flex w-full max-w-[720px] flex-col gap-6">
        <CivicHeader step={step} />

        {step === "input" && (
          <IssueForm
            text={text}
            onTextChange={setText}
            imageDataUrl={imageDataUrl}
            onImageChange={setImageDataUrl}
            onSubmit={handleClassify}
            isLoading={isClassifying}
            error={error}
          />
        )}

        {step === "review" && result && (
          <TicketReview
            result={result}
            onSubmit={handleSubmitToCityline}
            onBack={handleBackToEdit}
            onSelectCategory={handleSelectCategory}
          />
        )}

        {(step === "submitting" || step === "submitted") && result && (
          <SubmissionScreen
            result={result}
            isSubmitting={step === "submitting"}
            onStartOver={handleStartOver}
          />
        )}
      </div>
    </main>
  )
}