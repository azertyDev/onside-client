import Cookies from 'js-cookie';
import { IUser } from 'src/interfaces/IUser';

export const setTokenToHeader = () => {
    const userInfo: IUser = JSON.parse(Cookies.get('userInfo')!);
    if (userInfo.token) {
        return {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userInfo.token}`,
            },
        };
    }
};

export const getToken = () => {
    const userInfo: IUser = JSON.parse(Cookies.get('userInfo')!);
    return `Bearer ${userInfo.token}`;
};
