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
   PEER MATCHING API
========================= */
app.post("/api/match-peers", async (req, res) => {
  try {
    const { currentUser, otherUsers, userQuery } = req.body;

    if (!currentUser || !Array.isArray(otherUsers)) {
      return res.json([]);
    }

    const prompt = `
You are a helpful AI assistant for peer matching.

Current user:
${JSON.stringify(currentUser, null, 2)}

Other users:
${JSON.stringify(otherUsers, null, 2)}

User query:
"${userQuery || "find suitable peers"}"

If greeting, reply politely as text.
If peer matching, reply ONLY as JSON array:

[
  { "uid": "", "name": "", "reason": "" }
]
`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }]
        })
      }
    );

    const data = await response.json();
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || "";

    // Greeting case
    if (!text.trim().startsWith("[")) {
      return res.json({ message: text });
    }

    const match = text.match(/\[[\s\S]*\]/);
    if (!match) return res.json([]);

    return res.json(JSON.parse(match[0]));

  } catch (err) {
    console.error("❌ Gemini error:", err);
    res.status(500).json([]);
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Backend running on http://localhost:${PORT}`);
});
