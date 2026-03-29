import { HfInference } from "@huggingface/inference";
import dotenv from "dotenv";

dotenv.config();

const client = new HfInference(process.env.HF_TOKEN);

const generateImage = async (req, res) => {
  const prompt = req.body?.prompt || "dreamy mountains";

  const primaryModel = "black-forest-labs/FLUX.1-schnell";
  const fallbackModel = "stabilityai/stable-diffusion-xl-base-1.0";

  try {
    let image;
    try {
      image = await client.textToImage({
        model: primaryModel,
        inputs: prompt,
        provider: "hf-inference",
      });
    } catch (primaryError) {
      image = await client.textToImage({
        model: fallbackModel,
        inputs: prompt,
        provider: "hf-inference",
        parameters: { num_inference_steps: 30 },
      });
    }

    const buffer = Buffer.from(await image.arrayBuffer());
    const result = `data:image/jpeg;base64,${buffer.toString("base64")}`;
    res.status(200).json({ success: true, image_url: result });
  } catch (error) {
    console.error("FINAL IMAGE GEN ERROR:", error.message);
    res.status(500).json({ message: error.message, success: false });
  }
};

export default generateImage;
