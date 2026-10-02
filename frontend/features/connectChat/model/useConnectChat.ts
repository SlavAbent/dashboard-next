import { useEffect } from 'react';

import { getMessage } from '@/entities/message/api/getMessage';
import { useMessageStore } from '@/entities/message/model/message.store';
import { ChatMessage } from '@/entities/message/model/types/message.types';
import { getUsers, useUserStore } from '@/entities/user';
import { socket } from '@/shared/lib/socket/socket';
import { SOCKET_EVENTS } from '@/shared/lib/socket/socketEvents';

export const useConnectChat = () => {
  const addMessage = useMessageStore((s) => s.addMessage);
  const setMessages = useMessageStore((s) => s.setMessages);
  const setUsers = useUserStore((s) => s.setUsers);

  useEffect(() => {
    const init = async () => {
      const [messagesResult, usersResult] = await Promise.allSettled([
        getMessage(),
        getUsers(),
      ]);

      if (usersResult.status === 'fulfilled') {
        setUsers(usersResult.value);
      }

      if (messagesResult.status === 'fulfilled') {
        setMessages(messagesResult.value);
      }
    };

    init();

    socket.connect();

    const handleReceiveMessage = (message: ChatMessage) => addMessage(message);

    socket.on(SOCKET_EVENTS.RECEIVE_MESSAGE, handleReceiveMessage);

    return () => {
      socket.off(SOCKET_EVENTS.RECEIVE_MESSAGE, handleReceiveMessage);

      socket.disconnect();
    };
  }, [addMessage, setMessages, setUsers]);
};
