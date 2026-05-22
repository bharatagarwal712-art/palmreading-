import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const question = body.question;

    return NextResponse.json({
      answer:
        "Your palm reading suggests emotional depth, reflective thinking, and intuitive awareness. Regarding your question: " +
        question,
    });
  } catch {
    return NextResponse.json(
      {
        answer: "Something went wrong while processing your palm question.",
      },
      {
        status: 500,
      }
    );
  }
}
