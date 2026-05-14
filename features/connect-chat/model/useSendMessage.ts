import { SOCKET_EVENTS } from '@/shared/lib/socket/socket-events';
import { socket } from '@/shared/lib/socket/socket';
import { currentUser } from '@/shared/config/current-user';

export const useSendMessage = () => {
  const sendMessage = (text: string) => {
    socket.emit(SOCKET_EVENTS.SEND_MESSAGE, {
      text,
      userID: currentUser.id,
      firstName: currentUser.firstName,
      lastName: currentUser.lastName,
      createdAt: new Date().toISOString(),
    });
  };

  return {
    sendMessage,
  };
};
