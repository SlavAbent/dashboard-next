import React, { ReactNode } from 'react';

const IconWrapper = ({
  children,
  className,
}: {
  children: ReactNode;
  className: string;
}) => {
  return (
    <div
      className={`flex h-5 w-5 cursor-pointer items-center justify-center rounded-xs ${className}`}>
      {children}
    </div>
  );
};

export default IconWrapper;
