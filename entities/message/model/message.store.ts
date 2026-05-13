import { create } from 'zustand';
import { ChatMessage } from '@/entities/message/types/message.types';

interface ChatMessageStore {
  messages: ChatMessage[];

  addMessage: (message: ChatMessage) => void;
}

export const useMessageStore = create<ChatMessageStore>((set) => ({
  messages: [],

  addMessage: (message) => {
    set((state) => ({
      messages: [...state.messages, message],
    }));
  },
}));
