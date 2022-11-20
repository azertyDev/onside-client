import { createContext, useReducer, Dispatch } from 'react';
import Cookies from 'js-cookie';
import { ISuperUser, IUser } from 'src/interfaces/IUser';

export type StateAction = { type: 'ADMIN_LOGOUT' } | { type: 'ADMIN_LOGIN'; payload: ISuperUser };

export interface IStateContext {
    params: {
        userInfo: ISuperUser | null;
    };
    dispatch: Dispatch<StateAction>;
}
const initialState = {
    params: {
        userInfo: Cookies.get('userInfo') ? JSON.parse(Cookies.get('userInfo')!) : null,
    },
    dispatch: () => {},
};

export const Store = createContext<IStateContext>(initialState);

function reducer(state: IStateContext, action: StateAction): IStateContext {
    switch (action.type) {
        case 'ADMIN_LOGIN': {
            return {
                ...state,
                params: { ...state.params, userInfo: action.payload },
            };
        }
        case 'ADMIN_LOGOUT': {
            return {
                ...state,
                params: { ...state.params, userInfo: null },
            };
        }
        default:
            return state;
    }
}

export const StoreProvider = (props: any) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const value = { params: state.params, dispatch: dispatch };
    return <Store.Provider value={value}>{props.children}</Store.Provider>;
};
