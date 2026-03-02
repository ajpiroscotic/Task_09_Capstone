

import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const BACKEND_BASE_URL =
  process.env.BACKEND_BASE_URL || "http://localhost:8000";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const text = (body.text || "").trim();

    if (!text) {
      return NextResponse.json(
        { error: "Missing 'text' in request body" },
        { status: 400 }
      );
    }

    // 1) Call your FastAPI backend /classify
    const classifyResp = await fetch(`${BACKEND_BASE_URL}/classify`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });

    if (!classifyResp.ok) {
      const errText = await classifyResp.text();
      return NextResponse.json(
        { error: "Backend classify error", details: errText },
        { status: 502 }
      );
    }

    const classifyData = (await classifyResp.json()) as {
      category: string;
      predicted_resolution_days: number;
      pressingness: string;
    };

    // 2) Call LLM for explanation (GPT example)
    const prompt = `
You are helping a Syracuse resident understand city service requests.

Explain in 2–3 sentences why this complaint might be categorized this way
and why this time estimate is reasonable, using plain, non-technical language.
Emphasize that the estimate is based on past data and is not a guarantee.

Complaint: ${text}
Predicted category: ${classifyData.category}
Estimated resolution days: ${classifyData.predicted_resolution_days}
Pressingness: ${classifyData.pressingness}
`;

    const llmResp = await openai.responses.create({
      model: "gpt-4.1-mini",
      input: prompt,
    });

    const explanationText =
      llmResp.output[0].content[0].text.trim();

    return NextResponse.json({
      ...classifyData,
      explanation: explanationText,
    });
  } catch (err: any) {
    console.error("classify-with-llm error", err);
    return NextResponse.json(
      { error: "Internal error", details: err?.message || String(err) },
      { status: 500 }
    );
  }
}
