import type { Theme } from '@lib/theme';
import { Laptop, MoonStar, Sun } from 'lucide-react';

export const appearanceOptions: Array<{
  value: Theme;
  label: string;
  icon: typeof Sun;
}> = [
  { value: 'light', label: 'Светлая', icon: Sun },
  { value: 'dark', label: 'Тёмная', icon: MoonStar },
  { value: 'device', label: 'Системная', icon: Laptop },
];

export const colorOptions: Array<{
  value: Extract<Theme, 'yellow' | 'green' | 'red'>;
  label: string;
  swatchClassName: string;
}> = [
  { value: 'yellow', label: 'Жёлтая', swatchClassName: 'bg-yellow-300' },
  { value: 'green', label: 'Зелёная', swatchClassName: 'bg-green-300' },
  { value: 'red', label: 'Красная', swatchClassName: 'bg-red-300' },
];
