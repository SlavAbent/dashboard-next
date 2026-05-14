import { IconType } from '@/shared/icons/types/icon.types';

export const CalendarIcon = (props: IconType) => {
  return (
    <svg
      width={props.size?.width}
      height={props.size?.height}
      className={props.className}
      fill="none"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M16.25 3.125H3.75C3.40482 3.125 3.125 3.40482 3.125 3.75V16.25C3.125 16.5952 3.40482 16.875 3.75 16.875H16.25C16.5952 16.875 16.875 16.5952 16.875 16.25V3.75C16.875 3.40482 16.5952 3.125 16.25 3.125Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.75 1.875V4.375"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.25 1.875V4.375"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3.125 6.875H16.875"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.1875 9.99976H9.375L8.125 11.5623C8.33053 11.5623 8.53289 11.6129 8.71416 11.7098C8.89543 11.8067 9.05002 11.9468 9.16423 12.1176C9.27844 12.2885 9.34876 12.4849 9.36895 12.6895C9.38915 12.894 9.35859 13.1003 9.28 13.2903C9.2014 13.4802 9.07719 13.6478 8.91836 13.7782C8.75953 13.9087 8.57099 13.9979 8.36942 14.0381C8.16786 14.0783 7.9595 14.0682 7.76278 14.0086C7.56607 13.9491 7.38708 13.8419 7.24166 13.6967"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.25 10.9373L12.5 9.99976V14.0623"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
