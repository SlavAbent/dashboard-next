import { Input as InputPrimitive } from '@base-ui/react/input';
import * as React from 'react';

import { InputProps } from '@/shared/components/input/input.types';
import { cn } from '@/shared/lib/cn';

export const Input = ({
  className,
  classNameContainer,
  type,
  leftIcon,
  rightIcon,
  onChange,
  ...props
}: InputProps) => {
  return (
    <div className={cn('relative w-full', classNameContainer)}>
      {leftIcon && (
        <div className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 -translate-y-1/2">
          {leftIcon}
        </div>
      )}

      <InputPrimitive
        type={type}
        onChange={onChange}
        data-slot="input"
        className={cn(
          'border-input w-full rounded-sm border bg-transparent py-[7px] text-[14px] transition-colors outline-none',
          leftIcon ? 'pl-10' : 'pl-3',
          rightIcon ? 'pr-18' : 'pr-3',
          'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-1',
          className
        )}
        {...props}
      />

      {rightIcon && (
        <div className="text-muted-foreground absolute top-1/2 right-3 -translate-y-1/2">
          {rightIcon}
        </div>
      )}
    </div>
  );
};
