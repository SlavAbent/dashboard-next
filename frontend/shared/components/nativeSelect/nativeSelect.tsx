import { cn } from '@lib/cn';
import type { ComponentProps } from 'react';

type NativeSelectProps = ComponentProps<'select'> & {
  containerClassName?: string;
};

export const NativeSelect = ({
  className,
  containerClassName,
  children,
  ...props
}: NativeSelectProps) => (
  <div className={cn('relative inline-block', containerClassName)}>
    <select className={cn('appearance-none pr-8', className)} {...props}>
      {children}
    </select>
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      fill="none"
      className="text-muted-foreground pointer-events-none absolute top-1/2 right-2.5 size-4 -translate-y-1/2">
      <path
        d="m4 6 4 4 4-4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </div>
);
