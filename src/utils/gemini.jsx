import { GoogleGenAI } from "@google/genai";

// WARNING: In production, call this from a backend to hide your API Key.
// For development, use an environment variable (e.g., VITE_GEMINI_API_KEY)
const client = new GoogleGenAI({
  apiKey: process.env.REACT_APP_GEMINI_API_KEY,
});

export const generateResponse = async (prompt) => {
  try {
    // Using the latest Gemini 3 model
    const response = await client.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    });

    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Error generating response.";
  }
};
