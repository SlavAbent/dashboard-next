// entities/message/api/getChatMessages.server.ts
import type {
  ChatAuthor,
  ChatMessage,
} from '@/entities/message/model/types/message.types';

type BackendUser = ChatAuthor;

type BackendMessage = {
  id: string;
  userId: string;
  text: string;
  createdAt: string;
};

const getBackendUrl = () => {
  const url = process.env.BACKEND_URL;

  if (!url) {
    throw new Error('BACKEND_URL is not set');
  }

  return url;
};

export const getChatMessages = async (): Promise<ChatMessage[]> => {
  const backendUrl = getBackendUrl();

  const [messagesResponse, usersResponse] = await Promise.all([
    fetch(`${backendUrl}/messages`, { cache: 'no-store' }),
    fetch(`${backendUrl}/users`, { cache: 'no-store' }),
  ]);

  if (!messagesResponse.ok || !usersResponse.ok) {
    throw new Error(
      `Failed to fetch chat data: messages ${messagesResponse.status}, users ${usersResponse.status}`
    );
  }

  const [messages, users] = (await Promise.all([
    messagesResponse.json(),
    usersResponse.json(),
  ])) as [BackendMessage[], BackendUser[]];

  const usersById = new Map(users.map((user) => [user.id, user]));

  return messages.map((message) => {
    const author = usersById.get(message.userId);

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
};
