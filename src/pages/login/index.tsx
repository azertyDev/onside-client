import Cookies from 'js-cookie';
import { useContext, useState } from 'react';
import { useRouter } from 'next/router';
import { Store } from 'utils/Store';
import { Form, Formik } from 'formik';
import { axiosInstance } from 'utils/instance';
import { Paper, createStyles, Button, Title, Autocomplete } from '@mantine/core';
import { FormikControl } from 'components/common/formik/FormikControl';
import { authSchema } from 'src/validation/authSchema';
import { showNotification } from '@mantine/notifications';

const useStyles = createStyles((theme) => ({
    wrapper: {
        minHeight: '100vh',
        backgroundSize: 'cover',
        backgroundImage: "url('/assets/img/login-img.jpg')",
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

    const [email, setEmail] = useState('');

    const initialValues = {
        email: '',
        password: '',
    };

    const onSubmit = async (values: any) => {
        await axiosInstance
            .post(`/users/login`, values)
            .then(({ data }) => {
                dispatch({ type: 'ADMIN_LOGIN', payload: data });
                Cookies.set('userInfo', JSON.stringify(data));
                Cookies.set('token', JSON.stringify(data.token));
                router.push('/dashboard');
                if (data) {
                    showNotification({
                        title: '',
                        message: `You are logged in as ${data.user.name}`,
                    });
                }
            })
            .catch(({ response }) => {
                if (data) {
                    showNotification({
                        title: '',
                        message: response.data.message,
                    });
                }
            });
    };

    const data =
        email.trim().length > 0 && !email.includes('@')
            ? ['gmail.com', 'mail.ru', 'inbox.ru'].map((provider) => `${email}@${provider}`)
            : [];

    const handleMailInput = (setFieldValue: any, value: any) => {
        setEmail(value);
        setFieldValue('email', value);
    };

    return (
        <div className={classes.wrapper}>
            <Paper className={classes.form} radius={0} p={30}>
                <Title order={2} className={classes.title} align='center' mt='md' mb={50}>
                    Welcome back to ONSIDE!
                </Title>

                <Formik
                    initialValues={initialValues}
                    validationSchema={authSchema}
                    onSubmit={onSubmit}
                >
                    {({ values, setFieldValue, errors }) => {
                        return (
                            <Form>
                                <Autocomplete
                                    value={values.email}
                                    onChange={(value) => handleMailInput(setFieldValue, value)}
                                    label='Email'
                                    placeholder='Почта'
                                    data={data}
                                    error={errors.email}
                                    withAsterisk
                                    size='md'
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
                                <Button
                                    mt='xl'
                                    size='md'
                                    fullWidth
                                    type='submit'
                                    className='bg-blue-500'
                                >
                                    Kirish
                                </Button>
                            </Form>
                        );
                    }}
                </Formik>
            </Paper>
        </div>
    );
};
