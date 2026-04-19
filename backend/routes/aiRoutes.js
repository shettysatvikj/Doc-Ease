import express from "express";
import axios from "axios";

const router = express.Router();

router.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;

   const response = await axios.post(
  `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
  {
    contents: [
      {
        parts: [
          {
            text: `
You are the official AI assistant for Dr. Ease Private Clinic in India.

Clinic Information:
- Name: Dr. Ease Private Clinic
- Location: Mumbai, India
- Working Hours:
  Monday to Saturday: 9:00 AM – 8:00 PM
  Sunday: Closed
- Emergency Support: 24/7 Phone Assistance
- Services: General Consultation, Dental Care, Diagnostics, Specialist Consultation

Rules:
- Always use this information when answering.
- If user asks about timing, use exact hours above.
- If user asks about booking, encourage booking consultation.
- Do NOT give medical diagnosis.
- Keep responses professional and short.

User Question:
${message}
`
          }
        ]
      }
    ]
  }
);

    const reply =
      response.data.candidates[0].content.parts[0].text;

    res.json({ reply });

  } catch (error) {
    console.error("FULL ERROR:", error.response?.data || error.message);
    res.status(500).json({
      error: "AI error",
      details: error.response?.data || error.message,
    });
  }
});

export default router;