import React from 'react';
import styles from './InputTemplate.module.scss';
import clsx from 'clsx';

import {ReactComponent as Eye} from 'assets/eye.svg';
import {ReactComponent as EyeOff} from 'assets/eye-off.svg';
import { input } from 'src/typings/constants';

type InputProps = {
  type: string,
  name: string,
  label: string,
  labelPassword?: string,
  isValid?: boolean | undefined,
  isEmpty?: boolean,
  isPassword?: boolean,
  isToggle?: boolean,
  useTogglePassword?: boolean,
  placeholder?: string,
  helperText?: string,
  errorText?: string,
  register: any,
  errors: any,
  validOptions?: any,
  value?: string,
  innerRef?: unknown,
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void,
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void,
  onClick?: (event: React.MouseEvent<HTMLInputElement>) => void,
  onToogle?: () => void
}

// export const Input = (props:InputProps, ref: React.LegacyRef<HTMLInputElement> | undefined) => {
//   // const {ref, ...rest} = register(props.name);

//   return (
//     <div className={styles.input__wrapper}>
//       <div className={styles.input__content}>
//         <label
//           className={styles.input__label}
//         >
//           {props.label}
//         </label>
//         <input
//           className={clsx(
//             styles.input__field,
//             {
//               [styles.input__field_valid]: props.isValid === true,
//               [styles.input__field_invalid]:  props.isValid === false
//             }
//           )}
//           // {...rest}
//           name={props.name}
//           type={props.type}
//           placeholder={props.placeholder || ''}
//           onChange={props.onChange}
//           onBlur={props.onBlur}
//           onClick={props.onClick}
//           ref={ref}
//         />

//         {(props.isPassword && props.useTogglePassword) &&
//           <div
//             className={clsx(
//               styles.input__tooglePassword
//             )}
//             onClick={props.onToogle}
//           >
//             <Toogle />
//           </div>
//         }
//       </div>
//       {props.helperText &&
//         <div className={clsx(
//           styles.input__helperText,
//           {
//             [styles.input__helperText_valid]: props.isValid === true,
//             [styles.input__helperText_invalid]: props.isValid === false
//           }
//         )}>
//           {props.helperText}
//         </div>
//       }
//       {(props.errorText && props.isValid === false) &&
//         <div className={styles.input__errorText}>
//           {props.errorText}
//         </div>
//       }
//     </div>
//   )
// }

// export const MyInput = React.forwardRef(Input);


export const Input = (props:InputProps) => {
  const checkValid = props.isValid || (props.isEmpty && !props.errors[props.name]);

  return (
    <div className={styles.input__wrapper}>
      <div className={styles.input__content}>
        <div className={styles.input__label_wrapper}>
          <label
            className={styles.input__label}
          >
            {props.label}
          </label>
          <button
            className={styles.input__label_password}
          >
            {props.labelPassword}
          </button>
        </div>
        <input
          className={clsx(
            styles.input__field,
            {
              [styles.input__field_valid]: checkValid, //!props.errors[props.name] && !props.isEmpty,
              [styles.input__field_invalid]: !!props.errors[props.name]
            }
          )}
          // {...rest}
          type={props.type}
          placeholder={props.placeholder || ''}
          {...props.register(
            props.name,
            props.validOptions
          )}
        />

        {(props.isPassword && props.useTogglePassword) &&
          <div
            className={clsx(
              styles.input__tooglePassword
            )}
            onClick={props.onToogle}
          >
            {props.isToggle ? <Eye /> : <EyeOff />}
          </div>
        }
      </div>
      {(props.helperText && props.isEmpty && !props.errors[props.name]) &&
        // props.helperText.map((item, index) => {
        //   return (
        //     <div
        //       className={clsx(
        //         styles.input__helperText,
        //         {
        //           [styles.input__helperText_valid]: props.isValid !== undefined && props.isValid,
        //           [styles.input__helperText_invalid]: !!props.errors[props.name]
        //         }
        //       )}
        //       key={index}
        //     >
        //       {item}
        //     </div>
        //   )
        // })
        <div
          className={clsx(
            styles.input__helperText,
            props.name === input.PASSWORD &&  styles.input__helperText_password,
            {
              [styles.input__helperText_valid]: checkValid,
              [styles.input__helperText_invalid]: !!props.errors[props.name]
            }
          )}
        >
          {props.helperText}
        </div>
      }
      {props.errors[props.name] &&
        <div className={clsx(
          styles.input__errorText,
          props.name === input.PASSWORD && props.isEmpty && styles.input__errorText_password
        )}>
          {props.errors[props.name].message}
        </div>
      }
    </div>
  )
}
