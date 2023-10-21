import { KanbanTable } from 'src/components/kanban-table/KanbanTable';
import { useSelector } from 'src/services/hooks';
import { selectCurrentProject } from 'src/services/api/project/projectSlice';

export const KanbanPage = (): JSX.Element => {
  const currentProject = useSelector(selectCurrentProject);

  return (
    <section className="content">
      {currentProject && <KanbanTable tasks={currentProject.tasks} />}
    </section>
  );
};
