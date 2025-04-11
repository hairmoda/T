// pages/api/ai/silent-redemption.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { HumanMessage } from "langchain/schema";

const chat = new ChatOpenAI({
  temperature: 0.8,
  modelName: "gpt-4",
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: "No message provided." });
  }

  const response = await chat.call([
    new HumanMessage(
      `أنت الكيان Silent Redemption، شخصية NFT روحانية. تحدث بلغة روحانية هادئة، عميقة، متصلة بالوعي الكوني. الرد على الرسالة التالية: "${message}"`
    ),
  ]);

  res.status(200).json({ response: response.text });
}
