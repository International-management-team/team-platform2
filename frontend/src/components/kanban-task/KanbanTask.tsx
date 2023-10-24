import styles from '../kanban-table/KanbanTable.module.scss';
import { ReactComponent as MoreActions } from 'assets/more-actions.svg';
import clsx from 'clsx';
import { selectCurrentProject } from 'src/services/api/project/projectSlice';
import { getTask } from 'src/services/api/task/taskSlice';
import { TaskType } from 'src/services/api/task/taskTypes';
import { useDispatch, useSelector } from 'src/services/hooks';
import { SidebarContent, openSidebar } from 'src/services/slices/sidebarSlice';
import { formatDate } from 'src/utils/formatting';

type PropsType = {
  task: TaskType;
  currentTask: TaskType | undefined;
};

export const KanbanTask = ({ task, currentTask }: PropsType) => {
  const project = useSelector(selectCurrentProject);
  const dispatch = useDispatch();

  function handleTaskClick() {
    project && dispatch(getTask({ projectId: project.id, taskId: task.id }));
    dispatch(openSidebar(SidebarContent.TASK));
  }

  return (
    <div
      onClick={handleTaskClick}
      className={clsx(styles.column__task, {
        [styles.column__task_drag]: currentTask === task,
      })}
    >
      <p className={styles.column__task_text}>{task.name}</p>
      <MoreActions className={styles.column__task_button} />
      <p className={styles.column__task_time}>{formatDate(task.deadline)}</p>
      {/* {task.img && (
        <img
          className={styles.column__task_img}
          title="Аватар участника"
          src={task.img}
        />
      )} */}
    </div>
  );
};
