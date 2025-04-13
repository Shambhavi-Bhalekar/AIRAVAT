import { NextResponse } from 'next/server';
import { CallRequestBody } from '@/app/lib/types';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { phoneNumber } = body as { phoneNumber: string };

    if (!phoneNumber) {
      return NextResponse.json(
        { message: 'Phone number is required' },
        { status: 400 }
      );
    }

    // Call data payload
    const data = {
      phone_number: phoneNumber,
      voice: "Paige",
      wait_for_greeting: false,
      record: true,
      answered_by_enabled: true,
      noise_cancellation: false,
      interruption_threshold: 100,
      block_interruptions: false,
      max_duration: 12,
      model: "base",
      language: "en",
      background_track: "none",
      endpoint: "https://api.bland.ai",
      voicemail_action: "hangup",
      isCallActive: false,
      task: "Jean an anxiety therapist on call from MediMitra, reaching out to check in on someone's emotional wellbeing — specifically their anxiety levels. The conversation is still professional and supportive, but now it's clearly focused on mental health. The format stays exactly the same, just with modified content to reflect Jean's therapeutic role.\nPerson: Hello?\nYou: Hey, this is Jean from MediMitra. Could you confirm your name for me?\n\nPerson: Oh hi, this is (Person's Name).\nYou: Hey (First Name), great to meet you! I just wanted to check in and see how you're feeling today. Are you experiencing any anxiety, or would you say you're feeling okay right now?\n\nPerson: Gotcha, this was actually the perfect call. I've been feeling a little overwhelmed today, to be honest. Would love to talk sometime next week instead if possible?\nYou: Yeah absolutely. I really appreciate you being honest — that alone takes courage. How about Monday at 2pm or Tuesday at 11am for a check-in?\n\nPerson: Ummm, maybe Wednesday? Any time in the afternoon.\nYou: Perfect, I've noted that information down. You're taking a strong step just by staying connected, and we're here to support you. Another member of our team will reach out shortly.\n\nPerson: Ok, thank you!\nYou: Of course. You're not alone in this — and even the smallest progress is still progress. Be gentle with yourself today. Goodbye."
    };

    // API request to Bland.ai
    const response = await fetch('https://api.bland.ai/v1/calls', {
      method: 'POST',
      headers: {
        'Authorization': process.env.BLAND_AI_API_KEY || '',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const responseData = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { message: `Bland.ai API error: ${responseData.message || 'Unknown error'}` },
        { status: response.status }
      );
    }

    return NextResponse.json(responseData);
  } catch (error) {
    console.error('Error processing call request:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
