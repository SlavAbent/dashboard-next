import { getFolderOrder } from '@/widgets/board/ui/kanbanView/kanbanView';

jest.mock('@dnd-kit/helpers', () => ({ move: jest.fn() }));
jest.mock('@dnd-kit/react', () => ({ DragDropProvider: jest.fn() }));
jest.mock('@/features/boardModal', () => ({ BoardModals: jest.fn() }));
jest.mock('@/features/kanbanColumn/ui/kanbanColumn', () => jest.fn());
jest.mock('@/widgets/board/ui/boardKanban/boardKanban', () => jest.fn());

const folders = [
  { id: 'first', order: 1 },
  { id: 'moving', order: 2 },
  { id: 'last', order: 3 },
];

describe('getFolderOrder', () => {
  it('places a folder between its neighbours', () => {
    expect(getFolderOrder(['first', 'moving', 'last'], 'moving', folders)).toBe(
      2
    );
  });

  it('places a folder before the first neighbour', () => {
    expect(getFolderOrder(['moving', 'first'], 'moving', folders)).toBe(0);
  });

  it('places a folder after the last neighbour', () => {
    expect(getFolderOrder(['last', 'moving'], 'moving', folders)).toBe(4);
  });

  it('uses the initial rank for an empty target column', () => {
    expect(getFolderOrder(['moving'], 'moving', folders)).toBe(1);
  });

  it('returns null when the moved folder is missing', () => {
    expect(getFolderOrder(['first', 'last'], 'moving', folders)).toBeNull();
  });
});
