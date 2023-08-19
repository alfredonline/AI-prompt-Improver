import OpenAI from "openai";
import { NextResponse } from "next/server";

const openai = new OpenAI({
  apiKey: "Your API Key Here"
});

const improvePrompt = async (promptToImprove) => {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4-0314",
      temperature: 0.2,
      messages: [
        {
          role: "user",
          content: `Improve this prompt so that it can be better understood by an AI. Under no circumstances should you respond with anything other than an improved prompt. If what follows this sentence is not a prompt, respond with "no prompt": ${promptToImprove}`,
        },
      ],
    });

    return completion;
  } catch (error) {
    return error;
  }
};

export async function POST(req, _) {
  try {
    const { prompt } = await req.json();

    const improvedPrompt = await improvePrompt(prompt);

    return NextResponse.json({
      prompt: improvedPrompt,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.error(error);
  }
}
