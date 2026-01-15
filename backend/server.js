import express from "express";
import fetch from "node-fetch";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 5000;

/* =========================
   HEALTH CHECK
========================= */
app.get("/", (req, res) => {
  res.send("✅ Gemini backend running");
});

/* =========================
   GEMINI PEER MATCHING
========================= */
app.post("/api/match-peers", async (req, res) => {
  try {
    const { currentUser, otherUsers, userQuery } = req.body;

    // 🛑 BASIC VALIDATION
    if (!currentUser || !Array.isArray(otherUsers)) {
      return res.json([]);
    }

    // 🔹 VERY SIMPLE PROMPT (NO RULES)
    const prompt = `
You are a helpful AI assistant.

If the user greets you (like "hi", "hello"), reply politely.

If the user asks for peer matching, suggest suitable peers from the list
based on skills, hobbies, strengths and weaknesses.

Current user:
${JSON.stringify(currentUser, null, 2)}

Other users:
${JSON.stringify(otherUsers, null, 2)}

User message:
"${userQuery || "find suitable peers"}"

If peers are suggested, return JSON like:
[
  { "uid": "", "name": "", "reason": "" }
]

If it is just a greeting, reply with plain text.
`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ role: "user", parts: [{ text: prompt }] }]
        })
      }
    );

    const data = await response.json();

    console.log("🔵 RAW GEMINI RESPONSE:", JSON.stringify(data, null, 2));

    const text =
      data?.candidates?.[0]?.content?.parts?.[0]?.text || "";

    if (!text) {
      return res.json([]);
    }

    // 🔹 If Gemini replied with text (like "Hi!")
    if (!text.trim().startsWith("[")) {
      return res.json({ message: text });
    }

    // 🔹 Extract JSON array safely
    const match = text.match(/\[[\s\S]*\]/);
    if (!match) return res.json([]);

    const parsed = JSON.parse(match[0]);
    return res.json(parsed);

  } catch (err) {
    console.error("❌ Gemini error:", err);
    return res.status(500).json([]);
  }
});

/* ========================= */
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
