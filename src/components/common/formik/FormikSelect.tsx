import React from 'react';
import { Field, ErrorMessage } from 'formik';
import { ErrorText } from './ErrorText';
import s from './index.module.scss';

export const FormikSelect = (props: any) => {
    const { label, name, options, ...rest } = props;
    return (
        <div className={s.field}>
            {label && <label htmlFor={name}>{label}</label>}
            <Field as='select' id={name} name={name} {...rest}>
                {options.map((option: any) => {
                    return (
                        <option key={option.value} value={option.value}>
                            {option.key}
                        </option>
                    );
                })}
            </Field>
            <ErrorMessage component={ErrorText} name={name} />
        </div>
    );
};
