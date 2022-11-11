import { Field, ErrorMessage } from 'formik';
import { ErrorText } from './ErrorText';
import s from './index.module.scss';

export const FormikSelect = (props: any) => {
    const { label, name, options, withAsterisk, className, ...rest } = props;

    return (
        <div className={s.field}>
            {label && <label htmlFor={name}>{label}</label>}
            <Field id={name} name={name} {...rest} as='select'>
                {options.map((option: any) => {
                    return (
                        <option key={option.key} value={option.key}>
                            {option.value}
                        </option>
                    );
                })}
            </Field>
            <ErrorMessage component={ErrorText} name={name} />
        </div>
    );
};
