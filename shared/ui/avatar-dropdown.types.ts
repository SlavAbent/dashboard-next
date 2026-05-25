export type AvatarDropdownOptionType = {
  id: number;
  title: string;
};

export type AvatarDropdownType = {
  src: string;
  name: string;
  separator: boolean;
  className?: string;
  options: AvatarDropdownOptionType[];
  footer: AvatarDropdownOptionType[];
};
