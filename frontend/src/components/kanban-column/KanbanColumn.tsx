import clsx from 'clsx';
import styles from '../kanban-table/KanbanTable.module.scss';
import { ReactComponent as AddTaskButton } from 'assets/add-task.svg';
import { AddTask } from '../UI/add-task-kanban/AddTask';
import { KanbanTask } from '../kanban-task/KanbanTask';
import { dragTaskType } from 'src/hooks/useDragDropKanban';
import { ColumnType, TaskType } from 'src/services/api/task/taskTypes';
import { useDispatch } from 'src/services/hooks';
import { resetCurTask } from 'src/services/api/task/taskSlice';
import { SidebarContent, openSidebar } from 'src/services/slices/sidebarSlice';

type PropsType = {
  column: ColumnType;
  currentTask: TaskType | undefined;
  dragTaskHandler: dragTaskType;
  hover: number | null;
  isEmptyTable: boolean;
};

export const KanbanColumn = ({
  column,
  currentTask,
  dragTaskHandler,
  hover,
  isEmptyTable,
}: PropsType): JSX.Element => {
  const dispatch = useDispatch();

  function openTaskSidebar() {
    dispatch(resetCurTask());
    dispatch(openSidebar(SidebarContent.TASK));
  }

  return (
    <>
      <div className={styles.column__info}>
        <h3 className={styles.column__title}>{column.title}</h3>
        <span className={styles.column__quantity}>{column.tasks.length}</span>
        {['In Review', 'Done'].includes(column.title) || (
          <AddTaskButton
            className={styles.column__button}
            onClick={openTaskSidebar}
          />
        )}
      </div>

      <ul>
        {column.tasks.map((task) => (
          <li
            className={clsx(styles.column__task_line, {
              [styles.column__task_line_active]: task.id === hover,
            })}
            key={task.id}
            draggable={true}
            onDragOver={(e) => dragTaskHandler.overTask(e, task)}
            onDragLeave={() => dragTaskHandler.leave()}
            onDragStart={() => dragTaskHandler.start(task, column)}
            onDragEnd={() => dragTaskHandler.end()}
            onDrop={(e) => dragTaskHandler.drop(e, task, column)}
          >
            <KanbanTask task={task} currentTask={currentTask} />
          </li>
        ))}
      </ul>

      {isEmptyTable && <AddTask column={column} />}
    </>
  );
};
