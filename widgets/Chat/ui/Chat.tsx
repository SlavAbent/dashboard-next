'use client';

import React, { useState } from 'react';
import { useConnectChat } from '@/features/connect-chat/model/useConnectChat';
import { useMessageStore } from '@/entities/message/model/message.store';
import { Input } from '@/shared/components/input';
import { Button } from '@/shared/components/button';
import { useSendMessage } from '@/features/connect-chat/model/useSendMessage';
import { currentUser } from '@/shared/config/current-user';
import cn from 'clsx';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/shared/components/Avatar/avatar';
import { TypographySmall } from '@/shared/components/Typography/TypographySmall';

export const ChatBoard = () => {
  useConnectChat();
  const [value, setValue] = useState('');

  const messages = useMessageStore((s) => s.messages);
  const { sendMessage } = useSendMessage();

  const handleSendMessage = () => {
    if (!value.trim()) return;

    sendMessage(value);
    setValue('');
  };

  return (
    <div className="flex h-full flex-col gap-4 p-10">
      <div className="flex h-full max-h-[400px] flex-col gap-4 overflow-scroll overflow-y-auto border p-4">
        {messages &&
          messages.map((message) => {
            const isCurrentUser = message.userId === currentUser.id;
            const createdAtTime = new Date(
              message.createdAt
            ).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            });

            return (
              <div
                key={message.id}
                className={cn(
                  'flex',
                  isCurrentUser ? 'justify-end' : 'justify-start'
                )}>
                <div className="flex flex-col">
                  <div className="max-w-auto mb-2 flex flex-col items-start rounded-xl bg-gray-100">
                    <div className="mb-2 flex w-full items-end">
                      <Avatar className="mr-2 h-8 w-8">
                        <AvatarImage src={''} alt="avatar" />
                        <AvatarFallback>A</AvatarFallback>
                      </Avatar>
                      <div className="ml-2 text-[10px] text-gray-500">
                        {createdAtTime}
                      </div>
                    </div>
                    <div className="flex items-center">
                      <p className="mr-1 text-sm font-bold">
                        {message.firstName}
                      </p>
                      <p className="text-sm font-bold">{message.lastName}</p>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500">{message.text}</p>
                </div>
              </div>
            );
          })}
      </div>
      <div className="flex items-center gap-2">
        <Input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="w-[400px] border p-2"
          placeholder="Message..."
        />
        <Button
          onClick={handleSendMessage}
          size="lg"
          className="button w-[100px] rounded-sm py-4.5">
          <TypographySmall text="Send" className="!leading-[150%]" />
        </Button>
      </div>
    </div>
  );
};

export default ChatBoard;
