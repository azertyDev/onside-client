import * as yup from "yup";

export const authSchema = yup.object().shape({
    phone: yup.string().required("phoneAuth"),
    password: yup.string().required("passwordAuth"),
});
