import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import  useFetchUserActivites  from "./useFetchUserActivites";
import useFetchUserEvents from "./useFetchUserEvents";

export const useLogin = () => {
    const { fetchUserActivities } = useFetchUserActivites();
    const { fetchUserEvents } = useFetchUserEvents();
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const { dispatch } = useAuthContext();

    const login = async (email, password) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch('http://localhost:3000/users/sign-in', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });
            const json = await response.json();
            if (response.ok) {
                localStorage.setItem('user', JSON.stringify(json));
                fetchUserActivities(json.user._id, json.token);
                fetchUserEvents(json.user._id, json.token);
                dispatch({ type: 'LOGIN', payload: json });
                setIsLoading(false);
                return true;  // Login success
            } else {
                setError(json.error);
                setIsLoading(false);
                return false;  // Login failed
            }
        } catch (error) {
            setError("Failed to connect to the server");
            setIsLoading(false);
            return false;  // Network error or similar failure
        }
    };

    return { error, isLoading, login };
};