import { Router } from "express";
import multer from "multer";
import generateImage from "../controllers/imageGeneration.js";
import textEnhance from "../controllers/textEnhance.js";
import analyzeImage from "../controllers/imageAnalysis.js";

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post("/gen-image", generateImage);
router.post("/text-enhance", textEnhance);
router.post("/analyze-image", upload.single("image"), analyzeImage);

export default router;
