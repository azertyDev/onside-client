import axios from 'axios';
const https = require('https');
const baseURL = process.env.NEXT_PUBLIC_API_URL;

export const axiosInstance = axios.create({
    withCredentials: false,
    baseURL: baseURL,
    headers: {
        'Access-Control-Allow-Origin': 'localhost',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        'Content-Type': 'application/json',
    },
    // httpsAgent: new https.Agent({
    //     rejectUnauthorized: false,
    // }),
});
