import styles from './TaskSidebar.module.scss';
import { RightSidebarTemplate } from '../UI/right-sidebar-template/RightSidebarTemplate';
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
import {
  projectPriorityMapper,
  projectStatusMapper,
} from 'src/services/api/project/projectTypes';
import { UserAvatar } from '../UI/user-avatar-template/UserAvatarTemplate';

export const TaskSidebar = (): JSX.Element => {
  const showActions = () => {
    console.log('showTaskActions');
  };

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
    // values: {
    //    // it works for inputs/textareas, not for selects
    //    // [InputName.TASK_TITLE]: project?.name,
    //    // [InputName.TASK_DESCRIPTION]: project?.description,
    // },
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>): void {
    console.log(e.target.value);
  }

  const handleInputSubmit = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };

  const handleSelectSubmit = (
    choice: SingleValue<OptionType>,
    fieldName: string | undefined,
  ) => {
    console.log(choice, fieldName);
  };

  return (
    <RightSidebarTemplate showActions={showActions}>
      {
        <form className={styles.form}>
          <InputTitle
            name={InputName.TASK_TITLE}
            register={register}
            onChange={handleChange}
            onBlur={handleInputSubmit}
          />

          <Select
            name={InputName.TASK_PRIORITY}
            label={'Приоритет'}
            options={PRIORITY_OPTIONS}
            value={null}
            handleChange={handleSelectSubmit}
          />

          <Select
            name={InputName.TASK_STATUS}
            label={'Статус'}
            options={STATUS_OPTIONS}
            value={null}
            handleChange={handleSelectSubmit}
          />

          <label className={styles.form__select}>
            <span className={styles.form__select_title}>Дедлайн</span>
            <Calendar
              // initialValue={new Date(project.deadline)}
              onChange={(date) => console.log(date)}
            />
          </label>

          <label className={styles.form__select}>
            <span className={styles.form__select_title}>Исполнители</span>
            <UserAvatar users={[]} />
          </label>

          <Description
            name={InputName.TASK_DESCRIPTION}
            label={'Описание задачи'}
            placeholder={'Напишите подробнее о задаче.'}
            register={register}
            onChange={handleChange}
            onBlur={handleInputSubmit}
          />
        </form>
      }
    </RightSidebarTemplate>
  );
};
