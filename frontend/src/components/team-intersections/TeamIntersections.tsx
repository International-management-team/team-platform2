import clsx from 'clsx';
import styles from './TeamIntersections.module.scss';
import { TeamIntersectionsComponent } from '../team-intersections-component/TeamIntersectionsComponent';
import { barSettings } from './barSettings';
import { useMemo } from 'react';
import { useDispatch, useSelector } from 'src/services/hooks';
import {
  resetSelectedInterval,
  selectInterval,
  selectIntervals,
  selectMembers,
  selectSelectedInterval,
} from 'src/services/api/team/teamSlice';

export const TeamIntersections = (): JSX.Element => {
  const selectedIntervalIndex = useSelector(selectSelectedInterval);
  const intervals = useSelector(selectIntervals);
  const members = useSelector(selectMembers);
  const dispatch = useDispatch();

  //маскимальное количество участников во всех интервалах
  const maxNumberOfMembers: number = useMemo(() => {
    return intervals.reduce((curMaxValue, curIntersection) => {
      if (curMaxValue > curIntersection.membersCount) {
        return curMaxValue;
      }
      return curIntersection.membersCount;
    }, 0);
  }, [intervals]);

  return (
    <div className={clsx('team__element', styles.intersections)}>
      <div className={styles.intersections__header}>
        <h3 className={styles.intersections__title}>Пересечение по времени</h3>
        {selectedIntervalIndex !== undefined && (
          <button
            className={styles.intersections__filterBtn}
            onClick={() => dispatch(resetSelectedInterval())}
          >
            Сбросить фильтр
          </button>
        )}
      </div>

      {members.length > 1 ? (
        intervals.map((intersection, index) => (
          <TeamIntersectionsComponent
            width={(intersection.membersCount / maxNumberOfMembers) * 100 + '%'}
            background={barSettings.color[index]}
            total={intersection.membersCount}
            time={intersection.time}
            key={index}
            isActive={index === selectedIntervalIndex}
            onClick={() => {
              dispatch(selectInterval(index));
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
