import { PasswordInput } from '@mantine/core';
import { Field, ErrorMessage, FieldProps } from 'formik';
import { ErrorText } from './ErrorText';

export const FormikPassword = (props: any) => {
    const { label, name, placeholder, withAsterisk, className, ...rest } = props;

    return (
        <>
            <Field {...rest} id={name} name={name}>
                {({ field, form: { touched, errors, isSubmitting } }: FieldProps) => {
                    return (
                        <PasswordInput
                            size='md'
                            {...field}
                            width={100}
                            label={label}
                            className={className}
                            disabled={isSubmitting}
                            placeholder='********'
                            withAsterisk={withAsterisk}
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
        </>
    );
};
