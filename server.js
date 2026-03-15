const express = require("express");
const cors = require("cors");
const { OpenAI } = require("openai");
const multer = require("multer");
const XLSX = require("xlsx");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// Multer — handles file uploads, stores them temporarily
const upload = multer({ dest: "uploads/" });

// Initialize OpenAI
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Helper: extract text content from uploaded file
function extractFileContent(filePath, originalName) {
  const ext = path.extname(originalName).toLowerCase();

  if (ext === ".xlsx" || ext === ".xls" || ext === ".csv") {
    // Read Excel or CSV using xlsx library
    const workbook = XLSX.readFile(filePath);
    let allData = "";

    workbook.SheetNames.forEach((sheetName) => {
      const sheet = workbook.Sheets[sheetName];
      const json = XLSX.utils.sheet_to_csv(sheet);
      allData += `\n--- Sheet: ${sheetName} ---\n${json}`;
    });

    return allData.slice(0, 6000); // limit to avoid token overflow
  }

  if (ext === ".txt" || ext === ".json") {
    return fs.readFileSync(filePath, "utf8").slice(0, 6000);
  }

  return null;
}

// Main analyze route — handles both text-only and file + text
app.post("/analyze", upload.single("file"), async (req, res) => {
  const inputText = req.body.inputText;

  if (!inputText) {
    return res.status(400).json({ error: "No input text provided" });
  }

  const startTime = Date.now();

  try {
    let systemPrompt = `You are DataAgent, a real-time AI data analyst. 
Analyze the user's input and return clear, structured insights.
- If data is provided, analyze it directly and give specific numbers and findings.
- Format your response as 3-5 concise bullet points or a short paragraph.
- Be specific, not generic. Reference actual values from the data when available.
- Do not say "based on the attached file" — just give the insights directly.`;

    let userMessage = inputText;

    // If a file was uploaded, extract its contents
    if (req.file) {
      const fileContent = extractFileContent(req.file.path, req.file.originalname);

      if (fileContent) {
        userMessage = `User question: ${inputText}\n\nFile data:\n${fileContent}`;
      }

      // Clean up temp file after reading
      fs.unlink(req.file.path, () => {});
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userMessage },
      ],
      max_tokens: 400,
    });

    const responseTime = Date.now() - startTime;
    const insight = completion.choices[0].message.content;

    res.json({ insight, responseTime });

  } catch (error) {
    console.error("OpenAI Error:", error.message);
    res.status(500).json({ error: "Failed to process input" });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
