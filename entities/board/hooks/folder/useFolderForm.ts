import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';

import { useBoardStore } from '@/entities/board';
import { useBoardModalStore } from '@/features/boardModal';
import { useCreateFolder } from '@/entities/board/hooks/folder/useCreateFolder';
import { useEditFolder } from '@/entities/board/hooks/folder/useEditFolder';
import { sameId, toIdString } from '@/shared/lib/sameId';
import { folderSchema, FolderValues } from '@/entities/board/schema/folderSchema';

export const useFolderForm = () => {
  const { taskFolders } = useBoardStore();
  const { mode, editingFolderId, closeModal, selectedColumnId } =
    useBoardModalStore();
  const isEditFolderMode = mode === 'edit-folder';

  const createFolder = useCreateFolder();
  const editFolder = useEditFolder();

  const folder = taskFolders.find((folder) =>
    sameId(folder.id, editingFolderId)
  );

  const defaultValues = useMemo<FolderValues>(
    () => ({
      title: folder?.title ?? '',
      columnId: folder?.columnId
        ? toIdString(folder.columnId)
        : selectedColumnId
          ? toIdString(selectedColumnId)
          : '',
    }),
    [folder?.title, folder?.columnId, selectedColumnId]
  );

  const folderForm = useForm<FolderValues>({
    resolver: zodResolver(folderSchema),
    defaultValues,
  });

  useEffect(() => {
    folderForm.reset(defaultValues);
  }, [defaultValues, folderForm]);

  const submitFolder = folderForm.handleSubmit(async (data) => {
    if (isEditFolderMode && editingFolderId) {
      await editFolder({
        folderId: editingFolderId,
        ...data,
      });
    } else {
      await createFolder(data);
    }

    closeModal();
  });

  return {
    folderForm,
    submitFolder,
    isEditFolderMode,
  };
};
