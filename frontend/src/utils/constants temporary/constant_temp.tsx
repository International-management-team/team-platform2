import type { ColumnType, ProjectRequestData } from 'src/services/api/types';

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

export const mockProjectExample: ProjectRequestData = {
  name: 'Пример проекта',
  description: 'Описание проекта',
  status: 'Onboarding',
  priority: 'maximum',
  deadline: '2022-05-01',
  participants: [],
  tasks: [
    {
      name: 'Поиск инвесторов на “Форум Развития 2023”',
      description: 'Пример описания',
      status: 'Backlog',
      deadline: '2023-06-23',
      priority: 'maximum',
      assigned_to: [],
    },
    {
      name: 'Создание новой таблицы лидеров по велогонке на стадионе во Франции',
      description: 'Пример описания',
      status: 'Backlog',
      deadline: '2023-06-28',
      priority: 'maximum',
      assigned_to: [],
    },
    {
      name: 'Заново произвести замер всех изменений за сутки в краторе вулкана на острове Ява',
      description: 'Пример описания',
      status: 'Backlog',
      deadline: '2023-08-04',
      priority: 'maximum',
      assigned_to: [],
    },
    {
      name: 'Создание новой таблицы лидеров по велогонке на стадионе во Франции',
      description: 'Пример описания',
      status: 'To Do',
      deadline: '2023-07-28',
      priority: 'maximum',
      assigned_to: [],
    },
    {
      name: 'Заново произвести замер всех изменений за сутки в краторе вулкана на острове Ява',
      description: 'Пример описания',
      status: 'In Progress',
      deadline: '2023-06-14',
      priority: 'maximum',
      assigned_to: [],
    },
    {
      name: 'Поиск инвесторов на “Форум Развития 2023”',
      description: 'Пример описания',
      status: 'In Review',
      deadline: '2023-06-04',
      priority: 'maximum',
      assigned_to: [],
    },
    {
      name: 'Заново произвести замер всех изменений за сутки в краторе вулкана на острове Ява',
      description: 'Пример описания',
      status: 'Backlog',
      deadline: '2023-07-03',
      priority: 'maximum',
      assigned_to: [],
    },
  ],
  start: '2022-05-01',
};
