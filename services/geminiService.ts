
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function getTutorFeedback(question: string, userAnswer: string, context: string) {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Context: ${context}\nQuestion: ${question}\nUser's Answer: ${userAnswer}\n\nPlease act as a friendly data analyst tutor. Tell the user if they were close, explain the concept simply, and give them a small tip for the next lesson. Keep it under 3 sentences.`,
      config: {
        temperature: 0.7,
        maxOutputTokens: 200,
      }
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Great effort! Keep practicing your SQL queries.";
  }
}

export async function generateSQLChallenge(topic: string) {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Generate a fun, short SQL challenge for a beginner data analyst about ${topic}. Provide a scenario and the objective.`,
      config: {
        temperature: 0.9,
        maxOutputTokens: 300,
      }
    });
    return response.text;
  } catch (error) {
    return "Try writing a query that counts total deaths by continent!";
  }
}
