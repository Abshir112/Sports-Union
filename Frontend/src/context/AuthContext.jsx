import { createContext, useReducer, useEffect } from 'react';

export const AuthContext = createContext();

export const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {
                ...state,
                user: action.payload
            };
        case 'LOGOUT':
            return {
                ...state,
                user: null,
                userActivities: [],
                userEvents: []
            };
        case 'SET_USER_ACTIVITIES':
            return {
                ...state,
                userActivities: action.payload
            };
        
        case 'ADD_USER_ACTIVITY':
            return {
                ...state,
                userActivities: [...state.userActivities, action.payload]
            };
        
        case 'REMOVE_USER_ACTIVITY':
            return {
                ...state,
                userActivities: state.userActivities.filter(activity => activity.activityId !== action.payload)
            };
        
        case 'SET_USER_EVENTS':
            return {
                ...state,
                userEvents: action.payload
            };
        
        case 'ADD_USER_EVENT':
            return {
                ...state,
                userEvents: [...state.userEvents, action.payload]
            };
        
        case 'REMOVE_USER_EVENT':  
            return {
                ...state,
                userEvents: state.userEvents.filter(event => event.eventId !== action.payload)
            }; 

        default:
            return state;
    }
};

export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, {
        user: null,
        userActivities: [], // Initialize userActivities as an empty array
        userEvents: [] // Initialize userEvents as an empty array
    });


    // Check if user is logged in
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            dispatch({ type: 'LOGIN', payload: user });
        }
    }, []);

    // Fetch user activities when user logs in
    useEffect(() => {
        const userActivities = JSON.parse(localStorage.getItem('userActivities'));
        if (userActivities) {
            dispatch({ type: 'SET_USER_ACTIVITIES', payload: userActivities });
        }

    }, []);

    // Fetch user events when user logs in
    useEffect(() => {
        const userEvents = JSON.parse(localStorage.getItem('userEvents'));
        if (userEvents) {
            dispatch({ type: 'SET_USER_EVENTS', payload: userEvents });
        }
    }, []);
    console.log(state);

    return (
        <AuthContext.Provider value={{ ...state, dispatch }}>
            {children}
        </AuthContext.Provider>
    );
};
