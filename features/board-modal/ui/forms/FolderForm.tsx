import React from 'react';
import { InputField } from '@/features/board-modal/ui/fields/InputField';
import { ColumnSelect } from '@/features/board-modal/ui/ColumnSelect';
import { SubmitButton } from '@/features/board-modal/ui/fields/SubmitButton';
import { FormProvider } from 'react-hook-form';
import { useFolderForm } from '@/features/board-modal/hooks/folder/use-folder-form';

export const FolderForm = () => {
  const { folderForm, submitFolder, isEditFolderMode } = useFolderForm();
  const {
    formState: { isSubmitting },
  } = folderForm;

  return (
    <FormProvider {...folderForm}>
      <form onSubmit={submitFolder} className="flex flex-col gap-3">
        <InputField value="title" placeholder="Folder name" />

        <ColumnSelect />

        <SubmitButton
          isEditMode={isEditFolderMode}
          isSubmitting={isSubmitting}
        />
      </form>
    </FormProvider>
  );
};
