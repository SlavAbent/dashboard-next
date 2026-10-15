import { socket } from '@lib/socket/socket';
import { SOCKET_EVENTS } from '@lib/socket/socketEvents';

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
