import { NextResponse } from 'next/server';

const BACKEND_URL = process.env.BACKEND_URL!;

console.log('BACKEND_URL', BACKEND_URL);

export async function GET() {
  const response = await fetch(`${BACKEND_URL}/users`, {
    next: {
      revalidate: 10,
    },
  });

  if (!response.ok) {
    return NextResponse.json(
      {
        message: 'Failed to fetch users',
      },
      {
        status: response.status,
      }
    );
  }

  const users = await response.json();

  return NextResponse.json(users);
}
