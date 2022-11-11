import { Field, ErrorMessage, FieldProps } from "formik";
import { ErrorText } from "./ErrorText";
import InputMask from "react-input-mask";
import { Input, InputBase } from "@mantine/core";
import { useId } from "@mantine/hooks";

export const FormikPhone = (props: any) => {
    const id = useId();
    const { label, name, placeholder, withAsterisk, className, ...rest } =
        props;

    return (
        <Field {...rest} id={name} name={name}>
            {({
                field,
                form: { touched, errors, isSubmitting },
            }: FieldProps) => {
                return (
                    <>
                        <InputBase
                            size="md"
                            id={name}
                            {...rest}
                            {...field}
                            withAsterisk
                            label={label}
                            // alwaysShowMask
                            className={className}
                            component={InputMask}
                            disabled={isSubmitting}
                            placeholder='+99899 999-99-99'
                            mask="+\9\98999999999"
                            error={
                                touched[field.name] &&
                                errors[field.name] && (
                                    <ErrorMessage
                                        component={ErrorText}
                                        name={name}
                                    />
                                )
                            }
                        />
                    </>
                );
            }}
        </Field>
    );
};
