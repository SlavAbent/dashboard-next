export type Task = {
  id: number;
  column: string;
  text: string;
  tags: string[];
  completed: boolean;
};

export type Column = {
  id: string;
  title: string;
  order: number;
};

export type BoardColumn = Pick<Column, 'id' | 'title' | 'order'> & {
  tasks: Task[];
};
