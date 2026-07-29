import React from 'react';
import { FormProvider } from 'react-hook-form';

import { useFolderForm } from '@/entities/board/hooks/folder/useFolderForm';
import { InputField } from '@/shared/components/fields/inputField';
import { SubmitButton } from '@/shared/components/fields/submitButton';
import { ColumnSelect } from '@/shared/components/select/columnSelect';

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
