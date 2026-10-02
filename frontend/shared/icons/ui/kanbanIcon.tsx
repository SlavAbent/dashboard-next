import { IconType } from '@/shared/icons/types/icon.types';

export const KanbanIcon = (props: IconType) => {
  return (
    <svg
      width={props.size?.width}
      height={props.size?.height}
      className={props.className}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M8.75 10.6818V3.48485C8.75 3.28611 8.47018 3.125 8.125 3.125L5 3.125C4.65482 3.125 4.375 3.28611 4.375 3.48485L4.375 10.6818C4.375 10.8806 4.65482 11.0417 5 11.0417H8.125C8.47018 11.0417 8.75 10.8806 8.75 10.6818Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15.625 16.25V3.75C15.625 3.40482 15.3452 3.125 15 3.125L11.875 3.125C11.5298 3.125 11.25 3.40482 11.25 3.75V16.25C11.25 16.5952 11.5298 16.875 11.875 16.875H15C15.3452 16.875 15.625 16.5952 15.625 16.25Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
