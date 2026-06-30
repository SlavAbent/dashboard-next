'use client';

import { Avatar as AvatarPrimitive } from '@base-ui/react/avatar';
import * as React from 'react';

import { AvatarSize } from '@/shared/components/Avatar/types/avatar.types';
import { cn } from '@/shared/lib/cn';

function Avatar({
  className,
  size = 'default',
  ...props
}: AvatarPrimitive.Root.Props & {
  size?: AvatarSize;
}) {
  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      data-size={size}
      className={cn(
        'group/avatar',
        'relative flex size-8 shrink-0 select-none',
        'rounded-full',
        'after:absolute after:inset-0',
        'after:border-border after:rounded-full after:border',
        'after:mix-blend-darken',
        'data-[size=lg]:size-10 data-[size=sm]:size-6',
        'dark:after:mix-blend-lighten',
        className
      )}
      {...props}
    />
  );
}

function AvatarImage({
  className,
  alt = 'avatar',
  ...props
}: AvatarPrimitive.Image.Props) {
  return (
    <AvatarPrimitive.Image
      alt={alt}
      data-slot="avatar-image"
      className={cn(
        'aspect-square size-full rounded-full object-cover',
        className
      )}
      {...props}
    />
  );
}

function AvatarFallback({
  className,
  ...props
}: AvatarPrimitive.Fallback.Props) {
  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      className={cn(
        'flex items-center justify-center',
        'bg-muted rounded-full',
        'text-muted-foreground text-sm',
        'size-full group-data-[size=sm]/avatar:text-xs',
        className
      )}
      {...props}
    />
  );
}

export { Avatar, AvatarFallback, AvatarImage };
