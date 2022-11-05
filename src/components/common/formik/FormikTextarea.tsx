import { Field, ErrorMessage } from 'formik';
import { ErrorText } from './ErrorText';
import s from './index.module.scss';

export const FormikTextarea = (props: any) => {
    const { label, name, ...rest } = props;
    return (
        <div className={s.field}>
            {label && <label htmlFor={name}>{label}</label>}
            <Field id={name} name={name} {...rest} component='textarea'/>
            <ErrorMessage component={ErrorText} name={name} />
        </div>
    );
};
