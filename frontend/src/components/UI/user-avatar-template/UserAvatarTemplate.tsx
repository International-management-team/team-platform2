import React from 'react';
import styles from './UserAvatar.module.scss';
import clsx from 'clsx';

interface User {
  id: number;
  first_name: string;
  photo?: string;
}

interface UserAvatarProps {
  users: User[];
}

export const UserAvatar: React.FC<UserAvatarProps> = ({ users }) => {
  return (
    <div className={styles.avatar}>
      {users.slice(0, 4).map((user) => (
        <div className={styles.avatar__image} key={user.id}>
          {user.photo && <img src={user.photo} alt={user.first_name} />}
        </div>
      ))}

      <div className={clsx(styles['avatar__add-member'], styles.avatar__image)}>
        +
      </div>
    </div>
  );
};
