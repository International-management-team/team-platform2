import { FC } from 'react';
import styles from './Calendar.module.scss';

interface CustomActionBarProps {
  onAccept: () => void;
  onCancel: () => void;
}

export const CustomActionBar: FC<CustomActionBarProps> = ({
  onAccept,
  onCancel,
}) => {
  return (
    <div className={styles.calendar__buttons}>
      <button onClick={onAccept} className={styles.calendar__button_save}>
        Сохранить изменения
      </button>
      <button onClick={onCancel} className={styles.calendar__button_cancel}>
        Отменить
      </button>
    </div>
  );
};
