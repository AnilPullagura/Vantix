import Groq from "groq-sdk";
import dotenv from "dotenv";

dotenv.config();

const groq = new Groq({ apiKey: process.env.GROQ_TOKEN });

const textEnhance = async (req, res) => {
  const text = req.body?.text || "dreamy mountain with water fall";

  try {
    const response = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content:
            "You are a professional AI prompt engineer. Enhance the provided short description into a highly detailed, descriptive prompt for an image generator. Focus on art style, lighting, composition, and mood. Just return the enhanced prompt, nothing else.",
        },
        {
          role: "user",
          content: text,
        },
      ],
      model: "llama-3.3-70b-versatile",
      temperature: 0.7,
      max_tokens: 256,
    });

    res.status(200).json({
      success: true,
      message: response.choices[0].message.content,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export default textEnhance;
