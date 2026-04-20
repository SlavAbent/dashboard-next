import { IconType } from '@/shared/icons/types';

export const List = (props: IconType) => {
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
      <rect width="18" height="18" x="3" y="3" rx="2" />
      <path d="M3 12h18" />
    </svg>
  );
};
