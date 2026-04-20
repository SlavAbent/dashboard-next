import { IconType } from '@/shared/icons/types';

export const Kanban = (props: IconType) => {
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
      <path d="M5 3v14" />
      <path d="M12 3v8" />
      <path d="M19 3v18" />
    </svg>
  );
};
