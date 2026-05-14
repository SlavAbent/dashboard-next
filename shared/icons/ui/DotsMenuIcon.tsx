import { IconType } from '@/shared/icons/types/icon.types';

export const DotsMenuIcon = (props: IconType) => {
  return (
    <svg
      width={props.size?.width}
      height={props.size?.height}
      className={props.className}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M8.9375 9.84375C8.9375 10.2752 9.28728 10.625 9.71875 10.625C10.1502 10.625 10.5 10.2752 10.5 9.84375C10.5 9.41228 10.1502 9.0625 9.71875 9.0625C9.28728 9.0625 8.9375 9.41228 8.9375 9.84375Z"
        fill="currentColor"
      />
      <path
        d="M8.9375 14.8437C8.9375 15.2752 9.28728 15.625 9.71875 15.625C10.1502 15.625 10.5 15.2752 10.5 14.8438C10.5 14.4123 10.1502 14.0625 9.71875 14.0625C9.28728 14.0625 8.9375 14.4123 8.9375 14.8437Z"
        fill="currentColor"
      />
      <path
        d="M8.9375 4.84375C8.9375 5.27522 9.28728 5.625 9.71875 5.625C10.1502 5.625 10.5 5.27522 10.5 4.84375C10.5 4.41228 10.1502 4.0625 9.71875 4.0625C9.28728 4.0625 8.9375 4.41228 8.9375 4.84375Z"
        fill="currentColor"
      />
    </svg>
  );
};
