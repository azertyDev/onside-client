import * as yup from "yup";

export const authSchema = yup.object().shape({
    email: yup.string().required("emailAuth"),
    password: yup.string().required("passwordAuth"),
});
