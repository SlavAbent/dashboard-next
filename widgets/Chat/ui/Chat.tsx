'use client';

import React, { useState } from 'react';
import { useConnectChat } from '@/features/connect-chat/model/useConnectChat';
import { useMessageStore } from '@/entities/message/model/message.store';
import { Input } from '@/shared/ui/input';
import { Button } from '@/shared/ui/button';
import { useSendMessage } from '@/features/connect-chat/model/useSendMessage';

export const ChatBoard = () => {
  useConnectChat();

  const messages = useMessageStore((s) => s.messages);

  const { sendMessage } = useSendMessage();

  const [value, setValue] = useState('');

  const handleSendMessage = () => {
    if (!value.trim()) return;

    sendMessage(value);
    setValue('');
  };

  return (
    <div className="flex flex-col gap-4 p-10">
      <div className="flex h-[400px] flex-col gap-2 overflow-y-auto border p-4">
        {messages.map((message) => (
          <div key={message.id} className="rounded bg-gray-100 p-2">
            {message.text}
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <Input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="border p-2"
          placeholder="Message..."
        />
        <Button
          onClick={handleSendMessage}
          className="bg-black px-4 py-2 text-white">
          Send
        </Button>
      </div>
    </div>
  );
};

export default ChatBoard;
