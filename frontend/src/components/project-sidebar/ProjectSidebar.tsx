import styles from './ProjectSidebar.module.scss';
import { RightSidebarTitleInputTemplate as InputTitle } from '../UI/right-sidebar-title-input-template/RightSidebarTitleInputTemplate';
import {
  OptionType,
  RightSidebarSelectTemplate as Select,
} from '../UI/right-sidebar-select-template/RightSidebarSelectTemplate';
import { RightSidebarDescriptionTemplate as Description } from '../UI/right-sidebar-description-template/RightSidebarDescriptionTemplate';
import { useForm } from 'react-hook-form';
import { SingleValue } from 'react-select';
import { InputName } from 'src/typings/constants';
import { Calendar } from '../UI/calendar/Calendar';
import { useDispatch, useSelector } from 'src/services/hooks';
import {
  patchProject,
  selectCurrentProject,
} from 'src/services/api/project/projectSlice';
import {
  projectPriorityMapper,
  projectStatusMapper,
} from 'src/services/api/project/projectTypes';
import { UserAvatar } from '../UI/user-avatar-template/UserAvatarTemplate';
import { selectMembers } from 'src/services/api/team/teamSlice';

export const ProjectSidebar = (): JSX.Element => {
  const project = useSelector(selectCurrentProject);
  const members = useSelector(selectMembers);
  const dispatch = useDispatch();

  const PRIORITY_OPTIONS = Object.entries(projectPriorityMapper).map(
    (priority) => {
      return {
        value: priority[0],
        label: priority[1],
      };
    },
  );

  const STATUS_OPTIONS = Object.keys(projectStatusMapper).map((status) => {
    return {
      value: status,
      label: status,
    };
  });

  const { register } = useForm({
    values: {
      // it works for inputs/textareas, not for selects
      [InputName.PROJECT_TITLE]: project?.name,
      [InputName.PROJECT_DESCRIPTION]: project?.description,
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };

  const handleInputSubmit = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };

  const handleSelectSubmit = (
    choice: SingleValue<OptionType>,
    fieldName: string | undefined,
  ) => {
    const projectField = fieldName?.replace('project_', '');
    project &&
      projectField &&
      dispatch(
        patchProject({
          projectData: { [projectField]: choice?.value },
          projectId: project.id,
        }),
      );
  };

  return (
    <>
      {project && members ? (
        <form className={styles.form}>
          <InputTitle
            name={InputName.PROJECT_TITLE}
            register={register}
            onChange={handleChange}
            onBlur={handleInputSubmit}
          />

          <Select
            name={InputName.PROJECT_PRIORITY}
            label={'Приоритет'}
            options={PRIORITY_OPTIONS}
            value={{
              value: project.priority,
              label: projectPriorityMapper[project.priority],
            }}
            handleChange={handleSelectSubmit}
          />

          <Select
            name={InputName.PROJECT_STATUS}
            label={'Статус'}
            options={STATUS_OPTIONS}
            value={{ value: project.status, label: project.status }}
            handleChange={handleSelectSubmit}
          />

          <label className={styles.form__select}>
            <span className={styles.form__select_title}>Дедлайн</span>
            <Calendar
              initialValue={new Date(project.deadline)}
              onChange={(date) => console.log(date)}
            />
          </label>

          <label className={styles.form__select}>
            <span className={styles.form__select_title}>Участники</span>
            <UserAvatar users={members} />
          </label>

          <Description
            name={InputName.PROJECT_DESCRIPTION}
            label={'Описание проекта'}
            placeholder={'Напишите подробнее о проекте.'}
            register={register}
            onChange={handleChange}
            onBlur={handleInputSubmit}
          />
        </form>
      ) : (
        <></>
      )}
    </>
  );
};
