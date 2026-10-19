import { getChatMessages } from '@dashboard/chat';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const messages = await getChatMessages();

    return NextResponse.json(messages);
  } catch (error) {
    console.error('[api/chat] GET failed:', error);

    return NextResponse.json(
      { message: 'Failed to fetch chat data' },
      { status: 500 }
    );
  }
}
