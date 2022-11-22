import * as yup from "yup";

export const authSchema = yup.object().shape({
    email: yup.string().required("Pochtangizni kiriting"),
    password: yup.string().required("Parolni kiriting"),
});
