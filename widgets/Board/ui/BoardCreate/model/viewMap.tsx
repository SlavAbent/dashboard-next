import { BoardColumn } from '@/widgets/Board/types';
import { ViewType } from '@/entities/board/model/list.store';
import React from 'react';
import ListView from '@/entities/board/ui/List/ListView/ListView';
import Kanban from '@/entities/board/ui/Kanban';
import Table from '@/entities/board/ui/Table';

type ViewProps = {
  boardData: BoardColumn[];
};

export const viewMap: Record<ViewType, React.FC<ViewProps>> = {
  List: ListView,
  Kanban: Kanban,
  Table: Table,
};
