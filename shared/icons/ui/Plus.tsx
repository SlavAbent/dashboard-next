import { IconType } from '@/shared/icons/types';

export const Plus = (props: IconType) => {
  return (
    <svg
      width={props.size?.width}
      height={props.size?.height}
      className={props.className}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M13.5 8H2.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8 13.5V2.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
