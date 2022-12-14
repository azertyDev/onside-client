import axios from 'axios';
import { baseURL } from './constants';
import { setTokenToHeader } from './helpers';
const https = require('https');

export const axiosInstance = axios.create({
    withCredentials: false,
    baseURL: baseURL,
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': '*',
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
