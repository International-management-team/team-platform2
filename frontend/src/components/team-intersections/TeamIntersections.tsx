import clsx from 'clsx';
import styles from './TeamIntersections.module.scss';
import { TeamIntersectionsComponent } from '../team-intersections-component/TeamIntersectionsComponent';
import { barSettings } from './barSettings';
import { useMemo, useState } from 'react';
import { useSelector } from 'src/services/hooks';
import {
  selectIntervals,
  selectMembers,
} from 'src/services/api/team/teamSlice';

export const TeamIntersections = (): JSX.Element => {
  const [selectedIntersectionIndex, setSelectedIntersectionIndex] = useState<
    number | null
  >(null);
  const intervals = useSelector(selectIntervals);
  const members = useSelector(selectMembers);

  //преобразование интервалов из типа IntervalsType[] (так приходят от api) в удобный тип - массив
  const intervalsArray = useMemo(() => {
    return intervals.map((interval) => {
      return {
        time: Object.keys(interval)[0],
        members: interval[Object.keys(interval)[0]].members,
        membersCount: interval[Object.keys(interval)[0]].members_count,
      };
    });
  }, [intervals]);

  //маскимальное количество участников во всех интервалах
  const maxNumberOfMembers: number = useMemo(() => {
    return intervalsArray.reduce((curMaxValue, curIntersection) => {
      if (curMaxValue > curIntersection.membersCount) {
        return curMaxValue;
      }
      return curIntersection.membersCount;
    }, 0);
  }, [intervalsArray]);

  return (
    <div className={clsx('team__element', styles.intersections)}>
      <div className={styles.intersections__header}>
        <h3 className={styles.intersections__title}>Пересечение по времени</h3>
        {selectedIntersectionIndex !== null && (
          <button
            className={styles.intersections__filterBtn}
            onClick={() => setSelectedIntersectionIndex(null)}
          >
            Сбросить фильтр
          </button>
        )}
      </div>

      {members.length > 1 ? (
        intervalsArray.map((intersection, index) => (
          <TeamIntersectionsComponent
            width={(intersection.membersCount / maxNumberOfMembers) * 100 + '%'}
            background={barSettings.color[index]}
            total={intersection.membersCount}
            time={intersection.time}
            key={index}
            isActive={index === selectedIntersectionIndex}
            onClick={() => {
              setSelectedIntersectionIndex(index);
            }}
          />
        ))
      ) : (
        <p className={styles.intersections__text}>
          В проекте пока только один участник.
        </p>
      )}
    </div>
  );
};
