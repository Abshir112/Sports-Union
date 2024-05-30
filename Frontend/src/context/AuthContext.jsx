import { createContext, useReducer, useEffect, useMemo } from 'react';

export const AuthContext = createContext();

const initialState = {
    user: JSON.parse(localStorage.getItem('user')) || null,
    userActivities: JSON.parse(localStorage.getItem('userActivities')) || [],
    userEvents: JSON.parse(localStorage.getItem('userEvents')) || [],
    activities: [],
    events: []
};

export const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return { ...state, user: action.payload };
        case 'LOGOUT':
            return { ...initialState, user: null };
        case 'SET_ACTIVITIES':
            return { ...state, activities: action.payload };
        case 'UPDATE_ACTIVITIES':
            return { ...state, activities: action.payload };
        case 'SET_EVENTS':
            return { ...state, events: action.payload };
        case 'UPDATE_EVENTS':
            return { ...state, events: action.payload };
        case 'SET_USER_ACTIVITIES':
            return { ...state, userActivities: action.payload };
        case 'ADD_USER_ACTIVITY':
            return { ...state, userActivities: [...state.userActivities, action.payload] };
        case 'REMOVE_USER_ACTIVITY':
            return { ...state, userActivities: state.userActivities.filter(activity => activity.activityId !== action.payload) };
        case 'SET_USER_EVENTS':
            return { ...state, userEvents: action.payload };
        case 'ADD_USER_EVENT':
            return { ...state, userEvents: [...state.userEvents, action.payload] };
        case 'REMOVE_USER_EVENT':  
            return { ...state, userEvents: state.userEvents.filter(event => event.eventId !== action.payload) };
        default:
            return state;
    }
};

export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, initialState);

    useEffect(() => {
        if (state.user) {
            localStorage.setItem('user', JSON.stringify(state.user));
            localStorage.setItem('userActivities', JSON.stringify(state.userActivities));
            localStorage.setItem('userEvents', JSON.stringify(state.userEvents));
        } else {
            localStorage.removeItem('user');
            localStorage.removeItem('userActivities');
            localStorage.removeItem('userEvents');
        }
    }, [state.user, state.userActivities, state.userEvents]);

    const value = useMemo(() => ({ ...state, dispatch }), [state]);

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};
