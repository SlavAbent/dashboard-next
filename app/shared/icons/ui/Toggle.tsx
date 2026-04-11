import { IconType } from '@/app/shared/icons/types';

export const Toggle = (props: IconType) => {
  return (
    <svg
      width={props.size?.width}
      height={props.size?.height}
      className={props.className}
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <rect width="28" height="28" rx="2" fill="#F2F2F2" />
      <path
        d="M10.25 10.25L6.5 14L10.25 17.75"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M17.75 10.25L21.5 14L17.75 17.75"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};
