import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = "AIzaSyDXJ5VIprw8Hgx_sr9qY4tMDQf6PnBF2nI";
 // Replace with your actual Gemini API key
const genAI = new GoogleGenerativeAI(API_KEY);

// Helper function to delay execution
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Track the last request time to enforce 10-second delay
let lastRequestTime = 0;

export const getOutline = async (prompt) => {
  // Calculate time since last request
  const now = Date.now();
  const timeSinceLastRequest = now - lastRequestTime;
  const delayNeeded = 1000 - timeSinceLastRequest; // 10 seconds in ms

  // Wait if needed
  if (delayNeeded > 0) {
    await sleep(delayNeeded);
  }

  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" }); // Or "gemini-2.0-flash" as available
  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();

  // Update last request time
  lastRequestTime = Date.now();

  return text;
};
