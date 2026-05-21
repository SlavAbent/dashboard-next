export type ModalStore = {
  isOpenModal: boolean;
  selectedColumnId: string | null;
  openModal: (columnId: string) => void;
  closeModal: () => void;
};
