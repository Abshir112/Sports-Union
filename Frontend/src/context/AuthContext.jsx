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
                user: null
            };
        case 'SET_USER_ACTIVITIES':
            return {
                ...state,
                userActivities: action.payload
            };
        
        case 'REMOVE_USER_ACTIVITY':
            return {
                ...state,
                userActivities: state.userActivities.filter(activity => activity.activityId !== action.payload)
            };
        default:
            return state;
    }
};

export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, {
        user: null,
        userActivities: [] // Initialize userActivities as an empty array
    });

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            dispatch({ type: 'LOGIN', payload: user });
        }
    }, []);

    // Fetch user activities when user logs in
    useEffect(() => {
        if (state.user) {
            const fetchUserActivities = async () => {
                try {
                    const response = await fetch(`http://localhost:3000/users-activities/${state.user.user._id}`, {
                        headers: {
                            'Authorization': `Bearer ${state.user.token}`
                        }
                    });
                    if (!response.ok) {
                        throw new Error('Something went wrong!');
                    }
                    const data = await response.json();
                    dispatch({ type: 'SET_USER_ACTIVITIES', payload: data });
                } catch (error) {
                    console.error('Error fetching user activities:', error);
                }
            };

            fetchUserActivities();
        }
    }, [state.user]);

    console.log(state);

    return (
        <AuthContext.Provider value={{ ...state, dispatch }}>
            {children}
        </AuthContext.Provider>
    );
};
