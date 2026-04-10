import { IconType } from '@/app/shared/ui/icons/types';

export const Notes = (props: IconType) => {
  return (
    <svg
      width={props.size?.width}
      height={props.size?.height}
      className={props.className}
      fill="none"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12.2411 16.875H3.75C3.58424 16.875 3.42527 16.8092 3.30806 16.6919C3.19085 16.5747 3.125 16.4158 3.125 16.25V3.75C3.125 3.58424 3.19085 3.42527 3.30806 3.30806C3.42527 3.19085 3.58424 3.125 3.75 3.125H16.25C16.4158 3.125 16.5747 3.19085 16.6919 3.30806C16.8092 3.42527 16.875 3.58424 16.875 3.75V12.2411C16.875 12.3232 16.8588 12.4045 16.8274 12.4803C16.796 12.5561 16.75 12.625 16.6919 12.6831L12.6831 16.6919C12.625 16.75 12.5561 16.796 12.4803 16.8274C12.4045 16.8588 12.3232 16.875 12.2411 16.875V16.875Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16.8188 12.4993H12.5V16.818"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
