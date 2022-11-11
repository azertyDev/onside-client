import { Formik } from 'formik';
import { FC, PropsWithChildren } from 'react';

type FormikContainerPropsType = {
    initialValues: any;
    validationSchema?: any;
    onSubmit: any;
} & PropsWithChildren;

export const FormikContainer: FC<FormikContainerPropsType> = ({
    initialValues,
    validationSchema,
    onSubmit,
    children,
}) => {
    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
        >
            {children}
        </Formik>
    );
};
