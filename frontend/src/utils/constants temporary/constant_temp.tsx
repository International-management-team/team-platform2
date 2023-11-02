import { ColumnType } from 'src/services/api/task/taskTypes';

export const mockEmptyColumn: ColumnType[] = [
  {
    id: 1,
    title: 'Backlog',
    status: 'Backlog',
    tasks: [],
  },
  {
    id: 2,
    title: 'To Do',
    status: 'Todo',
    tasks: [],
  },
  {
    id: 3,
    title: 'In Progress',
    status: 'In progress',
    tasks: [],
  },
  {
    id: 4,
    title: 'In Review',
    status: 'In review',
    tasks: [],
  },
  {
    id: 5,
    title: 'Done',
    status: 'Done',
    tasks: [],
  },
];
