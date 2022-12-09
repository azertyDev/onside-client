import { Field, ErrorMessage, FieldProps } from 'formik';
import { ErrorText } from './ErrorText';
import s from './index.module.scss';

export const FormikDateTimeInput = (props: any) => {
    const { label, name, placeholder, withAsterisk, value, className, ...rest } = props;

    return (
        <div className={s.field}>
            {label && <label htmlFor={name}>{label}</label>}
            <Field {...rest} id={name} name={name}>
                {({ field, form: { touched, errors, isSubmitting } }: FieldProps) => {
                    return (
                        <input
                            id={name}
                            {...field}
                            {...rest}
                            value={value}
                            type='datetime-local'
                            pattern='[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}'
                            className={className}
                            disabled={isSubmitting}
                            placeholder={placeholder}
                            error={
                                touched[field.name] &&
                                errors[field.name] && (
                                    <ErrorMessage component={ErrorText} name={name} />
                                )
                            }
                        />
                    );
                }}
            </Field>
        </div>
    );
};
