import { LogoIcon } from '@dashboard/ui/icons';
import { ImageResponse } from 'next/og';

export const dynamic = 'force-static';

export const size = {
  width: 512,
  height: 512,
};

export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        width: '512px',
        height: '512px',
        background: '#111827',
        borderRadius: '96px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <LogoIcon size={{ width: 320, height: 320 }} currentColor="#ffffff" />
    </div>,
    size
  );
}
