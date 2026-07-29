import { ImageResponse } from 'next/og';

import { Favicon } from '@/shared/icons/ui/Favicon';

export const size = {
  width: 32,
  height: 32,
};

const faviconContainerStyle = {
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    <div style={faviconContainerStyle}>
      <Favicon size={{ width: 24, height: 24 }} currentColor="#ffffff" />
    </div>,
    size
  );
}
