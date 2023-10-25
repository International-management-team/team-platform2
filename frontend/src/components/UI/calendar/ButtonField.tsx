import { Button } from '@mui/material';
import {
  BaseSingleInputFieldProps,
  DateValidationError,
  FieldSection,
  UseDateFieldProps,
} from '@mui/x-date-pickers';
import { Dayjs } from 'dayjs';
import clsx from 'clsx';
import styles from './Calendar.module.scss';
import { ReactComponent as CalendarIcon } from 'assets/calendar.svg';

//поле, отображающее дату, при клике на которое открывается календарь

interface ButtonFieldProps
  extends UseDateFieldProps<Dayjs>,
    BaseSingleInputFieldProps<
      Dayjs | null,
      Dayjs,
      FieldSection,
      DateValidationError
    > {
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  open?: boolean;
}

export function ButtonField(props: ButtonFieldProps) {
  const { setOpen, open, label, id, InputProps: { ref } = {} } = props;

  return (
    <Button
      className={clsx(styles.calendar__field, {
        [styles.calendar__field_active]: open === true,
      })}
      id={id}
      ref={ref}
      onClick={() => setOpen?.((prev) => !prev)}
      endIcon={<CalendarIcon />}
      disableRipple
    >
      {label}
    </Button>
  );
}
