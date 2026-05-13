import { SOCKET_EVENTS } from '@/shared/lib/socket/socket-events';
import { socket } from '@/shared/lib/socket/socket';

export const useSendMessage = () => {
  const sendMessage = (text: string) => {
    socket.emit(SOCKET_EVENTS.SEND_MESSAGE, {
      text,
    });
  };

  return {
    sendMessage,
  };
};
