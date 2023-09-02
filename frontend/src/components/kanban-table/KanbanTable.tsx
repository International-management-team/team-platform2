import styles from './KanbanTable.module.scss';
import clsx from 'clsx';
import { KanbanColumn } from '../kanban-column/KanbanColumn';
import { useDragDropKanban } from '../../hooks/useDragDropKanban';

export type ColumnTask = {
  id: number;
  subtitle: string;
  expiredDate: string;
  img: any;
};

export type ColumnItem = {
  id: number;
  title: string;
  tasks: ColumnTask[];
};

type KanbanTableProps = {
  columns: ColumnItem[];
};

export const KanbanTable = (props: KanbanTableProps) => {
  const {
    columns,
    currentTask,
    hover,
    dragTaskHandler,
    dragOverColumnHandler,
  } = useDragDropKanban(props.columns);

  const isEmptyTable = () => {
    return columns.every((column) => column.tasks.length < 1);
  };

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
              isEmptyTable={isEmptyTable()}
            />
          </li>
        );
      })}
    </ul>
  );
};
