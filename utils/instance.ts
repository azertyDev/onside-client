import axios from 'axios';
import { setTokenToHeader } from './helpers';
const https = require('https');
const baseURL =
    process.env.NODE_ENV === 'development'
        ? process.env.NEXT_PUBLIC_DEV_API_URL
        : process.env.NEXT_PUBLIC_PROD_API_URL;

export const axiosInstance = axios.create({
    withCredentials: false,
    baseURL: baseURL,
    headers: {
        'Access-Control-Allow-Origin': 'localhost',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        'Content-Type': 'application/json',
    },
    httpsAgent: new https.Agent({
        rejectUnauthorized: false,
    }),
});

export const userAPI = {
    getNews: (params: any): Promise<any> => {
        return axiosInstance
            .get('/news', { params, ...setTokenToHeader() })
            .then((res) => res.data)
            .catch(({ response }) => {
                throw response.data;
            });
    },
};
