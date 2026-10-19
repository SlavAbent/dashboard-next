'use client';

import { create } from 'zustand';

import type { ChatMessage } from './types';

type ChatMessageStore = {
  messages: ChatMessage[];
  addMessage: (message: ChatMessage) => void;
  setMessages: (messages: ChatMessage[]) => void;
};

export const useMessageStore = create<ChatMessageStore>((set) => ({
  messages: [],
  addMessage: (message) => {
    set((state) => ({
      messages: state.messages.some((item) => item.id === message.id)
        ? state.messages
        : [...state.messages, message].sort(
            (a, b) => Date.parse(a.createdAt) - Date.parse(b.createdAt)
          ),
    }));
  },
  setMessages: (messages) => {
    set({
      messages: Array.from(
        new Map(messages.map((message) => [message.id, message])).values()
      ).sort((a, b) => Date.parse(a.createdAt) - Date.parse(b.createdAt)),
    });
  },
}));
