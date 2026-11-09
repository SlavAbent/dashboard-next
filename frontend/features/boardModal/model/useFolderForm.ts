import { zodResolver } from '@hookform/resolvers/zod';
import { sameId, toIdString } from '@lib/sameId';
import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';

import { useBoardStore } from '@/entities/board';
import { useBoardModalStore } from '@/features/boardModal';
import { useCreateFolder } from '@/features/boardModal/model/useCreateFolder';
import { useEditFolder } from '@/features/boardModal/model/useEditFolder';
import {
  folderSchema,
  FolderValues,
} from '@/features/boardModal/schema/folderSchema';

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
      startDate: folder?.startDate ?? null,
      endDate: folder?.endDate ?? null,
      priority: folder?.priority ?? 'none',
    }),
    [folder, selectedColumnId]
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
