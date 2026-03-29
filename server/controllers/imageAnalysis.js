import Groq from "groq-sdk";
import dotenv from "dotenv";

dotenv.config();

const groq = new Groq({ apiKey: process.env.GROQ_TOKEN });

const analyzeImage = async (req, res) => {
  try {
    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "No image file uploaded." });
    }

    const base64Image = req.file.buffer.toString("base64");
    const dataUrl = `data:${req.file.mimetype};base64,${base64Image}`;

    const response = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "Describe this image in a single, high-fidelity paragraph. Focus on the art style, lighting, composition, and subject matter so that I can use this description as a prompt to generate a similar but unique image. Just return the description, nothing else.",
            },
            {
              type: "image_url",
              image_url: {
                url: dataUrl,
              },
            },
          ],
        },
      ],
      model: "meta-llama/llama-4-scout-17b-16e-instruct",
      temperature: 0.5,
      max_tokens: 512,
    });

    res.status(200).json({
      success: true,
      message: response.choices[0].message.content,
    });
  } catch (error) {
    console.error("Groq Vision Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export default analyzeImage;
