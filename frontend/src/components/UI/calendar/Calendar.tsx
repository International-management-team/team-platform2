import React, { useEffect, useState } from 'react';
import styles from './Calendar.module.scss';
import './Calendar.scss';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { StyledEngineProvider } from '@mui/material/styles';
import 'dayjs/locale/ru';
import dayjs, { Dayjs } from 'dayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { CustomActionBar } from './CustomActionBar';
import { ButtonField } from './ButtonField';

type CalendarProps = {
  initialValue?: string;
  onChange: (date: Date) => void;
};

export const Calendar: React.FC<CalendarProps> = (props: CalendarProps) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = React.useState<Dayjs>(
    dayjs(props.initialValue) || dayjs(),
  );

  useEffect(() => {
    if (props.initialValue) {
      setValue(dayjs(props.initialValue));
    }
  }, [props.initialValue]);

  const saveDate = () => {
    props.onChange(value as unknown as Date);
  };

  return (
    <StyledEngineProvider injectFirst>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ru">
        <DesktopDatePicker
          className={styles.calendar__content}
          onAccept={(newValue) => {
            newValue && setValue(newValue);
            saveDate();
          }}
          value={value}
          slots={{
            actionBar: CustomActionBar,
            field: ButtonField,
          }}
          slotProps={{
            actionBar: { actions: ['accept', 'cancel'] },
            field: { setOpen, open } as any,
          }}
          label={dayjs(value).locale('ru').format('LL').slice(0, -3)}
          open={open}
          onClose={() => setOpen(false)}
          onOpen={() => setOpen(true)}
          closeOnSelect={false}
        />
      </LocalizationProvider>
    </StyledEngineProvider>
  );
};
