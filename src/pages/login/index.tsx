import { Paper, createStyles, TextInput, PasswordInput, Button, Title } from '@mantine/core';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Form } from 'formik';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { Store } from 'utils/Store';
import { FormikContainer } from 'components/common/formik/FormContainer';
import { FormikControl } from 'components/common/formik/FormikControl';
import { authSchema } from 'src/validation/authSchema';
import { axiosInstance } from 'utils/instance';

const useStyles = createStyles((theme) => ({
    wrapper: {
        minHeight: '100vh',
        backgroundSize: 'cover',
        backgroundImage: "url('/img/stadium.jpeg')",
        display: 'flex',
        justifyContent: 'center',
        backgroundPosition: 'center',
    },

    form: {
        height: 'inherit',
        maxWidth: 450,
        paddingTop: 80,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',

        [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
            maxWidth: '100%',
        },
    },

    title: {
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,
        fontFamily: `Roboto, ${theme.fontFamily}`,
    },
}));

export const Login = () => {
    const { classes } = useStyles();
    const router = useRouter();
    const { dispatch } = useContext(Store);

    const initialValues = {
        phone: '',
        password: '',
    };

    const onSubmit = async (values: any) => {
        const { phone, password } = values;

        await axiosInstance
            .post(`/login`, {
                phone: phone.replace('+', ''),
                password,
            })
            .then((response) => {
                console.log(response.data);
            })
            .catch((err) => {
                console.log(err);
            });

        await fetch(`http://localhost:3001/login`, {
            method: 'POST',
            // headers: {
            //     'Access-Control-Allow-Origin': 'localhost',
            //     'Access-Control-Allow-Methods': '*',
            // },
            body: JSON.stringify({
                phone: phone.replace('+', ''),
                password,
            }),
        })
            .then((response) => {
                // dispatch({ type: 'ADMIN_LOGIN', payload: response.data });
                console.log(response.json());

                // Cookies.set("userInfo", JSON.stringify(response.data));
                // router.push("/dashboard");
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <div className={classes.wrapper}>
            <Paper className={classes.form} radius={0} p={30}>
                <Title order={2} className={classes.title} align='center' mt='md' mb={50}>
                    Welcome back to ONSIDE!
                </Title>

                <FormikContainer
                    initialValues={initialValues}
                    validationSchema={authSchema}
                    onSubmit={onSubmit}
                >
                    <Form>
                        <FormikControl
                            withAsterisk
                            label='Телефон'
                            type='text'
                            name='phone'
                            control='phone'
                            placeholder='Телефон'
                        />
                        <FormikControl
                            withAsterisk
                            label='Пароль'
                            control='password'
                            name='password'
                            type='password'
                            className='mt-4'
                            placeholder='Пароль'
                        />
                        <Button fullWidth mt='xl' size='md' className='bg-blue-500' type='submit'>
                            Авторизоваться
                        </Button>
                    </Form>
                </FormikContainer>
            </Paper>
        </div>
    );
};