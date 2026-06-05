import { AvatarSize } from '@/shared/components/Avatar/types/avatar.types';

export type DropdownItem = {
  id: string;
  title?: string;
  onClick?: () => void;
  destructive?: boolean;
  separator?: boolean;
};

export type DropdownBase = {
  src?: string;
  isAvatar?: boolean;
  text?: string;
  size?: AvatarSize;
  className?: string;
  classNameText?: string;
  classNameContainer?: string;
};

export type DropdownProps = DropdownBase & {
  options?: DropdownItem[];
};

export type DropdownHeaderProps = Pick<
  DropdownBase,
  'src' | 'text' | 'size' | 'classNameContainer' | 'classNameText'
>;

export type DropdownTextProps = Pick<DropdownBase, 'text' | 'classNameText'>;
