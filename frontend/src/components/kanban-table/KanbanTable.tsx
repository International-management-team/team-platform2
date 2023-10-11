import styles from './KanbanTable.module.scss';
import clsx from 'clsx';
import { KanbanColumn } from '../kanban-column/KanbanColumn';
import { useDragDropKanban } from '../../hooks/useDragDropKanban';
import { useMemo } from 'react';
import { mockEmptyColumn } from 'src/utils/constants temporary/constant_temp';
import {
  ColumnType,
  TaskType,
  statusMapper,
} from 'src/services/api/task/taskTypes';

type KanbanTableProps = {
  tasks: TaskType[];
};

export const KanbanTable = ({ tasks }: KanbanTableProps) => {
  const isEmptyTable = tasks.length < 1;

  const taskColumns: ColumnType[] = useMemo(() => {
    if (isEmptyTable) return mockEmptyColumn;

    return tasks.reduce((tableColumns: ColumnType[], curTask: TaskType) => {
      for (const column of tableColumns) {
        if (curTask.status === statusMapper[column.title]) {
          column.tasks.push(curTask);
        }
      }
      return tableColumns;
    }, structuredClone(mockEmptyColumn));
  }, [tasks, isEmptyTable]);

  const {
    columns,
    currentTask,
    hover,
    dragTaskHandler,
    dragOverColumnHandler,
  } = useDragDropKanban(taskColumns);

  return (
    <ul
      className={clsx(styles.column__kanban, {
        [styles.column__kanban_active]: currentTask,
      })}
    >
      {columns.map((column) => {
        return (
          <li
            className={styles.column__wrapper}
            key={column.id}
            onDragOver={(e) => dragOverColumnHandler.over(e)}
            onDrop={(e) => dragOverColumnHandler.drop(e, column)}
          >
            <KanbanColumn
              column={column}
              currentTask={currentTask}
              dragTaskHandler={dragTaskHandler}
              hover={hover}
              isEmptyTable={isEmptyTable}
            />
          </li>
        );
      })}
    </ul>
  );
};
