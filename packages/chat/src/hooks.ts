'use client';

import { useEffect } from 'react';

import { socket, SOCKET_EVENTS } from './socket';
import { useMessageStore } from './store';
import type { ChatMessage } from './types';

export const useConnectChat = (initialMessages: ChatMessage[]) => {
  const addMessage = useMessageStore((state) => state.addMessage);
  const setMessages = useMessageStore((state) => state.setMessages);

  useEffect(() => {
    setMessages(initialMessages);
    socket.connect();

    const handleReceiveMessage = (message: ChatMessage) => {
      addMessage(message);
    };

    socket.on(SOCKET_EVENTS.RECEIVE_MESSAGE, handleReceiveMessage);

    return () => {
      socket.off(SOCKET_EVENTS.RECEIVE_MESSAGE, handleReceiveMessage);
      socket.disconnect();
    };
  }, [addMessage, initialMessages, setMessages]);
};

export const useSendMessage = () => ({
  sendMessage: (text: string) => {
    socket.emit(SOCKET_EVENTS.SEND_MESSAGE, { text });
  },
});
