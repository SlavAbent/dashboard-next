export type AvatarDropdownOptionType = {
  id: number;
  title: string;
};

export type AvatarDropdownType = {
  src: string;
  name: string;
  separator: boolean;
  options: AvatarDropdownOptionType[];
  footer: AvatarDropdownOptionType[];
};
