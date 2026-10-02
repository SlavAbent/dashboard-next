'use client';

import cn from 'clsx';

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/shared/components/avatar/avatar';
import { DropdownHeaderProps } from '@/shared/components/dropdown/types/dropdown.types';
import DropdownText from '@/shared/components/dropdown/ui/dropdownText';

export function DropdownHeader({
  src,
  text = 'User',
  size,
  classNameContainer,
  classNameText,
}: DropdownHeaderProps) {
  const avatarName = text.trim().charAt(0).toUpperCase();

  return (
    <div className={cn('flex items-center gap-2', classNameContainer)}>
      <Avatar size={size} className="size-7">
        <AvatarImage src={src} alt={text} />
        <AvatarFallback>{avatarName}</AvatarFallback>
      </Avatar>
      <DropdownText classNameText={classNameText} text={text} />
    </div>
  );
}
