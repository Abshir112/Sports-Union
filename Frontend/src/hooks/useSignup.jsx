import { useAuthContext } from "./useAuthContext";
import { useState } from "react";


export const useSignup = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const { dispatch } = useAuthContext();

    const signup = async (email, password, name, phone, personalNumber) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch('https://sports-union.onrender.com/api/v1/api/v1/users/sign-up', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password, name, phone, personalNumber })
            });
            const json = await response.json();
            if (response.ok) {
                localStorage.setItem('user', JSON.stringify(json));
                dispatch({ type: 'LOGIN', payload: json });
                setIsLoading(false);
                return true;  // Signify success
            } else {
                setError(json.error);
                setIsLoading(false);
                return false;  // Signify failure
            }
        } catch (error) {
            setError("Failed to connect to the server");
            setIsLoading(false);
            return false;  // Signify failure on network error
        }
    };
    return { error, isLoading, signup };
};
