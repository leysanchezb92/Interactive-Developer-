const express = require("express");
const cors = require("cors");
const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

if (!GEMINI_API_KEY) {
  console.warn("WARNING: GEMINI_API_KEY not defined in .env.");
}

/**
 * Initialize GoogleGenerativeAI client.
 */
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

/**
 * promptQueries
 */
const promptQueries = [
  { id: 1, text: "Descubre la nueva colección de zapatillas urbanas." },
  { id: 2, text: "Innovación y estilo en cada paso." },
  { id: 3, text: "Tu look merece un upgrade." },
  { id: 4, text: "Diseños creados con inteligencia artificial." },
  { id: 5, text: "Explora moda que piensa en ti." },
  { id: 6, text: "Tecnología y tendencia en un solo producto." },
  { id: 7, text: "El futuro de la moda está aquí." },
  { id: 8, text: "Cada prenda cuenta una historia única." },
  { id: 9, text: "Estilo que se adapta a tu país y cultura." },
  { id: 10, text: "Personaliza tu outfit con IA." },
  { id: 11, text: "Moda sostenible con visión tecnológica." },
  { id: 12, text: "Diseños exclusivos generados por algoritmos." },
  { id: 13, text: "Tu marca favorita reinventada con IA." },
  { id: 14, text: "Explora tendencias globales al instante." },
  { id: 15, text: "Creatividad ilimitada en cada producto." },
  { id: 16, text: "La moda que evoluciona contigo." },
  { id: 17, text: "Estilo premium con inteligencia artificial." },
  { id: 18, text: "Diseños que rompen fronteras." },
  { id: 19, text: "Tu outfit, tu identidad, tu IA." },
  { id: 20, text: "Explora lo inesperado en cada colección." },
  { id: 21, text: "Moda que entiende tus preferencias." },
  { id: 22, text: "Diseños creados para tu país y cultura." },
  { id: 23, text: "Cada producto es único gracias a IA." },
  { id: 24, text: "Tu estilo, potenciado por algoritmos." },
  { id: 25, text: "La moda del mañana, hoy." }
];

/**
 * getRandomContent
 * ----------------
 * Returns a random creative seed string from promptQueries.
 *
 * @returns {string} - creative seed text
 */
function getRandomContent() {
  const randomIndex = Math.floor(Math.random() * promptQueries.length);
  return promptQueries[randomIndex].text;
}

/**
 * GET /api/content
 * ----------------
 * Query params:
 *  - brand (string)   default: "Nike"
 *  - country (string) default: "Colombia"
 *  - product (string) default: "zapatillas"
 *
 * Response:
 *  On success, returns JSON:
 *    { brand, country, product, text, cta, color }
 *
 *  On failure (AI error or parse error), returns a safe fallback object so
 *  clients can continue functioning without UI breakage.
 */
app.get("/api/content", async (req, res) => {
  const { brand = "Nike", country = "Colombia", product = "zapatillas" } = req.query;

  try {
    // Acquire the model instance. Adjust parameters according to the SDK's API.
    const model = genAI.getGenerativeModel(
      { model: "gemini-2.5-flash" },
      { apiVersion: "v1" }
    );

    // Build the prompt. The instruction forces the model to output only JSON
    // with the exact structure the client expects. This helps simplify parsing.
    const prompt = `Actúa como un creativo publicitario. Genera un objeto JSON para un anuncio de la marca ${brand} en ${country} sobre ${product} en el contexto: ${getRandomContent()}
    El JSON debe tener exactamente esta estructura:
    {
      "text": "un eslogan creativo de máximo 40 caracteres",
      "cta": "texto del botón (ej: Compra ya)",
      "color": "un color hexadecimal que combine con la marca"
    }
    Devuelve ÚNICAMENTE el código JSON, sin explicaciones ni marcas de markdown.`;

    console.log("Sending prompt to Gemini:", prompt);

    // Generate content using the model. The exact method names depend on the client lib.
    const result = await model.generateContent(prompt);
    const response = await result.response;
    let rawText = response.text();

    // Remove possible markdown fences like ```json ... ``` to make parsing robust.
    const cleanJson = rawText.replace(/```json|```/g, "").trim();

    // Parse the JSON produced by the model
    const adData = JSON.parse(cleanJson);

    // Return structured ad data to the client
    res.json({
      brand,
      country,
      product,
      text: adData.text,
      cta: adData.cta,
      color: adData.color
    });

  } catch (error) {
    // Log detailed error for diagnostics and return a safe fallback object.
    console.error("Error with Gemini request:", error);

    res.status(200).json({
      brand,
      text: `Lo mejor de ${brand} en ${country}`,
      cta: "Ver más",
      color: "#333333"
    });
  }
});

/**
 * Start server
 * ------------
 * PORT is read from environment or defaults to 3000.
 */
const PORT = Number(process.env.PORT) || 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});