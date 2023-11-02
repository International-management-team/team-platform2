import clsx from 'clsx';
import styles from './TeamArea.module.scss';
import { ReactComponent as FilterIcon } from 'assets/icon-filter-members.svg';
import { Teammate } from '../team-teammate/Teammate';
import { useState } from 'react';
import { useSelector } from 'src/services/hooks';
import {
  selectIntervals,
  selectMembers,
  selectSelectedInterval,
} from 'src/services/api/team/teamSlice';
import { formatPhoneNumber } from 'src/utils/formatting';
import { selectAuthData } from 'src/services/api/auth/authSlice';
import { UserType } from 'src/services/api/auth/authTypes';

export const TeamArea = (): JSX.Element => {
  const allMembers = useSelector(selectMembers);
  const selectedIntervalIndex = useSelector(selectSelectedInterval);
  const intervals = useSelector(selectIntervals);
  const authData = useSelector(selectAuthData);
  const [isAllChecked, setIsAllChecked] = useState(false);

  const handlerAllChecked = () => {
    setIsAllChecked(!isAllChecked);
  };

  const members =
    selectedIntervalIndex === undefined
      ? allMembers
      : intervals[selectedIntervalIndex].members;

  const sortedMembersWithFirstCurUser: UserType[] = members
    .slice()
    .sort((member) => {
      return member.id == authData.user?.id ? -1 : 1;
    });

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
        {sortedMembersWithFirstCurUser.map((member) => (
          <Teammate
            name={member.first_name + ' ' + member.last_name}
            email={member.email}
            jobTitle={member.role}
            phone={
              member.telephone_number
                ? formatPhoneNumber(member.telephone_number)
                : ''
            }
            time={
              member.work_start &&
              member.work_finish &&
              member.work_start + ' - ' + member.work_finish
            }
            key={member.id}
            avatar={member.photo}
            id={member.id}
            isAllChecked={isAllChecked}
            checked={false}
            isCurUser={member.id == authData.user?.id}
          />
        ))}
      </div>
    </div>
  );
};
