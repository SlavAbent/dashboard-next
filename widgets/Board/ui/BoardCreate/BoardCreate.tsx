'use client';

import React from 'react';
import { BoardColumn } from '@/widgets/Board/types';
import { TypographyH3 } from '@/shared/ui/Typography/TypographyH3';
import { TypographyP } from '@/shared/ui/Typography/TypographyP';

const BoardCreate = ({ boardData }: { boardData: BoardColumn[] }) => {
  return (
    <div>
      {boardData.map((column) => (
        <div key={column.id}>
          <TypographyH3 text={column.title} />

          <div className="flex flex-col gap-2">
            {column.tasks.map((task) => (
              <TypographyP key={task.id} text={task.text} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default BoardCreate;
