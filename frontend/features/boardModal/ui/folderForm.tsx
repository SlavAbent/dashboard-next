import { InputField, SubmitButton } from '@dashboard/ui/forms';
import React from 'react';
import { FormProvider } from 'react-hook-form';

import { useFolderForm } from '@/features/boardModal/model/useFolderForm';
import { ColumnSelect } from '@/features/boardModal/ui/columnSelect';
import { DateRangeField } from '@/features/boardModal/ui/dateRangeField';
import { PriorityField } from '@/features/boardModal/ui/priorityField';

export const FolderForm = () => {
  const { folderForm, submitFolder, isEditFolderMode } = useFolderForm();
  const {
    formState: { isSubmitting },
  } = folderForm;

  return (
    <FormProvider {...folderForm}>
      <form onSubmit={submitFolder} className="flex flex-col gap-3">
        <InputField
          value="title"
          label="Folder name"
          placeholder="Enter folder name"
        />

        <ColumnSelect />
        <DateRangeField />
        <PriorityField />

        <SubmitButton
          isEditMode={isEditFolderMode}
          isSubmitting={isSubmitting}
        />
      </form>
    </FormProvider>
  );
};
