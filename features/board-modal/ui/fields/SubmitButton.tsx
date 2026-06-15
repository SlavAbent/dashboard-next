import React from 'react';
import { PlusIcon } from '@/shared/icons/ui/PlusIcon';
import { iconSize } from '@/shared/icons/iconSize';
import { TypographySmall } from '@/shared/components/Typography/TypographySmall';
import { useTaskForm } from '@/features/board-modal/hooks/use-task-form';
import { Button } from '@/shared/components/Button/button';

export const SubmitButton = () => {
  const { isEditMode, form } = useTaskForm();
  const {
    formState: { isSubmitting },
  } = form;

  const buttonTaskMode = isSubmitting
    ? 'Saving...'
    : isEditMode
      ? 'Save task'
      : 'Create task';

  return (
    <Button type="submit" disabled={isSubmitting}>
      <PlusIcon size={iconSize(16)} className="text-muted-foreground" />
      <TypographySmall
        text={buttonTaskMode}
        className="text-muted-foreground"
      />
    </Button>
  );
};
