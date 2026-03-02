

import os
import pandas as pd
from sklearn.metrics import classification_report

# ========= 0. Load eval data and define helpers =========

eval_df = pd.read_csv("data/cityline_eval_sample.csv")
# expected columns: ["Id", "Summary", "Description", "Category"]

eval_df["text"] = eval_df["Summary"].fillna("") + " " + eval_df["Description"].fillna("")
categories = sorted(eval_df["Category"].dropna().unique().tolist())


def build_prompt(text: str, categories: list[str]) -> str:
    cat_list = "\n".join(f"- {c}" for c in categories)
    return f"""
You are classifying service requests for the City of Syracuse Cityline system.

Choose exactly one category from the list below that best matches the request.
Respond with only the category string, no explanation.

Valid categories:
{cat_list}

Request text:
{text}
"""


def normalize_label(raw: str) -> str:
    raw = raw.strip()
    if raw in categories:
        return raw
    for c in categories:
        if raw.lower() == c.lower():
            return c
    return raw  # unexpected label, kept for error analysis


def evaluate_model(name: str, predict_func):
    y_true = eval_df["Category"].tolist()
    y_pred = []
    for t in eval_df["text"]:
        try:
            p = predict_func(t)
        except Exception as e:
            print(f"[{name}] error on text: {e}")
            p = "__ERROR__"
        y_pred.append(p)

    print(f"\n=== Results for {name} ===")
    print(
        classification_report(
            y_true, y_pred, labels=categories, zero_division=0
        )
    )
    return y_true, y_pred


# ========= 1. GPT (OpenAI) =========

from openai import OpenAI

openai_client = OpenAI(api_key=os.environ.get("OPENAI_API_KEY"))

def gpt_predict_category(text: str) -> str:
    prompt = build_prompt(text, categories)
    resp = openai_client.responses.create(
        model="gpt-4.1-mini",
        input=prompt,
    )
    raw = resp.output[0].content[0].text
    return normalize_label(raw)

y_true_gpt, y_pred_gpt = evaluate_model("GPT-4.1-mini", gpt_predict_category)


# ========= 2. Claude (Anthropic) =========

from anthropic import Anthropic

anthropic_client = Anthropic(api_key=os.environ.get("ANTHROPIC_API_KEY"))

def claude_predict_category(text: str) -> str:
    prompt = build_prompt(text, categories)
    resp = anthropic_client.messages.create(
        model="claude-3-5-sonnet-20241022",
        max_tokens=16,
        messages=[{"role": "user", "content": prompt}],
    )
    raw = resp.content[0].text
    return normalize_label(raw)

y_true_claude, y_pred_claude = evaluate_model("Claude 3.5 Sonnet", claude_predict_category)


# ========= 3. Gemini (Google) =========

import google.generativeai as genai

genai.configure(api_key=os.environ.get("GEMINI_API_KEY"))
gemini_model = genai.GenerativeModel("gemini-1.5-pro")

def gemini_predict_category(text: str) -> str:
    prompt = build_prompt(text, categories)
    resp = gemini_model.generate_content(prompt)
    raw = resp.text
    return normalize_label(raw)

y_true_gemini, y_pred_gemini = evaluate_model("Gemini 1.5 Pro", gemini_predict_category)


# ========= 4. Side-by-side comparison =========

comparison = pd.DataFrame({
    "Id": eval_df["Id"],
    "text": eval_df["text"],
    "true": eval_df["Category"],
    "GPT": y_pred_gpt,
    "Claude": y_pred_claude,
    "Gemini": y_pred_gemini,
})

comparison.to_csv("data/cityline_llm_comparison.csv", index=False)

print("\nSaved detailed comparison to data/cityline_llm_comparison.csv")
