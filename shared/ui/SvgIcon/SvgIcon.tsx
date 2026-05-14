import { SvgIconType } from '@/shared/ui/SvgIcon/svg-icon.types';
import { iconMapper } from '@/shared/icons/iconMapper';

export const SvgIcon = ({ icon, className }: SvgIconType) => {
  const normalizeIcon = icon.toLowerCase();
  const Icon = iconMapper[normalizeIcon];

  return (
    <Icon className={`flex h-5 w-5 items-center justify-center ${className}`} />
  );
};
