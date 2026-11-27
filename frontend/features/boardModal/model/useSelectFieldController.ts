import { useEffect, useMemo, useRef } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { useShallow } from 'zustand/react/shallow';

import { useBoardStore } from '@/entities/board';
import { useSelectFieldStore } from '@/features/boardModal/model/selectField.store';
import { useCreateFolder } from '@/features/boardModal/model/useCreateFolder';
import { TaskFormValues } from '@/features/boardModal/schema/taskSchema';
import { notifications } from '@/shared/lib/notifications';

type UseSelectFieldControllerOptions = {
  defaultNewFolderColumnId?: string;
};

export const useSelectFieldController = ({
  defaultNewFolderColumnId,
}: UseSelectFieldControllerOptions) => {
  const { control, formState, setValue } = useFormContext<TaskFormValues>();
  const folders = useBoardStore((state) => state.taskFolders);
  const columns = useBoardStore((state) => state.columns);
  const createFolderMutation = useCreateFolder();
  const operationIdRef = useRef(0);

  const {
    showCreateFolder,
    folderName,
    newFolderColumnId,
    folderError,
    isCreatingFolder,
    openCreateFolder,
    closeCreateFolder,
    setFolderName,
    setNewFolderColumnId,
    setFolderError,
    setIsCreatingFolder,
    finishCreatingFolder,
    reset,
  } = useSelectFieldStore(
    useShallow((state) => ({
      showCreateFolder: state.showCreateFolder,
      folderName: state.folderName,
      newFolderColumnId: state.newFolderColumnId,
      folderError: state.folderError,
      isCreatingFolder: state.isCreatingFolder,
      openCreateFolder: state.openCreateFolder,
      closeCreateFolder: state.closeCreateFolder,
      setFolderName: state.setFolderName,
      setNewFolderColumnId: state.setNewFolderColumnId,
      setFolderError: state.setFolderError,
      setIsCreatingFolder: state.setIsCreatingFolder,
      finishCreatingFolder: state.finishCreatingFolder,
      reset: state.reset,
    }))
  );

  const selectedColumnId = useWatch({ control, name: 'columnId' });
  const selectedFolderId = useWatch({ control, name: 'folderId' });

  useEffect(() => {
    return () => {
      operationIdRef.current += 1;
      reset();
    };
  }, [reset]);

  const folderOptions = useMemo(() => {
    return folders
      .filter((folder) => folder.columnId === selectedColumnId)
      .map((folder) => ({
        value: folder.id,
        label: folder.title,
      }));
  }, [folders, selectedColumnId]);

  useEffect(() => {
    if (folderOptions.some((folder) => folder.value === selectedFolderId)) {
      return;
    }

    setValue('folderId', folderOptions[0]?.value ?? '', {
      shouldDirty: true,
      shouldValidate: true,
    });
  }, [folderOptions, selectedFolderId, setValue]);

  const openFolderForm = () => {
    openCreateFolder(defaultNewFolderColumnId ?? selectedColumnId ?? '');
  };

  const closeFolderForm = () => {
    operationIdRef.current += 1;
    closeCreateFolder();
  };

  const createFolder = async () => {
    const title = folderName.trim();

    if (!newFolderColumnId) {
      setFolderError('Select a section first');
      return;
    }

    if (!title) {
      setFolderError('Folder name is required');
      return;
    }

    if (
      folders.some(
        (folder) =>
          folder.columnId === newFolderColumnId &&
          folder.title.trim().toLocaleLowerCase() === title.toLocaleLowerCase()
      )
    ) {
      setFolderError('A folder with this name already exists');
      return;
    }

    const operationId = operationIdRef.current + 1;
    operationIdRef.current = operationId;
    setIsCreatingFolder(true);
    setFolderError(null);

    try {
      const createdFolder = await notifications.folder.run('create', () =>
        createFolderMutation({
          title,
          columnId: newFolderColumnId,
          startDate: null,
          endDate: null,
          priority: 'none',
        })
      );

      if (operationIdRef.current !== operationId) return;

      setValue('columnId', createdFolder.columnId, {
        shouldDirty: true,
        shouldValidate: true,
      });
      setValue('folderId', createdFolder.id, {
        shouldDirty: true,
        shouldValidate: true,
      });
      finishCreatingFolder();
    } catch {
      if (operationIdRef.current !== operationId) return;
      setFolderError('Failed to create folder');
    } finally {
      if (operationIdRef.current === operationId) {
        setIsCreatingFolder(false);
      }
    }
  };

  return {
    control,
    errors: formState.errors,
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
  };
};
