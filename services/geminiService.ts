import { GoogleGenAI } from "@google/genai";
import { WishRequest } from "../types.ts";

export const generateBirthdayWish = async (request: WishRequest): Promise<string> => {
  try {
    // Robust check for process and API_KEY
    const apiKey = (typeof process !== 'undefined' && process.env) ? process.env.API_KEY : null;

    if (!apiKey) {
        console.warn("API Key not found, using fallback message.");
        return `To my dearest Hanine, you are my soulmate and my sister by heart. Having you in my life is the greatest adventure. Happy Birthday!`;
    }

    const ai = new GoogleGenAI({ apiKey });

    const prompt = `
      Write a deeply emotional, poetic, and beautiful short birthday letter (approx 50-60 words).
      Target: My soulmate and best friend, ${request.name}.
      Tone: ${request.tone} (but always keep it loving and warm).
      Key Themes: Unbreakable bond, forever friendship, gratitude for her existence.
      Specific likes: ${request.likes}.
      
      Start directly with the letter. Use elegant, high-end poetic language.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });

    return response.text || "To my dearest Hanine, words cannot describe how lucky I am to have you. You are my soulmate, my sister, and my forever person. Happy Birthday!";
  } catch (error) {
    console.error("Error generating wish:", error);
    return "To my beautiful Hanine, on your special day, I just want you to know that you mean the universe to me. Happy Birthday, soulmate!";
  }
};