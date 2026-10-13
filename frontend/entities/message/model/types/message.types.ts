export type ChatAuthor = {
  id: string;
  firstName: string;
  lastName: string;
};

export type ChatMessage = {
  id: string;
  userId: string;
  text: string;
  createdAt: string;
  author: ChatAuthor | null;
};
