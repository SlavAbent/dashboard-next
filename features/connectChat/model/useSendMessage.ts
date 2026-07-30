import { currentUser } from '@/shared/config/currentUser';
import { socket } from '@/shared/lib/socket/socket';
import { SOCKET_EVENTS } from '@/shared/lib/socket/socketEvents';

export const useSendMessage = () => {
  const sendMessage = (text: string) => {
    socket.emit(SOCKET_EVENTS.SEND_MESSAGE, {
      text,
      userId: currentUser.id,
      createdAt: new Date().toISOString(),
    });
  };

  return {
    sendMessage,
  };
};
