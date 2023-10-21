import styles from './RightSidebarTemplate.module.scss';
import clsx from 'clsx';
import { useDispatch, useSelector } from 'src/services/hooks';
import { closeSidebar } from 'src/services/slices/sidebarSlice';

export type RightSidebarPropsType = {
  showActions: () => void;
  children?: JSX.Element;
};

export const RightSidebarTemplate = ({
  showActions,
  ...props
}: RightSidebarPropsType): JSX.Element => {
  const dispatch = useDispatch();
  const { isOpenSidebar } = useSelector((store) => store.sidebar);

  return (
    <div
      className={clsx(styles.sidebarContainer, {
        [styles.sidebarContainer_opened]: isOpenSidebar,
      })}
    >
      <section className={clsx(styles.sidebar)} aria-label="Right sidebar">
        <button
          className={styles['sidebar__close-btn']}
          onClick={() => dispatch(closeSidebar())}
        />
        <button className={styles['sidebar__menu-btn']} onClick={showActions} />
        {props.children}
      </section>
    </div>
  );
};
