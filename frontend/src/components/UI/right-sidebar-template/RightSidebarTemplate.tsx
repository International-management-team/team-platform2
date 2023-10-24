import styles from './RightSidebarTemplate.module.scss';
import clsx from 'clsx';
import { ProjectSidebar } from 'src/components/project-sidebar/ProjectSidebar';
import { TaskSidebar } from 'src/components/task-sidebar/TaskSidebar';
import { useDispatch, useSelector } from 'src/services/hooks';
import { SidebarContent, closeSidebar } from 'src/services/slices/sidebarSlice';

export type RightSidebarPropsType = {
  children?: JSX.Element;
};

export const RightSidebarTemplate = ({
  ...props
}: RightSidebarPropsType): JSX.Element => {
  const dispatch = useDispatch();
  const { isOpenSidebar, content } = useSelector((store) => store.sidebar);

  return (
    <div
      className={clsx(styles.sidebarContainer, {
        [styles.sidebarContainer_opened]: isOpenSidebar,
      })}
    >
      <section className={clsx(styles.sidebar)} aria-label="Right sidebar">
        <button
          className={styles['sidebar__close-btn']}
          onClick={() => dispatch(closeSidebar())}
        />
        <button className={styles['sidebar__menu-btn']} />
        {content === SidebarContent.PROJECT ? (
          <ProjectSidebar />
        ) : content === SidebarContent.TASK ? (
          <TaskSidebar />
        ) : null}
      </section>
    </div>
  );
};
