import { generateText, Output } from "ai"
import { z } from "zod"
import { CITYLINE_CATEGORIES } from "@/lib/cityline-data"

const classificationSchema = z.object({
  category: z.string().describe("The exact category name from the provided list"),
  confidence: z.number().min(0).max(1).describe("Confidence score between 0 and 1"),
  summary: z.string().describe("A cleaned-up, concise one-sentence summary of the issue suitable for a formal service request"),
  location: z.string().nullable().describe("Extracted location/address from the description, or null if not mentioned"),
  urgency_reasoning: z.string().describe("Brief reasoning for why this category and priority level was chosen"),
  alternative_categories: z
    .array(z.string())
    .describe("Up to 2 alternative category names that could also apply"),
})

function buildCategoryReference(): string {
  return CITYLINE_CATEGORIES.map(
    (cat) =>
      `- "${cat.category}" | Dept: ${cat.department} | Priority: ${cat.pressingness} | Avg resolution: ${cat.avgResolutionDays} days`
  ).join("\n")
}

export async function POST(req: Request) {
  const { description, imageDataUrl } = await req.json()

  if (!description || typeof description !== "string" || description.trim().length < 10) {
    return Response.json(
      { error: "Please provide a description of at least 10 characters." },
      { status: 400 }
    )
  }

  const categoryReference = buildCategoryReference()

  const userContent: Array<{ type: "text"; text: string } | { type: "image"; image: string }> = [
    {
      type: "text" as const,
      text: `Classify this issue report from a Syracuse resident:\n\n"${description.trim()}"`,
    },
  ]

  if (imageDataUrl && typeof imageDataUrl === "string" && imageDataUrl.startsWith("data:image/")) {
    userContent.push({
      type: "image" as const,
      image: imageDataUrl,
    })
    userContent.push({
      type: "text" as const,
      text: "An image of the issue is attached above. Use it to improve your classification, location detection, and summary.",
    })
  }

  const { output } = await generateText({
    model: "openai/gpt-4o-mini",
    output: Output.object({ schema: classificationSchema }),
    messages: [
      {
        role: "system",
        content: `You are CivicAI, a classification assistant for the SYRCityline system in Syracuse, NY. 
Your job is to analyze resident issue descriptions and classify them into the correct SYRCityline service request category.
When an image is attached, use visual details from the photo to improve your classification accuracy.

Here are ALL valid SYRCityline categories:
${categoryReference}

Rules:
1. The "category" field MUST be an EXACT match to one of the category names listed above.
2. The "summary" should rewrite the user's informal description into a clean, professional one-sentence service request.
3. Extract the location/address if mentioned; otherwise set location to null.
4. Provide a brief reasoning for why you chose this category and priority.
5. List up to 2 alternative categories that could also apply (exact names from the list).
6. Set confidence based on how clearly the description matches: >0.85 for clear matches, 0.5-0.85 for reasonable matches, <0.5 for ambiguous.
7. If an image is provided, reference what you see in it within your reasoning.`,
      },
      {
        role: "user",
        content: userContent,
      },
    ],
  })

  if (!output) {
    return Response.json(
      { error: "Failed to classify the issue. Please try again." },
      { status: 500 }
    )
  }

  const matchedCategory = CITYLINE_CATEGORIES.find(
    (c) => c.category.toLowerCase() === output.category.toLowerCase()
  )

  const alternatives = (output.alternative_categories || [])
    .map((name) =>
      CITYLINE_CATEGORIES.find(
        (c) => c.category.toLowerCase() === name.toLowerCase()
      )
    )
    .filter(Boolean)

  return Response.json({
    category: matchedCategory || CITYLINE_CATEGORIES.find((c) => c.category === "Feedback to the City"),
    confidence: output.confidence,
    summary: output.summary,
    location: output.location,
    urgencyReasoning: output.urgency_reasoning,
    alternatives,
  })
}