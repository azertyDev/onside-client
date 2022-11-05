export const SERVER_URL = `${process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'}`;

export const SITE_KEY = `${
    process.env.NEXT_PUBLIC_SITE_KEY || '6LeBYBohAAAAAE6paKtryZbb0k5bIq0mig3qWTcb'
}`;

export const SITE_SEKRET_KEY = `${
    process.env.NEXT_PUBLIC_SITE_SECRET_KEY || '6LeBYBohAAAAAEjMKOPKVjTrut6Z2l7Gx_t_4qNu'
}`;

export const checkEnvironments = [
    { env: 'NEXT_PUBLIC_ENV', value: process.env.NEXT_PUBLIC_ENV },
    {
        env: 'NEXT_PUBLIC_PHONE_NUMBER',
        value: process.env.NEXT_PUBLIC_PHONE_NUMBER,
    },
    {
        env: 'NEXT_PUBLIC_MAIL',
        value: process.env.NEXT_PUBLIC_MAIL,
    },
    {
        env: 'NEXT_PUBLIC_MYSQL_HOST',
        value: process.env.NEXT_PUBLIC_MYSQL_HOST,
    },
    {
        env: 'NEXT_PUBLIC_MYSQL_PORT',
        value: process.env.NEXT_PUBLIC_MYSQL_PORT,
    },
    {
        env: 'NEXT_PUBLIC_MYSQL_DATABASE',
        value: process.env.NEXT_PUBLIC_MYSQL_DATABASE,
    },
    {
        env: 'NEXT_PUBLIC_MYSQL_USER',
        value: process.env.NEXT_PUBLIC_MYSQL_USER,
    },
    {
        env: 'NEXT_PUBLIC_MYSQL_PASSWORD',
        value: process.env.NEXT_PUBLIC_MYSQL_PASSWORD,
    },
    {
        env: 'NEXT_PUBLIC_SERVER_URL',
        value: process.env.NEXT_PUBLIC_SERVER_URL,
    },
    {
        env: 'NEXT_PUBLIC_API_URL',
        value: process.env.NEXT_PUBLIC_API_URL,
    },
    {
        env: 'TEST_ENV',
        value: process.env.TEST_ENV,
    },
];
