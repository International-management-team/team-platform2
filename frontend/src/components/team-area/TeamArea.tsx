import clsx from 'clsx';
import styles from './TeamArea.module.scss';
import { ReactComponent as FilterIcon } from 'assets/icon-filter-members.svg';
import { Teammate } from '../team-teammate/Teammate';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'src/services/hooks';
import { selectCurrentProject } from 'src/services/slices/projectSlice';
import { getMembers, selectMembers } from 'src/services/slices/teamSlice';
import { formatPhoneNumber } from 'src/utils/formatting';

export const TeamArea = (): JSX.Element => {
  const dispatch = useDispatch();
  const currentProject = useSelector(selectCurrentProject);
  const members = useSelector(selectMembers);
  const [isAllChecked, setIsAllChecked] = useState(false);

  const handlerAllChecked = () => {
    setIsAllChecked(!isAllChecked);
  };

  useEffect(() => {
    currentProject && dispatch(getMembers(currentProject?.id));
  }, [currentProject, dispatch]);

  return (
    <div className={clsx('team__element', styles.squad)}>
      <div className={styles.squad__header}>
        <div className={styles['squad__full-team']}>
          <input
            type="checkbox"
            name="full_team"
            id="full_team"
            value="all"
            onClick={handlerAllChecked}
          />
          <label htmlFor="full_team">Все участники</label>
        </div>
        <div className={styles.squad__search}>
          <div className={styles['squad__input-wrapper']}>
            <input
              type="text"
              name="search__teammate"
              id="search__teammate"
              placeholder="Найти участника"
            />
          </div>
          <div className={styles.squad__filter}>
            <FilterIcon />
          </div>
        </div>
      </div>
      <div className={styles.squad__table}>
        <div className={styles['squad__table-header']}>
          <span>Участник</span>
          <span>Контакты</span>
          <span>График работы</span>
        </div>
        {members &&
          members.map((item) => (
            <Teammate
              name={item.first_name + ' ' + item.last_name || ''}
              email={item.email || ''}
              jobTitle={item.role || ''}
              phone={
                item.telephone_number
                  ? formatPhoneNumber(item.telephone_number)
                  : ''
              }
              time={
                item.work_start &&
                item.work_finish &&
                item.work_start + ' - ' + item.work_finish
              }
              key={item.id}
              avatar={item.photo || ''}
              id={item.id || 0}
              isAllChecked={isAllChecked}
              checked={false}
            />
          ))}
      </div>
    </div>
  );
};
