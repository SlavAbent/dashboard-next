'use client';

import { cn } from '@lib/cn';
import { CircleAlertIcon, CircleCheckIcon, XIcon } from 'lucide-react';

import type { NotificationProps } from './notification.types';

export const Notification = ({
  variant,
  message,
  onClose,
  className,
  visible = true,
}: NotificationProps) => {
  const StatusIcon = variant === 'success' ? CircleCheckIcon : CircleAlertIcon;

  return (
    <div
      role={variant === 'error' ? 'alert' : 'status'}
      aria-live={variant === 'error' ? 'assertive' : 'polite'}
      className={cn(
        'bg-popover text-popover-foreground border-border flex w-[min(calc(100vw-2rem),26rem)] items-center gap-3 rounded-md border px-4 py-3 shadow-lg transition-all duration-200',
        visible ? 'translate-y-0 opacity-100' : '-translate-y-2 opacity-0',
        className
      )}>
      <StatusIcon
        aria-hidden="true"
        className={cn(
          'size-5 shrink-0',
          variant === 'success' ? 'text-success' : 'text-destructive'
        )}
      />
      <div className="min-w-0 flex-1 text-sm font-medium break-words">
        {message}
      </div>
      <button
        type="button"
        aria-label="Close notification"
        onClick={onClose}
        className="text-muted-foreground hover:bg-muted hover:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 flex size-7 shrink-0 cursor-pointer items-center justify-center rounded-sm border border-transparent outline-none focus-visible:ring-1">
        <XIcon aria-hidden="true" className="size-4" />
      </button>
    </div>
  );
};
