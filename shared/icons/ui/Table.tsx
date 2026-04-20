import { IconType } from '@/shared/icons/types';

export const Table = (props: IconType) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.size?.width}
      height={props.size?.height}
      className={props.className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path d="M15 3v18" />
      <rect width="18" height="18" x="3" y="3" rx="2" />
      <path d="M21 9H3" />
      <path d="M21 15H3" />
    </svg>
  );
};
