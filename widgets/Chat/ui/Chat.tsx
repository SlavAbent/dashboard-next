'use client';

import cn from 'clsx';
import React, { useState } from 'react';

import { useMessageStore } from '@/entities/message/model/message.store';
import { useUserStore } from '@/entities/user';
import { useConnectChat } from '@/features/connect-chat/model/useConnectChat';
import { useSendMessage } from '@/features/connect-chat/model/useSendMessage';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/shared/components/Avatar/avatar';
import { Button } from '@/shared/components/Button/button';
import { Input } from '@/shared/components/Input/input';
import { TypographySmall } from '@/shared/components/Typography/TypographySmall';
import { currentUser } from '@/shared/config/current-user';

export const ChatBoard = () => {
  useConnectChat();
  const [value, setValue] = useState('');

  const messages = useMessageStore((s) => s.messages);
  const users = useUserStore((s) => s.users);
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
            const author = users[message.userId];
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
                  <div className="bg-muted max-w-auto mb-2 flex flex-col items-start rounded-xl">
                    <div className="mb-2 flex w-full items-end">
                      <Avatar className="mr-2 h-8 w-8">
                        <AvatarImage src={''} alt="avatar" />
                        <AvatarFallback>
                          {author?.firstName?.[0] ?? '?'}
                        </AvatarFallback>
                      </Avatar>
                      <div className="text-muted-foreground ml-2 text-[10px]">
                        {createdAtTime}
                      </div>
                    </div>
                    <div className="flex items-center">
                      <p className="mr-1 text-sm font-bold">
                        {author?.firstName}
                      </p>
                      <p className="text-sm font-bold">{author?.lastName}</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground text-xs">
                    {message.text}
                  </p>
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
