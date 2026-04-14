import * as React from 'react';
import { Input as InputPrimitive } from '@base-ui/react/input';
import { cn } from '@/lib/utils';

type InputProps = React.ComponentProps<'input'> & {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
};

function Input({ className, type, leftIcon, rightIcon, ...props }: InputProps) {
  return (
    <div className="relative w-fit">
      {leftIcon && (
        <div className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 -translate-y-1/2">
          {leftIcon}
        </div>
      )}

      <InputPrimitive
        type={type}
        data-slot="input"
        className={cn(
          'w-full rounded-sm border border-[#AFAFAF] bg-transparent py-[7px] text-[14px] transition-colors outline-none',
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
}

export { Input };
