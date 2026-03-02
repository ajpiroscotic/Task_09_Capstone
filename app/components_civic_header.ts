import { Building2 } from "lucide-react"

type StepName = "input" | "review" | "submitting" | "submitted"

const STEP_LABELS: Record<StepName, { title: string; subtitle: string }> = {
  input: {
    title: "CivicAI",
    subtitle:
      "Describe a city issue in plain language. We will classify it and draft a Cityline service request.",
  },
  review: {
    title: "Review Your Ticket",
    subtitle:
      "We classified your issue. Review the details below and submit to Cityline when ready.",
  },
  submitting: {
    title: "Submitting to Cityline",
    subtitle: "Your service request is being submitted to SYRCityline...",
  },
  submitted: {
    title: "Submitted",
    subtitle: "Your service request has been received by SYRCityline.",
  },
}

export function CivicHeader({ step }: { step: StepName }) {
  const { title, subtitle } = STEP_LABELS[step]

  return (
    <header className="flex flex-col items-center gap-3 text-center">
      <div className="flex items-center gap-2.5">
        <div className="flex size-10 items-center justify-center rounded-lg bg-primary">
          <Building2 className="size-5 text-primary-foreground" />
        </div>
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          {title}
        </h1>
      </div>
      <p className="max-w-md text-balance text-sm leading-relaxed text-muted-foreground">
        {subtitle}
      </p>
    </header>
  )
}