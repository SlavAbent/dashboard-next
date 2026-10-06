import { useEffect } from 'react';

import { getChat } from '@/entities/chat';
import { useMessageStore } from '@/entities/message/model/message.store';
import { ChatMessage } from '@/entities/message/model/types/message.types';

import { socket } from '../../../../lib/socket/socket';
import { SOCKET_EVENTS } from '../../../../lib/socket/socketEvents';

export const useConnectChat = () => {
  const addMessage = useMessageStore((s) => s.addMessage);
  const setMessages = useMessageStore((s) => s.setMessages);

  useEffect(() => {
    const init = async () => {
      try {
        const messages = await getChat();

        setMessages(messages);
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
      socket.off(SOCKET_EVENTS.RECEIVE_MESSAGE, handleReceiveMessage);

      socket.disconnect();
    };
  }, [addMessage, setMessages]);
};
