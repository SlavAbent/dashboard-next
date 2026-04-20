import { ReactNode } from 'react';

export type DropdownOption = {
  id: number;
  title: string;
};

export type MenuProps = {
  label: string;
  open: boolean;
  icon: ReactNode;
  onOpenChange: (value: boolean) => void;
  options: DropdownOption[];
  onSelect?: (option: DropdownOption) => void;
};
