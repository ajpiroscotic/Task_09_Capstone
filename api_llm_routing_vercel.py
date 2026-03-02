"use client";

import React, { useState } from "react";

type ResultType = {
  category: string;
  predicted_resolution_days: number;
  pressingness: string;
  explanation?: string;
};

export default function Home() {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ResultType | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!text.trim()) {
      setError("Please enter a description.");
      return;
    }
    setError(null);
    setLoading(true);
    setResult(null);

    try {
      const resp = await fetch("/api/classify-with-llm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
      if (!resp.ok) {
        const data = await resp.json().catch(() => null);
        throw new Error(data?.error || `API error ${resp.status}`);
      }
      const data: ResultType = await resp.json();
      setResult(data);
    } catch (e: any) {
      setError(e.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-950 text-slate-50">
      <div className="w-full max-w-2xl p-6 space-y-4">
        <h1 className="text-2xl font-semibold">CivicAI – Cityline Helper</h1>
        <p className="text-sm text-slate-300">
          Describe an issue in Syracuse and get an estimated Cityline category
          and resolution time.
        </p>

        <textarea
          className="w-full h-32 rounded border border-slate-700 bg-slate-900 p-3 text-sm"
          placeholder="Describe your issue..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <div className="flex gap-2">
          <button
            type="button"
            className="px-4 py-2 rounded bg-slate-200 text-slate-900 text-sm"
            onClick={() => alert("Voice capture coming soon")}
          >
            🎤 Record voice
          </button>
          <button
            type="button"
            className="px-4 py-2 rounded bg-blue-500 text-sm disabled:opacity-50"
            disabled={loading}
            onClick={handleSubmit}
          >
            {loading ? "Thinking…" : "Classify & estimate time"}
          </button>
        </div>

        {error && (
          <div className="text-sm text-red-400">{error}</div>
        )}

        {result && (
          <div className="mt-4 rounded border border-slate-700 bg-slate-900 p-4 text-sm space-y-2">
            <div>
              <span className="font-semibold">Category:</span>{" "}
              {result.category}
            </div>
            <div>
              <span className="font-semibold">Estimated resolution:</span>{" "}
              {result.predicted_resolution_days} days
            </div>
            <div>
              <span className="font-semibold">Pressingness:</span>{" "}
              {result.pressingness}
            </div>
            {result.explanation && (
              <div className="pt-2 border-t border-slate-700 mt-2">
                <div className="font-semibold mb-1">Why this estimate?</div>
                <p className="text-slate-200">{result.explanation}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
