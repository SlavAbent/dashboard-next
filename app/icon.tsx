import { ImageResponse } from 'next/og';

import { LogoIcon } from '@/shared/icons/ui/LogoIcon';

export const size = {
  width: 24,
  height: 24,
};

export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        width: '24px',
        height: '24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <LogoIcon size={size} currentColor="#ffffff" />
    </div>,
    size
  );
}
