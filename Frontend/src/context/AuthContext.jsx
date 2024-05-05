import {createContext, useReducer, useEffect} from 'react';

export const AuthContext = createContext();

// eslint-disable-next-line
export const authReducer = (state, action) => {
    switch(action.type) {
        case 'LOGIN':
            return {
                ...state,
                user: action.payload
            }
        case 'LOGOUT':
            return {
                ...state,
                user: null
            }
        default:
            return state
    }
}
// eslint-disable-next-line
export const AuthProvider = ({children}) => {
    const [state , dispatch] = useReducer(authReducer, {
        user: null
    });

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if(user) {
            dispatch({type: 'LOGIN', payload: user});
        }
    }, []);

    console.log(state);

    return (
        <AuthContext.Provider value={{...state, dispatch}}>
            {children}
        </AuthContext.Provider>
    )
} 