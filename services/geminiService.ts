import { GoogleGenAI } from "@google/genai";
import { WishRequest } from "../types.ts";

export const generateBirthdayWish = async (request: WishRequest): Promise<string> => {
  try {
    if (!process.env.API_KEY) {
        throw new Error("API Key not found");
    }

    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

    // Specialized prompt for Hanine / Soulmate context
    const prompt = `
      Write a deeply emotional, poetic, and beautiful short birthday letter (approx 50-60 words).
      Target: My soulmate and best friend, ${request.name}.
      Tone: ${request.tone} (but always keep it loving and warm).
      Key Themes: Unbreakable bond, forever friendship, gratitude for her existence.
      Specific likes to weave in metaphorically if possible: ${request.likes}.
      
      Do not start with "Here is a wish". Start directly with the letter. Use elegant language.
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