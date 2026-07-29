import React from 'react';
import { FieldError } from 'react-hook-form';

import { TypographySmall } from '@/shared/components/typography/typographySmall';

type Props = {
  error: FieldError | undefined;
};

export const ErrorField = ({ error }: Props) => {
  if (!error) return null;

  return (
    <TypographySmall
      className="text-sm text-red-500"
      text={error.message ?? 'error field'}
    />
  );
};
