import styles from './RightSidebarTitleInputTemplate.module.scss';
import { RegisterOptions, UseFormRegisterReturn } from 'react-hook-form';
import { InputName } from 'src/typings/constants';

type PropsType = {
  name: InputName;
  placeholder?: string;
  register: (name: any, options?: RegisterOptions) => UseFormRegisterReturn;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
};

export const RightSidebarTitleInputTemplate = ({
  name,
  placeholder,
  register,
  onChange,
  onBlur,
}: PropsType): JSX.Element => {
  return (
    <textarea
      rows={2}
      placeholder={placeholder}
      autoComplete={'off'}
      className={styles.title}
      {...register(name, { onChange, onBlur })}
    />
  );
};
