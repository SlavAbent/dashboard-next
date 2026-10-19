'use client';

import { useEffect } from 'react';

import { getChat } from './api';
import { socket, SOCKET_EVENTS } from './socket';
import { useMessageStore } from './store';
import type { ChatMessage } from './types';

export const useConnectChat = () => {
  const addMessage = useMessageStore((state) => state.addMessage);
  const setMessages = useMessageStore((state) => state.setMessages);

  useEffect(() => {
    let cancelled = false;

    const init = async () => {
      try {
        const messages = await getChat();
        if (!cancelled) {
          setMessages([...useMessageStore.getState().messages, ...messages]);
        }
      } catch (error) {
        console.error('Failed to initialize chat', error);
      }
    };

    init();
    socket.connect();

    const handleReceiveMessage = (message: ChatMessage) => {
      addMessage(message);
    };

    socket.on(SOCKET_EVENTS.RECEIVE_MESSAGE, handleReceiveMessage);

    return () => {
      cancelled = true;
      socket.off(SOCKET_EVENTS.RECEIVE_MESSAGE, handleReceiveMessage);
      socket.disconnect();
    };
  }, [addMessage, setMessages]);
};

export const useSendMessage = () => ({
  sendMessage: (text: string) => {
    socket.emit(SOCKET_EVENTS.SEND_MESSAGE, { text });
  },
});
