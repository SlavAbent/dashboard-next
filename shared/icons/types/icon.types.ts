export type IconSizeType = {
  width: number;
  height: number;
};

export type IconType = {
  size?: IconSizeType;
  className?: string;
  currentColor?: string;
};

export type CircleProgressProps = {
  progress?: number;
  size?: IconSizeType;
  className?: string;
};

export type SvgIconType = { icon: string; className?: string };
