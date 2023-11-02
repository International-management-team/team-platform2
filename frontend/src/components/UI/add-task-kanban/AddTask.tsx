import { selectCurrentProject } from 'src/services/api/project/projectSlice';
import styles from './AddTask.module.scss';
import { ReactComponent as PlusTask } from 'assets/plus.svg';
// import { ColumnItem } from 'src/components/kanban-table/KanbanTable';
import {
  addTask,
  resetCurTask,
  selectTasks,
} from 'src/services/api/task/taskSlice';
import { ColumnType } from 'src/services/api/task/taskTypes';
import { useDispatch, useSelector } from 'src/services/hooks';
import { SidebarContent, openSidebar } from 'src/services/slices/sidebarSlice';

type AddTaskProps = {
  column: ColumnType;
};

export const AddTask = ({ column }: AddTaskProps) => {
  const project = useSelector(selectCurrentProject);
  const tasks = useSelector(selectTasks);
  const dispatch = useDispatch();

  function handleClick() {
    // dispatch(resetCurTask());
    project &&
      dispatch(
        addTask({
          task: {
            name: 'Без названия ' + tasks.length,
            status: column.status,
            priority: 'minimum',
            description: 'Напишите подробнее о задаче',
            deadline: '2023-10-25',
            assigned_to: [],
          },
          projectId: project?.id,
        }),
      );
    dispatch(openSidebar(SidebarContent.TASK));
  }

  return (
    <>
      {column.title !== 'In Review' && column.title !== 'Done' ? (
        <div className={styles.task}>
          <button className={styles.task__wrapper} onClick={handleClick}>
            <PlusTask className={styles.task__button} />
            <h3 className={styles.task__text}>Добавить задачу</h3>
          </button>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};
