import { KanbanTable } from 'src/components/kanban-table/KanbanTable';
import { useSelector } from 'src/services/hooks';
import { selectCurrentProject } from 'src/services/slices/projectSlice';
import { ProjectSidebar } from 'src/components/project-sidebar/ProjectSidebar';

export const KanbanPage = (): JSX.Element => {
  const currentProject = useSelector(selectCurrentProject);

  const showProjectActions = () => {
    console.log('showProjectActions');
  };

  return (
    <section className="content">
      {currentProject?.tasks && <KanbanTable tasks={currentProject?.tasks} />}

      <ProjectSidebar
        showActions={showProjectActions}
        project={currentProject || undefined} //не смотрела что будет, если передать undef
      />
    </section>
  );
};
