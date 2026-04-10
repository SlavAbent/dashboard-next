import { SvgIconType } from '@/app/shared/components/SvgIcon/types';
import { iconMapper } from '@/app/shared/ui/iconMapper';

export const SvgIcon = ({ icon, className }: SvgIconType) => {
  const Icon = iconMapper[icon];

  return (
    <Icon
      className={`mr-5 flex h-5 w-5 items-center justify-center ${className}`}
    />
  );
};
