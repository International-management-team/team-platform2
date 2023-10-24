import styles from './AddTask.module.scss';
import { ReactComponent as PlusTask } from 'assets/plus.svg';
import { ColumnItem } from 'src/components/kanban-table/KanbanTable';
import { resetCurTask } from 'src/services/api/task/taskSlice';
import { useDispatch } from 'src/services/hooks';
import { SidebarContent, openSidebar } from 'src/services/slices/sidebarSlice';

type AddTaskProps = {
  column: ColumnItem;
};

export const AddTask = ({ column }: AddTaskProps) => {
  const dispatch = useDispatch();

  function handleClick() {
    dispatch(resetCurTask());
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
