import { useEffect, useState } from 'react';
import clsx from 'clsx';
import styles from './Teammate.module.scss';
import { ReactComponent as DeleteIcon } from 'assets/icon-delete.svg';

export type TTeammate = {
  id?: string;
  name: string;
  jobTitle: string;
  email: string;
  phone: string;
  avatar?: string;
  time?: string;
  isAllChecked?: boolean;
};

export const Teammate = ({
  name,
  jobTitle,
  email,
  phone,
  avatar,
  time,
  id,
  isAllChecked,
}: TTeammate): JSX.Element => {
  const [isCheck, setIsCheck] = useState(isAllChecked);

  useEffect(() => setIsCheck(isAllChecked), [isAllChecked]);

  const handlerCheck = () => {
    setIsCheck(!isCheck);
  };

  return (
    <div className={styles.teammate}>
      <div className={styles.teammate__info}>
        {/* <div
          className={clsx(styles.check, styles.icon__wrapper)}
          onClick={handlerCheck}
        >
          {isCheck ? <CheckedIcon /> : <UncheckedIcon />}
        </div> */}
        <div className={styles['teammate__info-checkbox']}>
          <input type="checkbox" name="teammate-check" id="teammate-check" />
        </div>

        <div className={styles['teammate__info-avatar']}></div>
        <div
          className={clsx(
            styles['teammate__info-text'],
            styles['teammate__info-item'],
          )}
        >
          <div className={styles.text_prime}>{name}</div>
          <div className={styles.text_ordinary}>{jobTitle}</div>
        </div>
      </div>
      <div
        className={clsx(
          styles['teammate__info-contacts'],
          styles['teammate__info-item'],
        )}
      >
        <div className={styles.text_prime}>{email}</div>
        <div className={styles.text_prime}>{phone}</div>
      </div>
      <div
        className={clsx(
          styles['teammate__info-item'],
          styles['teammate__info-time'],
        )}
      >
        <div className={styles.text_prime}>
          {time ? (
            time
          ) : (
            <span className={styles.text_ordinary}>● не указан</span>
          )}
        </div>
        <div className={clsx(styles.delete, styles.icon__wrapper)}>
          <DeleteIcon />
        </div>
      </div>
    </div>
  );
};
