import styles from './Sidebar.module.scss';
import { ReactComponent as SignPlus } from 'assets/sidebar-plus.svg';
import { Account } from '../account/Account';
import { Projects } from '../projects/Projects';
import { useDispatch, useSelector } from 'src/services/hooks';
import { selectUserMe } from 'src/services/api/auth/authSlice';
import {
  addProject,
  selectProjects,
} from 'src/services/api/project/projectSlice';

export const Sidebar = (): JSX.Element => {
  const userMe = useSelector(selectUserMe);
  const projects = useSelector(selectProjects);
  const dispatch = useDispatch();

  const createNewProject = () => {
    dispatch(
      addProject({
        name: 'Без названия ' + projects?.length, //подумать как создавать нумерацию
        description: 'Описание проекта',
        status: 'Onboarding',
        priority: 'maximum',
        deadline: '2022-05-01', //надо реализовать автоматическое создание даты
        participants: [],
        tasks: [],
        start: '2022-05-01', //надо реализовать автоматическое создание даты
      }),
    );
  };

  return (
    <aside className={styles.sidebar}>
      <div className={styles.sidebar__content}>
        <Account {...userMe} />
        <Projects />
      </div>
      <div className={styles['sidebar__createBtn-container']}>
        <button
          className={`${styles.sidebar__createBtn}`}
          onClick={() => createNewProject()}
        >
          <SignPlus className={styles.sidebar__plus} />
          <span>Создать проект</span>
        </button>
      </div>
    </aside>
  );
};
