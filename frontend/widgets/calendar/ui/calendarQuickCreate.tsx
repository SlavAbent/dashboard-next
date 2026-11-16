import { PlusIcon, XIcon } from 'lucide-react';
import { useState } from 'react';

type CalendarQuickCreateProps = {
  dateKey: string;
  onCreate: (text: string) => void;
};

export const CalendarQuickCreate = ({
  dateKey,
  onCreate,
}: CalendarQuickCreateProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [text, setText] = useState('');

  const submit = () => {
    const value = text.trim();
    if (!value) return;
    onCreate(value);
    setText('');
    setIsOpen(false);
  };

  return (
    <div className="pointer-events-auto relative z-30 size-6 shrink-0">
      {!isOpen && (
        <button
          type="button"
          title="Quick add task"
          aria-label={`Quick add task for ${dateKey}`}
          onClick={() => setIsOpen(true)}
          className="hover:bg-muted absolute inset-0 flex items-center justify-center rounded-sm">
          <PlusIcon className="size-3.5" />
        </button>
      )}
      {isOpen && (
        <div className="bg-background absolute top-0 left-0 flex w-48 items-center gap-1 rounded-sm shadow-md">
          <input
            autoFocus
            aria-label={`New task for ${dateKey}`}
            value={text}
            onChange={(event) => setText(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter') submit();
              if (event.key === 'Escape') setIsOpen(false);
            }}
            className="border-input bg-background h-7 min-w-0 flex-1 rounded-sm border px-2 text-xs"
            placeholder="Task name"
          />
          <button
            type="button"
            aria-label="Cancel quick task"
            onClick={() => setIsOpen(false)}
            className="hover:bg-muted flex size-7 shrink-0 items-center justify-center rounded-sm">
            <XIcon className="size-3" />
          </button>
        </div>
      )}
    </div>
  );
};
