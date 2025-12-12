import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "HTTP-Referer": process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
        "X-Title": "My Chatbot",
      },
      body: JSON.stringify({
        model: "meta-llama/llama-3.1-8b-instruct",
        messages: body.messages
      })
    });

    const data = await response.json();

    console.log("OpenRouter raw:", data);

    return NextResponse.json({
      reply: {
        role: "assistant",
        content: data.choices?.[0]?.message?.content || ""
      }
    });

  } catch (error) {
    console.log("Chatbot error:", error);
    return NextResponse.json({ error: "Chatbot Error" });
  }
}
