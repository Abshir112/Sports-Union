import { useAuthContext } from "./useAuthContext";
import { useState } from "react";


export const useSignup = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const { dispatch } = useAuthContext();

    const signup = async (email, password, name, phone, personalNumber) => {
        setIsLoading(true);
        setError(null);

        const response = await fetch('http://localhost:3000/users/sign-up', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email, password, name, phone, personalNumber})
        });
        const json = await response.json();
        console.log(json);
        if (!response.ok) {
            setError(json.error);
            setIsLoading(false);
            
        }

        if(response.ok){
            // save the user to local storage
            localStorage.setItem('user', JSON.stringify(json));
            // update the user in the context
            dispatch({type: 'LOGIN', payload: json});
            setIsLoading(false);
        }
    }

    return { error, isLoading, signup };
}
