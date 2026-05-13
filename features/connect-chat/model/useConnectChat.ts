import { useMessageStore } from '@/entities/message/model/message.store';
import { useEffect } from 'react';

import { socket } from '@/shared/lib/socket/socket';
import { SOCKET_EVENTS } from '@/shared/lib/socket/socket-events';
import { ChatMessage } from '@/entities/message/types/message.types';

export const useConnectChat = () => {
  const addMessage = useMessageStore((s) => s.addMessage);

  useEffect(() => {
    socket.connect();

    const handleReceiveMessage = (message: ChatMessage) => {
      addMessage(message);
    };

    socket.on(SOCKET_EVENTS.RECEIVE_MESSAGE, handleReceiveMessage);

    return () => {
      socket.off(SOCKET_EVENTS.RECEIVE_MESSAGE, handleReceiveMessage);

      socket.disconnect();
    };
  }, [addMessage]);
};
