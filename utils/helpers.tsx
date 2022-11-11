import Cookies from 'js-cookie';

export const setTokenToHeader = () => {
    const token = Cookies.get('slondo_auth');

    if (token) {
        return {
            headers: {
                'Cross-Origin-Embedder-Policy': 'require-corp',
                'Cross-Origin-Opener-Policy': 'same-origin',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        };
    }
};
