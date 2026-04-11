import { SvgIconType } from '@/app/shared/ui/SvgIcon/types';
import { iconMapper } from '@/app/shared/icons/iconMapper';

export const SvgIcon = ({ icon, className }: SvgIconType) => {
  const Icon = iconMapper[icon];

  return (
    <Icon
      className={`mr-5 flex h-5 w-5 items-center justify-center ${className}`}
    />
  );
};
