import { FC } from 'react';

type IconPropsType = {
    className?: string;
    fill?: string;
};

export const CurrencyIcon: FC<IconPropsType> = ({ className, fill }) => {
    return (
        <svg
            width='64'
            height='64'
            viewBox='0 0 64 64'
            xmlns='http://www.w3.org/2000/svg'
            className={className}
        >
            <path
                d='M16 43.124C16.592 49.792 22.052 54.524 30.364 55.136V60H34.536V55.136C43.616 54.42 49.248 49.384 49.248 41.936C49.248 35.576 45.46 31.896 37.424 29.824L34.536 29.076V13.868C39.024 14.308 42.052 16.724 42.816 20.332H48.696C48.032 13.932 42.536 9.34 34.536 8.832V4H30.364V8.932C22.608 9.852 17.284 14.82 17.284 21.556C17.284 27.372 21.148 31.488 27.928 33.224L30.368 33.872V49.996C25.772 49.316 22.608 46.796 21.844 43.124H16V43.124ZM29.564 27.78C25.392 26.728 23.164 24.48 23.164 21.316C23.164 17.54 25.98 14.752 30.364 14.004V27.984L29.564 27.784V27.78ZM35.928 35.268C41.076 36.56 43.336 38.704 43.336 42.344C43.336 46.732 40.032 49.656 34.536 50.1V34.92L35.928 35.264V35.268Z'
                fill={fill ?? 'cursor'}
            />
        </svg>
    );
};
