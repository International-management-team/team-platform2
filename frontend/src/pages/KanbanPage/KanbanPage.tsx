import { KanbanTable } from 'src/components/kanban-table/KanbanTable';
import { useSelector } from 'src/services/hooks';

import { selectTasks } from 'src/services/api/task/taskSlice';

export const KanbanPage = (): JSX.Element => {
  const tasks = useSelector(selectTasks);

  return (
    <section className="content">
      <KanbanTable tasks={tasks} />
    </section>
  );
};
