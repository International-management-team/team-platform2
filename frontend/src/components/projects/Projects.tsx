import { useEffect, useLayoutEffect } from 'react';
import clsx from 'clsx';
import style from './Projects.module.scss';
import { NavLink } from 'react-router-dom';
import { ReactComponent as ProjectIcon } from 'assets/project-icon.svg';
import {
  selectCurrentProject,
  selectProjects,
  getProject,
  getAllProjects,
} from 'src/services/api/project/projectSlice';
import { useDispatch, useSelector } from 'src/services/hooks';
import { closePopup } from 'src/services/slices/popupSlice';
import { closeSidebar } from 'src/services/slices/sidebarSlice';

export const Projects = (): JSX.Element => {
  const projects = useSelector(selectProjects);
  const currentProject = useSelector(selectCurrentProject);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProjects()).then(({ payload: projects }) => {
      if (projects instanceof Array && projects.length > 0) {
        dispatch(getProject(projects[0].id));
      }
    });
  }, [dispatch]);

  useLayoutEffect(() => {
    dispatch(closePopup());
    dispatch(closeSidebar());
  });

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const arr = e.currentTarget.id.split('-');
    const id = arr[0];
    dispatch(getProject(Number(id)));
  };

  function renderProjects(): React.ReactNode {
    return (
      <>
        {projects.map((project) => (
          <li key={project.id}>
            <NavLink
              to={`/${project.id}`}
              className={clsx(style.projects__nav, {
                [style.projects__nav_active]:
                  currentProject && currentProject.id === project.id,
              })}
              onClick={(e) => handleClick(e)}
              id={`${project.id}-project`}
            >
              <ProjectIcon className={style.projects__icon} />
              <span className={style.projects__name}>{project.name}</span>
            </NavLink>
          </li>
        ))}
      </>
    );
  }

  return (
    <section className={style.projects}>
      <h3 className={style.projects__title}>Проекты</h3>
      <button className={style.projects__filter}></button>
      <ul className={style.projects__list}>{renderProjects()}</ul>
    </section>
  );
};
