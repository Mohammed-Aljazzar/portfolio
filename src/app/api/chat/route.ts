import { NextRequest, NextResponse } from "next/server";
import { queryKnowledgeBase } from "@/lib/ai/knowledgeBase";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const message = body?.message || "";
    const lang = body?.lang === "en" ? "en" : "ar";

    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { error: "Invalid message" },
        { status: 400 }
      );
    }

    // Limit length to prevent buffer overloads
    const sanitizedInput = message.slice(0, 500);

    const result = queryKnowledgeBase(sanitizedInput, lang);

    return NextResponse.json({
      success: true,
      reply: result.reply,
      category: result.category,
      suggestedQuestions: result.suggestedQuestions || []
    });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      {
        success: false,
        reply: "عذراً، حدث خطأ مؤقت في معالجة طلبك. يرجى المحاولة مرة أخرى أو مراسلتنا مباشرة عبر واتساب.",
        category: "fallback"
      },
      { status: 500 }
    );
  }
}
