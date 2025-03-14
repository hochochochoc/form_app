const express = require("express");
const cors = require("cors");
const OpenAI = require("openai");
const multer = require("multer");
const pool = require("./db");
require("dotenv").config();

const upload = multer();
const app = express();
app.use(express.json({ limit: "50mb" }));
app.use(cors());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post("/analyze-image", upload.single("image"), async (req, res) => {
  try {
    const buffer = req.file.buffer;
    const base64Image = `data:${req.file.mimetype};base64,${buffer.toString("base64")}`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "And are they arching their back correctly for the exercise? How about their hand placement, too narrow or wide or correct? What could they do better? Give one short sentence for each question as if you were talking to the person, do not start with a - symbol. Leave out doubts about the context and any advice to consult a professional, it's already accounted for.",
            },
            {
              type: "image_url",
              image_url: {
                url: base64Image,
                detail: "low",
              },
            },
          ],
        },
      ],
      max_tokens: 300,
    });

    const analysis = response.choices[0].message.content;
    const connection = await pool.getConnection();
    try {
      await connection.query(
        "INSERT INTO analyses (analysis_text) VALUES (?)",
        [analysis],
      );
    } finally {
      connection.release();
    }

    res.json({ analysis });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Analysis failed", details: error.message });
  }
});

app.listen(3000, () => console.log("Server running on 3000"));
