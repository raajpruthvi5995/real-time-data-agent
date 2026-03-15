# ⚡ Real-Time Data Processing Agent

![Node.js](https://img.shields.io/badge/Node.js-20.x-339933?style=flat-square&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-4.x-000000?style=flat-square&logo=express&logoColor=white)
![OpenAI](https://img.shields.io/badge/OpenAI-GPT--3.5-412991?style=flat-square&logo=openai&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-blue?style=flat-square)

A real-time AI-powered data processing agent that analyzes text queries and uploaded files — returning structured NLP insights in under 500ms. Built with Node.js, Express, and OpenAI's GPT API.

---

## 📸 Preview

> Type a query, upload an Excel/CSV file, or speak using the mic — DataAgent returns structured AI insights instantly.

---

## ✨ Features

- 🧠 **AI-Powered Analysis** — Uses OpenAI GPT-3.5-turbo for real-time NLP insights
- 📁 **File Upload Support** — Reads and analyzes `.xlsx`, `.xls`, `.csv`, `.txt`, and `.json` files
- 🎤 **Voice Input** — Speak your query using the browser's built-in speech recognition
- ⚡ **Under 500ms** — Optimized for low-latency responses with live ms counter
- 📜 **Query History** — Saves all past queries and responses locally in the browser
- 📖 **Built-in Docs** — Slide-in documentation panel explaining how to use the app
- 🖤 **Grok-style UI** — Clean black & white professional interface with animations

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────┐
│                        BROWSER                          │
│                                                         │
│   ┌─────────────┐     ┌──────────────┐                 │
│   │  Text Input  │     │  File Upload │                 │
│   │  (or Voice) │     │  .xlsx/.csv  │                 │
│   └──────┬──────┘     └──────┬───────┘                 │
│          │                   │                          │
│          └────────┬──────────┘                          │
│                   │  FormData (POST /analyze)            │
└───────────────────┼─────────────────────────────────────┘
                    │
                    ▼
┌─────────────────────────────────────────────────────────┐
│                  NODE.JS SERVER (Express)                │
│                                                         │
│   ┌─────────────────────────────────────────────────┐   │
│   │  multer  →  receives file upload                │   │
│   │  xlsx    →  extracts data from Excel/CSV        │   │
│   │  dotenv  →  loads API key from .env             │   │
│   └────────────────────┬────────────────────────────┘   │
│                        │                                │
│              Builds prompt with data                    │
│                        │                                │
└────────────────────────┼────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────┐
│                    OPENAI API                           │
│                                                         │
│         GPT-3.5-turbo  →  NLP Analysis                 │
│         Returns structured insight in <500ms            │
│                                                         │
└─────────────────────────────────────────────────────────┘
                         │
                         ▼
              JSON response { insight, responseTime }
                         │
                         ▼
┌─────────────────────────────────────────────────────────┐
│              BROWSER renders AI response                │
│   Avatar bubble · Bullet points · Response time badge  │
└─────────────────────────────────────────────────────────┘
```

---

## 🗂️ Project Structure

```
real-time-data-agent/
│
├── public/
│   └── index.html          # Frontend — UI, mic, file upload, history
│
├── .env                    # Your secret API key (never committed)
├── .env.example            # Safe template to share
├── .gitignore              # Protects .env and node_modules
├── server.js               # Express backend — file parsing + OpenAI
├── package.json            # Project dependencies
└── README.md               # You are here
```

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) v18 or higher
- [npm](https://www.npmjs.com/) (comes with Node.js)
- An [OpenAI API key](https://platform.openai.com/api-keys) with billing enabled

---

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_GITHUB_USERNAME/real-time-data-agent.git
```

```bash
cd real-time-data-agent
```

---

### 2. Install dependencies

```bash
npm install
```

This installs all required packages:

| Package | Purpose |
|---|---|
| `express` | Web server framework |
| `openai` | OpenAI API client |
| `multer` | Handles file uploads |
| `xlsx` | Reads Excel and CSV files |
| `dotenv` | Loads environment variables |
| `cors` | Allows cross-origin requests |
| `natural` | NLP utilities |

---

### 3. Set up your environment variables

Create a `.env` file in the root of the project:

```bash
cp .env.example .env
```

Then open `.env` and add your OpenAI API key:

```
OPENAI_API_KEY=your_openai_api_key_here
PORT=3000
```

> 🔑 Get your API key at [platform.openai.com/api-keys](https://platform.openai.com/api-keys)
> 💳 You need a small credit balance — $5 gives you thousands of requests

---

### 4. Run the server

```bash
node server.js
```

You should see:

```
✅ Server running at http://localhost:3000
```

---

### 5. Open in your browser

Visit 👉 **http://localhost:3000**

---

## 🧪 How to Use

1. **Type a query** in the input box — be specific about what you want to analyze
2. **Upload a file** (optional) — click "Upload file" and select an `.xlsx`, `.csv`, or `.txt` file
3. **Or speak** — click the mic button and say your query out loud (best in Chrome)
4. **Press Enter** or click the arrow button to analyze
5. **View results** — DataAgent responds in a chat bubble with structured insights
6. **Check History** — click "History" in the navbar to see all past queries

---

## 💡 Example Prompts

**With a file uploaded:**
```
Analyze Q3 sales trends and tell me which region performed best
```
```
What are the most common complaints in this customer feedback file?
```
```
Find anomalies and outliers in the uploaded dataset
```

**Without a file:**
```
Our company saw a 22% drop in sales in Q3. What are the most likely causes?
```
```
60% of our customers rated support 3 out of 5. What should we improve?
```
```
Compare the pros and cons of using AI for business data analysis
```

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | HTML5, CSS3, Vanilla JavaScript |
| Backend | Node.js, Express.js |
| AI Engine | OpenAI GPT-3.5-turbo |
| File Parsing | xlsx, multer |
| Voice Input | Web Speech API (browser built-in) |
| Styling | Custom CSS, Geist font |

---

## ⚙️ Environment Variables

| Variable | Required | Description |
|---|---|---|
| `OPENAI_API_KEY` | ✅ Yes | Your OpenAI API key |
| `PORT` | ❌ Optional | Port to run the server on (default: 3000) |

---

## 📄 License

This project is licensed under the MIT License — feel free to use, modify, and distribute it.

---

## 👤 Author

**Pruthviraaj**
- GitHub: [@YOUR_GITHUB_USERNAME](https://github.com/YOUR_GITHUB_USERNAME)

---

> Built as part of a portfolio project to demonstrate real-time NLP processing, API integration, and full-stack development.
