import { IconType } from '@/shared/icons/types/icon.types';

export const Favicon = (props: IconType) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.size?.width}
      height={props.size?.height}
      className={props.className}
      viewBox="0 0 24 24"
      fill="none"
      stroke={props.currentColor}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
    </svg>
  );
};
