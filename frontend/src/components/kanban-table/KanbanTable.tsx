import styles from './KanbanTable.module.scss';
import clsx from 'clsx';
import { KanbanColumn } from '../kanban-column/KanbanColumn';
import { useDragDropKanban } from '../../hooks/useDragDropKanban';
import {
  getAPIStatus,
  type ColumnType,
  type TaskType,
} from 'src/services/api/types';
import { useMemo } from 'react';
import { mockEmptyColumn } from 'src/utils/constants temporary/constant_temp';

type KanbanTableProps = {
  tasks: TaskType[];
};

export const KanbanTable = (props: KanbanTableProps) => {
  const isEmptyTable = props.tasks.length < 1;

  const taskColumns: ColumnType[] = useMemo(() => {
    return isEmptyTable
      ? mockEmptyColumn
      : props.tasks.reduce((tColumns: ColumnType[], curTask: TaskType) => {
          for (const column of tColumns) {
            if (curTask.status === getAPIStatus(column.title)) {
              column.tasks.push(curTask);
            }
          }
          return tColumns;
        }, structuredClone(mockEmptyColumn));
  }, [props.tasks]);

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
