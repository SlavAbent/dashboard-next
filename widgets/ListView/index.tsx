import React from 'react';
import { BoardColumn } from '@/widgets/Board/types';
import List from '../../entities/board/ui/List';

const ListView = ({ boardData }: { boardData: BoardColumn[] }) => {
  return (
    <>
      {boardData.map((column) => (
        <div key={column.id} className="mb-8 flex flex-col">
          <List column={column} />
        </div>
      ))}
    </>
  );
};

export default ListView;
