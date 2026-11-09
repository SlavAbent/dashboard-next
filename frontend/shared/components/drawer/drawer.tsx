'use client';

import { Drawer as DrawerPrimitive } from '@base-ui/react/drawer';
import { cn } from '@lib/cn';
import { XIcon } from 'lucide-react';
import * as React from 'react';

export const Drawer = DrawerPrimitive.Root;
export const DrawerClose = DrawerPrimitive.Close;
export const DrawerTrigger = DrawerPrimitive.Trigger;

export const DrawerContent = ({
  className,
  children,
  ...props
}: DrawerPrimitive.Popup.Props) => (
  <DrawerPrimitive.Portal>
    <DrawerPrimitive.Backdrop className="fixed inset-0 z-50 bg-black/40 transition-opacity duration-200 data-ending-style:opacity-0 data-starting-style:opacity-0" />
    <DrawerPrimitive.Viewport className="fixed inset-0 z-50 flex justify-end overflow-hidden">
      <DrawerPrimitive.Popup
        className={cn(
          'bg-background text-foreground flex h-dvh w-[min(100%,30rem)] flex-col border-l shadow-xl transition-transform duration-200 data-ending-style:translate-x-full data-starting-style:translate-x-full',
          className
        )}
        {...props}>
        {children}
      </DrawerPrimitive.Popup>
    </DrawerPrimitive.Viewport>
  </DrawerPrimitive.Portal>
);

export const DrawerHeader = ({
  className,
  ...props
}: React.ComponentProps<'div'>) => (
  <div
    className={cn('flex flex-col gap-1.5 border-b px-6 py-5', className)}
    {...props}
  />
);

export const DrawerTitle = ({
  className,
  ...props
}: DrawerPrimitive.Title.Props) => (
  <DrawerPrimitive.Title
    className={cn('text-lg font-semibold', className)}
    {...props}
  />
);

export const DrawerDescription = ({
  className,
  ...props
}: DrawerPrimitive.Description.Props) => (
  <DrawerPrimitive.Description
    className={cn('text-muted-foreground text-sm', className)}
    {...props}
  />
);

export const DrawerCloseButton = () => (
  <DrawerPrimitive.Close
    aria-label="Close"
    className="text-muted-foreground hover:text-foreground absolute top-5 right-5 cursor-pointer rounded-sm p-1 outline-none focus-visible:ring-2">
    <XIcon className="size-5" />
  </DrawerPrimitive.Close>
);
