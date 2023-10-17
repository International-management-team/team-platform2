import { KanbanTable } from 'src/components/kanban-table/KanbanTable';
import { useSelector } from 'src/services/hooks';
import { selectCurrentProject } from 'src/services/api/project/projectSlice';
import { ProjectSidebar } from 'src/components/project-sidebar/ProjectSidebar';
import { selectTasks } from 'src/services/api/task/taskSlice';

export const KanbanPage = (): JSX.Element => {
  const currentProject = useSelector(selectCurrentProject);
  const tasks = useSelector(selectTasks);

  const showProjectActions = () => {
    console.log('showProjectActions');
  };

  return (
    <section className="content">
      <KanbanTable tasks={tasks} />

      <ProjectSidebar
        showActions={showProjectActions}
        project={currentProject || undefined} //не смотрела что будет, если передать undef
      />
    </section>
  );
};
