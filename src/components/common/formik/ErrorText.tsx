import s from './index.module.scss';

export const ErrorText = (props: any) => {
    return <div className={s.errorText}>{props.children}</div>;
};
