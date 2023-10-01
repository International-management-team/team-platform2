import clsx from 'clsx';
import styles from './TeamIntersections.module.scss';
import { TeamIntersectionsComponent } from '../team-intersections-component/TeamIntersectionsComponent';
import { IntersectionsMock } from './intersections-mock';
import { barSettings } from './barSettings';
import { useMemo, useState } from 'react';

export const TeamIntersections = (): JSX.Element => {
  const [selectedIntersectionIndex, setSelectedIntersectionIndex] = useState<
    number | null
  >(null);

  const maxNumberOfMembers: number = useMemo(() => {
    return IntersectionsMock.reduce((curMaxValue, curIntersection) => {
      if (curMaxValue > curIntersection.membersCount) {
        return curMaxValue;
      }
      return curIntersection.membersCount;
    }, 0);
  }, []);

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

      {IntersectionsMock.length ? (
        IntersectionsMock.map((intersection, index) => (
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
