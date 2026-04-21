import { IconType } from '@/shared/icons/types';

export const ListIcon = (props: IconType) => {
  return (
    <svg
      width={props.size?.width}
      height={props.size?.height}
      className={props.className}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M3.75 8.75L16.25 8.75C16.5952 8.75 16.875 8.47018 16.875 8.125L16.875 5C16.875 4.65482 16.5952 4.375 16.25 4.375L3.75 4.375C3.40482 4.375 3.125 4.65482 3.125 5L3.125 8.125C3.125 8.47018 3.40482 8.75 3.75 8.75Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3.75 15.625L16.25 15.625C16.5952 15.625 16.875 15.3452 16.875 15L16.875 11.875C16.875 11.5298 16.5952 11.25 16.25 11.25L3.75 11.25C3.40482 11.25 3.125 11.5298 3.125 11.875L3.125 15C3.125 15.3452 3.40482 15.625 3.75 15.625Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
