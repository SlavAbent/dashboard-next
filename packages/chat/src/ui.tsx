'use client';

import {
  type ButtonHTMLAttributes,
  type ChangeEvent,
  type InputHTMLAttributes,
  useEffect,
  useState,
} from 'react';

import { useConnectChat, useSendMessage } from './hooks';
import { useMessageStore } from './store';
import type { CurrentUser } from './types';

const joinClasses = (...classes: Array<string | undefined | false>) =>
  classes.filter(Boolean).join(' ');

const DEFAULT_USER: CurrentUser = {
  id: '1',
  firstName: 'Svyatoslav',
  lastName: 'Abent',
};

const Input = ({
  className = '',
  ...props
}: InputHTMLAttributes<HTMLInputElement>) => (
  <input
    {...props}
    className={`border-input focus-visible:border-ring focus-visible:ring-ring/50 w-full rounded-sm border bg-transparent py-[7px] pl-3 text-[14px] transition-colors outline-none focus-visible:ring-1 ${className}`}
  />
);

const Button = ({
  className = '',
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button
    type="button"
    {...props}
    className={`bg-secondary text-secondary-foreground flex h-9 cursor-pointer items-center justify-center gap-2 rounded-sm px-2.5 text-xs font-medium ${className}`}
  />
);

const Avatar = () => (
  <div className="bg-muted text-muted-foreground flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm">
    S
  </div>
);

const useScrollHighlight = (
  messageId: string | undefined,
  messageReady: boolean
) => {
  useEffect(() => {
    if (!messageId || !messageReady) return;

    const element = document.querySelector<HTMLElement>(
      `[data-message-id="${CSS.escape(messageId)}"]`
    );
    if (!element) return;

    element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    element.classList.add('search-highlight');

    const timer = window.setTimeout(
      () => element.classList.remove('search-highlight'),
      1200
    );

    return () => {
      window.clearTimeout(timer);
      element.classList.remove('search-highlight');
    };
  }, [messageId, messageReady]);
};

type ChatBoardProps = {
  messageId?: string;
  currentUser?: CurrentUser;
};

export const ChatBoard = ({
  messageId,
  currentUser = DEFAULT_USER,
}: ChatBoardProps) => {
  useConnectChat();

  const [value, setValue] = useState('');
  const messages = useMessageStore((state) => state.messages);
  useScrollHighlight(
    messageId,
    messages.some((message) => message.id === messageId)
  );
  const { sendMessage } = useSendMessage();

  const handleSendMessage = () => {
    if (!value.trim()) return;
    sendMessage(value);
    setValue('');
  };

  return (
    <div className="flex h-full flex-col gap-4 p-10">
      <div className="flex h-full max-h-100 flex-col gap-4 overflow-scroll overflow-y-auto border p-4">
        {messages.map((message) => {
          const isCurrentUser = message.userId === currentUser.id;
          const author = message.author;
          const createdAtTime = new Date(message.createdAt).toLocaleTimeString(
            [],
            { hour: '2-digit', minute: '2-digit' }
          );

          return (
            <div
              key={message.id}
              data-message-id={message.id}
              className={joinClasses(
                'flex',
                isCurrentUser ? 'justify-end' : 'justify-start'
              )}>
              <div className="flex flex-col">
                <div className="bg-muted max-w-auto mb-2 flex flex-col items-start rounded-xl">
                  <div className="mb-2 flex w-full items-end">
                    <Avatar />
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
                <p className="text-muted-foreground text-xs">{message.text}</p>
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex items-center gap-2">
        <Input
          value={value}
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            setValue(event.target.value)
          }
          onKeyDown={(event) => {
            if (event.key === 'Enter') handleSendMessage();
          }}
          className="w-100 border p-2"
          placeholder="Message..."
        />
        <Button onClick={handleSendMessage} className="w-25 py-4.5">
          Send
        </Button>
      </div>
    </div>
  );
};
