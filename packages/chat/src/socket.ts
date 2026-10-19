'use client';

import { io } from 'socket.io-client';

export const socket = io({ autoConnect: false });

export const SOCKET_EVENTS = {
  SEND_MESSAGE: 'send-message',
  RECEIVE_MESSAGE: 'receive-message',
} as const;
