import { Button, Input, NativeSelect } from '@dashboard/ui';
import { ErrorField } from '@dashboard/ui/forms';
import { cn } from '@lib/cn';
import { toIdString } from '@lib/sameId';
import React, { useId } from 'react';
import { Controller } from 'react-hook-form';

import { useSelectFieldController } from '@/features/boardModal/model/useSelectFieldController';

type SelectFieldProps = {
  className?: string;
  defaultNewFolderColumnId?: string;
};

export const SelectField = ({
  className,
  defaultNewFolderColumnId,
}: SelectFieldProps) => {
  const newFolderSectionId = useId();
  const newTaskFolderId = useId();
  const {
    control,
    errors,
    columns,
    folderOptions,
    showCreateFolder,
    folderName,
    newFolderColumnId,
    folderError,
    isCreatingFolder,
    openFolderForm,
    closeFolderForm,
    setFolderName,
    setNewFolderColumnId,
    createFolder,
  } = useSelectFieldController({ defaultNewFolderColumnId });

  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium">Section</label>
      <Controller
        name="columnId"
        control={control}
        render={({ field }) => (
          <NativeSelect
            {...field}
            aria-label="Section"
            containerClassName="w-full"
            className={cn(
              'border-input bg-background focus-visible:border-ring focus-visible:ring-ring/50 h-9 w-full cursor-pointer rounded-sm border px-3 text-sm outline-none focus-visible:ring-1',
              className
            )}>
            <option value="" disabled>
              Select section
            </option>
            {columns.map((column) => (
              <option key={column.id} value={toIdString(column.id)}>
                {column.title}
              </option>
            ))}
          </NativeSelect>
        )}
      />
      <ErrorField error={errors.columnId} />

      <div className="mt-2 flex items-center justify-between gap-2">
        <label className="text-sm font-medium">Folder</label>
        <Button
          type="button"
          variant="ghost"
          size="xs"
          onClick={showCreateFolder ? closeFolderForm : openFolderForm}>
          {showCreateFolder ? 'Cancel' : 'Add folder'}
        </Button>
      </div>
      <Controller
        name="folderId"
        control={control}
        render={({ field }) => {
          const value = field.value ? toIdString(field.value) : '';
          return (
            <NativeSelect
              {...field}
              value={value}
              aria-label="Folder"
              containerClassName="w-full"
              className={cn(
                'border-input bg-background focus-visible:border-ring focus-visible:ring-ring/50 h-9 w-full cursor-pointer rounded-sm border px-3 text-sm outline-none focus-visible:ring-1',
                className
              )}>
              <option value="" disabled>
                Select folder
              </option>
              {folderOptions.map((folder) => (
                <option key={folder.value} value={folder.value}>
                  {folder.label}
                </option>
              ))}
            </NativeSelect>
          );
        }}
      />

      <ErrorField error={errors.folderId} />

      {showCreateFolder && (
        <div className="mt-2 flex flex-col gap-2 rounded-sm border p-2">
          <label htmlFor={newFolderSectionId} className="text-xs font-medium">
            Section for new folder
          </label>
          <NativeSelect
            id={newFolderSectionId}
            aria-label="Section for new folder"
            containerClassName="w-full"
            value={newFolderColumnId}
            disabled={isCreatingFolder}
            onChange={(event) => setNewFolderColumnId(event.target.value)}
            className="border-input bg-background focus-visible:border-ring focus-visible:ring-ring/50 h-9 w-full cursor-pointer rounded-sm border px-3 text-sm outline-none focus-visible:ring-1">
            <option value="" disabled>
              Select section
            </option>
            {columns.map((column) => (
              <option key={column.id} value={toIdString(column.id)}>
                {column.title}
              </option>
            ))}
          </NativeSelect>
          <label htmlFor={newTaskFolderId} className="text-xs font-medium">
            Folder name
          </label>
          <div className="flex items-center gap-2">
            <Input
              id={newTaskFolderId}
              value={folderName}
              placeholder="Folder name"
              disabled={isCreatingFolder}
              onChange={(event) => setFolderName(event.target.value)}
              onKeyDown={(event) => {
                if (event.key !== 'Enter') return;
                event.preventDefault();
                void createFolder();
              }}
            />
            <Button
              type="button"
              disabled={isCreatingFolder}
              onClick={() => void createFolder()}>
              {isCreatingFolder ? 'Creating…' : 'Create'}
            </Button>
          </div>
          {folderError && (
            <p role="alert" className="text-destructive text-xs">
              {folderError}
            </p>
          )}
        </div>
      )}
    </div>
  );
};
