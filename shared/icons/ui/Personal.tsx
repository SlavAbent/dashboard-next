import { IconType } from '@/shared/icons/types';

export const Personal = (props: IconType) => {
  return (
    <svg
      width={props.size?.width}
      height={props.size?.height}
      className={props.className}
      fill="none"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M16.876 5.625H3.12598C2.7808 5.625 2.50098 5.90482 2.50098 6.25V16.25C2.50098 16.5952 2.7808 16.875 3.12598 16.875H16.876C17.2212 16.875 17.501 16.5952 17.501 16.25V6.25C17.501 5.90482 17.2212 5.625 16.876 5.625Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.125 5.625V4.375C13.125 4.04348 12.9933 3.72554 12.7589 3.49112C12.5245 3.2567 12.2065 3.125 11.875 3.125H8.125C7.79348 3.125 7.47554 3.2567 7.24112 3.49112C7.0067 3.72554 6.875 4.04348 6.875 4.375V5.625"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17.5011 9.86768C15.2216 11.1865 12.6339 11.8789 10.0005 11.8748C7.36745 11.8789 4.78016 11.1867 2.50098 9.86834"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.0625 9.375H10.9375"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
