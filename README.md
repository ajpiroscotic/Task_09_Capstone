# CivicAI – Cityline Helper

CivicAI is a prototype web application designed to help Syracuse residents better understand and structure service requests before submitting them to the official SYRCityline portal.

Residents can enter a short natural-language description of an issue (e.g., *“Huge pothole on Euclid near Comstock”*), and CivicAI will:

- Classify the request into a Cityline-style category (e.g., **Pothole**)
- Estimate historical time-to-resolution
- Assign a pressingness level (low / medium / high)
- Generate a structured ticket-style preview

The project demonstrates how historical open data and lightweight AI models can improve civic user experience and make public service expectations more transparent.

---

## Project Motivation

While SYRCityline and SeeClickFix allow residents to report issues such as potholes, broken streetlights, trash, and snow removal problems, several usability challenges remain:

- Selecting the correct category from a long list
- Understanding typical resolution timelines
- Determining whether an issue is urgent or part of a backlog
- Navigating web forms (especially for users with lower digital literacy)

CivicAI acts as a **helper layer**, not a replacement. It learns from historical Cityline data to:

- Suggest likely categories
- Estimate realistic resolution windows
- Surface a pressingness indicator
- Improve clarity and consistency in submissions

The goal is to make civic engagement more intuitive and expectation-aware.

---

## Features

### 📝 Text-Based Classification
Predicts the most likely Cityline category from natural-language input.

### ⏱ Time-to-Resolution Estimation
Uses historical resolution data to estimate expected completion time.

### 🚦 Pressingness Score
Assigns a low / medium / high label based on deviation from category-level SLA benchmarks.

### 🎫 Ticket Preview
Generates a structured summary mirroring SYRCityline submission fields.

### 🤖 Optional LLM Explanation
When enabled, an external LLM provides a short, human-readable explanation clarifying the category and time estimate.  
*Note: These explanations are assistive and not official city statements.*

---

## Demo

### Screenshots

- ![Main Input Screen](images/ss01.png)
- ![Compliant Submission](images/ss02.png)
- ![Estimate & Submission Preview](images/ss03.png)

### Live Prototype

https://attached-assets--padwalanjaneya.replit.app

---

## Installation & Setup

### Prerequisites

- Python 3.10+
- Node.js 18+
- Cityline / SeeClickFix dataset export (CSV)

Optional (for LLM explanations):
- `OPENAI_API_KEY`
- `ANTHROPIC_API_KEY`
- `GEMINI_API_KEY`

---

## 1. Data & Model Preparation (Offline)

1. Export Cityline dataset to:
   ```
   data/cityline_requests.csv
   ```

2. In your modeling notebook/script:
   - Clean and preprocess data
   - Combine `Summary` + `Description` fields
   - Compute `resolution_days`
   - Derive category SLA benchmarks
   - Train and save artifacts:

   ```
   backend/models/cityline_text_classifier.joblib
   backend/models/cityline_time_regressor.joblib
   backend/models/category_sla_days.json
   ```

The raw CSV is **not required in production** — only model artifacts.

---

## 2. Backend API (FastAPI)

From the `backend/` directory:

```bash
pip install -r requirements.txt
uvicorn app.main:app --reload
```

Server runs at:
```
http://localhost:8000
```

### Endpoint: `POST /classify`

#### Request
```json
{
  "text": "There is a large pothole on Euclid Avenue near Comstock."
}
```

#### Response
```json
{
  "category": "Pothole",
  "predicted_resolution_days": 5.2,
  "pressingness": "medium"
}
```

---

## 3. Frontend (Next.js)

From the `frontend/` directory:

```bash
npm install
npm run dev
```

Create `.env.local`:

```env
BACKEND_BASE_URL=http://localhost:8000
OPENAI_API_KEY=your_key_here   # Optional
```

Then open:
```
http://localhost:3000
```

---

## Data Sources

Designed for use with Syracuse Cityline / SeeClickFix data from:

- Syracuse Open Data Portal
- Official documentation describing:
  - `Category`
  - `Minutes_to_Close`
  - `Sla_in_hours`
  - Agency metadata

This repository does **not** redistribute proprietary or sensitive datasets.

---

## Known Limitations

### ⚠ Prototype Only
Does not submit directly to SYRCityline.

### 📊 Model Quality Depends on Data
Performance varies based on historical dataset completeness and label quality.

### ⏳ Estimates, Not Guarantees
Resolution predictions are statistical estimates. Real-world timelines depend on:
- Weather
- Emergencies
- Staffing
- Changing municipal priorities

### 🗂 Limited Category Coverage
Rare categories may be poorly modeled. Pressingness is heuristic and not an official priority designation.

### 🤖 LLM Output Is Assistive
Generated explanations are interpretive aids, not official city communication.

---

