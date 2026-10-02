import { iconMapper } from '@/shared/icons/iconMapper';
import { SvgIconType } from '@/shared/icons/types/icon.types';

export const SvgIcon = ({ icon, className }: SvgIconType) => {
  const normalizeIcon = icon.toLowerCase();
  const Icon = iconMapper[normalizeIcon];

  return (
    <Icon className={`flex size-5 items-center justify-center ${className}`} />
  );
};
