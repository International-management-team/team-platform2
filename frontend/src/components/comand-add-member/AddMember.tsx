import styles from './AddMember.module.scss';
import { useForm } from 'react-hook-form';
import { Input } from '../UI/input-template/InputTemplate';
import { InputType, InputName } from 'src/typings/constants';
import { errorTexts } from 'src/utils/validation/helperTexts';
import { patterns } from 'src/utils/validation/patterns';
import { ButtonTemplate } from '../UI/button-template/ButtonTemplate';
import React from 'react';
import { useDispatch, useSelector } from 'src/services/hooks';
import { selectCurrentProject } from 'src/services/api/project/projectSlice';
import { addMember } from 'src/services/api/team/teamSlice';
import { AddMemberRequestData } from 'src/services/api/team/teamTypes';

export const AddMember: React.FC = () => {
  const [addStatus, setAddStatus] = React.useState(false);
  const dispatch = useDispatch();
  const currentProject = useSelector(selectCurrentProject);

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<AddMemberRequestData>({ mode: 'onChange', criteriaMode: 'all' });

  const handlerFormSubmit = (data: AddMemberRequestData) => {
    console.log(data);
    currentProject &&
      dispatch(
        addMember({ projectId: currentProject?.id, addMemberData: data }),
      );
    setAddStatus(true);
    setTimeout(() => {
      setAddStatus(false);
    }, 2500);
    reset();
  };

  return (
    <div className={styles.newmember__wrapper}>
      <h3 className={styles.newmember__title}>Добавить участника</h3>
      <p className={styles.newmember__description}>
        Введите электронную почту человека, которого хотите пригласить в проект.
      </p>
      <form
        className={styles.newmember__form}
        onSubmit={handleSubmit(handlerFormSubmit)}
        noValidate
      >
        <Input
          register={register}
          errorObject={errors[InputName.EMAIL]}
          validOptions={{
            required: errorTexts.EMPTY_FIELD.PATTERN,
            pattern: {
              value: patterns.EMAIL,
              message: errorTexts.EMAIL.PATTERN,
            },
          }}
          name={InputName.EMAIL}
          type={InputType.EMAIL}
          label="Email"
          placeholder="example@site.mail"
        />
        <ButtonTemplate text="Пригласить" isDisabled={false} />
      </form>
      {addStatus && (
        <p className={styles.newmember__message}>Приглашение отправлено</p>
      )}
    </div>
  );
};
