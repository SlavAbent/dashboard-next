import { NextResponse } from 'next/server';

const BACKEND_URL = process.env.BACKEND_URL!;

type BackendUser = {
  id: string;
  firstName: string;
  lastName: string;
};

type BackendMessage = {
  id: string;
  userId: string;
  text: string;
  createdAt: string;
};

export async function GET() {
  const [messagesResponse, usersResponse] = await Promise.all([
    fetch(`${BACKEND_URL}/messages`),
    fetch(`${BACKEND_URL}/users`),
  ]);

  if (!messagesResponse.ok || !usersResponse.ok) {
    return NextResponse.json(
      {
        message: 'Failed to fetch chat data',
      },
      {
        status: 500,
      }
    );
  }

  const [messages, users] = await Promise.all([
    messagesResponse.json() as Promise<BackendMessage[]>,
    usersResponse.json() as Promise<BackendUser[]>,
  ]);

  const usersById = Object.fromEntries(users.map((user) => [user.id, user]));

  const result = messages.map((message) => {
    const author = usersById[message.userId];

    return {
      id: message.id,
      userId: message.userId,
      text: message.text,
      createdAt: message.createdAt,
      author: author
        ? {
            id: author.id,
            firstName: author.firstName,
            lastName: author.lastName,
          }
        : null,
    };
  });

  return NextResponse.json(result);
}
