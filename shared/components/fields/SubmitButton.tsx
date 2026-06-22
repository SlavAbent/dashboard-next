import React from 'react';
import { PlusIcon } from '@/shared/icons/ui/PlusIcon';
import { iconSize } from '@/shared/icons/iconSize';
import { TypographySmall } from '@/shared/components/Typography/TypographySmall';
import { Button } from '@/shared/components/Button/button';

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
