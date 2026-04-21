import { IconType } from '@/shared/icons/types';

export const TableIcon = (props: IconType) => {
  return (
    <svg
      width={props.size?.width}
      height={props.size?.height}
      className={props.className}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M2.5 4.375H17.5V15C17.5 15.1658 17.4341 15.3247 17.3169 15.4419C17.1997 15.5592 17.0407 15.625 16.875 15.625H3.125C2.95924 15.625 2.80027 15.5592 2.68306 15.4419C2.56585 15.3247 2.5 15.1658 2.5 15V4.375Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2.5 8.125H17.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2.5 11.875H17.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.875 8.125V15.625"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
