import React, { useEffect } from 'react';
import styles from './Calendar.module.scss';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { StyledEngineProvider } from '@mui/material/styles';
import { ReactComponent as CalendarIcon } from 'assets/calendar.svg';
import 'dayjs/locale/ru';
import clsx from 'clsx';
import './Calendar.scss';
import { useDispatch, useSelector } from 'src/services/hooks';
import { closePopup, openPopup } from 'src/services/slices/popupSlice';
import dayjs, { Dayjs } from 'dayjs';

type CalendarProps = {
  initialValue?: string;
  onChange: (date: Date) => void;
};

export const Calendar: React.FC<CalendarProps> = (props: CalendarProps) => {
  const dispatch = useDispatch();
  const { isOpen } = useSelector((store) => store.popup);
  const [value, setValue] = React.useState<Dayjs>(
    dayjs(props.initialValue) || dayjs(),
  );
  const [title, setTitle] = React.useState<string>(
    props.initialValue ? formatDate(dayjs(props.initialValue)) : '',
  );

  useEffect(() => {
    if (props.initialValue) {
      const initDay = dayjs(props.initialValue);
      setValue(initDay);
      setTitle(formatDate(initDay));
    }
  }, [props.initialValue]);

  const saveDate = () => {
    setTitle(formatDate(value));
    dispatch(closePopup());
    props.onChange(value as unknown as Date);
  };

  function formatDate(date: Dayjs): string {
    return dayjs(date).locale('ru').format('LL').slice(0, -3);
  }

  const togglePopap = () => {
    if (isOpen) {
      dispatch(closePopup());
    } else {
      dispatch(openPopup());
    }
  };

  return (
    <div className={styles.calendar__container}>
      <div
        className={clsx(styles.calendar__field, {
          [styles.calendar__field_active]: isOpen === true,
        })}
      >
        <div className={styles.calendar__data}>{title}</div>
        <CalendarIcon
          className={styles.calendar__icon}
          onClick={() => togglePopap()}
        />
      </div>

      {isOpen && (
        <div className={styles.calendar}>
          <StyledEngineProvider injectFirst>
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ru">
              <DateCalendar
                onChange={(newValue) => newValue && setValue(newValue)}
                views={['day', 'year', 'month']}
                openTo="day"
                className={styles.calendar__content}
                value={value}
              />
            </LocalizationProvider>
          </StyledEngineProvider>
          <div className={styles.calendar__buttons}>
            <button className={styles.calendar__button_save} onClick={saveDate}>
              Сохранить изменения
            </button>
            <button
              className={styles.calendar__button_cancel}
              onClick={() => dispatch(closePopup())}
            >
              Отменить
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
