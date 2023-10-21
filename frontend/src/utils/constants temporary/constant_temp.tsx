import { ColumnType } from 'src/services/api/task/taskTypes';

export const mockEmptyColumn: ColumnType[] = [
  {
    id: 1,
    title: 'Backlog',
    tasks: [],
  },
  {
    id: 2,
    title: 'To Do',
    tasks: [],
  },
  {
    id: 3,
    title: 'In Progress',
    tasks: [],
  },
  {
    id: 4,
    title: 'In Review',
    tasks: [],
  },
  {
    id: 5,
    title: 'Done',
    tasks: [],
  },
];
