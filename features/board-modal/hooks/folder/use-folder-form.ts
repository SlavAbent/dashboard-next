import {
  folderSchema,
  FolderValues,
} from '@/features/board-modal/schema/folder-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useMemo } from 'react';
import { useBoardModalStore } from '@/features/board-modal';
import { useCreateFolder } from '@/features/board-modal/hooks/folder/use-create-folder';
import { useEditFolder } from '@/features/board-modal/hooks/folder/use-edit-folder';
import { sameId } from '@/shared/lib/same-id';
import { useBoardStore } from '@/entities/board';

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
      folderValue: folder?.title ?? '',
      title: folder?.title ?? '',
      columnId: folder?.columnId ?? selectedColumnId ?? '',
    }),
    [folder, selectedColumnId]
  );

  const folderForm = useForm<FolderValues>({
    resolver: zodResolver(folderSchema),
    defaultValues,
  });

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
