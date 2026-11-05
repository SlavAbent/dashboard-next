import { AvatarSize } from '@/shared/components/avatar/types/avatar.types';

export type DropdownItem = {
  id: string;
  title?: string;
  onClick?: () => void;
  style?: 'default' | 'destructive';
  separator?: boolean;
  isLogout?: boolean;
};

export type DropdownBase = {
  src?: string;
  isAvatar?: boolean;
  text?: string;
  compactText?: string;
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
  | 'src'
  | 'text'
  | 'compactText'
  | 'size'
  | 'classNameContainer'
  | 'classNameText'
>;

export type DropdownTextProps = Pick<DropdownBase, 'text' | 'classNameText'>;
