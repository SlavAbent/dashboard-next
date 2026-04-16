import { IconType } from '@/shared/icons/types';

export const Logo = (props: IconType) => {
  return (
    <svg
      width={props.size?.width}
      height={props.size?.height}
      fill={props.currentColor}
      className={props.className}
      viewBox="0 0 28 25"
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M24.8842 2.75641e-08L28 5.37805L24.8842 10.7561H18.6525L15.5366 5.37805L18.6525 0L24.8842 2.75641e-08Z"
        fill={props.currentColor}
      />
      <path
        d="M9.34756 2.75641e-08L20.189 18.6951L17.0732 24.0732H10.8415L0 5.37805L3.11585 0L9.34756 2.75641e-08Z"
        fill={props.currentColor}
      />
    </svg>
  );
};
