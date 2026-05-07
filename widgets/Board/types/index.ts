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
  color: string;
};

export type BoardColumn = Pick<Column, 'id' | 'title' | 'order' | 'color'> & {
  tasks: Task[];
};
