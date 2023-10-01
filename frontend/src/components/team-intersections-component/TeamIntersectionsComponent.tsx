import clsx from 'clsx';
import styles from './TeamIntersectionsComponent.module.scss';
import { numWord } from 'src/utils/formatting';

type ComponentProps = {
  width: string;
  background: string;
  total: number;
  time: string;
  onClick: () => void;
  isActive: boolean;
};

export const TeamIntersectionsComponent = (
  props: ComponentProps,
): JSX.Element => {
  return (
    <div
      className={clsx(
        styles.intersections,
        props.isActive && styles.intersections_active,
      )}
      onClick={() => props.onClick()}
    >
      <div className={styles.intersections__info}>
        <div className={styles.intersections__total}>
          {props.total +
            ' ' +
            numWord(props.total, ['участник', 'участника', 'участников'])}
        </div>
        <div className={styles.intersections__time}>{props.time}</div>
      </div>
      <div
        className={styles.intersections__bar}
        style={{
          background: `${props.background}`,
          width: props.width,
        }}
      ></div>
    </div>
  );
};
