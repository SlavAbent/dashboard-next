import React from 'react';

import { Button } from '@/shared/components/button/button';
import { TypographySmall } from '@/shared/components/typography/typographySmall';
import { iconSize } from '@/shared/icons/iconSize';
import { PlusIcon } from '@/shared/icons/ui/plusIcon';

type SubmitButtonProps = {
  isEditMode: boolean;
  isSubmitting: boolean;
};

export const SubmitButton = ({
  isEditMode,
  isSubmitting,
}: SubmitButtonProps) => {
  const buttonMode = isSubmitting
    ? 'Saving...'
    : isEditMode
      ? 'Save'
      : 'Create';

  return (
    <Button type="submit" disabled={isSubmitting}>
      <PlusIcon size={iconSize(16)} className="text-muted-foreground" />
      <TypographySmall text={buttonMode} className="text-muted-foreground" />
    </Button>
  );
};
