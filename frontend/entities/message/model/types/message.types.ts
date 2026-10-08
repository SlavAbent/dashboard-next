export interface ChatMessage {
  id: string;
  userId: string;
  text: string;
  createdAt: string;
  author: {
    id: string;
    firstName: string;
    lastName: string;
  } | null;
}