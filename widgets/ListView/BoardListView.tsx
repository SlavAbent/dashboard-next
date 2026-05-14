import React from 'react';
import type { BoardColumn } from '@/entities/board/model/types';
import BoardListColumn from '@/widgets/ListView/BoardListColumn';

const BoardListView = ({ boardData }: { boardData: BoardColumn[] }) => {
  return (
    <>
      {boardData.map((column) => (
        <div key={column.id} className="mb-8 flex flex-col">
          <BoardListColumn column={column} />
        </div>
      ))}
    </>
  );
};

export default BoardListView;
